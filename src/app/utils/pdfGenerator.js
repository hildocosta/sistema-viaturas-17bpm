import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor || 0);
};

export const formatarData = (isoDate) => {
  if (!isoDate) return "N/A";
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const carregarImagem = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
  });
};

export const gerarPDFProntuario = async (viatura, historico = []) => {
  if (!viatura) return;

  const doc = new jsPDF();
  const dataEmissao = formatarData(new Date().toISOString());

  // Carregamento dos brasões
  const [brasaoPMPR, brasao17BPM] = await Promise.all([
    carregarImagem("/assets/image/logo-17bpm.png"),
    carregarImagem("/assets/image/logo-17bpm.png"),
  ]);

  // ==========================================
  // --- CABEÇALHO OFICIAL ---
  // ==========================================
  if (brasaoPMPR) doc.addImage(brasaoPMPR, "PNG", 14, 10, 20, 24);
  if (brasao17BPM) doc.addImage(brasao17BPM, "PNG", 176, 10, 20, 24);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("POLÍCIA MILITAR DO PARANÁ", 105, 13, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("6º COMANDO REGIONAL DE POLÍCIA MILITAR", 105, 18, { align: "center" });
  doc.text("17º BATALHÃO DE POLÍCIA MILITAR", 105, 23, { align: "center" });

  doc.setFontSize(8);
  doc.text("QUARTA SEÇÃO - TRANSPORTE", 105, 28, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PRONTUÁRIO OPERACIONAL DE VIATURA", 105, 36, { align: "center" });

  doc.setDrawColor(203, 213, 225);
  doc.line(14, 40, 196, 40);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Emissão: ${dataEmissao} | Sistema P4`, 14, 45);

  const custoTotal = historico.reduce((acc, item) => acc + (Number(item.custo) || 0), 0);

  // Configuração padrão de tabelas de informações
  const infoTableConfig = {
    theme: "grid",
    styles: { 
      fontSize: 7.5, 
      cellPadding: 2, 
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.1
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: "normal" },
      1: { cellWidth: 60, fontStyle: "normal" },
      2: { cellWidth: 62, fontStyle: "normal" },
    },
  };

  // ==========================================
  // --- 1. IDENTIFICAÇÃO E FICHA TÉCNICA ---
  // ==========================================
  let currentY = 52;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text("1. Identificação e Especificações Técnicas", 14, currentY);

  const dadosTecnicos = [
    [`Prefixo: ${viatura.prefixo || "N/A"}`, `Placa: ${viatura.placa || "N/A"}`, `Status: ${viatura.status || "N/A"}`],
    [`Marca: ${viatura.marca || "N/A"}`, `Modelo: ${viatura.modelo || "N/A"}`, `Cor: ${viatura.cor || "N/A"}`],
    [`Ano Fab.: ${viatura.anoFabricacao || "N/A"}`, `Ano Mod.: ${viatura.anoModelo || "N/A"}`, `Combustível: ${viatura.combustivel || "N/A"}`],
    [`Espécie: ${viatura.especie || "N/A"}`, `Tipo Frota: ${viatura.tipoFrota || "N/A"}`, `Blindagem: ${viatura.blindagem || "Não"}`],
    [`Chassi: ${viatura.chassi || "N/A"}`, `RENAVAM: ${viatura.renavam || "N/A"}`, `Odômetro: ${viatura.km ? viatura.km.toLocaleString("pt-BR") : 0} km`]
  ];

  autoTable(doc, {
    ...infoTableConfig,
    startY: currentY + 3,
    body: dadosTecnicos,
  });

  // ==========================================
  // --- 2. LOTAÇÃO, EMPREGO E PATRIMÔNIO ---
  // ==========================================
  currentY = doc.lastAutoTable.finalY + 8;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text("2. Lotação, Emprego Operacional e Patrimônio", 14, currentY);

  const dadosLotacao = [
    [`Subunidade: ${viatura.subunidade || "N/A"}`, `Município: ${viatura.municipio || "N/A"}`, `Atividade: ${viatura.atividadePredominante || "N/A"}`],
    [`Emprego Exclusivo: ${viatura.empregoExclusivo || "N/A"}`, `Critério GPM: ${viatura.frotaCriterioGpm || "N/A"}`, `Estado Conserv.: ${viatura.estadoConservacao || "N/A"}`],
    [`Patrimônio: ${viatura.patrimonio || "N/A"}`, `Propriedade: ${viatura.propriedade || "N/A"}`, `CNPJ: ${viatura.cnpj || "N/A"}`],
  ];

  autoTable(doc, {
    ...infoTableConfig,
    startY: currentY + 3,
    body: dadosLotacao,
  });

  // ==========================================
  // --- 3. COMUNICAÇÃO, VALORES E DOCUMENTOS ---
  // ==========================================
  currentY = doc.lastAutoTable.finalY + 8;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text("3. Radiocomunicação, Indicadores Financeiros e Registros", 14, currentY);

  const dadosFinanceiro = [
    [`Plaqueta Rádio: ${viatura.plaquetaRadio || "N/A"}`, `Serial Rádio: ${viatura.serialRadio || "N/A"}`, `AVL / Rastreador: ${viatura.avl || "N/A"}`],
    [`Valor FIPE: ${viatura.fipe ? formatarMoeda(Number(viatura.fipe)) : "N/A"}`, `Débitos Lançados: ${viatura.debitos ? formatarMoeda(Number(viatura.debitos)) : "R$ 0,00"}`, `Investimento Manutenção: ${formatarMoeda(custoTotal)}`],
    [`ID Planilha: ${viatura.idViaturaPlanilha || "N/A"}`, `Observação: ${viatura.observacao || "Nenhuma"}`, `Pasta Digital: ${viatura.pastaDigital ? "Disponível" : "N/A"}`],
  ];

  autoTable(doc, {
    ...infoTableConfig,
    startY: currentY + 3,
    body: dadosFinanceiro,
  });

  // ==========================================
  // --- 4. HISTÓRICO CRONOLÓGICO ---
  // ==========================================
  currentY = doc.lastAutoTable.finalY + 8;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text("4. Histórico Cronológico de Manutenções e Eventos", 14, currentY);

  const tableRows = (historico || []).map((item) => [
    formatarData(item.data),
    item.tipo,
    `${item.titulo}${item.descricao ? `\nObs: ${item.descricao}` : ""}`,
    item.kmRegistrado ? `${item.kmRegistrado.toLocaleString("pt-BR")} km` : "-",
    item.responsavel || "N/A",
    item.custo > 0 ? formatarMoeda(item.custo) : "Isento",
  ]);

  autoTable(doc, {
    startY: currentY + 3,
    head: [["Data", "Tipo", "Título / Descrição", "KM", "Responsável", "Custo"]],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
    },
    bodyStyles: { fontSize: 7.5, cellPadding: 2.5 },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { cellWidth: 22 },
      2: { cellWidth: 62 },
      3: { cellWidth: 20 },
      4: { cellWidth: 28 },
      5: { cellWidth: 22, halign: "right" },
    },
  });

  // Rodapé
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Página ${i} de ${totalPages} - Documento de uso interno e reservado / PMPR`,
      105,
      290,
      { align: "center" }
    );
  }

  doc.save(`Prontuario_Viatura_${viatura.prefixo || "Geral"}.pdf`);
};