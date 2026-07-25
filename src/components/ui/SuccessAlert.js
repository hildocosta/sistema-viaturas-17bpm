import React from "react";
import { CheckCircle2 } from "lucide-react";

export function SuccessAlert({ title, description }) {
  return (
    <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
      <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        {description && (
          <p className="text-xs text-emerald-400/80 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

export default SuccessAlert;