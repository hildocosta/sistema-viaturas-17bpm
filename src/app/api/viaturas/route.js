import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma.js'

// Função auxiliar para converter string formatada em Real (ex: "182.535,00") para Number válido (182535.00)
function parseMoedaToNumber(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  if (typeof valor === 'number') return valor;

  // Remove espaços, "R$", pontos de milhar e troca vírgula por ponto decimal
  const limpo = String(valor)
    .replace(/R\$\s?/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();

  const numero = parseFloat(limpo);
  return isNaN(numero) ? null : numero;
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validação de campo obrigatório
    if (!body.prefixo) {
      return NextResponse.json(
        { error: 'O campo Prefixo é obrigatório.' },
        { status: 400 }
      )
    }

    // Verifica duplicidade por prefixo
    const viaturaExistente = await prisma.viatura.findUnique({
      where: { prefixo: body.prefixo },
    })

    if (viaturaExistente) {
      return NextResponse.json(
        { error: `Já existe uma viatura cadastrada com o prefixo "${body.prefixo}".` },
        { status: 409 }
      )
    }

    // Mapeamento completo e tratamento de tipos para o Prisma Schema
    const novaViatura = await prisma.viatura.create({
      data: {
        // Identificação e Documentação
        pastaDigital: body.pastaDigital || null,
        idViaturaPlanilha: body.idViaturaPlanilha || null,
        prefixo: body.prefixo,
        placa: body.placa || null,
        patrimonio: body.patrimonio || null,

        // Lotação e Aplicação
        subunidade: body.subunidade || body.companhia || null,
        municipio: body.municipio || null,
        atividadePredominante: body.atividadePredominante || null,
        empregoExclusivo: body.empregoExclusivo || null,
        frotaCriterioGpm: body.frotaCriterioGpm || null,

        // Situação e Propriedade
        status: body.status || body.situacao || null,
        propriedade: body.propriedade || null,
        cnpj: body.cnpj || null,

        // Especificações Técnicas
        marca: body.marca || null,
        modelo: body.modelo || null,
        blindagem: body.blindagem || null,
        especie: body.especie || null,
        tipoFrota: body.tipoFrota || body.tipoViatura || null,
        renavam: body.renavam || null,
        chassi: body.chassi || null,
        anoFabricacao: body.anoFabricacao ? Number(body.anoFabricacao) : null,
        anoModelo: body.anoModelo ? Number(body.anoModelo) : null,
        cor: body.cor || null,
        combustivel: body.combustivel || null,

        // Comunicação e Rastreamento
        plaquetaRadio: body.plaquetaRadio || null,
        serialRadio: body.serialRadio || null,
        avl: body.avl || null,

        // Indicadores Financeiros (TRATADOS CORRETAMENTE)
        fipe: parseMoedaToNumber(body.fipe),
        dataFipe: body.dataFipe ? new Date(body.dataFipe) : null,
        debitos: parseMoedaToNumber(body.debitos) ?? 0,
        dataDebitos: body.dataDebitos ? new Date(body.dataDebitos) : null,

        // Conservação e Odômetro
        km: body.km !== "" && body.km !== null && body.km !== undefined ? parseInt(String(body.km).replace(/\D/g, ''), 10) : null,
        dataKm: body.dataKm ? new Date(body.dataKm) : null,
        estadoConservacao: body.estadoConservacao || null,
        dataConservacao: body.dataConservacao ? new Date(body.dataConservacao) : null,

        // Observações e Soft-Delete
        observacao: body.observacao || body.observacoes || null,
        exclusao: body.exclusao || null,
      },
    })

    return NextResponse.json(
      { message: 'Viatura cadastrada com sucesso!', viatura: novaViatura },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao cadastrar viatura:', error)
    return NextResponse.json(
      { error: 'Erro interno ao tentar cadastrar a viatura.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const viaturas = await prisma.viatura.findMany({
      orderBy: { criadoEm: 'desc' },
    })

    return NextResponse.json(viaturas, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar viaturas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar lista de viaturas.' },
      { status: 500 }
    )
  }
}