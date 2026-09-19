"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Gauge, User, CheckCircle2, AlertCircle, Car, Loader2 } from "lucide-react";

export default function CheckinPage() {
  const params = useParams();
  const prefixo = params?.prefixo;

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl">
            <Car className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Atualizar KM</h1>
            <p className="text-sm text-slate-400">17º Batalhão de Polícia Militar</p>
          </div>
        </div>

        {/* Badge do Prefixo */}
        <div className="bg-slate-800/80 rounded-lg p-3 text-center mb-6 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Viatura</span>
          <span className="text-2xl font-black text-blue-400">{prefixo}</span>
        </div>

        {/* Mensagem de Sucesso */}
        {sucesso ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-xl font-bold text-emerald-400">KM Registrado!</h2>
            <p className="text-slate-300 text-sm">
              Quilometragem da viatura <strong className="text-white">{prefixo}</strong> atualizada para <strong className="text-white">{km} KM</strong>.
            </p>
            <button
              onClick={() => {
                setSucesso(false);
                setKm("");
                setMotorista("");
              }}
              className="mt-4 px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition"
            >
              Novo Registro
            </button>
          </div>
        ) : (
          /* Formulário */
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{erro}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                KM Atual no Painel *
              </label>
              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="number"
                  required
                  placeholder="Ex: 45200"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white text-lg font-mono focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Motorista / Matrícula (Opcional)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Ex: Sd. Silva"
                  value={motorista}
                  onChange={(e) => setMotorista(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !km}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Confirmar e Enviar"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}