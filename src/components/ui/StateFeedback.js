import React from "react";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";

export function LoadingState({ message = "Carregando dados..." }) {
  return (
    <div className="flex h-64 items-center justify-center text-slate-400 gap-2">
      <Loader2 className="animate-spin text-blue-500" size={20} />
      <span className="text-xs">{message}</span>
    </div>
  );
}

export function EmptyState({ 
  title = "Nenhum registro encontrado", 
  description = "Tente ajustar os termos de pesquisa ou remover os filtros." 
}) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center border border-dashed border-slate-800 rounded-2xl p-6">
      <AlertTriangle size={32} className="text-slate-600 mb-2" />
      <p className="text-sm font-semibold text-slate-300">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  );
}

// Adicionado mantendo a coerência visual das suas alertas
export function SuccessAlert({ title, description }) {
  return (
    <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 flex items-center gap-3">
      <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        {description && <p className="text-xs text-emerald-400/80">{description}</p>}
      </div>
    </div>
  );
}