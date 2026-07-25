"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Car, Plus } from "lucide-react";

import Sidebar from "@/components/sidebar/page";
import ViaturaFilters from "@/components/viaturas/ViaturaFilters";
import ViaturaCard from "@/components/viaturas/ViaturaCard";
import ViaturasTable from "@/components/viaturas/ViaturasTable";
import EditViaturaModal from "@/components/viaturas/EditViaturaModal";

import { 
  DashboardWrapper, 
  SidebarArea, 
  MainContent, 
  ContentScrollArea, 
  CardsGrid 
} from "@/components/ui/PageLayout";

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

  // Recebe os dados do formulário do modal para atualizar a lista local
  const handleSalvarEdicao = (dadosAtualizados) => {
    setViaturas((prev) =>
      prev.map((item) => 
        item.id === dadosAtualizados.id ? { ...item, ...dadosAtualizados } : item
      )
    );
    setViaturaParaEditar(null);
  };

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        <PageHeader
          icon={Car}
          title="Frota de Viaturas Cadastradas"
          description="Gestão de veículos, controle de rodagem e status de prontidão operacional."
          action={
            <Link href="/dashboard/viaturas/nova">
              <PrimaryButton icon={Plus}>Nova Viatura</PrimaryButton>
            </Link>
          }
        />

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

        <ContentScrollArea>
          {loading ? (
            <LoadingState message="Carregando frota de viaturas..." />
          ) : viaturasFiltradas.length === 0 ? (
            <EmptyState 
              title="Nenhuma viatura encontrada" 
              description="Tente ajustar os termos de pesquisa ou remover os filtros aplicados." 
            />
          ) : viewMode === "grid" ? (
            <CardsGrid>
              {viaturasFiltradas.map((item) => (
                <ViaturaCard 
                  key={item.id} 
                  item={item} 
                  formatarMoeda={formatarMoeda}
                  onEdit={setViaturaParaEditar}
                />
              ))}
            </CardsGrid>
          ) : (
            <ViaturasTable 
              viaturas={viaturasFiltradas} 
              formatarMoeda={formatarMoeda} 
              onEdit={setViaturaParaEditar} 
            />
          )}
        </ContentScrollArea>

        {/* Modal de Edição de Viatura */}
        <EditViaturaModal 
          viaturaParaEditar={viaturaParaEditar} 
          setViaturaParaEditar={setViaturaParaEditar} 
          handleSalvarEdicao={handleSalvarEdicao} 
        />
      </MainContent>
    </DashboardWrapper>
  );
}