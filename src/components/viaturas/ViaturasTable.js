import React from "react";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ViaturasTable({ viaturas, formatarMoeda, onEdit }) {
  return (
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
                  {formatarMoeda(item.custoTotalManutencao)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <Link href={`/dashboard/viaturas/${item.id}`}>
                      <button 
                        type="button"
                        title="Ver Prontuário"
                        className="p-1.5 bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-blue-500/30 rounded-lg transition-all cursor-pointer"
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
  );
}