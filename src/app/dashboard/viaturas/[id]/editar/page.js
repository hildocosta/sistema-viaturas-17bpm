"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Car, ChevronRight, ChevronLeft, Save, Edit3, ArrowLeft } from "lucide-react";

import Sidebar from "@/components/sidebar/page";
import FormStepper from "@/components/viaturas/FormStepper"; 
import EditViaturaModal from "@/components/viaturas/EditViaturaModal";
import { DashboardWrapper, SidebarArea, MainContent, ContentScrollArea } from "@/components/ui/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { SuccessAlert } from "@/components/ui/SuccessAlert";

// Steps do Formulário de Viatura
import { 
  StepIdentificacao, 
  StepEspecificacoes, 
  StepCondicoes 
} from "@/components/viaturas/ViaturaFormSteps";

const STEPS = [
  { id: 1, title: "Identificação", desc: "Dados operacionais" },
  { id: 2, title: "Especificações", desc: "Dados do veículo" },
  { id: 3, title: "Status & Notas", desc: "Condições e detalhes" },
];

export default function EditarViaturaPage() {
  const router = useRouter();
  const params = useParams();
  
  const viaturaId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [viaturaParaEditar, setViaturaParaEditar] = useState(null);

  const [formData, setFormData] = useState(() => ({
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
  }));

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
        router.push(`/dashboard/viaturas/${viaturaId || "1"}`);
      }, 1500);
    }, 800);
  };

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        {/* Header Responsivo */}
        <div className="pb-3 border-b border-slate-800/80 mb-3 shrink-0">
          <PageHeader
            icon={Car}
            title={`Editar Viatura — ${formData.prefixo}`}
            description="17º Batalhão de Polícia Militar — Atualização de Ficha de Cadastro"
            action={
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Link href={`/dashboard/viaturas/${viaturaId || "1"}`} className="w-full sm:w-auto">
                  <SecondaryButton icon={ArrowLeft} className="w-full justify-center">
                    Voltar
                  </SecondaryButton>
                </Link>
                <SecondaryButton 
                  icon={Edit3} 
                  onClick={() => setViaturaParaEditar(formData)}
                  className="w-full sm:w-auto justify-center"
                >
                  <span className="hidden sm:inline">Edição Rápida</span>
                  <span className="sm:hidden">Rápida</span>
                </SecondaryButton>
              </div>
            }
          />
        </div>

        {/* Conteúdo Rolável */}
        <ContentScrollArea>
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-6">
            
            {/* Stepper Responsivo */}
            <div className="overflow-x-auto pb-2 custom-scrollbar">
              <FormStepper steps={STEPS} currentStep={currentStep} />
            </div>

            {/* Alerta de Sucesso */}
            {sucesso && (
              <SuccessAlert 
                title="Viatura atualizada com sucesso!" 
                description="Redirecionando para o prontuário..." 
              />
            )}

            {/* Formulário de Etapas */}
            <form onSubmit={currentStep === 3 ? handleSubmit : handleNext} className="space-y-4">
              <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 sm:p-6 min-h-80 backdrop-blur-md">
                {currentStep === 1 && (
                  <StepIdentificacao formData={formData} handleChange={handleChange} />
                )}
                {currentStep === 2 && (
                  <StepEspecificacoes formData={formData} handleChange={handleChange} />
                )}
                {currentStep === 3 && (
                  <StepCondicoes formData={formData} handleChange={handleChange} />
                )}
              </div>

              {/* Controles de Navegação */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <SecondaryButton
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  icon={ChevronLeft}
                  className="px-3 sm:px-4"
                >
                  Anterior
                </SecondaryButton>

                <div className="flex items-center gap-2">
                  {currentStep < 3 ? (
                    <PrimaryButton type="submit" icon={ChevronRight} className="px-4 sm:px-5">
                      Próximo
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      type="submit"
                      disabled={loading || sucesso}
                      icon={Save}
                      className="px-4 sm:px-5"
                    >
                      {loading ? "Salvando..." : "Salvar Alterações"}
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </form>
          </div>
        </ContentScrollArea>

        {/* Modal de Edição Rápida */}
        <EditViaturaModal 
          viaturaParaEditar={viaturaParaEditar}
          setViaturaParaEditar={setViaturaParaEditar}
          handleSalvarEdicao={handleSalvarEdicao}
        />
      </MainContent>
    </DashboardWrapper>
  );
}