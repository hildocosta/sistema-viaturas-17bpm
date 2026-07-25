"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Car, ChevronRight, ChevronLeft, Save, Edit3, ArrowLeft } from "lucide-react";

import Sidebar from "@/components/sidebar/page";
import FormStepper from "@/components/FormStepper"; 
import EditViaturaModal from "@/components/viaturas/EditViaturaModal";
import { DashboardWrapper, SidebarArea, MainContent, ContentScrollArea } from "@/components/ui/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { SuccessAlert } from "@/components/ui/SuccessAlert";

// Import das etapas isoladas
import { IdentificacaoStep } from "@/components/viaturas/steps/IdentificacaoStep";
import { EspecificacoesStep } from "@/components/viaturas/steps/EspecificacoesStep";
import { StatusObservacoesStep } from "@/components/viaturas/steps/StatusObservacoesStep";

const STEPS = [
  { id: 1, title: "Identificação", desc: "Dados operacionais" },
  { id: 2, title: "Especificações", desc: "Dados do veículo" },
  { id: 3, title: "Status & Notas", desc: "Condições e detalhes" },
];

export default function EditarViaturaPage() {
  const router = useRouter();
  const params = useParams();
  const viaturaId = params?.id;

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [viaturaParaEditar, setViaturaParaEditar] = useState(null);

  const [formData, setFormData] = useState({
    id: viaturaId || "1",
    prefixo: "M-1701",
    tipoViatura: "Rádio Patrulha (RPA)",
    companhia: "1ª Cia - Araucária",
    subunidade: "1ª Cia - Araucária",
    placa: "ABC1D23",
    marca: "Renault",
    modelo: "Duster Oroch",
    ano: 2022,
    kmAtual: "45200",
    combustivel: "Flex",
    situacao: "Operacional",
    status: "Pronta",
    observacoes: "Veículo com revisão em dia. Possui protetor de cárter reforçado e sinalizador em LED."
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSalvarEdicao = (dadosAtualizados) => {
    setFormData((prev) => ({ ...prev, ...dadosAtualizados }));
    setViaturaParaEditar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
      
      setTimeout(() => {
        router.push(`/dashboard/viaturas/${viaturaId}`);
      }, 1500);
    }, 800);
  };

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        <PageHeader
          icon={Car}
          title={`Editar Viatura — ${formData.prefixo}`}
          description="17º Batalhão de Polícia Militar — Atualização de Ficha de Cadastro"
          action={
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/viaturas/${viaturaId}`}>
                <SecondaryButton icon={ArrowLeft}>Voltar</SecondaryButton>
              </Link>
              <SecondaryButton 
                icon={Edit3} 
                onClick={() => setViaturaParaEditar(formData)}
              >
                Edição Rápida
              </SecondaryButton>
            </div>
          }
        />

        <ContentScrollArea>
          <div className="max-w-3xl mx-auto space-y-6">
            <FormStepper steps={STEPS} currentStep={currentStep} />

            {sucesso && (
              <SuccessAlert 
                title="Viatura atualizada com sucesso!" 
                description="Redirecionando para o prontuário..." 
              />
            )}

            <form onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 min-h-70">
                {currentStep === 1 && (
                  <IdentificacaoStep formData={formData} onChange={handleChange} />
                )}
                {currentStep === 2 && (
                  <EspecificacoesStep formData={formData} onChange={handleChange} />
                )}
                {currentStep === 3 && (
                  <StatusObservacoesStep formData={formData} onChange={handleChange} />
                )}
              </div>

              {/* Controles de Navegação do Stepper */}
              <div className="flex items-center justify-between">
                <SecondaryButton
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  icon={ChevronLeft}
                >
                  Anterior
                </SecondaryButton>

                <div className="flex items-center gap-3">
                  {currentStep < 3 ? (
                    <PrimaryButton type="submit" icon={ChevronRight}>
                      Próximo
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      type="submit"
                      disabled={loading || sucesso}
                      icon={Save}
                    >
                      {loading ? "Salvando Alterações..." : "Salvar Alterações"}
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </form>
          </div>
        </ContentScrollArea>

        <EditViaturaModal 
          viaturaParaEditar={viaturaParaEditar}
          setViaturaParaEditar={setViaturaParaEditar}
          handleSalvarEdicao={handleSalvarEdicao}
        />
      </MainContent>
    </DashboardWrapper>
  );
}