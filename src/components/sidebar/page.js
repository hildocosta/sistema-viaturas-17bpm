"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Car, 
  Building2,
  BarChart3,
  PlusCircle, 
  Wrench, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Fecha o menu mobile e rola suavemente para o topo da página
  const closeMenu = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Verificação precisa de rota ativa (suporta rotas exatas e sub-rotas)
  const isRouteActive = (route) => {
    if (route === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === route || pathname.startsWith(`${route}/`);
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
    <>
      {/* 1. TOPO MÓVEL (Visível apenas em dispositivos móveis - hidden em md:) */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 rounded-xl">
            <Image
              src="/assets/image/logo-17bpm.png"
              alt="Logo 17º BPM"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white">17º BPM</h1>
            <p className="text-[9px] text-slate-400 font-mono">Gestão Operacional</p>
          </div>
        </div>

        {/* Botão Hambúrguer */}
        <button
          onClick={toggleMenu}
          className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700 transition cursor-pointer"
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 2. OVERLAY ESCURO (Para fechar ao clicar fora no mobile) */}
      {isOpen && (
        <div 
          onClick={closeMenu} 
          className="md:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40"
        />
      )}

      {/* 3. SIDEBAR (Fixa em Desktop / Deslizante no Mobile) */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-50 md:z-auto
          w-64 md:w-full h-full bg-slate-900 border-r md:border border-slate-800 
          md:rounded-2xl p-4 flex flex-col justify-between container-sombrio select-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* Cabeçalho / Logo (Visível apenas em Desktop) */}
          <div className="hidden md:flex items-center gap-3 px-2 py-3 mb-5 relative">
            <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 rounded-xl shadow-sm shadow-blue-500/10 flex items-center justify-center shrink-0">
              <Image
                src="/assets/image/logo-17bpm.png"
                alt="Logo 17º BPM"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">17º BPM</h1>
              <p className="text-[10px] text-slate-400 font-mono">Gestão Operacional</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>

          {/* Botão Fechar para Mobile dentro da Sidebar */}
          <div className="md:hidden flex justify-between items-center pb-4 mb-4 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navegação</span>
            <button onClick={closeMenu} className="text-slate-400 hover:text-white p-1 cursor-pointer">
              <X size={18} />
            </button>
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
                      <Link key={iIdx} href={item.href} onClick={closeMenu} className="block">
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
        <div className="relative pt-4 mt-auto">
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
    </>
  );
}