"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Gauge, CheckCircle2, AlertCircle, Car, Loader2, ArrowRight, RefreshCw, Camera, X } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

export default function CheckinPage() {
  const params = useParams();
  
  const prefixoParam = Array.isArray(params?.prefixo) 
    ? params.prefixo[0] 
    : params?.prefixo;

  // Função para tratar URLs longas do Google Drive ou links diretos
  const limparPrefixo = (valorLido) => {
    if (!valorLido) return "";
    let texto = decodeURIComponent(valorLido).trim();

    if (texto.includes("/checkin/")) {
      const partes = texto.split("/checkin/");
      texto = partes[partes.length - 1].replace(/\//g, "");
    } else if (texto.includes("http://") || texto.includes("https://")) {
      try {
        const urlObj = new URL(texto);
        const paramPrefixo = urlObj.searchParams.get("prefixo");
        if (paramPrefixo) {
          texto = paramPrefixo;
        } else {
          const partesPath = urlObj.pathname.split("/").filter(Boolean);
          texto = partesPath[partesPath.length - 1] || texto;
        }
      } catch (e) {
        // Fallback caso falhe a leitura da URL
      }
    }

    return texto.toUpperCase().trim();
  };

  // Se veio parâmetro na URL, passa limpo na inicialização do estado
  const [prefixo, setPrefixo] = useState(() => limparPrefixo(prefixoParam) || "");
  const [km, setKm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const [scanning, setScanning] = useState(false);
  const html5QrcodeRef = useRef(null);

  const startScanner = async () => {
    setErro("");
    setScanning(true);

    setTimeout(async () => {
      try {
        const qrScanner = new Html5Qrcode("reader");
        html5QrcodeRef.current = qrScanner;

        await qrScanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            extrairPrefixoEParar(decodedText);
          },
          () => {}
        );
      } catch (err) {
        stopScanner();
        setErro("Não foi possível aceder à câmara. Verifique as permissões do navegador.");
      }
    }, 100);
  };

  const extrairPrefixoEParar = (valorLido) => {
    const prefixoDetectado = limparPrefixo(valorLido);
    setPrefixo(prefixoDetectado);
    stopScanner();
  };

  const stopScanner = async () => {
    if (html5QrcodeRef.current) {
      try {
        if (html5QrcodeRef.current.isScanning) {
          await html5QrcodeRef.current.stop();
        }
        html5QrcodeRef.current.clear();
      } catch (e) {
        console.error("Erro ao parar leitor:", e);
      }
      html5QrcodeRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
        html5QrcodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prefixo) {
      setErro("Escaneie o QR Code da viatura primeiro.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefixo, km }),
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

        {/* Leitor QR Code ativado */}
        {scanning ? (
          <div className="mb-5 space-y-3">
            <div className="relative overflow-hidden rounded-xl border border-blue-500/50 bg-black min-h-65">
              <div id="reader" className="w-full h-full"></div>
              <button
                type="button"
                onClick={stopScanner}
                className="absolute top-3 right-3 p-2 bg-slate-900/80 text-white rounded-full border border-slate-700 hover:bg-slate-800 z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-center text-slate-400">Aponte a câmara para o QR Code da viatura</p>
          </div>
        ) : (
          /* Card da Viatura Identificada */
          prefixo ? (
            <div className="bg-blue-950/40 rounded-xl p-3.5 mb-5 border border-blue-500/30 shadow-inner flex items-center justify-between gap-2 overflow-hidden">
              <div className="text-left pl-1 min-w-0 flex-1 pr-2">
                <span className="text-[10px] font-bold text-blue-400/80 uppercase tracking-widest block mb-0.5">Viatura Identificada</span>
                <span className="text-xl sm:text-2xl font-black text-blue-400 tracking-wider font-mono break-all block">
                  {prefixo}
                </span>
              </div>

              <button
                type="button"
                onClick={startScanner}
                className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Camera className="w-4 h-4" />
                <span>Trocar</span>
              </button>
            </div>
          ) : (
            <div className="mb-5">
              <button
                type="button"
                onClick={startScanner}
                className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-blue-600/20"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm">Escanear QR Code da Viatura</span>
              </button>
            </div>
          )
        )}

        {/* Tela de Sucesso */}
        {sucesso ? (
          <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-emerald-400">KM Registrado com Sucesso!</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed px-2">
                A quilometragem da viatura <span className="font-bold text-white font-mono break-all">{prefixo}</span> foi atualizada para <span className="font-bold text-emerald-400 font-mono">{km} KM</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSucesso(false);
                setKm("");
                setPrefixo("");
              }}
              className="w-full h-12 mt-2 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Realizar Novo Registro</span>
            </button>
          </div>
        ) : (
          /* Formulário de Envio */
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium">{erro}</span>
              </div>
            )}

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
                  disabled={!prefixo}
                  placeholder={prefixo ? "Ex: 45200" : "Escaneie o QR Code primeiro"}
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 text-slate-100 text-base sm:text-lg font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !km || !prefixo}
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