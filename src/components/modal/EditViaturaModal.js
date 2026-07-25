'use client';

import React, { useState } from 'react';
import { X, Save, Car, Hash, Gauge, Building2, Wrench } from 'lucide-react';

export default function EditViaturaModal({
  viaturaParaEditar,
  setViaturaParaEditar,
  handleSalvarEdicao
}) {
  if (!viaturaParaEditar) return null;

  return (
    <EditViaturaModalForm
      key={viaturaParaEditar.id}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Card do Modal alinhado com a paleta do Dashboard */}
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col container-sombrio">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <Car size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Editar Viatura — {formData.prefixo || 'S/P'}
              </h3>
              <p className="text-xs text-slate-400">Atualização rápida de cadastro</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
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
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono uppercase"
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
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono uppercase"
              />
            </div>
          </div>

          {/* Modelo */}
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
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Odômetro */}
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
                  value={formData.kmAtual || ''}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            {/* Status */}
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
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500"
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
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Botões / Ações */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 text-xs font-medium hover:bg-slate-800 hover:text-slate-200 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-900/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={15} /> Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}