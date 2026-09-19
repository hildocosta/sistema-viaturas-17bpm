import React from "react";
import { Loader2 } from "lucide-react";

export function DashboardWrapper({ children }) {
  return (
    <div className="min-h-screen md:h-screen w-full bg-slate-950 flex flex-col md:flex-row p-2 sm:p-4 gap-3 sm:gap-4 antialiased md:overflow-hidden">
      {children}
    </div>
  );
}

export function SidebarArea({ children }) {
  return (
    <div className="w-full md:w-72 lg:w-80 md:h-full shrink-0">
      {children}
    </div>
  );
}

export function MainContent({ children }) {
  return (
    <main className="flex-1 w-full md:h-full bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 flex flex-col min-h-0 overflow-hidden shadow-2xl">
      {children}
    </main>
  );
}

export function ContentScrollArea({ children, className = "" }) {
  return (
    <div className={`flex-1 overflow-y-auto pr-1 space-y-4 sm:space-y-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardsGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {children}
    </div>
  );
}

export function DashboardCard({ children, className = "" }) {
  return (
    <div className={`bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all ${className}`}>
      {children}
    </div>
  );
}

// Tela de carregamento totalmente isolada
export function LoadingScreen({ mensagem = "Carregando..." }) {
  return (
    <div className="flex h-screen w-screen bg-slate-950 items-center justify-center text-slate-400">
      <Loader2 className="animate-spin text-blue-500 mr-2" size={24} />
      <span className="text-sm">{mensagem}</span>
    </div>
  );
}

// Botão de ícone (Voltar)
export function HeaderIconButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-xl transition-all cursor-pointer"
    >
      {children}
    </button>
  );
}

// Botões de ação do topo (Baixar PDF, Novo Evento, etc.)
export function HeaderActionButton({ children, variant = "secondary", ...props }) {
  const baseClasses = "flex items-center gap-2 font-bold text-xs rounded-xl transition-all cursor-pointer justify-center";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 shadow-lg shadow-blue-600/20",
    secondary: "bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3.5 py-2.5"
  };

  return (
    <button {...props} className={`${baseClasses} ${variants[variant] || variants.secondary}`}>
      {children}
    </button>
  );
}