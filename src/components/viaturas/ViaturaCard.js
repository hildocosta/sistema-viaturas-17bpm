"use client";

import React from "react";
import Link from "next/link";
import { Building2, Gauge, DollarSign, ChevronRight, Pencil } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ViaturaCard({ item, formatarMoeda, onEdit }) {
  if (!item) return null;

  // Lógica para formatar o Ano (Ex: "2020/2021" ou apenas "2020")
  const formatarAno = () => {
    const anoFab = item.anoFabricacao || item.ano;
    const anoMod = item.anoModelo;

    if (anoFab && anoMod && anoFab !== anoMod) {
      return `${anoFab}/${anoMod}`;
    }
    return anoFab || anoMod || "N/A";
  };

  // Trata tanto 'km' (do Prisma Schema) quanto 'kmAtual'
  const kmAtual = item.km !== undefined && item.km !== null ? item.km : item.kmAtual;

  return (
    <div className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group">
      <div>
        {/* Cabeçalho do Card: Corrigido para não empilhar/esmagar no mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-lg font-bold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
            {item.prefixo || "Sem Prefixo"}
          </span>
          <div className="self-start sm:self-auto max-w-full">
            <StatusBadge status={item.status} />
          </div>
        </div>

        {/* Modelo e Placa / Ano */}
        <div className="space-y-1.5 mb-4">
          <p className="text-xs font-semibold text-slate-200">
            {item.modelo || "Modelo não informado"}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="font-mono">
              Placa: <strong className="text-slate-300">{item.placa || "N/A"}</strong>
            </span>
            <span>•</span>
            <span>
              Ano: <strong className="text-slate-300">{formatarAno()}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Detalhes Técnicos */}
      <div className="border-t border-slate-800/80 pt-3 space-y-3 text-xs text-slate-400">
        
        {/* SUBUNIDADE */}
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Building2 size={13} className="text-slate-500 shrink-0" />
            Subunidade
          </span>
          <span className="font-semibold text-slate-200 leading-snug break-words pl-5">
            {item.subunidade || "Não atribuída"}
          </span>
        </div>

        {/* QUILOMETRAGEM */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Gauge size={13} className="text-blue-500 shrink-0" />
            Quilometragem
          </span>
          <span className="font-mono font-bold text-slate-200">
            {kmAtual !== undefined && kmAtual !== null ? Number(kmAtual).toLocaleString("pt-BR") : 0} km
          </span>
        </div>

        {/* MANUTENÇÃO ACUMULADA */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <DollarSign size={13} className="text-emerald-500 shrink-0" />
            Manutenção Acumulada
          </span>
          <span className="font-mono font-bold text-emerald-400">
            {formatarMoeda ? formatarMoeda(item.custoTotalManutencao) : `R$ ${item.custoTotalManutencao || 0}`}
          </span>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO: Prontuário + Editar */}
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