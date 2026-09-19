'use client';

import React, { useState } from 'react';
import { X, Save, Car, Hash, Gauge, Building2, Wrench } from 'lucide-react';

export default function EditViaturaModal({
  viaturaParaEditar,
  setViaturaParaEditar,
  handleSalvarEdicao
}) {
  if (!viaturaParaEditar) return null;

  // A prop 'key' força o React a recriar o EditViaturaModalForm do zero 
  // sempre que a viatura mudar, reiniciando o useState com os novos dados automaticamente.
  return (
    <EditViaturaModalForm
      key={viaturaParaEditar.id || viaturaParaEditar.prefixo}
      viaturaParaEditar={viaturaParaEditar}
      setViaturaParaEditar={setViaturaParaEditar}
      handleSalvarEdicao={handleSalvarEdicao}
    />
  );
}

function EditViaturaModalForm({
  viaturaParaEditar,
  setViaturaParaEditar,
  handleSalvarEdicao
}) {
  // O estado inicial é definido diretamente aqui.
  // Como o pai passa uma 'key' única, não precisamos do useEffect para atualizar quando mudar de viatura!
  const [formData, setFormData] = useState({ ...viaturaParaEditar });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSalvarEdicao(formData);
  };

  const handleClose = () => {
    setViaturaParaEditar(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
              <Car size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                Editar Viatura — {formData.prefixo || 'S/P'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Atualização rápida de cadastro
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Fechar Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Prefixo */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Prefixo *
                </label>
                <div className="relative">
                  <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="prefixo"
                    required
                    value={formData.prefixo || ''}
                    onChange={handleChange}
                    placeholder="Ex: L0102"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono uppercase transition-colors"
                  />
                </div>
              </div>

              {/* Placa */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Placa *
                </label>
                <input
                  type="text"
                  name="placa"
                  required
                  value={formData.placa || ''}
                  onChange={handleChange}
                  placeholder="Ex: ABC-1D23"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono uppercase transition-colors"
                />
              </div>
            </div>

            {/* Modelo do Veículo */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Modelo do Veículo *
              </label>
              <input
                type="text"
                name="modelo"
                required
                value={formData.modelo || ''}
                onChange={handleChange}
                placeholder="Ex: Toyota Hilux SW4 4x4"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Odômetro e Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* KM Atual */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  KM Atual *
                </label>
                <div className="relative">
                  <Gauge size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="number"
                    name="kmAtual"
                    required
                    min="0"
                    value={formData.kmAtual || ''}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Status Operacional */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Status Operacional
                </label>
                <div className="relative">
                  <Wrench size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    name="status"
                    value={formData.status || 'Pronta'}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="Pronta">Pronta</option>
                    <option value="Em Manutenção">Em Manutenção</option>
                    <option value="Baixada">Baixada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subunidade */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Subunidade / Lotação
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="subunidade"
                  value={formData.subunidade || ''}
                  onChange={handleChange}
                  placeholder="Ex: 1ª Cia / 17º BPM"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Rodapé Fixo */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 p-4 sm:px-6 border-t border-slate-800 bg-slate-950/40 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 text-xs font-medium hover:bg-slate-800 hover:text-slate-200 transition-all cursor-pointer text-center"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <Save size={15} />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}