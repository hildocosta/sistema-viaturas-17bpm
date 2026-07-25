import React from "react";

export function DashboardWrapper({ children }) {
  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden p-4 gap-4 antialiased">
      {children}
    </div>
  );
}

export function SidebarArea({ children }) {
  return <div className="w-80 h-full shrink-0">{children}</div>;
}

export function MainContent({ children }) {
  return (
    <main className="flex-1 h-full bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col overflow-hidden container-sombrio">
      {children}
    </main>
  );
}

export function ContentScrollArea({ children, className = "" }) {
  return (
    <div className={`flex-1 overflow-y-auto pr-1 container-sombrio ${className}`}>
      {children}
    </div>
  );
}

export function CardsGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
      {children}
    </div>
  );
}

// Componente para padronizar os blocos/cards de formulário
export function FormContainer({ children, className = "" }) {
  return (
    <div className={`bg-slate-950/60 border border-slate-800 rounded-xl p-6 mb-6 min-h-72 ${className}`}>
      {children}
    </div>
  );
}