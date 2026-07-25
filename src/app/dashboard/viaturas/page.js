"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/page";
import { 
  Car, 
  Search, 
  Plus, 
  Gauge, 
  Building2, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronRight,
  Loader2,
  DollarSign,
  LayoutGrid,
  List,
  Eye,
  Pencil,
  X
} from "lucide-react";
import Link from "next/link";

export default function ListaViaturasPage() {
  const [viaturas, setViaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Filtros
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  // Estado para Alternar Modos de Visualização ('cards' ou 'lista')
  const [modoExibicao, setModoExibicao] = useState("cards");

  // Estado para Edição de Viatura
  const [viaturaParaEditar, setViaturaParaEditar] = useState(null);

  useEffect(() => {
    async function carregarViaturas() {
      try {
        setLoading(true);
        const origin = window.location.origin;
        const res = await fetch(`${origin}/api/viaturas`);
        if (!res.ok) throw new Error("Offline");
        const data = await res.json();
        setViaturas(data);
      } catch (err) {
        // Mock de Contingência para testes locais / offline
        setViaturas([
          {
            id: "1",
            prefixo: "L0117",
            placa: "BEE-4R17",
            modelo: "Toyota Hilux SW4 4x4",
            ano: 2023,
            kmAtual: 34200,
            subunidade: "ROTAM / 17º BPM",
            status: "Pronta",
            custoTotalManutencao: 3300.00
          },
          {
            id: "2",
            prefixo: "L0204",
            placa: "ABC-1234",
            modelo: "Renault Duster 2.0",
            ano: 2021,
            kmAtual: 68500,
            subunidade: "1ª Cia / 17º BPM",
            status: "Em Manutenção",
            custoTotalManutencao: 5120.50
          },
          {
            id: "3",
            prefixo: "L0102",
            placa: "XYZ-9876",
            modelo: "Chevrolet S10 4x4",
            ano: 2022,
            kmAtual: 45100,
            subunidade: "RPA / Araucária",
            status: "Pronta",
            custoTotalManutencao: 1200.00
          },
          {
            id: "4",
            prefixo: "L0309",
            placa: "KGM-5541",
            modelo: "Toyota Hilux SW4 4x4",
            ano: 2020,
            kmAtual: 92300,
            subunidade: "P2 / Inteligência",
            status: "Inoperante",
            custoTotalManutencao: 12400.00
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    carregarViaturas();
  }, []);

  // Lógica de Filtragem Dinâmica
  const viaturasFiltradas = viaturas.filter((item) => {
    const termo = busca.toLowerCase();
    const combinaBusca = 
      item.prefixo.toLowerCase().includes(termo) ||
      item.placa.toLowerCase().includes(termo) ||
      item.modelo.toLowerCase().includes(termo) ||
      item.subunidade.toLowerCase().includes(termo);

    const combinaStatus = 
      filtroStatus === "TODOS" || item.status === filtroStatus;

    return combinaBusca && combinaStatus;
  });

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor || 0);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pronta":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={13} />
            Pronta
          </span>
        );
      case "Em Manutenção":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Wrench size={13} />
            Manutenção
          </span>
        );
      case "Inoperante":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle size={13} />
            Inoperante
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  // Salvar Alterações na Edição da Viatura
  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    setViaturas((prev) =>
      prev.map((item) => (item.id === viaturaParaEditar.id ? viaturaParaEditar : item))
    );
    setViaturaParaEditar(null);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden p-4 gap-4 antialiased">
      <div className="w-80 h-full shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-hidden container-sombrio">
        
        {/* Cabeçalho da Página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Car className="text-blue-500" size={24} />
              Frota de Viaturas Cadastradas
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Gestão de veículos, controle de rodagem e status de prontidão operacional.
            </p>
          </div>

          <Link href="/dashboard/viaturas/nova">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/20">
              <Plus size={16} />
              Nova Viatura
            </button>
          </Link>
        </div>

        {/* Barra de Filtros, Pesquisa e Alternador de Layout */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6 shrink-0">
          
          {/* Campo de Busca */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="Buscar por Prefixo, Placa, Modelo ou Subunidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            {busca && (
              <button 
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Filtro por Status */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {["TODOS", "Pronta", "Em Manutenção", "Inoperante"].map((status) => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filtroStatus === status 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {status === "TODOS" ? "Todas" : status}
              </button>
            ))}
          </div>

          {/* Alternador de Layout: Cards vs Lista */}
          <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setModoExibicao("cards")}
              title="Visualização em Cards"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                modoExibicao === "cards" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setModoExibicao("lista")}
              title="Visualização em Tabela / Lista"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                modoExibicao === "lista" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <List size={16} />
            </button>
          </div>

        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-y-auto pr-1 container-sombrio">
          {loading ? (
            <div className="flex h-64 items-center justify-center text-slate-400 gap-2">
              <Loader2 className="animate-spin text-blue-500" size={20} />
              <span className="text-xs">Carregando frota de viaturas...</span>
            </div>
          ) : viaturasFiltradas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center border border-dashed border-slate-800 rounded-2xl p-6">
              <AlertTriangle size={32} className="text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">Nenhuma viatura encontrada</p>
              <p className="text-xs text-slate-500 mt-1">Tente ajustar os termos de pesquisa ou remover os filtros aplicados.</p>
            </div>
          ) : modoExibicao === "cards" ? (
            
            /* MODE 1: VISUALIZAÇÃO EM CARDS / GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {viaturasFiltradas.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
                        {item.prefixo}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="space-y-1.5 mb-4">
                      <p className="text-xs font-semibold text-slate-200">{item.modelo}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="font-mono">Placa: <strong className="text-slate-300">{item.placa}</strong></span>
                        <span>•</span>
                        <span>Ano: {item.ano}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800/80 pt-3 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Building2 size={13} className="text-slate-500" />
                        Subunidade
                      </span>
                      <span className="font-medium text-slate-200">{item.subunidade}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Gauge size={13} className="text-blue-500" />
                        Quilometragem
                      </span>
                      <span className="font-mono font-bold text-slate-200">
                        {item.kmAtual.toLocaleString("pt-BR")} km
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <DollarSign size={13} className="text-emerald-500" />
                        Manutenção Acumulada
                      </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {formatarMoeda(item.custoTotalManutencao)}
                      </span>
                    </div>
                  </div>

                  <Link href={`/dashboard/viaturas/${item.id}`} className="mt-4 block">
                    <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl transition-all cursor-pointer">
                      Acessar Prontuário
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>

          ) : (

            /* MODE 2: VISUALIZAÇÃO EM TABELA / LISTA */
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                      <th className="py-3 px-4">Prefixo / Placa</th>
                      <th className="py-3 px-4">Modelo / Ano</th>
                      <th className="py-3 px-4">Subunidade</th>
                      <th className="py-3 px-4">Quilometragem</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Investimento</th>
                      <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {viaturasFiltradas.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="py-3 px-4">
                          <div className="font-bold font-mono text-white group-hover:text-blue-400 transition-colors">
                            {item.prefixo}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">{item.placa}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-200">{item.modelo}</div>
                          <div className="text-[10px] text-slate-500">Ano: {item.ano}</div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-300">
                          {item.subunidade}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-200">
                          {item.kmAtual.toLocaleString("pt-BR")} km
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                          {formatarMoeda(item.custoTotalManutencao)}
                        </td>
                        <td className="py-3 px-4">
                          {/* Botões de Ação Atualizados */}
                          <div className="flex items-center justify-center gap-1.5">
                            <Link href={`/dashboard/viaturas/${item.id}`}>
                              <button 
                                title="Ver Prontuário"
                                className="p-1.5 bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-blue-500/30 rounded-lg transition-all cursor-pointer"
                              >
                                <Eye size={15} />
                              </button>
                            </Link>

                            <button 
                              onClick={() => setViaturaParaEditar(item)}
                              title="Editar Viatura"
                              className="p-1.5 bg-slate-900 hover:bg-amber-600/20 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/30 rounded-lg transition-all cursor-pointer"
                            >
                              <Pencil size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          )}
        </div>

        {/* Modal de Edição de Viatura */}
        {viaturaParaEditar && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Pencil size={16} className="text-amber-400" />
                  Editar Viatura - <span className="font-mono text-blue-400">{viaturaParaEditar.prefixo}</span>
                </h3>
                <button 
                  onClick={() => setViaturaParaEditar(null)}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSalvarEdicao} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Prefixo</label>
                    <input 
                      type="text" 
                      required
                      value={viaturaParaEditar.prefixo}
                      onChange={(e) => setViaturaParaEditar({ ...viaturaParaEditar, prefixo: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Placa</label>
                    <input 
                      type="text" 
                      required
                      value={viaturaParaEditar.placa}
                      onChange={(e) => setViaturaParaEditar({ ...viaturaParaEditar, placa: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Modelo</label>
                  <input 
                    type="text" 
                    required
                    value={viaturaParaEditar.modelo}
                    onChange={(e) => setViaturaParaEditar({ ...viaturaParaEditar, modelo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Subunidade / Lotação</label>
                  <input 
                    type="text" 
                    required
                    value={viaturaParaEditar.subunidade}
                    onChange={(e) => setViaturaParaEditar({ ...viaturaParaEditar, subunidade: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Status Operacional</label>
                    <select 
                      value={viaturaParaEditar.status}
                      onChange={(e) => setViaturaParaEditar({ ...viaturaParaEditar, status: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Pronta">Pronta</option>
                      <option value="Em Manutenção">Em Manutenção</option>
                      <option value="Inoperante">Inoperante</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">KM Atual</label>
                    <input 
                      type="number" 
                      required
                      value={viaturaParaEditar.kmAtual}
                      onChange={(e) => setViaturaParaEditar({ ...viaturaParaEditar, kmAtual: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setViaturaParaEditar(null)}
                    className="px-3.5 py-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    Salvar Alterações
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