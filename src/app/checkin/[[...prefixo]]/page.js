"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Gauge, User, CheckCircle2, AlertCircle, Car, Loader2, ArrowRight, RefreshCw } from "lucide-react";

export default function CheckinPage() {
  const params = useParams();
  
  const prefixoParam = Array.isArray(params?.prefixo) 
    ? params.prefixo[0] 
    : params?.prefixo;

  const prefixo = prefixoParam || "NÃO INFORMADO";

  const [km, setKm] = useState("");
  const [motorista, setMotorista] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prefixo,
          km,
          motorista,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSucesso(true);
      } else {
        setErro(data.error || "Ocorreu um erro ao salvar os dados.");
      }
    } catch (err) {
      setErro("Falha de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-3 sm:p-6 select-none">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-5">
          <div className="p-2.5 sm:p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
            <Car className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 truncate">Atualização de KM</h1>
            <p className="text-xs text-slate-400 truncate">17º Batalhão de Polícia Militar</p>
          </div>
        </div>

        {/* Badge do Prefixo */}
        <div className="bg-slate-950/80 rounded-xl p-3 text-center mb-5 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Viatura Selecionada</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-400 tracking-wider font-mono">{prefixo}</span>
        </div>

        {/* Tela de Sucesso */}
        {sucesso ? (
          <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-emerald-400">KM Registrado com Sucesso!</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed px-2">
                A quilometragem da viatura <span className="font-bold text-white font-mono">{prefixo}</span> foi atualizada para <span className="font-bold text-emerald-400 font-mono">{km} KM</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSucesso(false);
                setKm("");
                setMotorista("");
              }}
              className="w-full h-12 mt-2 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Realizar Novo Registro</span>
            </button>
          </div>
        ) : (
          /* Formulário */
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium">{erro}</span>
              </div>
            )}

            {/* Campo KM */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                KM Atual no Painel <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Gauge className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  placeholder="Ex: 45200"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 text-slate-100 text-base sm:text-lg font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Campo Motorista */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Motorista / Matrícula <span className="text-slate-500 font-normal">(Opcional)</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ex: Sd. Silva / 123456"
                  value={motorista}
                  onChange={(e) => setMotorista(e.target.value)}
                  className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={loading || !km}
              className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Registrando...</span>
                </>
              ) : (
                <>
                  <span>Confirmar e Enviar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}