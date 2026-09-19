"use client";

import React from "react";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ViaturasTable({ viaturas = [], formatarMoeda, onEdit }) {
  if (!viaturas || viaturas.length === 0) {
    return (
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs">
        Nenhuma viatura cadastrada.
      </div>
    );
  }

  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden mb-4">
      {/* ------------------------------------------------------------- */}
      {/* 1. VISÃO EM CARDS (Exibida em celulares e tablets - hidden md:block) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
        {viaturas.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:border-slate-700 transition-colors"
          >
            {/* Cabecalho do Card: Prefixo + Status */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div>
                <div className="font-bold font-mono text-sm text-white flex items-center gap-2">
                  <span>{item.prefixo}</span>
                  <span className="text-[10px] font-normal text-slate-500 font-mono">
                    ({item.placa})
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  {item.modelo} <span className="text-slate-500 text-[11px]">• Ano: {item.ano}</span>
                </div>
              </div>
              <div className="shrink-0">
                <StatusBadge status={item.status} />
              </div>
            </div>

            {/* Corpo do Card: Informações Secundárias */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Subunidade</span>
                <span className="text-slate-300 font-medium truncate block">{item.subunidade || "N/I"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Quilometragem</span>
                <span className="font-mono text-slate-200 font-semibold">
                  {item.kmAtual ? item.kmAtual.toLocaleString("pt-BR") : 0} km
                </span>
              </div>
            </div>

            {/* Rodapé do Card: Valor e Ações */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 mt-0.5">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Investimento</span>
                <span className="font-mono font-bold text-emerald-400 text-xs">
                  {formatarMoeda ? formatarMoeda(item.custoTotalManutencao) : `R$ ${item.custoTotalManutencao || 0}`}
                </span>
              </div>

              {/* Botões de Ação Adaptados para Toque */}
              <div className="flex items-center gap-2">
                <Link href={`/dashboard/viaturas/${item.id}`} className="flex-1">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95"
                  >
                    <Eye size={14} />
                    <span>Ver</span>
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onEdit) onEdit(item);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-amber-600/20 text-slate-300 hover:text-amber-400 border border-slate-700 hover:border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95"
                >
                  <Pencil size={14} />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. VISÃO EM TABELA (Exibida a partir de Desktops - hidden md:block) */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden md:block overflow-x-auto">
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
            {viaturas.map((item) => (
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
                  {item.kmAtual ? item.kmAtual.toLocaleString("pt-BR") : 0} km
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                  {formatarMoeda ? formatarMoeda(item.custoTotalManutencao) : `R$ ${item.custoTotalManutencao || 0}`}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <Link href={`/dashboard/viaturas/${item.id}`}>
                      <button 
                        type="button"
                        title="Ver Prontuário"
                        className="p-1.5 bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-blue-500/30 rounded-lg transition-all cursor-pointer active:scale-95"
                      >
                        <Eye size={15} />
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
                      className="p-1.5 bg-slate-900 hover:bg-amber-600/20 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/30 rounded-lg transition-all cursor-pointer active:scale-95"
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
  );
}