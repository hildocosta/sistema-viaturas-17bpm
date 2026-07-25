"use client";

import React, { useState } from "react";
import { Wrench, X } from "lucide-react";

export default function ModalNovoEvento({ isOpen, onClose, onSalvar, kmAtualViatura }) {
  const [novoEvento, setNovoEvento] = useState({
    tipo: "Manutenção",
    titulo: "",
    descricao: "",
    custo: "",
    responsavel: "",
    novoKm: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novoEvento.titulo) return;

    onSalvar(novoEvento);
    setNovoEvento({ 
      tipo: "Manutenção", 
      titulo: "", 
      descricao: "", 
      custo: "", 
      responsavel: "", 
      novoKm: "" 
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench size={18} className="text-blue-500" />
            Registrar Evento Cronológico
          </h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Tipo de Evento</label>
            <select 
              value={novoEvento.tipo}
              onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Manutenção">Manutenção / Reparo</option>
              <option value="Inspeção">Inspeção / Vistoria</option>
              <option value="Alteração">Passagem de Plantão / Alteração</option>
              <option value="Sinistro">Sinistro / Avaria</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Título do Evento *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Troca de pastilhas de freio"
              value={novoEvento.titulo}
              onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Valor/Custo (R$)</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0,00"
                value={novoEvento.custo}
                onChange={(e) => setNovoEvento({ ...novoEvento, custo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Novo KM Hodômetro</label>
              <input 
                type="number" 
                placeholder={kmAtualViatura ? kmAtualViatura.toString() : ""}
                value={novoEvento.novoKm}
                onChange={(e) => setNovoEvento({ ...novoEvento, novoKm: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Militar Responsável / P4</label>
            <input 
              type="text" 
              placeholder="Ex: Sgt. Silva"
              value={novoEvento.responsavel}
              onChange={(e) => setNovoEvento({ ...novoEvento, responsavel: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Descrição Detalhada</label>
            <textarea 
              rows={3}
              placeholder="Descreva o serviço realizado, peças trocadas ou observações importantes..."
              value={novoEvento.descricao}
              onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Rodapé do Modal */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
            >
              Salvar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}