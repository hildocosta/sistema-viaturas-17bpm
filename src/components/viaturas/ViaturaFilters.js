import React from "react";
import { Search, SlidersHorizontal, LayoutGrid, LayoutList } from "lucide-react";

export default function ViaturaFilters({
  busca = "",
  setBusca,
  filtroStatus = "TODOS",
  setFiltroStatus,
  filtroSubunidade = "TODAS",
  setFiltroSubunidade,
  subunidades = [],
  viewMode = "grid",
  setViewMode,
  totalResultados = 0,
}) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-4 space-y-3.5 backdrop-blur-md shadow-xl">
      
      {/* Campo de Busca (Ocupa a largura total da linha superior) */}
      <div className="relative w-full">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por prefixo, placa ou modelo..."
          value={busca}
          onChange={(e) => setBusca && setBusca(e.target.value)}
          className="w-full h-11 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
        />
      </div>

      {/* Grid de Filtros + Alternador de Visualização */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
        
        {/* Filtro por Status */}
        <div className="sm:col-span-5 flex items-center gap-2 bg-slate-950 border border-slate-800 focus-within:border-blue-500 rounded-xl px-3 h-11 transition-all">
          <SlidersHorizontal size={15} className="text-slate-500 shrink-0" />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus && setFiltroStatus(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer appearance-none truncate pr-4 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:9px_9px] bg-[right_center] bg-no-repeat"
          >
            <option value="TODOS" className="bg-slate-900 text-slate-200">Todos os Status</option>
            <option value="Disponível" className="bg-slate-900 text-slate-200">Disponível</option>
            <option value="Indisponível - Manutenção" className="bg-slate-900 text-slate-200">Indisponível - Manutenção</option>
            <option value="Indisponível - Processo Descarga / Leilão" className="bg-slate-900 text-slate-200">Indisponível - Processo Descarga / Leilão</option>
            <option value="Indisponível - Aguardando Regularização" className="bg-slate-900 text-slate-200">Indisponível - Aguardando Regularização</option>
            <option value="Indisponível - Sinistro / Inquérito Técnico" className="bg-slate-900 text-slate-200">Indisponível - Sinistro / Inquérito Técnico</option>
          </select>
        </div>

        {/* Filtro por Subunidade */}
        <div className="sm:col-span-5 flex items-center bg-slate-950 border border-slate-800 focus-within:border-blue-500 rounded-xl px-3 h-11 transition-all">
          <select
            value={filtroSubunidade}
            onChange={(e) => setFiltroSubunidade && setFiltroSubunidade(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer appearance-none truncate pr-4 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:9px_9px] bg-[right_center] bg-no-repeat"
          >
            <option value="TODAS" className="bg-slate-900 text-slate-200">Todas Subunidades</option>
            {subunidades?.map((sub) => (
              <option key={sub} value={sub} className="bg-slate-900 text-slate-200">
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Alternador de Visualização (Grade vs Tabela) */}
        <div className="sm:col-span-2 flex items-center justify-end">
          <div className="flex items-center justify-between w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-xl p-1 h-11 gap-1">
            <button
              type="button"
              onClick={() => setViewMode && setViewMode("grid")}
              title="Visualização em Grade (Cards)"
              className={`flex-1 sm:flex-none h-full px-3 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode && setViewMode("table")}
              title="Visualização em Tabela (Lista)"
              className={`flex-1 sm:flex-none h-full px-3 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Indicador de Quantidade e Limpar Filtros */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2.5 border-t border-slate-800/80 font-medium">
        <span>
          Exibindo <strong className="text-slate-200 font-bold font-mono">{totalResultados}</strong> viatura(s)
        </span>
        {(busca || filtroStatus !== "TODOS" || filtroSubunidade !== "TODAS") && (
          <button
            type="button"
            onClick={() => {
              if (setBusca) setBusca("");
              if (setFiltroStatus) setFiltroStatus("TODOS");
              if (setFiltroSubunidade) setFiltroSubunidade("TODAS");
            }}
            className="text-blue-400 hover:text-blue-300 underline cursor-pointer transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

    </div>
  );
}