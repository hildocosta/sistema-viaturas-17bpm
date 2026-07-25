"use client";

import React from "react";
import { Clock, Calendar, User, Eye } from "lucide-react";
import { formatarData, formatarMoeda } from "@/app/utils/pdfGenerator";

export default function TimelineHistorico({ historico = [], onSelectEvento }) {
  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Manutenção":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "Inspeção":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Sinistro":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      default:
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    }
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 flex-1 overflow-hidden flex flex-col">
      <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 shrink-0">
        <Clock size={16} className="text-blue-400" />
        Histórico Cronológico de Vida Útil
        <span className="text-[10px] text-slate-500 font-normal">
          (Clique em qualquer card para ver detalhes)
        </span>
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 container-sombrio">
        {historico.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-8">
            Nenhum evento registrado até o momento.
          </p>
        ) : (
          historico.map((item) => (
            <div
              key={item.id}
              className="relative pl-6 pb-4 border-l border-slate-800 last:border-0 last:pb-0"
            >
              {/* Marcador na linha do tempo */}
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>

              {/* Card Clicável */}
              <div
                onClick={() => onSelectEvento && onSelectEvento(item)}
                className="bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/50 rounded-xl p-4 transition-all cursor-pointer group shadow-sm hover:shadow-md hover:shadow-blue-500/5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getTipoColor(
                        item.tipo
                      )}`}
                    >
                      {item.tipo}
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      {item.titulo}
                      <Eye
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
                      />
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Calendar size={12} />
                    {formatarData(item.data)}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {item.descricao}
                </p>

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
                      <span className="text-amber-400">
                        Custo: {formatarMoeda(item.custo)}
                      </span>
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
  );
}