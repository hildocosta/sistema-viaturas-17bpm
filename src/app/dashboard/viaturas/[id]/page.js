"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar/page";
import TimelineHistorico from "@/components/modal/TimelineHistorico";
import ModalNovoEvento from "@/components/modal/ModalNovoEvento";
import ModalDetalhesEvento from "@/components/modal/ModalDetalhesEvento";
import StatusBadge from "@/components/ui/StatusBadge";
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
  FileText,
  Radio,
  Info,
  MapPin,
  Clock,
  LayoutGrid
} from "lucide-react";

import { formatarMoeda, gerarPDFProntuario } from "@/app/utils/pdfGenerator";

export default function ProntuarioViaturaPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [viatura, setViatura] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("geral");

  useEffect(() => {
    async function carregarViatura() {
      try {
        setLoading(true);
        setErro(null);

        const res = await fetch(`/api/viaturas/${id}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Erro ao carregar dados da viatura.");
        }
        
        const data = await res.json();
        setViatura(data.viatura);
        setHistorico(data.historico || []);
      } catch (err) {
        console.error("Erro ao carregar prontuário:", err);
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarViatura();
  }, [id]);

  const formatarData = (dataIso) => {
    if (!dataIso) return "N/A";
    return new Date(dataIso).toLocaleDateString("pt-BR");
  };

  const calcularCustoTotal = () => {
    return historico.reduce((acc, item) => acc + (Number(item.custo) || 0), 0);
  };

  const handleSalvarEvento = (dadosForm) => {
    const custoNum = parseFloat(dadosForm.custo) || 0;
    const kmNum = parseInt(dadosForm.novoKm) || viatura?.km || 0;

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
      km: Math.max(prev?.km || 0, kmNum)
    }));
    setModalNovoAberto(false);
  };

  if (loading) return <LoadingScreen mensagem="Carregando prontuário completo..." />;

  if (erro || !viatura) {
    return (
      <DashboardWrapper>
        <SidebarArea><Sidebar /></SidebarArea>
        <MainContent>
          <div className="p-8 text-center space-y-4">
            <p className="text-rose-400 font-semibold">{erro || "Viatura não encontrada."}</p>
            <Link href="/dashboard/viaturas" className="text-xs text-blue-400 underline">
              Voltar para a lista de viaturas
            </Link>
          </div>
        </MainContent>
      </DashboardWrapper>
    );
  }

  const abas = [
    { id: "geral", label: "Visão Geral", icon: LayoutGrid },
    { id: "tecnica", label: "Especificações", icon: Car },
    { id: "lotacao", label: "Lotação & Emprego", icon: MapPin },
    { id: "financeiro", label: "Comunicação & Custos", icon: Radio },
    { id: "historico", label: "Histórico / Linha do Tempo", icon: Clock },
  ];

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        {/* Header */}
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
                Prontuário: <span className="text-blue-400 font-mono">{viatura.prefixo}</span>
              </h1>
              <p className="text-xs text-slate-400">
                Histórico de vida útil e cadastro geral do veículo.
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
              Lançar Evento
            </HeaderActionButton>
          </div>
        </div>

        {/* NAVEGAÇÃO POR ABAS */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {abas.map((aba) => {
            const Icon = aba.icon;
            const isSelected = abaAtiva === aba.id;
            return (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon size={14} />
                {aba.label}
              </button>
            );
          })}
        </div>

        {/* CONTEÚDO SCROLLÁVEL BASEADO NA ABA */}
        <ContentScrollArea className="container-sombrio space-y-6 w-full">

          {/* ABA 1: VISÃO GERAL */}
          {abaAtiva === "geral" && (
            <div className="space-y-6 w-full">
              <CardsGrid>
                <DashboardCard>
                  <div className="flex flex-col h-full justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Identificação
                      </span>
                      <StatusBadge status={viatura.status} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-mono">{viatura.prefixo}</h3>
                      <p className="text-xs text-slate-400 font-mono">Placa: {viatura.placa || "N/A"}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <span className="font-semibold text-slate-200">{viatura.marca} {viatura.modelo}</span>
                      <span className="font-mono text-slate-400">Ano: {viatura.anoModelo || viatura.anoFabricacao || "N/A"}</span>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard>
                  <div className="flex flex-col h-full justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Lotação & Odômetro
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-slate-200">
                        <Building2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                        <span className="font-semibold leading-snug break-words">
                          {viatura.subunidade || "Não atribuída"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-200">
                        <Gauge size={15} className="text-blue-400 shrink-0" />
                        <span className="font-mono font-bold text-white">
                          {viatura.km !== null ? viatura.km.toLocaleString("pt-BR") : 0}
                        </span> 
                        <span className="text-xs text-slate-400">km rodados</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                      Atualizado em: {formatarData(viatura.dataKm)}
                    </p>
                  </div>
                </DashboardCard>

                <DashboardCard>
                  <div className="flex flex-col h-full justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Total Manutenções
                      </span>
                      <DollarSign size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-emerald-400 font-mono">
                        {formatarMoeda(calcularCustoTotal())}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Soma de ordens de serviço.
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                      Conservação: <strong className="text-slate-300">{viatura.estadoConservacao || "N/A"}</strong>
                    </span>
                  </div>
                </DashboardCard>
              </CardsGrid>

              {viatura.observacao && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-2 w-full">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Info size={15} /> Observações Registradas
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded border border-slate-800/50 font-mono">
                    {viatura.observacao}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ABA 2: ESPECIFICAÇÕES TÉCNICAS */}
          {abaAtiva === "tecnica" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4 w-full">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <Car size={16} /> Ficha Técnica do Veículo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Marca</span>
                  <span className="text-slate-100 font-medium">{viatura.marca || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Modelo</span>
                  <span className="text-slate-100 font-medium">{viatura.modelo || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Ano Fabricação</span>
                  <span className="text-slate-100 font-mono">{viatura.anoFabricacao || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Ano Modelo</span>
                  <span className="text-slate-100 font-mono">{viatura.anoModelo || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Cor</span>
                  <span className="text-slate-100">{viatura.cor || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Combustível</span>
                  <span className="text-slate-100">{viatura.combustivel || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Blindagem</span>
                  <span className="text-slate-100">{viatura.blindagem || "Não"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Espécie</span>
                  <span className="text-slate-100">{viatura.especie || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Tipo de Frota</span>
                  <span className="text-slate-100">{viatura.tipoFrota || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Chassi</span>
                  <span className="text-slate-100 font-mono">{viatura.chassi || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1 sm:col-span-2 lg:col-span-2">
                  <span className="text-slate-400 block text-[11px]">RENAVAM</span>
                  <span className="text-slate-100 font-mono">{viatura.renavam || "N/A"}</span>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: LOTAÇÃO E APLICAÇÃO */}
          {abaAtiva === "lotacao" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4 w-full">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <MapPin size={16} /> Lotação, Emprego e Patrimônio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Subunidade</span>
                  <span className="text-slate-100 font-medium">{viatura.subunidade || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Município</span>
                  <span className="text-slate-100">{viatura.municipio || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Atividade Predominante</span>
                  <span className="text-slate-100">{viatura.atividadePredominante || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Emprego Exclusivo</span>
                  <span className="text-slate-100">{viatura.empregoExclusivo || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Critério Frota GPM</span>
                  <span className="text-slate-100">{viatura.frotaCriterioGpm || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Patrimônio</span>
                  <span className="text-slate-100 font-mono">{viatura.patrimonio || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Propriedade</span>
                  <span className="text-slate-100">{viatura.propriedade || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">CNPJ</span>
                  <span className="text-slate-100 font-mono">{viatura.cnpj || "N/A"}</span>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: COMUNICAÇÃO & FINANCEIRO */}
          {abaAtiva === "financeiro" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4 w-full">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <Radio size={16} /> Radiocomunicação, Indicadores & Documentos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Plaqueta do Rádio</span>
                  <span className="text-slate-100 font-mono">{viatura.plaquetaRadio || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Serial do Rádio</span>
                  <span className="text-slate-100 font-mono">{viatura.serialRadio || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Rastreamento AVL</span>
                  <span className="text-slate-100">{viatura.avl || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Valor FIPE</span>
                  <span className="text-emerald-400 font-mono font-semibold">
                    {viatura.fipe ? formatarMoeda(Number(viatura.fipe)) : "N/A"}
                  </span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Débitos Lançados</span>
                  <span className="text-rose-400 font-mono font-semibold">
                    {viatura.debitos ? formatarMoeda(Number(viatura.debitos)) : "R$ 0,00"}
                  </span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1">
                  <span className="text-slate-400 block text-[11px]">ID Planilha</span>
                  <span className="text-slate-100 font-mono">{viatura.idViaturaPlanilha || "N/A"}</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800/50 space-y-1 sm:col-span-2 lg:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Pasta Digital</span>
                  {viatura.pastaDigital ? (
                    <a href={viatura.pastaDigital} target="_blank" rel="noreferrer" className="text-blue-400 underline font-medium">
                      Acessar Documentação Digital
                    </a>
                  ) : (
                    <span className="text-slate-100">N/A</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ABA 5: HISTÓRICO */}
          {abaAtiva === "historico" && (
            <div className="w-full">
              <TimelineHistorico 
                historico={historico} 
                onSelectEvento={(evento) => setEventoSelecionado(evento)} 
              />
            </div>
          )}

        </ContentScrollArea>

        {/* Modais */}
        <ModalNovoEvento 
          isOpen={modalNovoAberto}
          onClose={() => setModalNovoAberto(false)}
          onSave={handleSalvarEvento}
          kmAtualViatura={viatura.km || 0}
        />

        <ModalDetalhesEvento 
          evento={eventoSelecionado}
          onClose={() => setEventoSelecionado(null)}
        />
      </MainContent>
    </DashboardWrapper>
  );
}