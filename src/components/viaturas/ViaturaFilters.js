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
    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 mb-4 space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por prefixo, placa ou modelo..."
            value={busca}
            onChange={(e) => setBusca && setBusca(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Seletores de Filtro e Modos de Exibição */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filtro por Status */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <SlidersHorizontal size={13} className="text-slate-500" />
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus && setFiltroStatus(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="TODOS" className="bg-slate-900 text-slate-200">Todos os Status</option>
              <option value="Pronta" className="bg-slate-900 text-slate-200">Pronta</option>
              <option value="Em Manutenção" className="bg-slate-900 text-slate-200">Em Manutenção</option>
              <option value="Inoperante" className="bg-slate-900 text-slate-200">Inoperante</option>
            </select>
          </div>

          {/* Filtro por Subunidade */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <select
              value={filtroSubunidade}
              onChange={(e) => setFiltroSubunidade && setFiltroSubunidade(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
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
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setViewMode && setViewMode("grid")}
              title="Visualização em Grade (Cards)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode && setViewMode("table")}
              title="Visualização em Tabela (Lista)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutList size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de Quantidade e Limpar Filtros */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
        <span>
          Exibindo <strong className="text-slate-300 font-mono">{totalResultados}</strong> viatura(s)
        </span>
        {(busca || filtroStatus !== "TODOS" || filtroSubunidade !== "TODAS") && (
          <button
            type="button"
            onClick={() => {
              if (setBusca) setBusca("");
              if (setFiltroStatus) setFiltroStatus("TODOS");
              if (setFiltroSubunidade) setFiltroSubunidade("TODAS");
            }}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}