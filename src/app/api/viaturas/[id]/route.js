import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(request, { params }) {
  try {
    // Resolve o parâmetro id de forma assíncrona (padrão Next.js 15+)
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);

    // Validação caso o ID passado na URL não seja um número válido
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de viatura inválido." },
        { status: 400 }
      );
    }

    // Busca a viatura específica no banco via Prisma
    const viatura = await prisma.viatura.findUnique({
      where: { id: id },
    });

    if (!viatura) {
      return NextResponse.json(
        { error: "Viatura não encontrada." },
        { status: 404 }
      );
    }

    // Retorna os dados reais da viatura e um historico inicial (pode ser expandido no futuro)
    return NextResponse.json({
      viatura,
      historico: [],
    });
  } catch (error) {
    console.error("Erro na rota /api/viaturas/[id]:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao buscar a viatura." },
      { status: 500 }
    );
  }
}