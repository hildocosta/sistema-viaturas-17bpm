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
    /* Overlay com scroll de segurança e fechamento ao clicar fora */
    <div 
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Card do Modal */}
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho Fixo */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-950/50 shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 truncate">
            <Wrench size={18} className="text-blue-500 shrink-0" />
            <span className="truncate">Registrar Evento Cronológico</span>
          </h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Fechar Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário com Scroll Interno */}
        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
            
            {/* Tipo de Evento */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Tipo de Evento</label>
              <select 
                value={novoEvento.tipo}
                onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none"
              >
                <option value="Manutenção">Manutenção / Reparo</option>
                <option value="Inspeção">Inspeção / Vistoria</option>
                <option value="Alteração">Passagem de Plantão / Alteração</option>
                <option value="Sinistro">Sinistro / Avaria</option>
              </select>
            </div>

            {/* Título */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Título do Evento *</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Troca de pastilhas de freio"
                value={novoEvento.titulo}
                onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Custo e Novo KM (Empilhados no Mobile / Lado a lado no Tablet+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Valor/Custo (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0,00"
                  value={novoEvento.custo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, custo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Novo KM Hodômetro</label>
                <input 
                  type="number" 
                  placeholder={kmAtualViatura ? kmAtualViatura.toString() : ""}
                  value={novoEvento.novoKm}
                  onChange={(e) => setNovoEvento({ ...novoEvento, novoKm: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                />
              </div>
            </div>

            {/* Responsável */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Militar Responsável / P4</label>
              <input 
                type="text" 
                placeholder="Ex: Sgt. Silva"
                value={novoEvento.responsavel}
                onChange={(e) => setNovoEvento({ ...novoEvento, responsavel: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Descrição Detalhada</label>
              <textarea 
                rows={3}
                placeholder="Descreva o serviço realizado, peças trocadas ou observações importantes..."
                value={novoEvento.descricao}
                onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

          </div>

          {/* Rodapé Fixo com Botões Responsivos */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 p-4 sm:px-6 border-t border-slate-800 bg-slate-950/40 shrink-0">
            <button 
              type="button" 
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-xl transition-colors cursor-pointer text-center"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20 text-center active:scale-[0.98]"
            >
              Salvar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}