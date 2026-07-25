"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar/page";
import TimelineHistorico from "@/components/modal/TimelineHistorico";
import ModalNovoEvento from "@/components/modal/ModalNovoEvento";
import ModalDetalhesEvento from "@/components/modal/ModalDetalhesEvento";
import { 
  DashboardWrapper, 
  SidebarArea, 
  MainContent, 
  ContentScrollArea, 
  CardsGrid,
  DashboardCard,
  LoadingScreen,
  HeaderIconButton,
  HeaderActionButton
} from "@/components/layout/DashboardLayout";
import { 
  Car, 
  ArrowLeft, 
  DollarSign, 
  Plus, 
  Gauge, 
  Building2, 
  FileText 
} from "lucide-react";

import { formatarMoeda, gerarPDFProntuario } from "@/app/utils/pdfGenerator";

export default function ProntuarioViaturaPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [viatura, setViatura] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const origin = window.location.origin;
        const res = await fetch(`${origin}/api/viaturas/${id}`);
        if (!res.ok) throw new Error("Offline");
        
        const data = await res.json();
        setViatura(data.viatura);
        setHistorico(data.historico);
      } catch (err) {
        setViatura({
          id: id,
          prefixo: "L0117",
          placa: "BEE-4R17",
          modelo: "Toyota Hilux SW4 4x4",
          ano: 2023,
          kmAtual: 34200,
          subunidade: "ROTAM / 17º BPM",
          status: "Pronta",
          custoTotalManutencao: 3300.00
        });

        setHistorico([
          {
            id: "h1",
            data: "2026-07-20T10:30:00Z",
            tipo: "Manutenção",
            titulo: "Troca de Óleo e Filtro de Óleo",
            descricao: "Realizada manutenção preventiva dos 30.000km em oficina credenciada. Substituído o filtro de combustível, filtro de ar do motor e adicionado óleo sintético 5W30 conforme especificações do fabricante.",
            custo: 850.00,
            responsavel: "Sgt. Silva (P4)",
            kmRegistrado: 34200
          },
          {
            id: "h2",
            data: "2026-05-10T14:15:00Z",
            tipo: "Inspeção",
            titulo: "Inspeção Trimestral de Viatura",
            descricao: "Sem alterações na suspensão ou motor. Pneus em bom estado de conservação. Equipamentos de emergência (sirene e giroflex) operando 100%.",
            custo: 0.00,
            responsavel: "Cb. Oliveira (Garagem)",
            kmRegistrado: 31000
          },
          {
            id: "h3",
            data: "2026-02-15T09:00:00Z",
            tipo: "Manutenção",
            titulo: "Substituição do Jogo de Pneus Dianteiros",
            descricao: "Troca dos 2 pneus dianteiros desgastados por uso em patrulhamento ostensivo. Realizado alinhamento de direção e balanceamento de rodas no autocenter credenciado.",
            custo: 2450.00,
            responsavel: "Sgt. Silva (P4)",
            kmRegistrado: 27500
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);

  const handleSalvarEvento = (dadosForm) => {
    const custoNum = parseFloat(dadosForm.custo) || 0;
    const kmNum = parseInt(dadosForm.novoKm) || viatura?.kmAtual || 0;

    const eventoAdicionado = {
      id: Date.now().toString(),
      data: new Date().toISOString(),
      tipo: dadosForm.tipo,
      titulo: dadosForm.titulo,
      descricao: dadosForm.descricao,
      custo: custoNum,
      responsavel: dadosForm.responsavel || "Operador P4",
      kmRegistrado: kmNum
    };

    setHistorico((prev) => [eventoAdicionado, ...prev]);

    setViatura((prev) => ({
      ...prev,
      kmAtual: Math.max(prev?.kmAtual || 0, kmNum),
      custoTotalManutencao: (prev?.custoTotalManutencao || 0) + custoNum
    }));

    setModalNovoAberto(false);
  };

  if (loading) {
    return <LoadingScreen mensagem="Carregando prontuário da viatura..." />;
  }

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        {/* Header com alinhamento e cores corrigidas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/viaturas">
              <HeaderIconButton>
                <ArrowLeft size={18} />
              </HeaderIconButton>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <Car size={20} className="text-blue-400" />
                Prontuário da Viatura: <span className="text-blue-400 font-mono">{viatura?.prefixo}</span>
              </h1>
              <p className="text-xs text-slate-400">
                Histórico de vida útil e despesas técnicas de manutenção.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HeaderActionButton 
              variant="secondary"
              onClick={() => gerarPDFProntuario(viatura, historico)}
            >
              <FileText size={16} />
              Baixar PDF
            </HeaderActionButton>

            <HeaderActionButton 
              variant="primary"
              onClick={() => setModalNovoAberto(true)}
            >
              <Plus size={16} />
              Lançar Novo Evento
            </HeaderActionButton>
          </div>
        </div>

        {/* Área de Rolar Interna */}
        <ContentScrollArea>
          <CardsGrid>
            {/* Card 1: Identificação Operacional */}
            <DashboardCard>
              <div className="flex flex-col h-full justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Identificação Operacional
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    {viatura?.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">{viatura?.prefixo}</h3>
                  <p className="text-xs text-slate-400 font-mono">Placa: {viatura?.placa}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  <span>{viatura?.modelo}</span>
                  <span className="font-mono text-slate-500">Ano {viatura?.ano}</span>
                </div>
              </div>
            </DashboardCard>

            {/* Card 2: Lotação e Uso */}
            <DashboardCard>
              <div className="flex flex-col h-full justify-between gap-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Lotação e Uso
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Building2 size={15} className="text-blue-400" />
                    <span className="font-semibold">{viatura?.subunidade}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Gauge size={15} className="text-blue-400" />
                    <span className="font-mono font-bold text-white">
                      {viatura?.kmAtual?.toLocaleString("pt-BR")}
                    </span> 
                    <span className="text-xs text-slate-400">km rodados</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                  Última atualização registrada via P4
                </p>
              </div>
            </DashboardCard>

            {/* Card 3: Custos */}
            <DashboardCard>
              <div className="flex flex-col h-full justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Total Investido / Manutenção
                  </span>
                  <DollarSign size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-emerald-400 font-mono">
                    {formatarMoeda(viatura?.custoTotalManutencao)}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Custo total acumulado em revisões e peças.
                  </p>
                </div>
                <span className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                  Média calculada sobre o histórico registrado
                </span>
              </div>
            </DashboardCard>
          </CardsGrid>

          {/* Linha do Tempo Cronológica */}
          <TimelineHistorico 
            historico={historico} 
            onSelectEvento={(evento) => setEventoSelecionado(evento)} 
          />
        </ContentScrollArea>

        {/* Modais Isolados */}
        <ModalNovoEvento 
          isOpen={modalNovoAberto}
          onClose={() => setModalNovoAberto(false)}
          onSave={handleSalvarEvento}
          kmAtualViatura={viatura?.kmAtual}
        />

        <ModalDetalhesEvento 
          evento={eventoSelecionado}
          onClose={() => setEventoSelecionado(null)}
        />
      </MainContent>
    </DashboardWrapper>
  );
}