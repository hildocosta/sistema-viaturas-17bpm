"use client";

import React from "react";
import { 
  Car, 
  LayoutDashboard, 
  Shield, 
  FileText, 
  Wrench, 
  Settings 
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-full w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
      <div>
        {/* Cabeçalho do BPM */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wider">17º BPM</h2>
            <p className="text-[10px] text-slate-400 font-mono">GESTÃO DE FROTA</p>
          </div>
        </div>

        {/* Menu Principal */}
        <nav className="space-y-1">
          <Link href="/dashboard/viaturas" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 font-medium text-xs transition-all">
            <Car size={16} />
            <span>Viaturas</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-xs transition-all">
            <LayoutDashboard size={16} />
            <span>Painel Geral</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-xs transition-all">
            <Wrench size={16} />
            <span>Manutenções</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-xs transition-all">
            <FileText size={16} />
            <span>Relatórios P4</span>
          </a>
        </nav>
      </div>

      {/* Roda-pé da Sidebar */}
      <div className="border-t border-slate-800/60 pt-4">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-300 font-medium text-xs transition-all">
          <Settings size={16} />
          <span>Configurações</span>
        </a>
      </div>
    </aside>
  );
}