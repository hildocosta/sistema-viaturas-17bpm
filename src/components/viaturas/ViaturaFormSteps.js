"use client";

import React from "react";
import { ShieldAlert, Car, Wrench, Hash, Building2, Calendar, Gauge, Fuel } from "lucide-react";

export function StepIdentificacao({ formData, handleChange }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Cabeçalho do Passo */}
      <div className="border-b border-slate-800/80 pb-2.5 sm:pb-3">
        <h2 className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert size={18} className="shrink-0 text-blue-400" />
          <span>Etapa 1: Identificação Operacional</span>
        </h2>
      </div>

      {/* Grid de Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Prefixo */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Prefixo / Código Militar <span className="text-rose-400">*</span>
          </label>
          <div className="relative flex items-center">
            <Hash size={16} className="absolute left-3 text-slate-500 pointer-events-none shrink-0" />
            <input
              type="text"
              name="prefixo"
              required
              placeholder="Ex: L0123 / M-1701"
              value={formData.prefixo || ""}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 uppercase placeholder:text-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Tipo de Viatura */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Emprego / Tipo de Viatura
          </label>
          <select
            name="tipoViatura"
            value={formData.tipoViatura || ""}
            onChange={handleChange}
            className="w-full h-10 sm:h-9 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
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
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Subunidade / Cia Destino
          </label>
          <div className="relative flex items-center">
            <Building2 size={16} className="absolute left-3 text-slate-500 pointer-events-none shrink-0" />
            <select
              name="companhia"
              value={formData.companhia || ""}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
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

export function StepEspecificacoes({ formData, handleChange }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Cabeçalho do Passo */}
      <div className="border-b border-slate-800/80 pb-2.5 sm:pb-3">
        <h2 className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
          <Car size={18} className="shrink-0 text-blue-400" />
          <span>Etapa 2: Especificações Veiculares</span>
        </h2>
      </div>

      {/* Grid de Formulário Responsivo (1 col em mobile, 2 col em telas médias) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Placa */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Placa <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="placa"
            required
            maxLength={7}
            placeholder="ABC1D23"
            value={formData.placa || ""}
            onChange={handleChange}
            className="w-full h-10 sm:h-9 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 uppercase placeholder:text-slate-600 transition-colors"
          />
        </div>

        {/* Marca */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Marca <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="marca"
            required
            placeholder="Ex: Renault"
            value={formData.marca || ""}
            onChange={handleChange}
            className="w-full h-10 sm:h-9 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600 transition-colors"
          />
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Modelo <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="modelo"
            required
            placeholder="Ex: Duster Oroch"
            value={formData.modelo || ""}
            onChange={handleChange}
            className="w-full h-10 sm:h-9 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600 transition-colors"
          />
        </div>

        {/* Ano de Fabricação */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Ano de Fabricação <span className="text-rose-400">*</span>
          </label>
          <div className="relative flex items-center">
            <Calendar size={16} className="absolute left-3 text-slate-500 pointer-events-none shrink-0" />
            <input
              type="number"
              name="ano"
              required
              min="2000"
              max={new Date().getFullYear() + 1}
              value={formData.ano || ""}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Odômetro */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Odômetro Atual (KM) <span className="text-rose-400">*</span>
          </label>
          <div className="relative flex items-center">
            <Gauge size={16} className="absolute left-3 text-slate-500 pointer-events-none shrink-0" />
            <input
              type="number"
              name="kmAtual"
              required
              placeholder="Ex: 45200"
              value={formData.kmAtual || ""}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Combustível */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Combustível
          </label>
          <div className="relative flex items-center">
            <Fuel size={16} className="absolute left-3 text-slate-500 pointer-events-none shrink-0" />
            <select
              name="combustivel"
              value={formData.combustivel || ""}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="Flex">Flex (Gasolina/Etanol)</option>
              <option value="Diesel">Diesel S10</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Elétrico/Híbrido">Elétrico/Híbrido</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StepCondicoes({ formData, handleChange }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Cabeçalho do Passo */}
      <div className="border-b border-slate-800/80 pb-2.5 sm:pb-3">
        <h2 className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
          <Wrench size={18} className="shrink-0 text-blue-400" />
          <span>Etapa 3: Condições Iniciais e Observações</span>
        </h2>
      </div>

      <div className="space-y-3.5 sm:space-y-4">
        {/* Status Inicial */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Status Inicial da Viatura
          </label>
          <select
            name="situacao"
            value={formData.situacao || ""}
            onChange={handleChange}
            className="w-full h-10 sm:h-9 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="Operacional">Operacional (Pronta para patrulhamento)</option>
            <option value="Baixada">Baixada / Garagem</option>
            <option value="Manutenção">Em Manutenção</option>
          </select>
        </div>

        {/* Observações */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Observações de Avaria / Acessórios Especiais
          </label>
          <textarea
            name="observacoes"
            rows={4}
            placeholder="Informe detalhes sobre equipamentos instalados (giroflex, radiocomunicação, blindagem) ou avarias mecânicas/estéticas iniciais..."
            value={formData.observacoes || ""}
            onChange={handleChange}
            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600 resize-none transition-colors min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}