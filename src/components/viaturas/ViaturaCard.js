import React from "react";
import Link from "next/link";
import { Building2, Gauge, DollarSign, ChevronRight, Pencil } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ViaturaCard({ item, formatarMoeda, onEdit }) {
  return (
    <div className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
            {item.prefixo}
          </span>
          <StatusBadge status={item.status} />
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
            {item.kmAtual ? item.kmAtual.toLocaleString("pt-BR") : 0} km
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

      {/* AÇÕES: Botão de Acessar Prontuário + Botão de Editar */}
      <div className="mt-4 flex items-center gap-2">
        <Link href={`/dashboard/viaturas/${item.id}`} className="flex-1">
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl transition-all cursor-pointer"
          >
            Prontuário
            <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onEdit) onEdit(item);
          }}
          title="Editar Viatura"
          className="p-2 bg-slate-900 hover:bg-amber-600/20 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/30 rounded-xl transition-all cursor-pointer"
        >
          <Pencil size={15} />
        </button>
      </div>
    </div>
  );
}