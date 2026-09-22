"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/page";
import { 
  Car, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Gauge, 
  Plus, 
  ArrowUpRight, 
  ChevronRight,
  ShieldCheck,
  Clock,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPrincipalPage() {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [metricas, setMetricas] = useState({
    totalViaturas: 0,
    prontas: 0,
    manutencao: 0,
    inoperantes: 0,
    custoMesAtual: 0,
    variacaoCustoMes: 0,
    kmTotalRodadoMes: 0,
    revisoesPendentes: 0
  });

  const [ultimasManutencoes, setUltimasManutencoes] = useState([]);
  const [alertasRevisao, setAlertasRevisao] = useState([]);

  useEffect(() => {
    async function carregarDadosDashboard() {
      try {
        setLoading(true);
        setErro(false);
        
        // Busca os dados diretamente da API do banco de dados (sem cache estático)
        const res = await fetch("/api/dashboard/stats", { cache: "no-store" });
        if (!res.ok) throw new Error("Erro ao conectar com a API do banco de dados.");
        
        const data = await res.json();

        // Mapeamento seguro dos indicadores vindos do banco de dados
        if (data.metricas) {
          setMetricas({
            totalViaturas: Number(data.metricas.totalViaturas || 0),
            prontas: Number(data.metricas.prontas || 0),
            manutencao: Number(data.metricas.manutencao || 0),
            inoperantes: Number(data.metricas.inoperantes || 0),
            custoMesAtual: Number(data.metricas.custoMesAtual || 0),
            variacaoCustoMes: Number(data.metricas.variacaoCustoMes || 0),
            kmTotalRodadoMes: Number(data.metricas.kmTotalRodadoMes || 0),
            revisoesPendentes: Number(data.metricas.revisoesPendentes || 0)
          });
        }

        if (Array.isArray(data.ultimasManutencoes)) {
          setUltimasManutencoes(data.ultimasManutencoes);
        } else {
          setUltimasManutencoes([]);
        }

        if (Array.isArray(data.alertasRevisao)) {
          setAlertasRevisao(data.alertasRevisao);
        } else {
          setAlertasRevisao([]);
        }
      } catch (err) {
        console.error("Falha ao carregar dados reais do dashboard:", err);
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosDashboard();
  }, []);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor || 0);
  };

  const taxaOperacional = metricas.totalViaturas > 0 
    ? Math.round((metricas.prontas / metricas.totalViaturas) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 font-medium gap-3">
        <Loader2 size={32} className="animate-spin text-blue-500" />
        <span>Consultando banco de dados da frota...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Sidebar */}
      <div className="w-full lg:w-80 h-auto lg:h-full shrink-0">
        <Sidebar />
      </div>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 min-w-0">
        
        {/* Cabeçalho Responsivo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <ShieldCheck className="text-blue-500 shrink-0" size={24} />
              <span>Painel de Controle de Frota</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              17º Batalhão de Polícia Militar — Gestão da Frota.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <Link href="/dashboard/viaturas/nova" className="w-full sm:w-auto block">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20 cursor-pointer">
                <Plus size={16} />
                <span>Nova Viatura</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Alerta Visual em Caso de Erro de Conexão com o Banco */}
        {erro && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-rose-400 text-xs sm:text-sm flex items-center gap-3">
            <AlertTriangle className="shrink-0" size={18} />
            <span>Não foi possível conectar ao banco de dados real. Verifique a API `/api/dashboard/stats`.</span>
          </div>
        )}

        {/* CARDS SUPERIORES - MÉTRICAS PRINCIPAIS DO BANCO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Taxa Operacional */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Taxa Operacional
              </span>
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                <Car size={18} />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">{taxaOperacional}%</span>
                <span className="text-xs text-emerald-400 font-semibold truncate">{metricas.prontas} de {metricas.totalViaturas} prontas</span>
              </div>
              
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${taxaOperacional}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Viaturas Fora de Operação */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Fora de Operação
              </span>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                <Wrench size={18} />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {metricas.manutencao + metricas.inoperantes}
                </span>
                <span className="text-xs text-slate-400">veículos baixados</span>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {metricas.manutencao} manutenção
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  {metricas.inoperantes} inoperantes
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Investimento no Mês */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Investimento / Débitos
              </span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                <DollarSign size={18} />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {formatarMoeda(metricas.custoMesAtual)}
              </div>

              <div className="flex items-center gap-1.5 mt-2 text-xs">
                {metricas.variacaoCustoMes <= 0 ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <TrendingDown size={14} />
                    {Math.abs(metricas.variacaoCustoMes)}%
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-0.5">
                    <TrendingUp size={14} />
                    +{metricas.variacaoCustoMes}%
                  </span>
                )}
                <span className="text-slate-500 truncate">vs. mês anterior</span>
              </div>
            </div>
          </div>

          {/* Card 4: Quilometragem Mês */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quilometragem Total
              </span>
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                <Gauge size={18} />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {metricas.kmTotalRodadoMes.toLocaleString("pt-BR")} <span className="text-xs text-slate-400 font-normal">km</span>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                <span>Revisões Pendentes:</span>
                <span className="font-bold text-amber-400 font-mono">{metricas.revisoesPendentes} viaturas</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEÇÃO INTERMEDIÁRIA: REVISÕES E MANUTENÇÕES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">

          {/* Coluna 1: Alertas de Revisão Preventiva */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                  <span>Próximas Revisões (KM)</span>
                </h2>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-bold shrink-0">
                  Atenção
                </span>
              </div>

              <div className="space-y-3">
                {alertasRevisao.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">Nenhum alerta de revisão cadastrado no banco.</p>
                ) : (
                  alertasRevisao.map((alerta) => {
                    const kmFaltantes = (alerta.kmProximaRevisao || 0) - (alerta.kmAtual || 0);
                    return (
                      <div key={alerta.id || alerta.prefixo} className="bg-slate-950/40 border border-slate-800/80 rounded-lg p-3 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          
                          {/* Badge Tático de Prefixo */}
                          <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-0.5 rounded-md">
                            <Car size={13} className="text-blue-400 shrink-0" />
                            <span className="font-mono font-extrabold text-white text-xs tracking-wider">
                              {alerta.prefixo || "S/ PREF"}
                            </span>
                          </div>

                          <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                            alerta.urgencia === "critica" || kmFaltantes <= 500
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            Faltam {kmFaltantes.toLocaleString("pt-BR")} km
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-medium truncate pt-0.5">{alerta.modelo || "Modelo não informado"}</p>
                        <p className="text-[11px] text-slate-500 truncate">{alerta.subunidade || "Sem lotação"}</p>

                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                          <span>Atual: <strong>{(alerta.kmAtual || 0).toLocaleString("pt-BR")} km</strong></span>
                          <span>Revisão: <strong>{(alerta.kmProximaRevisao || 0).toLocaleString("pt-BR")} km</strong></span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <Link href="/dashboard/viaturas" className="block pt-2">
              <button className="w-full text-center text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-1 py-1.5 transition-colors cursor-pointer">
                <span>Ver todas na frota</span>
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>

          {/* Coluna 2: Lista de Viaturas / Manutenções Recentes */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Clock size={15} className="text-blue-400 shrink-0" />
                  <span>Cadastros e Registros Recentes</span>
                </h2>
                
                <Link href="/dashboard/viaturas" className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors">
                  <span>Gerenciar Frota</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="space-y-2.5">
                {ultimasManutencoes.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">Nenhum registro recente encontrado no banco de dados.</p>
                ) : (
                  ultimasManutencoes.map((os) => (
                    <div 
                      key={os.id} 
                      className="bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                    >
                      {/* Prefixo, Oficina/Subunidade e Descrição */}
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        
                        {/* Badge Tático de Prefixo */}
                        <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded shrink-0 mt-0.5 sm:mt-0">
                          <Car size={13} className="text-blue-400 shrink-0" />
                          <span className="font-mono font-extrabold text-white text-xs tracking-wider">
                            {os.prefixo || "S/ PREF"}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-slate-200 text-xs sm:text-sm truncate">
                              {os.oficina || "Não informada"}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                              os.tipo === "Preventiva"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}>
                              {os.tipo || "Geral"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{os.descricao || "Sem detalhes"}</p>
                        </div>
                      </div>

                      {/* Valor e Status */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/50 shrink-0">
                        <span className="font-mono font-bold text-emerald-400 text-xs sm:text-sm tracking-tight">
                          {formatarMoeda(os.valor)}
                        </span>

                        <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded ${
                          os.status === "Concluída" || os.status === "Concluida"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {os.status === "Concluída" || os.status === "Concluida" ? <CheckCircle2 size={12} /> : <Wrench size={12} />}
                          <span>{os.status || "Ativo"}</span>
                        </span>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-3 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
              <span>Integrado diretamente ao PostgreSQL / Prisma.</span>
              <Link href="/dashboard/viaturas" className="text-blue-400 hover:underline font-medium">
                Acessar cadastro de frota →
              </Link>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}