import React from "react";
import { CheckCircle2, Wrench, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  switch (status) {
    case "Pronta":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 size={13} />
          Pronta
        </span>
      );
    case "Em Manutenção":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Wrench size={13} />
          Manutenção
        </span>
      );
    case "Inoperante":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle size={13} />
          Inoperante
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300">
          {status}
        </span>
      );
  }
}