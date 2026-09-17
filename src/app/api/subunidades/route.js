import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const viaturas = await prisma.viatura.findMany({
      orderBy: {
        prefixo: "asc",
      },
    });

    const subunidadesMap = {};

    (viaturas || []).forEach((v) => {
      const nomeSubunidade = v.subunidade && v.subunidade.trim() !== "" 
        ? v.subunidade.trim() 
        : "Sede / Não Alocado";

      if (!subunidadesMap[nomeSubunidade]) {
        subunidadesMap[nomeSubunidade] = {
          id: nomeSubunidade,
          nome: nomeSubunidade,
          sigla: nomeSubunidade,
          grupo: nomeSubunidade,
          cidade: v.municipio || "17º BPM",
          areaAtuacao: v.municipio || "Área 17º BPM",
          comandante: "Comando do Batalhão",
          viaturas: [],
        };
      }

      // Normalização do Status (Mapeia 'disponivel' para 'Operacional')
      const statusBanco = String(v.status || "").toLowerCase().trim();
      let statusNormalizado = "Operacional";

      if (
        statusBanco.includes("manut") || 
        statusBanco.includes("oficina") || 
        statusBanco.includes("reparo")
      ) {
        statusNormalizado = "Manutenção";
      } else if (
        statusBanco.includes("baix") || 
        statusBanco.includes("inop") || 
        statusBanco.includes("inativ") || 
        statusBanco.includes("recolhid")
      ) {
        statusNormalizado = "Baixada";
      } else if (
        statusBanco.includes("disponivel") || 
        statusBanco.includes("disponível") || 
        statusBanco.includes("pronta") || 
        statusBanco.includes("operacional") ||
        statusBanco.includes("ativo")
      ) {
        statusNormalizado = "Operacional";
      }

      subunidadesMap[nomeSubunidade].viaturas.push({
        id: v.id,
        prefixo: v.prefixo || "Sem Prefixo",
        placa: v.placa || "SEM PLACA",
        modelo: v.modelo || v.marca || "Não informado",
        tipo: v.atividadePredominante || v.especie || "Patrulhamento",
        status: statusNormalizado,
        km: v.km || 0,
      });
    });

    return NextResponse.json(Object.values(subunidadesMap));
  } catch (error) {
    console.error("Erro na rota de subunidades:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}