import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.js";

export async function GET() {
  try {
    // Consulta direta e exclusiva à tabela 'viatura' do banco de dados
    const viaturas = await prisma.viatura.findMany({
      orderBy: { criadoEm: "desc" },
    });

    const totalViaturas = viaturas.length;

    // Métricas calculadas dinamicamente com base nas viaturas existentes
    const prontas = viaturas.filter((v) => {
      const s = (v.status || "").toLowerCase();
      return s.includes("disponível") || s.includes("disponivel") || s === "pronta";
    }).length;

    const manutencao = viaturas.filter((v) => {
      const s = (v.status || "").toLowerCase();
      return s.includes("manutenção") || s.includes("manutencao");
    }).length;

    const inoperantes = viaturas.filter((v) => {
      const s = (v.status || "").toLowerCase();
      return (
        s.includes("descarga") ||
        s.includes("leilão") ||
        s.includes("sinistro") ||
        s.includes("regularização") ||
        s.includes("inoperante")
      );
    }).length;

    // Totais acumulados reais de KM e Débitos do banco
    const kmTotalRodadoMes = viaturas.reduce((acc, v) => acc + (Number(v.km) || 0), 0);
    const custoMesAtual = viaturas.reduce((acc, v) => acc + (Number(v.debitos) || 0), 0);

    // Alertas de revisão reais filtrados das viaturas cadastradas
    const alertasRevisao = viaturas
      .filter((v) => v.km && Number(v.km) > 0)
      .slice(0, 5)
      .map((v) => {
        const kmAtual = Number(v.km) || 0;
        const kmProximaRevisao = Math.ceil((kmAtual + 1) / 10000) * 10000;
        const kmFaltantes = kmProximaRevisao - kmAtual;

        return {
          id: v.id || v.prefixo,
          prefixo: v.prefixo || "S/ PREF",
          modelo: v.modelo || `${v.marca || ""} ${v.especie || ""}`.trim() || "Modelo N/I",
          subunidade: v.subunidade || "Não atribuída",
          kmAtual,
          kmProximaRevisao,
          urgencia: kmFaltantes <= 1000 ? "critica" : "alta",
        };
      });

    // Lista das últimas viaturas cadastradas no banco
    const ultimasManutencoes = viaturas.slice(0, 5).map((v) => ({
      id: v.id || v.prefixo,
      prefixo: v.prefixo || "S/ PREF",
      oficina: v.subunidade || "Lotação não informada",
      tipo: v.status?.toLowerCase().includes("manutenção") ? "Corretiva" : "Preventiva",
      descricao: v.observacao || `${v.modelo || "Viatura"} - Placa: ${v.placa || "S/P"}`,
      valor: Number(v.debitos) || 0,
      data: v.dataKm ? new Date(v.dataKm).toLocaleDateString("pt-BR") : "Cadastrada",
      status: v.status?.toLowerCase().includes("manutenção") ? "Em Manutenção" : "Ativa",
    }));

    return NextResponse.json(
      {
        metricas: {
          totalViaturas,
          prontas,
          manutencao,
          inoperantes,
          custoMesAtual,
          variacaoCustoMes: 0,
          kmTotalRodadoMes,
          revisoesPendentes: alertasRevisao.length,
        },
        ultimasManutencoes,
        alertasRevisao,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no servidor ao carregar dados do Prisma:", error);
    return NextResponse.json(
      { error: "Erro ao conectar com o banco de dados." },
      { status: 500 }
    );
  }
}