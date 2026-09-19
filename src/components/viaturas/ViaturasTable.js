"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/page";
import ViaturasTable from "@/components/ViaturasTable"; // Ajuste o caminho do seu componente
import { Plus, Car } from "lucide-react";
import Link from "next/link";

export default function ViaturasPage() {
  const [viaturas, setViaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarViaturas() {
      try {
        setLoading(true);
        const res = await fetch("/api/viaturas");
        if (!res.ok) throw new Error("Erro ao carregar");
        const data = await res.json();
        setViaturas(data);
      } catch (err) {
        // Dados Mockados para contingência
        setViaturas([
          {
            id: "1",
            prefixo: "L0117",
            placa: "ABC-1234",
            modelo: "Toyota Hilux SW4",
            ano: 2022,
            subunidade: "ROTAM / 17º BPM",
            kmAtual: 34200,
            status: "PRONTA",
            custoTotalManutencao: 2400.00
          },
          {
            id: "2",
            prefixo: "L0204",
            placa: "DEF-5678",
            modelo: "Renault Duster",
            ano: 2021,
            subunidade: "1ª Cia / SJP",
            kmAtual: 68500,
            status: "MANUTENCAO",
            custoTotalManutencao: 5120.00
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    carregarViaturas();
  }, []);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor || 0);
  };

  const handleEdit = (viatura) => {
    console.log("Editar viatura:", viatura);
    // Adicione a lógica de abertura do modal de edição aqui
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      
      {/* 1. Sidebar e Menu Mobile do Topo */}
      <div className="w-full lg:w-80 h-auto lg:h-full shrink-0">
        <Sidebar />
      </div>

      {/* 2. Área Principal de Conteúdo */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 min-w-0">
        
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
              <Car className="text-blue-500 shrink-0" size={24} />
              <span>Gestão de Viaturas</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Consulte e gira a frota de veículos cadastrados.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <Link href="/dashboard/viaturas/nova" className="w-full sm:w-auto block">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                <Plus size={16} />
                <span>Nova Viatura</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tabela / Cards de Viaturas */}
        {loading ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            Carregando lista de viaturas...
          </div>
        ) : (
          <ViaturasTable 
            viaturas={viaturas} 
            formatarMoeda={formatarMoeda} 
            onEdit={handleEdit} 
          />
        )}

      </main>
    </div>
  );
}