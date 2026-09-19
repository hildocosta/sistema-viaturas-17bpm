require('dotenv').config(); // Carrega as variáveis do .env
const xlsx = require('xlsx');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// Configura o Pool do Postgres e o Adapter do Prisma
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Auxiliar para converter entradas da planilha para objetos Date válidos
function parseData(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor;

  if (typeof valor === 'number') {
    const dataObj = new Date((valor - (25567 + 2)) * 86400 * 1000);
    return isNaN(dataObj.getTime()) ? null : dataObj;
  }

  if (typeof valor === 'string') {
    const texto = valor.trim();
    if (texto.includes('/')) {
      const partes = texto.split('/');
      if (partes.length === 3) {
        const dataObj = new Date(partes[2], partes[1] - 1, partes[0]);
        return isNaN(dataObj.getTime()) ? null : dataObj;
      }
    }
    const dataObj = new Date(texto);
    return isNaN(dataObj.getTime()) ? null : dataObj;
  }

  return null;
}

// Auxiliar para converter a quilometragem para Int
function parseKm(valor) {
  if (valor === undefined || valor === null || valor === "") return null;
  const limpo = String(valor).replace(/\D/g, "");
  const num = parseInt(limpo, 10);
  return isNaN(num) ? null : num;
}

// Auxiliar para converter valores monetários/decimais
function parseDecimal(valor) {
  if (valor === undefined || valor === null || valor === "") return 0.0;
  if (typeof valor === 'number') return valor;
  
  const limpo = String(valor)
    .replace(/[R$\s]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
    
  const num = parseFloat(limpo);
  return isNaN(num) ? 0.0 : num;
}

async function importarViaturas() {
  try {
    const caminhoFicheiro = path.join(__dirname, 'SGF 17º BPM - Sistema de Gestão de Frota.ods');
    const workbook = xlsx.readFile(caminhoFicheiro);
    const nomeAba = workbook.SheetNames[0];
    const folha = workbook.Sheets[nomeAba];

    const dados = xlsx.utils.sheet_to_json(folha);

    console.log(`📊 Total de registros na planilha: ${dados.length}\n`);

    let inseridos = 0;
    let ignorados = 0;

    for (const linha of dados) {
      const prefixo = linha["PREFIXO"] ? String(linha["PREFIXO"]).trim() : null;

      if (!prefixo) {
        console.log("⚠️ Linha ignorada: não contém PREFIXO.");
        continue;
      }

      // Verifica duplicidade pelo PREFIXO
      const viaturaExistente = await prisma.viatura.findUnique({
        where: { prefixo: prefixo },
      });

      if (viaturaExistente) {
        console.log(`⏭️  Viatura do prefixo [${prefixo}] já cadastrada. Pulando...`);
        ignorados++;
        continue;
      }

      // Mapeamento compatível com o Prisma Schema
      const novaViatura = {
        prefixo: prefixo,
        placa: linha["PLACA"] ? String(linha["PLACA"]).trim() : null,
        patrimonio: linha["PATRIMONIO"] ? String(linha["PATRIMONIO"]) : null,
        subunidade: linha["SUBUNIDADE"] ? String(linha["SUBUNIDADE"]) : null,
        municipio: linha["MUNICIPIO"] ? String(linha["MUNICIPIO"]) : null,
        atividadePredominante: linha["ATIVIDADE PREDOMINANTE"] ? String(linha["ATIVIDADE PREDOMINANTE"]) : null,
        status: linha["STATUS"] ? String(linha["STATUS"]) : "Ativa",
        frotaCriterioGpm: linha["FROTA CRITÉRIO GPM"] ? String(linha["FROTA CRITÉRIO GPM"]) : null,

        marca: linha["MARCA"] ? String(linha["MARCA"]) : null,
        modelo: linha["MODELO"] ? String(linha["MODELO"]) : null,
        renavam: linha["RENAVAM"] ? String(linha["RENAVAM"]) : null,
        chassi: linha["CHASSI"] ? String(linha["CHASSI"]) : null,
        anoFabricacao: parseInt(linha["ANO_FABRICACAO"], 10) || null,
        anoModelo: parseInt(linha["ANO_MODELO"], 10) || null,
        cor: linha["COR"] ? String(linha["COR"]) : null,
        cnpj: linha["CNPJ"] ? String(linha["CNPJ"]) : null,

        propriedade: linha["PROPRIEDADE"] ? String(linha["PROPRIEDADE"]) : null,
        especie: linha["ESPECIE"] ? String(linha["ESPECIE"]) : null,
        tipoFrota: linha["TIPO_FROTA"] ? String(linha["TIPO_FROTA"]) : null,
        combustivel: linha["COMBUSTIVEL"] ? String(linha["COMBUSTIVEL"]) : null,
        blindagem: linha["BLINDAGEM"] ? String(linha["BLINDAGEM"]) : null,
        empregoExclusivo: linha["EMPREGO_EXCLUSIVO"] ? String(linha["EMPREGO_EXCLUSIVO"]) : null,
        plaquetaRadio: linha["PLAQUETA_RADIO"] ? String(linha["PLAQUETA_RADIO"]) : null,
        serialRadio: linha["SERIAL_RADIO"] ? String(linha["SERIAL_RADIO"]) : null,
        avl: linha["AVL"] ? String(linha["AVL"]) : null,

        km: parseKm(linha["KM_"]),
        dataKm: parseData(linha["DATA_KM"]),
        fipe: parseDecimal(linha["FIPE"]),
        dataFipe: parseData(linha["DATA FIPE"]),
        debitos: parseDecimal(linha["DÉBITOS"]),
        dataDebitos: parseData(linha["DATA DÉBITOS"]),

        estadoConservacao: linha["ESTADO_CONSERVACAO"] ? String(linha["ESTADO_CONSERVACAO"]) : null,
        dataConservacao: parseData(linha["ATA CONSERVAÇÃO"]),
        pastaDigital: linha["PASTA_DIGITAL"] ? String(linha["PASTA_DIGITAL"]) : null,
        idViaturaPlanilha: linha["ID_VIATURA"] ? String(linha["ID_VIATURA"]) : null,
        observacao: linha["OBSERVACAO"] ? String(linha["OBSERVACAO"]) : null,
      };

      await prisma.viatura.create({
        data: novaViatura,
      });

      console.log(`✅ Prefixo [${prefixo}] cadastrado com sucesso!`);
      inseridos++;
    }

    console.log(`\n🎉 Importação finalizada!`);
    console.log(`📥 Novos cadastros: ${inseridos}`);
    console.log(`⏭️  Pulados (prefixo já existia): ${ignorados}`);

  } catch (erro) {
    console.error("❌ Erro durante a importação:", erro);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

importarViaturas();