import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request) {
  try {
    const { prefixo, motorista, km } = await request.json();

    if (!prefixo || !km) {
      return NextResponse.json(
        { error: 'Prefixo e KM são obrigatórios.' },
        { status: 400 }
      );
    }

    const kmNumero = parseInt(km, 10);
    if (isNaN(kmNumero)) {
      return NextResponse.json(
        { error: 'O valor do KM deve ser um número válido.' },
        { status: 400 }
      );
    }

    // Busca a viatura pelo prefixo
    const viatura = await prisma.viatura.findUnique({
      where: { prefixo: String(prefixo) },
    });

    if (!viatura) {
      return NextResponse.json(
        { error: `Viatura com prefixo ${prefixo} não encontrada.` },
        { status: 404 }
      );
    }

    // Atualiza o KM e a data do registro da viatura
    const viaturaAtualizada = await prisma.viatura.update({
      where: { prefixo: String(prefixo) },
      data: {
        km: kmNumero,
        dataKm: new Date(),
        observacao: motorista 
          ? `Último registro por: ${motorista} em ${new Date().toLocaleString('pt-BR')}`
          : viatura.observacao,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'KM atualizado com sucesso!',
      viatura: viaturaAtualizada,
    });
  } catch (error) {
    console.error('Erro no checkin:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar KM.' },
      { status: 500 }
    );
  }
}