"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/page";
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
  Filter,
  Loader2,
  Globe,
  AlertCircle
} from "lucide-react";

export default function DistribucionCompanhiasPage() {
  const [companhiasData, setCompanhiasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroApi, setErroApi] = useState(null);
  const [companhiaSelecionada, setCompanhiaSelecionada] = useState(null);
  const [filtroGrupo, setFiltroGrupo] = useState("TODAS");
  const [filtroTextoModal, setFiltroTextoModal] = useState("");
  const [buscaGeral, setBuscaGeral] = useState("");

  useEffect(() => {
    async function fetchSubunidades() {
      try {
        setLoading(true);
        setErroApi(null);
        
        // Chamada atualizada para a rota de subunidades
        const res = await fetch("/api/subunidades");
        
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: Não foi possível carregar as subunidades.`);
        }

        const data = await res.json();
        
        // Trata o retorno aceitando lista direta ou objeto envelopado
        const listaFinal = Array.isArray(data) 
          ? data 
          : (data.data || data.subunidades || []);

        setCompanhiasData(listaFinal);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErroApi(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSubunidades();
  }, []);

  const opcoesFiltro = [
    { label: "Todas Unidades", value: "TODAS" },
    { label: "Sede & Área 17º BPM", value: "SEDE" },
    { label: "1ª Cia", value: "1CIA" },
    { label: "2ª Cia", value: "2CIA" },
    { label: "3ª Cia", value: "3CIA" },
    { label: "4ª Cia", value: "4CIA" },
  ];

  const regex17BPM = /17[º°a-z]*\s*bpm/i;

  const companhiasFiltradas = companhiasData.filter((cia) => {
    if (filtroGrupo === "TODAS" && !buscaGeral.trim()) return true;

    const grupo = String(cia.grupo || "").toUpperCase();
    const sigla = String(cia.sigla || "").toUpperCase();
    const nome = String(cia.nome || "").toUpperCase();
    const areaAtuacao = String(cia.areaAtuacao || "").toUpperCase();
    const cidade = String(cia.cidade || "").toUpperCase();

    const eGeralOuSede = 
      grupo.includes("SEDE") || 
      sigla.includes("PCS") ||
      regex17BPM.test(areaAtuacao) ||
      regex17BPM.test(nome) ||
      areaAtuacao.includes("TODA") ||
      cidade.includes("TODA");

    let atendeGrupo = false;
    if (filtroGrupo === "TODAS") {
      atendeGrupo = true;
    } else if (filtroGrupo === "SEDE") {
      atendeGrupo = eGeralOuSede;
    } else {
      const numeroCia = filtroGrupo.replace(/\D/g, "");
      atendeGrupo = 
        grupo.includes(filtroGrupo) || 
        sigla.includes(filtroGrupo) ||
        (numeroCia && (grupo.includes(numeroCia) || sigla.includes(numeroCia) || nome.includes(numeroCia)));
    }

    const termoBusca = buscaGeral.toLowerCase().trim();
    const atendeBusca = 
      !termoBusca ||
      nome.toLowerCase().includes(termoBusca) ||
      sigla.toLowerCase().includes(termoBusca) ||
      cidade.toLowerCase().includes(termoBusca) ||
      areaAtuacao.toLowerCase().includes(termoBusca);

    return atendeGrupo && atendeBusca;
  });

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
      <div className="w-80 h-full shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-y-auto container-sombrio relative">
        <div className="max-w-7xl mx-auto w-full space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Building2 className="text-blue-500" size={24} />
                Distribuição por Companhias e Subunidades
              </h1>
              <p className="text-xs text-slate-400">17º Batalhão de Polícia Militar — Visão descentralizada da frota</p>
            </div>

            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por unidade, cidade ou área..."
                value={buscaGeral}
                onChange={(e) => setBuscaGeral(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
              />
            </div>
          </div>

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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
              <Loader2 size={32} className="animate-spin text-blue-500" />
              <p className="text-xs font-medium">Carregando subunidades...</p>
            </div>
          ) : erroApi ? (
            <div className="flex flex-col items-center justify-center py-12 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl gap-2 text-xs">
              <AlertCircle size={24} />
              <p className="font-bold">{erroApi}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companhiasFiltradas.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400 text-xs bg-slate-950/40 rounded-xl border border-slate-800/60 p-6 gap-3">
                  <p className="font-semibold text-slate-300">Nenhum resultado para o filtro selecionado.</p>
                  
                  <div className="w-full max-w-lg bg-slate-950 p-4 rounded-lg border border-slate-800 text-left overflow-x-auto text-[11px] font-mono text-slate-400">
                    <p className="text-amber-400 font-sans font-bold mb-1">Diagnóstico de Dados:</p>
                    <p>Total de registros no banco: <strong className="text-white">{companhiasData.length}</strong></p>
                    {companhiasData.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-800">
                        <p className="text-slate-500 mb-1">Exemplo do 1º item recebido da API:</p>
                        <pre className="text-[10px] text-emerald-400">{JSON.stringify(companhiasData[0], null, 2)}</pre>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => { setFiltroGrupo("TODAS"); setBuscaGeral(""); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-sans font-medium hover:bg-blue-500 transition-all cursor-pointer mt-2"
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                companhiasFiltradas.map((cia, index) => {
                  const viaturas = cia.viaturas || [];
                  const total = viaturas.length;
                  const operacionais = viaturas.filter(v => v.status === "Operacional").length;
                  const manutencao = viaturas.filter(v => v.status === "Manutenção").length;
                  const baixadas = viaturas.filter(v => v.status === "Baixada").length;

                  const eAtuacaoAmpla = 
                    regex17BPM.test(cia.areaAtuacao || "") || 
                    String(cia.cidade).toLowerCase().includes("toda") ||
                    cia.grupo === "SEDE";

                  return (
                    <div
                      key={cia.id || index}
                      onClick={() => {
                        setCompanhiaSelecionada(cia);
                        setFiltroTextoModal("");
                      }}
                      className="bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 transition-all hover:shadow-lg hover:shadow-blue-600/5 cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              {cia.sigla || "PM"}
                            </span>
                            <h2 className="text-sm font-bold text-slate-100 mt-1.5 group-hover:text-blue-400 transition-colors line-clamp-1">
                              {cia.nome || "Unidade sem nome"}
                            </h2>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                              {eAtuacaoAmpla ? (
                                <Globe size={12} className="text-blue-400 shrink-0" />
                              ) : (
                                <MapPin size={12} className="text-slate-500 shrink-0" />
                              )}
                              {cia.areaAtuacao || cia.cidade || "Área 17º BPM"}
                            </p>
                          </div>

                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/30 text-slate-400 group-hover:text-blue-400 transition-all shrink-0">
                            <ChevronRight size={16} />
                          </div>
                        </div>

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

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 truncate">
                          <ShieldCheck size={12} className="text-blue-500 shrink-0" /> {cia.comandante || "Comando do Batalhão"}
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
          )}

        </div>

        {companhiaSelecionada && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-100">{companhiaSelecionada.nome}</h2>
                      <p className="text-xs text-slate-400">
                        {companhiaSelecionada.areaAtuacao || companhiaSelecionada.cidade || "Área 17º BPM"} — Responsável: {companhiaSelecionada.comandante || "Comando do Batalhão"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCompanhiaSelecionada(null)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

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

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                    <Car size={14} className="text-blue-500" />
                    Viaturas Alocadas ({companhiaSelecionada.viaturas?.length || 0})
                  </h3>

                  {companhiaSelecionada.viaturas
                    ?.filter(v => {
                      const termo = filtroTextoModal.toLowerCase().trim();
                      if (!termo) return true;
                      return (
                        v.prefixo?.toLowerCase().includes(termo) ||
                        v.placa?.toLowerCase().includes(termo) ||
                        v.modelo?.toLowerCase().includes(termo)
                      );
                    })
                    .map((v) => (
                      <div 
                        key={v.id || v.prefixo}
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
                            <p className="text-xs text-slate-400 mt-0.5">{v.modelo} • <span className="text-slate-500">{v.tipo || "Geral"}</span></p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="mb-1">{getStatusBadge(v.status)}</div>
                          <p className="text-[10px] font-mono text-slate-500">{v.km ? `${v.km} km` : "KM N/I"}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

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