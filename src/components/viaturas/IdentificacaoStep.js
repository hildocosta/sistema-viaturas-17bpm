import React from "react";
import { ShieldAlert, Hash, Building2 } from "lucide-react";

export function IdentificacaoStep({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <ShieldAlert size={16} /> Etapa 1: Identificação Operacional
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prefixo / Código Militar */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Prefixo / Código Militar *
          </label>
          <div className="relative">
            <Hash
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              name="prefixo"
              required
              placeholder="Ex: L0123 / M-1701"
              value={formData.prefixo || ""}
              onChange={onChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 uppercase placeholder:text-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Tipo de Viatura */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Emprego / Tipo de Viatura
          </label>
          <select
            name="tipoViatura"
            value={formData.tipoViatura || "Rádio Patrulha (RPA)"}
            onChange={onChange}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="Rádio Patrulha (RPA)">Rádio Patrulha (RPA)</option>
            <option value="ROTAM">ROTAM</option>
            <option value="P2 (Apt. Inteligência)">P2 (Apt. Inteligência)</option>
            <option value="Trânsito">Trânsito</option>
            <option value="Administrativo">Administrativo</option>
          </select>
        </div>

        {/* Subunidade / Cia */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Subunidade / Cia Destino
          </label>
          <div className="relative">
            <Building2
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              name="companhia"
              value={formData.companhia || "1ª Cia - Araucária"}
              onChange={onChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="1ª Cia - Araucária">1ª Cia - Araucária</option>
              <option value="2ª Cia - Campo Largo">2ª Cia - Campo Largo</option>
              <option value="3ª Cia - S.J. Pinhais">3ª Cia - S.J. Pinhais</option>
              <option value="HQ / Sede 17º BPM">HQ / Sede 17º BPM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentificacaoStep;