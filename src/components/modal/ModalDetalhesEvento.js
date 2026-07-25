"use client";

import React from "react";
import { X, Calendar, User, Gauge } from "lucide-react";
import { formatarData, formatarMoeda } from "@/app/utils/pdfGenerator";

export default function ModalDetalhesEvento({ evento, onClose }) {
  if (!evento) return null;

  // Cor das tags baseada no tipo de evento
  const getTipoColorModal = (tipo) => {
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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        
        {/* Topo do Modal */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase ${getTipoColorModal(evento.tipo)}`}>
              {evento.tipo}
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Calendar size={12} />
              {formatarData(evento.data)}
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Título do Evento */}
        <h3 className="text-base font-bold text-white mb-4">{evento.titulo}</h3>

        {/* Informações Básicas (Responsável e KM) */}
        <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Responsável</span>
            <span className="text-xs text-slate-200 font-medium flex items-center gap-1 mt-0.5">
              <User size={13} className="text-blue-400" />
              {evento.responsavel || "N/I"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Quilometragem</span>
            <span className="text-xs text-slate-200 font-mono font-medium flex items-center gap-1 mt-0.5">
              <Gauge size={13} className="text-blue-400" />
              {evento.kmRegistrado ? `${evento.kmRegistrado.toLocaleString("pt-BR")} km` : "N/D"}
            </span>
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div className="mb-6">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
            Descrição e Observações Técnicas
          </span>
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto">
            {evento.descricao || "Nenhuma observação detalhada foi informada."}
          </div>
        </div>

        {/* Rodapé com Valor e Botão Fechar */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Custo Financeiro</span>
            <span className="text-sm font-bold font-mono text-emerald-400">
              {evento.custo > 0 ? formatarMoeda(evento.custo) : "Isento (Sem Custo)"}
            </span>
          </div>

          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}