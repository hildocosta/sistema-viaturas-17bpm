import React from "react";
import { Loader2 } from "lucide-react";

export function DashboardWrapper({ children, className = "" }) {
  return (
    <div className={`min-h-screen md:h-screen w-full bg-slate-950 flex flex-col md:flex-row p-2 sm:p-4 gap-3 sm:gap-4 antialiased md:overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function SidebarArea({ children, className = "" }) {
  return (
    <div className={`w-full md:w-64 lg:w-72 md:h-full shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export function MainContent({ children, className = "" }) {
  return (
    <main className={`flex-1 w-full md:h-full bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-800 p-3 sm:p-5 lg:p-6 flex flex-col min-h-0 overflow-hidden shadow-2xl ${className}`}>
      {children}
    </main>
  );
}

export function ContentScrollArea({ children, className = "" }) {
  return (
    <div className={`flex-1 overflow-y-auto pr-0 sm:pr-1 space-y-4 sm:space-y-6 min-h-0 ${className}`}>
      {children}
    </div>
  );
}

export function CardsGrid({ children, className = "" }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
      {children}
    </div>
  );
}

export function DashboardCard({ children, className = "" }) {
  return (
    <div className={`bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all ${className}`}>
      {children}
    </div>
  );
}

// Tela de carregamento totalmente isolada
export function LoadingScreen({ mensagem = "Carregando..." }) {
  return (
    <div className="flex h-screen w-screen bg-slate-950 items-center justify-center text-slate-400 p-4">
      <Loader2 className="animate-spin text-blue-500 mr-2 shrink-0" size={24} />
      <span className="text-sm font-medium">{mensagem}</span>
    </div>
  );
}

// Botão de ícone (Voltar / Ações Rápidas)
export function HeaderIconButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 ${className}`}
    >
      {children}
    </button>
  );
}

// Botões de ação do topo (Baixar PDF, Novo Evento, etc.)
export function HeaderActionButton({ children, variant = "secondary", className = "", ...props }) {
  const baseClasses = "flex items-center gap-2 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer justify-center";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-lg shadow-blue-600/20 active:scale-[0.98]",
    secondary: "bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 sm:px-3.5 py-2 sm:py-2.5 active:scale-[0.98]"
  };

  return (
    <button 
      {...props} 
      className={`${baseClasses} ${variants[variant] || variants.secondary} ${className}`}
    >
      {children}
    </button>
  );
}