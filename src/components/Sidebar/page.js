"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Car, 
  Building2,
  BarChart3,
  PlusCircle, 
  Wrench, 
  ShieldCheck, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isRouteActive = (route) => {
    if (
      route === "/dashboard" || 
      route === "/dashboard/viaturas" || 
      route === "/dashboard/companhias" ||
      route === "/dashboard/companhias/dashboard"
    ) {
      return pathname === route;
    }
    return pathname.startsWith(route);
  };

  const menuItems = [
    {
      titulo: "Visão Geral",
      itens: [
        {
          nome: "Painel Principal",
          icone: LayoutDashboard,
          href: "/dashboard"
        }
      ]
    },
    {
      titulo: "Gestão de Frota",
      itens: [
        {
          nome: "Lista de Viaturas",
          icone: Car,
          href: "/dashboard/viaturas"
        },
        {
          nome: "Distribuição por Cia",
          icone: Building2,
          href: "/dashboard/companhias"
        },
        {
          nome: "Dashboard Cias",
          icone: BarChart3,
          href: "/dashboard/companhias/dashboard"
        },
        {
          nome: "Nova Viatura",
          icone: PlusCircle,
          href: "/dashboard/viaturas/nova"
        }
      ]
    },
    {
      titulo: "Manutenção & O.S.",
      itens: [
        {
          nome: "Ordens de Serviço",
          icone: Wrench,
          href: "/dashboard/manutencoes"
        }
      ]
    }
  ];

  return (
    <aside className="w-full h-full bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between container-sombrio select-none">
      <div>
        {/* Cabeçalho / Logo do Sistema */}
        <div className="flex items-center gap-3 px-2 py-3 mb-5 relative">
          <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-500 shadow-sm shadow-blue-500/10">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">FrotaPol</h1>
            <p className="text-[10px] text-slate-400 font-mono">Gestão Operacional</p>
          </div>

          {/* Divisor com Efeito Gradiente Neon */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* Grupos de Links do Menu */}
        <div className="space-y-5">
          {menuItems.map((grupo, gIdx) => (
            <div key={gIdx}>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {grupo.titulo}
              </p>
              
              <nav className="space-y-1">
                {grupo.itens.map((item, iIdx) => {
                  const Icone = item.icone;
                  const ativo = isRouteActive(item.href);

                  return (
                    <Link key={iIdx} href={item.href} className="block">
                      <div
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          ativo
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-950/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icone size={17} className={ativo ? "text-white" : "text-slate-400"} />
                          <span>{item.nome}</span>
                        </div>

                        {ativo && <ChevronRight size={14} className="text-white/80" />}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé da Sidebar - Usuário & Sair */}
      <div className="relative pt-4">
        {/* Divisor Superior do Rodapé com Efeito Gradiente */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-700/60 to-transparent mb-3" />

        <div className="flex items-center justify-between px-3 py-2 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate">1º Sgt. Silva</p>
            <p className="text-[10px] text-slate-500 truncate">Gestor de Frota</p>
          </div>

          <Link href="/">
            <button 
              title="Sair do Sistema"
              className="p-1.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
}