"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Car, Plus } from "lucide-react";

import Sidebar from "@/components/sidebar/page";
import ViaturaFilters from "@/components/viaturas/ViaturaFilters";
import ViaturaCard from "@/components/viaturas/ViaturaCard";
import ViaturasTable from "@/components/viaturas/ViaturasTable";
import EditViaturaModal from "@/components/viaturas/EditViaturaModal";

import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingState, EmptyState } from "@/components/ui/StateFeedback";
import { PrimaryButton } from "@/components/ui/Button";

export default function ListaViaturasPage() {
  const [viaturas, setViaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [filtroSubunidade, setFiltroSubunidade] = useState("TODAS");
  const [viewMode, setViewMode] = useState("grid"); // "grid" ou "table"
  const [viaturaParaEditar, setViaturaParaEditar] = useState(null);

  useEffect(() => {
    async function carregarViaturas() {
      try {
        setLoading(true);
        const origin = window.location.origin;
        const res = await fetch(`${origin}/api/viaturas`);
        if (!res.ok) throw new Error("Offline");
        const data = await res.json();
        setViaturas(data);
      } catch (err) {
        // Dados de contingência caso a API não responda
        setViaturas([
          {
            id: "1",
            prefixo: "L0117",
            placa: "BEE-4R17",
            modelo: "Toyota Hilux SW4 4x4",
            ano: 2023,
            kmAtual: 34200,
            subunidade: "ROTAM / 17º BPM",
            status: "Pronta",
            custoTotalManutencao: 3300.00
          },
          {
            id: "2",
            prefixo: "L0204",
            placa: "ABC-1234",
            modelo: "Renault Duster 2.0",
            ano: 2021,
            kmAtual: 68500,
            subunidade: "1ª Cia / 17º BPM",
            status: "Em Manutenção",
            custoTotalManutencao: 5120.50
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    carregarViaturas();
  }, []);

  // Extrai lista única de subunidades dinamicamente
  const subunidades = Array.from(
    new Set(viaturas.map((v) => v.subunidade).filter(Boolean))
  );

  // Filtra as viaturas de acordo com os critérios selecionados
  const viaturasFiltradas = viaturas.filter((item) => {
    const termo = busca.toLowerCase();
    const combinaBusca = 
      item.prefixo?.toLowerCase().includes(termo) ||
      item.placa?.toLowerCase().includes(termo) ||
      item.modelo?.toLowerCase().includes(termo) ||
      item.subunidade?.toLowerCase().includes(termo);

    const combinaStatus = filtroStatus === "TODOS" || item.status === filtroStatus;
    const combinaSubunidade = filtroSubunidade === "TODAS" || item.subunidade === filtroSubunidade;

    return combinaBusca && combinaStatus && combinaSubunidade;
  });

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", { 
      style: "currency", 
      currency: "BRL" 
    }).format(valor || 0);
  };

  const handleSalvarEdicao = (dadosAtualizados) => {
    setViaturas((prev) =>
      prev.map((item) => 
        item.id === dadosAtualizados.id ? { ...item, ...dadosAtualizados } : item
      )
    );
    setViaturaParaEditar(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans p-2 sm:p-4 gap-3 sm:gap-4 antialiased">
      
      {/* Sidebar - Fixa o menu superior no mobile e a barra lateral no desktop */}
      <div className="w-full lg:w-80 h-auto lg:h-full shrink-0">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 h-full bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-800 p-3 sm:p-6 flex flex-col overflow-y-auto relative min-w-0">
        <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
          
          {/* Cabeçalho Responsivo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
            <PageHeader
              icon={Car}
              title="Frota de Viaturas"
              description="Gestão de veículos."
            />
            <div className="w-full sm:w-auto shrink-0">
               <Link href="/dashboard/viaturas/nova" className="w-full sm:w-auto block">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                <Plus size={16} />
                <span>Nova Viatura</span>
              </button>
            </Link>
            </div>
          </div>

          {/* Filtros e Seleção de Visualização */}
          <div className="w-full overflow-x-auto pb-1">
            <ViaturaFilters 
              busca={busca}
              setBusca={setBusca}
              filtroStatus={filtroStatus}
              setFiltroStatus={setFiltroStatus}
              filtroSubunidade={filtroSubunidade}
              setFiltroSubunidade={setFiltroSubunidade}
              subunidades={subunidades}
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalResultados={viaturasFiltradas.length}
            />
          </div>

          {/* Conteúdo das Viaturas */}
          <div className="w-full">
            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <LoadingState message="Carregando frota de viaturas..." />
              </div>
            ) : viaturasFiltradas.length === 0 ? (
              <div className="py-12">
                <EmptyState 
                  title="Nenhuma viatura encontrada" 
                  description="Tente ajustar os termos de pesquisa ou remover os filtros aplicados." 
                />
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {viaturasFiltradas.map((item) => (
                  <ViaturaCard 
                    key={item.id} 
                    item={item} 
                    formatarMoeda={formatarMoeda}
                    onEdit={setViaturaParaEditar}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
                <ViaturasTable 
                  viaturas={viaturasFiltradas} 
                  formatarMoeda={formatarMoeda} 
                  onEdit={setViaturaParaEditar} 
                />
              </div>
            )}
          </div>

        </div>

        {/* Modal de Edição */}
        <EditViaturaModal 
          viaturaParaEditar={viaturaParaEditar} 
          setViaturaParaEditar={setViaturaParaEditar} 
          handleSalvarEdicao={handleSalvarEdicao} 
        />
      </main>
    </div>
  );
}