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
  MapPin,
  Filter
} from "lucide-react";

export default function DistribucionCompanhiasPage() {
  const [companhiaSelecionada, setCompanhiaSelecionada] = useState(null);
  const [filtroGrupo, setFiltroGrupo] = useState("TODAS");
  const [filtroTextoModal, setFiltroTextoModal] = useState("");
  const [buscaGeral, setBuscaGeral] = useState("");

  // Lista completa das unidades do Batalhão categorizadas por Grupo
  const companhiasData = [
    // Sede e Especializadas
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

    // 1ª Companhia
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

    // 2ª Companhia
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

    // 3ª Companhia
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

    // 4ª Companhia
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

  // Opções dos botões de filtro
  const opcoesFiltro = [
    { label: "Todas Unidades", value: "TODAS" },
    { label: "Sede & Especializadas", value: "SEDE" },
    { label: "1ª Cia", value: "1CIA" },
    { label: "2ª Cia", value: "2CIA" },
    { label: "3ª Cia", value: "3CIA" },
    { label: "4ª Cia", value: "4CIA" },
  ];

  // Lógica de filtragem combinada (Botão + Busca rápida)
  const companhiasFiltradas = companhiasData.filter((cia) => {
    const atendeGrupo = filtroGrupo === "TODAS" || cia.grupo === filtroGrupo;
    const atendeBusca = 
      cia.nome.toLowerCase().includes(buscaGeral.toLowerCase()) ||
      cia.sigla.toLowerCase().includes(buscaGeral.toLowerCase()) ||
      cia.cidade.toLowerCase().includes(buscaGeral.toLowerCase());

    return atendeGrupo && atendeBusca;
  });

  // Auxiliar de badge de status
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

      {/* Conteúdo Principal */}
      <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-y-auto container-sombrio relative">
        <div className="max-w-7xl mx-auto w-full space-y-5">
          
          {/* Cabeçalho */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Building2 className="text-blue-500" size={24} />
                Distribuição por Companhias e Unidades
              </h1>
              <p className="text-xs text-slate-400">17º Batalhão de Polícia Militar — Visão descentralizada da frota</p>
            </div>

            {/* Campo de Pesquisa Geral */}
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por nome ou cidade..."
                value={buscaGeral}
                onChange={(e) => setBuscaGeral(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* BOTÕES DE FILTRO FIXOS (Pill Filters) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Filter size={14} /> Filtros:
            </span>
            {opcoesFiltro.map((f) => {
              const ativo = filtroGrupo === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFiltroGrupo(f.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    ativo
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 border border-blue-500"
                      : "bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Grid de Cards das Unidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companhiasFiltradas.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500 text-xs">
                Nenhuma companhia ou unidade encontrada para o filtro selecionado.
              </div>
            ) : (
              companhiasFiltradas.map((cia) => {
                const total = cia.viaturas.length;
                const operacionais = cia.viaturas.filter(v => v.status === "Operacional").length;
                const manutencao = cia.viaturas.filter(v => v.status === "Manutenção").length;
                const baixadas = cia.viaturas.filter(v => v.status === "Baixada").length;

                return (
                  <div
                    key={cia.id}
                    onClick={() => {
                      setCompanhiaSelecionada(cia);
                      setFiltroTextoModal("");
                    }}
                    className="bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 transition-all hover:shadow-lg hover:shadow-blue-600/5 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Header do Card */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                            {cia.sigla}
                          </span>
                          <h2 className="text-sm font-bold text-slate-100 mt-1.5 group-hover:text-blue-400 transition-colors line-clamp-1">
                            {cia.nome}
                          </h2>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                            <MapPin size={12} className="text-slate-500 shrink-0" /> {cia.cidade}
                          </p>
                        </div>

                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/30 text-slate-400 group-hover:text-blue-400 transition-all shrink-0">
                          <ChevronRight size={16} />
                        </div>
                      </div>

                      {/* Resumo Numérico */}
                      <div className="grid grid-cols-4 gap-1.5 my-3 bg-slate-900/80 border border-slate-800/80 rounded-xl p-2.5">
                        <div className="text-center border-r border-slate-800/80 pr-1">
                          <p className="text-[9px] text-slate-500 uppercase font-semibold">Total</p>
                          <p className="text-base font-bold text-slate-100">{total}</p>
                        </div>
                        <div className="text-center border-r border-slate-800/80 pr-1">
                          <p className="text-[9px] text-emerald-400 uppercase font-semibold">Prontas</p>
                          <p className="text-base font-bold text-emerald-400">{operacionais}</p>
                        </div>
                        <div className="text-center border-r border-slate-800/80 pr-1">
                          <p className="text-[9px] text-amber-400 uppercase font-semibold">Manten.</p>
                          <p className="text-base font-bold text-amber-400">{manutencao}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] text-rose-400 uppercase font-semibold">Baixas</p>
                          <p className="text-base font-bold text-rose-400">{baixadas}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rodapé do Card */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-[10px] text-slate-500 truncate">
                        <ShieldCheck size={12} className="text-blue-500 shrink-0" /> {cia.comandante}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-400 group-hover:underline shrink-0">
                        Ver frota &rarr;
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* MODAL DE DETALHES AO CLICAR EM UM CARD */}
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

                {/* Campo de Busca Dentro do Modal */}
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

                {/* Lista de Viaturas */}
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

              {/* Rodapé do Modal */}
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