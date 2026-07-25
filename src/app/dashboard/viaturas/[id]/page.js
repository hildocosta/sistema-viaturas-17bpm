"use client";

import React, { useState, useEffect, use } from "react";
import Sidebar from "@/components/Sidebar/page";
import { 
  Car, 
  ArrowLeft, 
  Wrench, 
  Clock, 
  DollarSign, 
  Plus, 
  Gauge, 
  Building2, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar,
  X,
  User,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function ProntuarioViaturaPage({ params }) {
  // Desembrulhando params do Next.js App Router
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [viatura, setViatura] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado do Modal de Novo Evento
  const [modalAberto, setModalAberto] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    tipo: "Manutençao",
    titulo: "",
    descricao: "",
    custo: "",
    responsavel: "",
    novoKm: ""
  });

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
        // Mock de Contingência para o Viatura ID especificado
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
            tipo: "Manutençao",
            titulo: "Troca de Óleo e Filtro de Óleo",
            descricao: "Realizada manutenção preventiva dos 30.000km em oficina credenciada.",
            custo: 850.00,
            responsavel: "Sgt. Silva (P4)",
            kmRegistrado: 34200
          },
          {
            id: "h2",
            data: "2026-05-10T14:15:00Z",
            tipo: "Inspecao",
            titulo: "Inspeção Trimestral de Viatura",
            descricao: "Sem alterações na suspensão ou motor. Pneus em bom estado.",
            custo: 0.00,
            responsavel: "Cb. Oliveira (Garagem)",
            kmRegistrado: 31000
          },
          {
            id: "h3",
            data: "2026-02-15T09:00:00Z",
            tipo: "Manutençao",
            titulo: "Substituição do Jogo de Pneus Dianteiros",
            descricao: "Troca dos 2 pneus dianteiros desgastados por uso em patrulhamento ostensivo.",
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

  // Função para cadastrar novo evento na Linha do Tempo
  const handleSalvarEvento = (e) => {
    e.preventDefault();
    if (!novoEvento.titulo) return;

    const custoNum = parseFloat(novoEvento.custo) || 0;
    const kmNum = parseInt(novoEvento.novoKm) || viatura.kmAtual;

    const eventoAdicionado = {
      id: Date.now().toString(),
      data: new Date().toISOString(),
      tipo: novoEvento.tipo,
      titulo: novoEvento.titulo,
      descricao: novoEvento.descricao,
      custo: custoNum,
      responsavel: novoEvento.responsavel || "Operador P4",
      kmRegistrado: kmNum
    };

    // Atualiza estado local do histórico (colocando o mais recente no topo)
    setHistorico([eventoAdicionado, ...historico]);

    // Atualiza o custo acumulado e o KM da viatura
    setViatura((prev) => ({
      ...prev,
      kmAtual: Math.max(prev.kmAtual, kmNum),
      custoTotalManutencao: prev.custoTotalManutencao + custoNum
    }));

    // Limpa formulário e fecha o modal
    setNovoEvento({ tipo: "Manutençao", titulo: "", descricao: "", custo: "", responsavel: "", novoKm: "" });
    setModalAberto(false);
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor || 0);
  };

  const formatarData = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Manutençao": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "Inspecao": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Sinistro": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      default: return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen bg-slate-950 items-center justify-center text-slate-400">
        <Loader2 className="animate-spin text-blue-500 mr-2" size={24} />
        <span className="text-sm">Carregando prontuário da viatura...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden p-4 gap-4 antialiased">
      <div className="w-80 h-full shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-y-auto container-sombrio relative">
        
        {/* Topo / Voltar */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/viaturas">
              <button className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-xl transition-all cursor-pointer">
                <ArrowLeft size={18} />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Car className="text-blue-500" size={22} />
                Prontuário da Viatura: <span className="font-mono text-blue-400">{viatura?.prefixo}</span>
              </h1>
              <p className="text-xs text-slate-400">Histórico de vida útil e despesas técnicas de manutenção.</p>
            </div>
          </div>

          <button 
            onClick={() => setModalAberto(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <Plus size={16} />
            Lançar Novo Evento
          </button>
        </div>

        {/* Ficha Técnica e Resumo de Custos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
          
          {/* Card 1: Identificação */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Identificação Operacional</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${viatura?.status === 'Pronta' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {viatura?.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-white font-mono">{viatura?.prefixo}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Placa: {viatura?.placa}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between text-xs text-slate-400">
              <span>{viatura?.modelo}</span>
              <span>Ano {viatura?.ano}</span>
            </div>
          </div>

          {/* Card 2: Alocação e Quilometragem */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Lotação e Uso</span>
            <div className="space-y-2 my-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Building2 size={15} className="text-slate-500" />
                <span>{viatura?.subunidade}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <Gauge size={15} className="text-blue-500" />
                <span className="text-sm font-bold text-white">{viatura?.kmAtual.toLocaleString("pt-BR")}</span> km
              </div>
            </div>
            <p className="text-[11px] text-slate-500">Última atualização registrada via P4</p>
          </div>

          {/* Card 3: Custo Acumulado em Manutenções */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Investido / Manutenção</span>
              <DollarSign size={16} className="text-emerald-500" />
            </div>
            <div className="my-2">
              <p className="text-2xl font-bold text-emerald-400 font-mono">
                {formatarMoeda(viatura?.custoTotalManutencao)}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Custo total acumulado em revisões e peças.</p>
            </div>
            <span className="text-[10px] text-slate-500">Média calculada sobre o histórico registrado</span>
          </div>

        </div>

        {/* Linha do Tempo Cronológica (Vida Útil) */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 flex-1 overflow-hidden flex flex-col">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 shrink-0">
            <Clock size={16} className="text-blue-400" />
            Histórico Cronológico de Vida Útil
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 container-sombrio">
            {historico.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">Nenhum evento registrado até o momento.</p>
            ) : (
              historico.map((item, index) => (
                <div key={item.id} className="relative pl-6 pb-4 border-l border-slate-800 last:border-0 last:pb-0">
                  
                  {/* Marcador na linha */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 transition-all hover:border-slate-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getTipoColor(item.tipo)}`}>
                          {item.tipo}
                        </span>
                        <h3 className="text-sm font-bold text-slate-200">{item.titulo}</h3>
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <Calendar size={12} />
                        {formatarData(item.data)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3">{item.descricao}</p>

                    <div className="flex flex-wrap items-center justify-between border-t border-slate-800/60 pt-2.5 text-[11px] text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-slate-600" />
                          {item.responsavel}
                        </span>
                        {item.kmRegistrado && (
                          <span className="font-mono text-slate-400">
                            KM: {item.kmRegistrado.toLocaleString("pt-BR")}
                          </span>
                        )}
                      </div>
                      <div className="font-mono font-bold text-slate-300">
                        {item.custo > 0 ? (
                          <span className="text-amber-400">Custo: {formatarMoeda(item.custo)}</span>
                        ) : (
                          <span className="text-slate-500">Sem Custo</span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal de Cadastro de Evento Cronológico */}
        {modalAberto && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wrench size={18} className="text-blue-500" />
                  Registrar Evento Cronológico
                </h3>
                <button 
                  onClick={() => setModalAberto(false)}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSalvarEvento} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Tipo de Evento</label>
                  <select 
                    value={novoEvento.tipo}
                    onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Manutençao">Manutenção / Reparo</option>
                    <option value="Inspecao">Inspeção / Vistoria</option>
                    <option value="Alteracao">Passagem de Plantão / Alteração</option>
                    <option value="Sinistro">Sinistro / Avaria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Título do Evento *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Troca de pastilhas de freio"
                    value={novoEvento.titulo}
                    onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Valor/Custo (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="0,00"
                      value={novoEvento.custo}
                      onChange={(e) => setNovoEvento({ ...novoEvento, custo: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Novo KM Hodômetro</label>
                    <input 
                      type="number" 
                      placeholder={viatura?.kmAtual.toString()}
                      value={novoEvento.novoKm}
                      onChange={(e) => setNovoEvento({ ...novoEvento, novoKm: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Militar Responsável / P4</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Sgt. Silva"
                    value={novoEvento.responsavel}
                    onChange={(e) => setNovoEvento({ ...novoEvento, responsavel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Descrição Detalhada</label>
                  <textarea 
                    rows={3}
                    placeholder="Descreva o serviço realizado, peças trocadas ou observações importantes..."
                    value={novoEvento.descricao}
                    onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setModalAberto(false)}
                    className="px-4 py-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    Salvar Registro
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}