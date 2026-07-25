import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor || 0);
};

export const formatarData = (isoDate) => {
  if (!isoDate) return "-";
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const gerarPDFProntuario = (viatura, historico) => {
  if (!viatura) return;

  const doc = new jsPDF();
  const dataEmissao = formatarData(new Date().toISOString());

  // Cabeçalho Oficial
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PRONTUÁRIO OPERACIONAL DE VIATURA", 14, 16);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Emitido em: ${dataEmissao} | Sistema P4`, 14, 24);

  // Ficha Técnica
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("1. Ficha Técnica do Veículo", 14, 42);

  const dadosViatura = [
    [
      `Prefixo: ${viatura.prefixo}`,
      `Placa: ${viatura.placa}`,
      `Modelo: ${viatura.modelo}`,
    ],
    [
      `Ano: ${viatura.ano}`,
      `KM Atual: ${viatura.kmAtual.toLocaleString("pt-BR")} km`,
      `Subunidade: ${viatura.subunidade}`,
    ],
    [
      `Status: ${viatura.status}`,
      `Investimento Total: ${formatarMoeda(viatura.custoTotalManutencao)}`,
      `Registros no Histórico: ${historico.length}`,
    ],
  ];

  autoTable(doc, {
    startY: 46,
    body: dadosViatura,
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60 },
      1: { cellWidth: 60 },
      2: { cellWidth: 70 },
    },
  });

  // Tabela do Histórico
  const startYHistorico = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text(
    "2. Histórico Cronológico de Manutenções e Eventos",
    14,
    startYHistorico
  );

  const tableRows = historico.map((item) => [
    formatarData(item.data),
    item.tipo,
    `${item.titulo}\n${item.descricao}`,
    item.kmRegistrado
      ? `${item.kmRegistrado.toLocaleString("pt-BR")} km`
      : "-",
    item.responsavel,
    item.custo > 0 ? formatarMoeda(item.custo) : "Isento",
  ]);

  autoTable(doc, {
    startY: startYHistorico + 4,
    head: [
      ["Data", "Tipo", "Título / Descrição", "KM", "Responsável", "Custo"],
    ],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
    },
    bodyStyles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 26 },
      1: { cellWidth: 22 },
      2: { cellWidth: 65 },
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
      `Página ${i} de ${totalPages} - Relatório de uso interno confidencial`,
      105,
      290,
      { align: "center" }
    );
  }

  doc.save(`Prontuario_Viatura_${viatura.prefixo}.pdf`);
};