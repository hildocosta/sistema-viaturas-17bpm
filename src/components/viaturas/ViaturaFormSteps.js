"use client";

import React from "react";
import { ShieldAlert, Car, Wrench, Hash, Building2, Calendar, Gauge, Fuel } from "lucide-react";

export function StepIdentificacao({ formData, handleChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <ShieldAlert size={16} /> Etapa 1: Identificação Operacional
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Prefixo / Código Militar *</label>
          <div className="relative">
            <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              name="prefixo"
              required
              placeholder="Ex: L0123 / M-1701"
              value={formData.prefixo}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 uppercase placeholder:text-slate-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Emprego / Tipo de Viatura</label>
          <select
            name="tipoViatura"
            value={formData.tipoViatura}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500"
          >
            <option value="Rádio Patrulha (RPA)">Rádio Patrulha (RPA)</option>
            <option value="ROTAM">ROTAM</option>
            <option value="P2 (Apt. Inteligência)">P2 (Apt. Inteligência)</option>
            <option value="Trânsito">Trânsito</option>
            <option value="Administrativo">Administrativo</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">Subunidade / Cia Destino</label>
          <div className="relative">
            <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              name="companhia"
              value={formData.companhia}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500"
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
    <div className="space-y-4">
      <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <Car size={16} /> Etapa 2: Especificações Veiculares
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Placa *</label>
          <input
            type="text"
            name="placa"
            required
            placeholder="ABC1D23"
            value={formData.placa}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 uppercase placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Marca *</label>
          <input
            type="text"
            name="marca"
            required
            placeholder="Ex: Renault"
            value={formData.marca}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Modelo *</label>
          <input
            type="text"
            name="modelo"
            required
            placeholder="Ex: Duster Oroch"
            value={formData.modelo}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Ano de Fabricação *</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="number"
              name="ano"
              required
              min="2000"
              max={new Date().getFullYear() + 1}
              value={formData.ano}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Odômetro Atual (KM) *</label>
          <div className="relative">
            <Gauge size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="number"
              name="kmAtual"
              required
              placeholder="Ex: 45200"
              value={formData.kmAtual}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Combustível</label>
          <div className="relative">
            <Fuel size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              name="combustivel"
              value={formData.combustivel}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500"
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
    <div className="space-y-4">
      <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <Wrench size={16} /> Etapa 3: Condições Iniciais e Observações
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Status Inicial da Viatura</label>
          <select
            name="situacao"
            value={formData.situacao}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500"
          >
            <option value="Operacional">Operacional (Pronta para patrulhamento)</option>
            <option value="Baixada">Baixada / Garagem</option>
            <option value="Manutenção">Em Manutenção</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Observações de Avaria / Acessórios Especiais</label>
          <textarea
            name="observacoes"
            rows={4}
            placeholder="Informe detalhes sobre equipamentos instalados (giroflex, radiocomunicação, blindagem) ou avarias mecânicas/estéticas iniciais..."
            value={formData.observacoes}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-blue-500 placeholder:text-slate-600 resize-none"
          />
        </div>
      </div>
    </div>
  );
}