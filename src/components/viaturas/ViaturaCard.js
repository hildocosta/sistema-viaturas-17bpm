import React from "react";
import { Building2, Gauge, DollarSign, FileText, Edit2 } from "lucide-react";

export default function ViaturaCard({ viatura, onAbrirProntuario, onEditar }) {
  // Define as cores do badge com base no status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Disponível":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Em Uso":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        // Status Indisponíveis (Manutenção, Regularização, Leilão, etc.)
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 hover:border-slate-700/80 transition-all">
      
      {/* Cabeçalho: Prefixo e Badge de Status com alinhamento responsivo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800/80">
        
        {/* Prefixo destacado */}
        <h3 className="text-xl font-extrabold text-white tracking-tight">
          {viatura.prefixo}
        </h3>

        {/* Badge de Status corrigido para textos longos */}
        <div className="self-start sm:self-auto max-w-full">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border max-w-full sm:max-w-[220px] truncate ${getStatusStyle(
              viatura.status
            )}`}
            title={viatura.status}
          >
            <span className="truncate">{viatura.status}</span>
          </span>
        </div>

      </div>

      {/* Dados do Veículo: Modelo, Placa e Ano */}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-slate-100">
          {viatura.modelo}
        </h4>
        <p className="text-xs text-slate-400">
          Placa:{" "}
          <span className="font-mono text-slate-200 font-medium">
            {viatura.placa}
          </span>{" "}
          • Ano:{" "}
          <span className="font-mono text-slate-200 font-medium">
            {viatura.ano}
          </span>
        </p>
      </div>

      <hr className="border-slate-800/60" />

      {/* Informações Operacionais */}
      <div className="space-y-2.5 text-xs text-slate-400">
        
        {/* Subunidade */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Building2 size={14} className="shrink-0" />
            <span>Subunidade</span>
          </div>
          <p className="text-slate-200 font-medium pl-5 truncate">
            {viatura.subunidade}
          </p>
        </div>

        {/* Quilometragem */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Gauge size={14} className="shrink-0" />
            <span>Quilometragem</span>
          </div>
          <span className="text-slate-200 font-mono font-bold">
            {Number(viatura.quilometragem || 0).toLocaleString("pt-BR")} km
          </span>
        </div>

        {/* Manutenção Acumulada */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-500">
            <DollarSign size={14} className="shrink-0 text-emerald-500" />
            <span>Manutenção Acumulada</span>
          </div>
          <span className="text-emerald-400 font-mono font-bold">
            R${" "}
            {Number(viatura.custoManutencao || 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

      </div>

      {/* Ações / Botões de Acesso */}
      <div className="pt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onAbrirProntuario && onAbrirProntuario(viatura)}
          className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl h-10 px-3 flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer"
        >
          <FileText size={14} className="text-slate-400" />
          <span>Prontuário</span>
        </button>

        <button
          type="button"
          onClick={() => onEditar && onEditar(viatura)}
          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl w-10 h-10 flex items-center justify-center transition-all cursor-pointer shrink-0"
          title="Editar Viatura"
        >
          <Edit2 size={14} />
        </button>
      </div>

    </div>
  );
}