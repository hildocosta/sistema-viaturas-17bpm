"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/page";
import { 
  Building2, 
  Car, 
  CheckCircle2, 
  Wrench, 
  XCircle, 
  ChevronRight, 
  X,
  Search,
  ShieldCheck,
  Radio,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

export default function DashboardCompanhiasPage() {
  const [companhiaSelecionada, setCompanhiaSelecionada] = useState(null);
  const [filtroTextoModal, setFiltroTextoModal] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("TODAS");

  // Dados das unidades com inventário completo
  const companhiasData = [
    {
      id: "sede",
      grupo: "SEDE",
      nome: "Sede - 17º BPM",
      sigla: "SEDE",
      cidade: "São José dos Pinhais - PR",
      comandante: "Ten. Col. Souza",
      viaturas: [
        { prefixo: "L0001", placa: "KLM3P45", modelo: "Toyota SW4", tipo: "Administrativo", status: "Operacional", km: "18.900" },
        { prefixo: "L0002", placa: "NOP4Q56", modelo: "Nissan Kicks", tipo: "P2", status: "Operacional", km: "50.100" },
      ]
    },
    {
      id: "rotam",
      grupo: "SEDE",
      nome: "ROTAM - Tático Móvel",
      sigla: "ROTAM",
      cidade: "Sede / Área do Batalhão",
      comandante: "Cap. Rocha",
      viaturas: [
        { prefixo: "R0101", placa: "DEF2E34", modelo: "Chevrolet S10", tipo: "ROTAM", status: "Operacional", km: "42.100" },
        { prefixo: "R0102", placa: "YZA9L01", modelo: "Toyota Hilux", tipo: "ROTAM", status: "Operacional", km: "15.400" },
        { prefixo: "R0103", placa: "PQR6I78", modelo: "Chevrolet S10", tipo: "ROTAM", status: "Manutenção", km: "68.000" },
      ]
    },
    {
      id: "pptran",
      grupo: "SEDE",
      nome: "PPTran - Pelotão de Trânsito",
      sigla: "PPTRAN",
      cidade: "Sede / Área do Batalhão",
      comandante: "Ten. Faria",
      viaturas: [
        { prefixo: "T0301", placa: "GHI3F45", modelo: "Toyota Corolla", tipo: "Trânsito", status: "Operacional", km: "38.400" },
        { prefixo: "T0302", placa: "EFG1N23", modelo: "Fiat Cronos", tipo: "Trânsito", status: "Operacional", km: "22.200" },
      ]
    },
    {
      id: "rural",
      grupo: "SEDE",
      nome: "Patrulha Rural",
      sigla: "RURAL",
      cidade: "Zona Rural do Batalhão",
      comandante: "Ten. Martins",
      viaturas: [
        { prefixo: "PR01", placa: "JKL4G56", modelo: "Chevrolet S10 4x4", tipo: "Rural", status: "Operacional", km: "81.000" },
      ]
    },
    {
      id: "1cia",
      grupo: "1CIA",
      nome: "1ª Companhia - Araucária",
      sigla: "1ª CIA",
      cidade: "Araucária - PR",
      comandante: "Cap. Ribeiro",
      viaturas: [
        { prefixo: "L0123", placa: "ABC1D23", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "45.200" },
        { prefixo: "L0126", placa: "MNO5H67", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "31.000" },
      ]
    },
    {
      id: "1cia-tijucas",
      grupo: "1CIA",
      nome: "1ª Cia - Tijucas do Sul",
      sigla: "1ª CIA / TIJUCAS",
      cidade: "Tijucas do Sul - PR",
      comandante: "Ten. Alves",
      viaturas: [
        { prefixo: "L0140", placa: "TIJ1A23", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "52.800" },
      ]
    },
    {
      id: "1cia-cartorio",
      grupo: "1CIA",
      nome: "1ª Cia - Cartório / Adm",
      sigla: "1ª CIA / CARTÓRIO",
      cidade: "Araucária - PR",
      comandante: "Sgt. Castro",
      viaturas: [
        { prefixo: "L0100", placa: "CAR9B88", modelo: "Fiat Grand Siena", tipo: "Cartório", status: "Operacional", km: "94.100" },
      ]
    },
    {
      id: "2cia",
      grupo: "2CIA",
      nome: "2ª Companhia - Campo Largo",
      sigla: "2ª CIA",
      cidade: "Campo Largo - PR",
      comandante: "Cap. Mendes",
      viaturas: [
        { prefixo: "L0201", placa: "STU7J89", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "28.300" },
        { prefixo: "L0202", placa: "VWX8K90", modelo: "Renault Duster", tipo: "RPA", status: "Manutenção", km: "76.100" },
      ]
    },
    {
      id: "3cia",
      grupo: "3CIA",
      nome: "3ª Companhia - S.J. Pinhais",
      sigla: "3ª CIA",
      cidade: "São José dos Pinhais - PR",
      comandante: "Maj. Oliveira",
      viaturas: [
        { prefixo: "L0301", placa: "BCD0M12", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "41.800" },
      ]
    },
    {
      id: "3cia-balsanova",
      grupo: "3CIA",
      nome: "3ª Cia - Balsa Nova",
      sigla: "3ª CIA / BALSA NOVA",
      cidade: "Balsa Nova - PR",
      comandante: "Ten. Duarte",
      viaturas: [
        { prefixo: "L0350", placa: "BAL2C34", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "63.000" },
      ]
    },
    {
      id: "3cia-ferraria",
      grupo: "3CIA",
      nome: "3ª Cia - Destacamento Ferraria",
      sigla: "3ª CIA / FERRARIA",
      cidade: "Campo Largo (Ferraria) - PR",
      comandante: "Sgt. Lima",
      viaturas: [
        { prefixo: "L0360", placa: "FER5D67", modelo: "Renault Duster 4x4", tipo: "RPA", status: "Baixada", km: "118.000" },
      ]
    },
    {
      id: "4cia",
      grupo: "4CIA",
      nome: "4ª Companhia",
      sigla: "4ª CIA",
      cidade: "Fazenda Rio Grande - PR",
      comandante: "Cap. Barbosa",
      viaturas: [
        { prefixo: "L0401", placa: "HIJ2O34", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "35.200" },
      ]
    },
    {
      id: "4cia-mandirituba",
      grupo: "4CIA",
      nome: "4ª Cia - Mandirituba",
      sigla: "4ª CIA / MANDIRITUBA",
      cidade: "Mandirituba - PR",
      comandante: "Ten. Guimarães",
      viaturas: [
        { prefixo: "L0420", placa: "MAN8E90", modelo: "Renault Duster", tipo: "RPA", status: "Operacional", km: "49.000" },
      ]
    },
    {
      id: "4cia-agudos",
      grupo: "4CIA",
      nome: "4ª Cia - Agudos do Sul",
      sigla: "4ª CIA / AGUDOS DO SUL",
      cidade: "Agudos do Sul - PR",
      comandante: "Sgt. Nunes",
      viaturas: [
        { prefixo: "L0430", placa: "AGU3F12", modelo: "Chevrolet S10", tipo: "RPA", status: "Operacional", km: "71.500" },
      ]
    }
  ];

  // Filtro por grupo selecionado
  const companhiasFiltradas = companhiasData.filter(
    (cia) => filtroGrupo === "TODAS" || cia.grupo === filtroGrupo
  );

  // Cálculos consolidados para o Dashboard
  const todasViaturas = companhiasFiltradas.flatMap((c) => c.viaturas);
  const totalViaturas = todasViaturas.length;
  const operacionais = todasViaturas.filter((v) => v.status === "Operacional").length;
  const manutencao = todasViaturas.filter((v) => v.status === "Manutenção").length;
  const baixadas = todasViaturas.filter((v) => v.status === "Baixada").length;

  const pctOperacional = totalViaturas > 0 ? Math.round((operacionais / totalViaturas) * 100) : 0;
  const pctManutencao = totalViaturas > 0 ? Math.round((manutencao / totalViaturas) * 100) : 0;
  const pctBaixada = totalViaturas > 0 ? Math.round((baixadas / totalViaturas) * 100) : 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Operacional":
        return <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1"><CheckCircle2 size={12}/> Operacional</span>;
      case "Manutenção":
        return <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full flex items-center gap-1"><Wrench size={12}/> Manutenção</span>;
      case "Baixada":
        return <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full flex items-center gap-1"><XCircle size={12}/> Baixada</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans p-4 gap-4 antialiased">
      
      {/* Sidebar Global */}
      <div className="w-80 h-full shrink-0">
        <Sidebar />
      </div>

      {/* Conteúdo do Dashboard */}
      <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-y-auto container-sombrio relative">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          
          {/* Cabeçalho */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <BarChart3 className="text-blue-500" size={24} />
                Dashboard de Frota por Companhia
              </h1>
              <p className="text-xs text-slate-400">Indicadores consolidados e disponibilidade operacional das unidades do 17º BPM</p>
            </div>

            {/* Selector de Filtro de Grupo */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["TODAS", "SEDE", "1CIA", "2CIA", "3CIA", "4CIA"].map((g) => (
                <button
                  key={g}
                  onClick={() => setFiltroGrupo(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filtroGrupo === g
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* CARDS DE KPIS EXECUTIVOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500">Total de Viaturas</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{totalViaturas}</h3>
                <p className="text-[10px] text-slate-400 mt-1">Em {companhiasFiltradas.length} unidades</p>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Car size={22} />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500">Prontas p/ Emprego</p>
                <h3 className="text-2xl font-bold text-emerald-400 mt-1">{operacionais}</h3>
                <p className="text-[10px] text-emerald-500 font-semibold mt-1">{pctOperacional}% da frota pronta</p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500">Em Manutenção</p>
                <h3 className="text-2xl font-bold text-amber-400 mt-1">{manutencao}</h3>
                <p className="text-[10px] text-amber-500 font-semibold mt-1">{pctManutencao}% em oficina</p>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Wrench size={22} />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500">Indisponíveis / Baixadas</p>
                <h3 className="text-2xl font-bold text-rose-400 mt-1">{baixadas}</h3>
                <p className="text-[10px] text-rose-500 font-semibold mt-1">{pctBaixada}% fora de serviço</p>
              </div>
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <AlertTriangle size={22} />
              </div>
            </div>
          </div>

          {/* PAINEL DE DISPONIBILIDADE E BARRAS DE STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* CARD DE BARRA DE DISPONIBILIDADE GERAL */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 lg:col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-1">
                  <PieChart size={16} className="text-blue-500" />
                  Índice Operacional
                </h3>
                <p className="text-xs text-slate-400 mb-4">Saúde geral da frota no grupo selecionado</p>

                {/* Progress Bar Customizada */}
                <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800 mb-4">
                  <div style={{ width: `${pctOperacional}%` }} className="bg-emerald-500 h-full rounded-l-full transition-all duration-500" title={`Operacional: ${pctOperacional}%`} />
                  <div style={{ width: `${pctManutencao}%` }} className="bg-amber-500 h-full transition-all duration-500" title={`Manutenção: ${pctManutencao}%`} />
                  <div style={{ width: `${pctBaixada}%` }} className="bg-rose-500 h-full rounded-r-full transition-all duration-500" title={`Baixada: ${pctBaixada}%`} />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Operacional
                    </span>
                    <span className="font-bold">{operacionais} ({pctOperacional}%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Manutenção
                    </span>
                    <span className="font-bold">{manutencao} ({pctManutencao}%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Baixada
                    </span>
                    <span className="font-bold">{baixadas} ({pctBaixada}%)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Meta Operacional: 85%</span>
                <span className={pctOperacional >= 85 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {pctOperacional >= 85 ? "✓ Dentro da Meta" : "⚠ Atenção Necessária"}
                </span>
              </div>
            </div>

            {/* COMPARATIVO POR UNIDADE */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 lg:col-span-2">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-blue-500" />
                Comparativo por Unidade / Companhia
              </h3>
              <p className="text-xs text-slate-400 mb-4">Proporção de viaturas operacionais por localidade</p>

              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {companhiasFiltradas.map((c) => {
                  const totalCia = c.viaturas.length;
                  const opCia = c.viaturas.filter((v) => v.status === "Operacional").length;
                  const pct = totalCia > 0 ? Math.round((opCia / totalCia) * 100) : 0;

                  return (
                    <div 
                      key={c.id} 
                      onClick={() => setCompanhiaSelecionada(c)}
                      className="group cursor-pointer p-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                          {c.nome}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {opCia}/{totalCia} operacionais ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          style={{ width: `${pct}%` }} 
                          className={`h-full rounded-full transition-all duration-300 ${
                            pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500"
                          }`} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* TABELA DE UNIDADES E DETALHES */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-4">
              <Building2 size={16} className="text-blue-500" />
              Detalhamento de Unidades ({companhiasFiltradas.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase font-semibold">
                    <th className="py-2.5 px-3">Unidade / Cia</th>
                    <th className="py-2.5 px-3">Comandante / Resp.</th>
                    <th className="py-2.5 px-3 text-center">Total</th>
                    <th className="py-2.5 px-3 text-center">Operacionais</th>
                    <th className="py-2.5 px-3 text-center">Manutenção</th>
                    <th className="py-2.5 px-3 text-center">Baixadas</th>
                    <th className="py-2.5 px-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {companhiasFiltradas.map((cia) => {
                    const total = cia.viaturas.length;
                    const op = cia.viaturas.filter((v) => v.status === "Operacional").length;
                    const man = cia.viaturas.filter((v) => v.status === "Manutenção").length;
                    const baix = cia.viaturas.filter((v) => v.status === "Baixada").length;

                    return (
                      <tr 
                        key={cia.id}
                        onClick={() => setCompanhiaSelecionada(cia)}
                        className="hover:bg-slate-900/80 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-100">{cia.nome}</p>
                          <p className="text-[10px] text-slate-500">{cia.cidade}</p>
                        </td>
                        <td className="py-3 px-3 text-slate-400">{cia.comandante}</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-200">{total}</td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-400">{op}</td>
                        <td className="py-3 px-3 text-center font-bold text-amber-400">{man}</td>
                        <td className="py-3 px-3 text-center font-bold text-rose-400">{baix}</td>
                        <td className="py-3 px-3 text-right">
                          <button className="px-2.5 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all text-[11px] font-semibold">
                            Ver Viaturas
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* MODAL COM A LISTA COMPLETA DE VEÍCULOS AO CLICAR EM UMA CIA */}
        {companhiaSelecionada && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
              
              <div>
                {/* Header do Modal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-100">{companhiaSelecionada.nome}</h2>
                      <p className="text-xs text-slate-400">{companhiaSelecionada.cidade} — Responsável: {companhiaSelecionada.comandante}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCompanhiaSelecionada(null)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Busca Modal */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar por prefixo, placa ou modelo nesta unidade..."
                    value={filtroTextoModal}
                    onChange={(e) => setFiltroTextoModal(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                  />
                </div>

                {/* Inventário */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                    <Car size={14} className="text-blue-500" />
                    Viaturas Alocadas ({companhiaSelecionada.viaturas.length})
                  </h3>

                  {companhiaSelecionada.viaturas
                    .filter(v => 
                      v.prefixo.toLowerCase().includes(filtroTextoModal.toLowerCase()) ||
                      v.placa.toLowerCase().includes(filtroTextoModal.toLowerCase()) ||
                      v.modelo.toLowerCase().includes(filtroTextoModal.toLowerCase())
                    )
                    .map((v, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-blue-400">
                            <Radio size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-100">{v.prefixo}</span>
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{v.placa}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{v.modelo} • <span className="text-slate-500">{v.tipo}</span></p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="mb-1">{getStatusBadge(v.status)}</div>
                          <p className="text-[10px] font-mono text-slate-500">{v.km} km</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Rodapé Modal */}
              <div className="pt-4 border-t border-slate-800 mt-6">
                <button
                  onClick={() => setCompanhiaSelecionada(null)}
                  className="w-full py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium text-xs rounded-xl transition-all cursor-pointer"
                >
                  Fechar Painel
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}