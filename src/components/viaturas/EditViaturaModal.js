import React from "react";
import { Pencil, X } from "lucide-react";

export default function EditViaturaModal({ 
  viaturaParaEditar, 
  setViaturaParaEditar, 
  handleSalvarEdicao 
}) {
  // Atribui às variáveis que o restante do seu JSX usa
  const viatura = viaturaParaEditar;
  const setViatura = setViaturaParaEditar;
  const onClose = () => setViaturaParaEditar(null);
  
  const onSave = (e) => {
    e.preventDefault();
    handleSalvarEdicao(viaturaParaEditar);
  };

  if (!viatura) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Pencil size={16} className="text-amber-400" />
            Editar Viatura - <span className="font-mono text-blue-400">{viatura.prefixo}</span>
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Prefixo</label>
              <input 
                type="text" 
                required
                value={viatura.prefixo || ""}
                onChange={(e) => setViatura({ ...viatura, prefixo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Placa</label>
              <input 
                type="text" 
                required
                value={viatura.placa || ""}
                onChange={(e) => setViatura({ ...viatura, placa: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Modelo</label>
            <input 
              type="text" 
              required
              value={viatura.modelo || ""}
              onChange={(e) => setViatura({ ...viatura, modelo: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Subunidade / Lotação</label>
            <input 
              type="text" 
              required
              value={viatura.subunidade || ""}
              onChange={(e) => setViatura({ ...viatura, subunidade: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Status Operacional</label>
              <select 
                value={viatura.status || "Pronta"}
                onChange={(e) => setViatura({ ...viatura, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Pronta">Pronta</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Inoperante">Inoperante</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">KM Atual</label>
              <input 
                type="number" 
                required
                value={viatura.kmAtual || 0}
                onChange={(e) => setViatura({ ...viatura, kmAtual: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-3.5 py-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}