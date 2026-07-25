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
        const res = await fetch("/api/dashboard/stats");
        if (!res.ok) throw new Error("Offline");
        const data = await res.json();
        setMetricas(data.metricas);
        setUltimasManutencoes(data.ultimasManutencoes);
        setAlertasRevisao(data.alertasRevisao);
      } catch (err) {
        // Dados Mockados de Contingência
        setMetricas({
          totalViaturas: 48,
          prontas: 38,
          manutencao: 7,
          inoperantes: 3,
          custoMesAtual: 42850.00,
          variacaoCustoMes: -5.4,
          kmTotalRodadoMes: 124500,
          revisoesPendentes: 5
        });

        setUltimasManutencoes([
          {
            id: "os-1042",
            prefixo: "L0204",
            oficina: "Auto Center Pinheirinho",
            tipo: "Corretiva",
            descricao: "Troca do Kit de Embreagem e Amortecedores",
            valor: 3450.00,
            data: "24/07/2026",
            status: "Em Execução"
          },
          {
            id: "os-1041",
            prefixo: "L0117",
            oficina: "Mecânica Pires",
            tipo: "Preventiva",
            descricao: "Troca de óleo, filtros e alinhamento",
            valor: 820.00,
            data: "22/07/2026",
            status: "Concluída"
          },
          {
            id: "os-1040",
            prefixo: "L0309",
            oficina: "EletroAuto SJP",
            tipo: "Corretiva",
            descricao: "Reparo no alternador e sistema elétrico",
            valor: 1900.00,
            data: "20/07/2026",
            status: "Concluída"
          },
          {
            id: "os-1039",
            prefixo: "L0102",
            oficina: "DPR Freios e Suspensão",
            tipo: "Preventiva",
            descricao: "Substituição de pastilhas e discos de freio",
            valor: 1150.00,
            data: "18/07/2026",
            status: "Concluída"
          }
        ]);

        setAlertasRevisao([
          {
            id: "1",
            prefixo: "L0117",
            modelo: "Toyota Hilux SW4",
            subunidade: "ROTAM / 17º BPM",
            kmAtual: 34200,
            kmProximaRevisao: 35000,
            urgencia: "alta"
          },
          {
            id: "3",
            prefixo: "L0102",
            modelo: "Chevrolet S10 4x4",
            subunidade: "RPA / Araucária",
            kmAtual: 44800,
            kmProximaRevisao: 45000,
            urgencia: "critica"
          },
          {
            id: "5",
            prefixo: "L0512",
            modelo: "Renault Duster",
            subunidade: "2ª Cia / 17º BPM",
            kmAtual: 59100,
            kmProximaRevisao: 60000,
            urgencia: "media"
          }
        ]);
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

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden p-4 gap-4 antialiased">
      {/* Sidebar Lateral */}
      <div className="w-80 h-full shrink-0">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-y-auto container-sombrio">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="text-blue-500" size={24} />
              Painel de Controle de Frota
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Visão consolidada da operacionalidade, custos operacionais e revisões de viaturas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/viaturas/nova">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/20">
                <Plus size={16} />
                Nova Viatura
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center text-slate-400 gap-2">
            <Loader2 className="animate-spin text-blue-500" size={20} />
            <span className="text-xs">Carregando dados consolidados...</span>
          </div>
        ) : (
          <div className="space-y-6">

            {/* CARDS SUPERIORES - MÉTRICAS PRINCIPAIS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Taxa Operacional */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">Taxa Operacional</span>
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <Car size={18} />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-white">{taxaOperacional}%</span>
                    <span className="text-xs text-emerald-400 font-semibold">{metricas.prontas} de {metricas.totalViaturas} prontas</span>
                  </div>
                  
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${taxaOperacional}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Viaturas Fora de Operação */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">Fora de Operação</span>
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                    <Wrench size={18} />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-white">
                      {metricas.manutencao + metricas.inoperantes}
                    </span>
                    <span className="text-xs text-slate-400">veículos baixados</span>
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-[11px]">
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {metricas.manutencao} manutenção
                    </span>
                    <span className="flex items-center gap-1 text-rose-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      {metricas.inoperantes} inoperantes
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Investimento no Mês */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">Investimento no Mês</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                    <DollarSign size={18} />
                  </div>
                </div>

                <div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {formatarMoeda(metricas.custoMesAtual)}
                  </div>

                  <div className="flex items-center gap-1.5 mt-2 text-[11px]">
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
                    <span className="text-slate-500">em relação ao mês anterior</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Quilometragem Mês */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">Quilometragem Mês</span>
                  <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                    <Gauge size={18} />
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {metricas.kmTotalRodadoMes.toLocaleString("pt-BR")} <span className="text-xs text-slate-400 font-normal">km</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
                    <span>Revisões Pendentes:</span>
                    <span className="font-bold text-amber-400 font-mono">{metricas.revisoesPendentes} viaturas</span>
                  </div>
                </div>
              </div>

            </div>

            {/* SEÇÃO INTERMEDIÁRIA: REVISÕES E MANUTENÇÕES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Coluna 1: Alertas de Revisão Preventiva */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={16} className="text-amber-400" />
                      Próximas Revisões (KM)
                    </h2>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-bold">
                      Atenção
                    </span>
                  </div>

                  <div className="space-y-3">
                    {alertasRevisao.map((alerta) => {
                      const kmFaltantes = alerta.kmProximaRevisao - alerta.kmAtual;
                      return (
                        <div key={alerta.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono font-bold text-white text-xs">{alerta.prefixo}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              alerta.urgencia === "critica" 
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              Faltam {kmFaltantes.toLocaleString("pt-BR")} km
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-300 font-medium truncate">{alerta.modelo}</p>
                          <p className="text-[10px] text-slate-500">{alerta.subunidade}</p>

                          <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                            <span>Atual: <strong>{alerta.kmAtual.toLocaleString("pt-BR")} km</strong></span>
                            <span>Revisão: <strong>{alerta.kmProximaRevisao.toLocaleString("pt-BR")} km</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Link href="/dashboard/viaturas" className="mt-4 block">
                  <button className="w-full text-center text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-1 py-1 transition-colors cursor-pointer">
                    Ver todas na frota
                    <ChevronRight size={14} />
                  </button>
                </Link>
              </div>

              {/* Coluna 2: Lista de Manutenções Recentes (Grid 12 colunas perfeitamente distribuído) */}
              <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Clock size={16} className="text-blue-400" />
                      Manutenções e O.S. Recentes
                    </h2>
                    
                    <Link href="/dashboard/manutencoes" className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors">
                      Gerenciar O.S.
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  {/* Lista de Linhas Customizadas */}
                  <div className="space-y-2.5">
                    {ultimasManutencoes.map((os) => (
                      <div 
                        key={os.id} 
                        className="bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl p-3 grid grid-cols-12 items-center gap-3 transition-all"
                      >
                        {/* 1. Detalhes (6/12 colunas) - Prefixo + Oficina + Descrição */}
                        <div className="col-span-12 sm:col-span-6 flex items-center gap-3 min-w-0">
                          <span className="font-mono font-bold text-white text-xs bg-slate-950 px-2 py-1.5 rounded-lg border border-slate-800 shrink-0">
                            {os.prefixo}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-200 text-xs truncate">{os.oficina}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                os.tipo === "Preventiva"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              }`}>
                                {os.tipo}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{os.descricao}</p>
                          </div>
                        </div>

                        {/* 2. Valor Centralizado (3/12 colunas) */}
                        <div className="col-span-6 sm:col-span-3 text-left sm:text-center">
                          <span className="font-mono font-bold text-emerald-400 text-xs tracking-tight">
                            {formatarMoeda(os.valor)}
                          </span>
                        </div>

                        {/* 3. Status Alinhado à Direita (3/12 colunas) */}
                        <div className="col-span-6 sm:col-span-3 flex justify-end">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg w-full sm:w-auto justify-center ${
                            os.status === "Concluída"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {os.status === "Concluída" ? <CheckCircle2 size={12} /> : <Wrench size={12} />}
                            {os.status}
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-3 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span>Atualizado via integração de oficinas credenciadas.</span>
                  <Link href="/dashboard/viaturas" className="text-blue-400 hover:underline font-medium">
                    Acessar cadastro de frota →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}