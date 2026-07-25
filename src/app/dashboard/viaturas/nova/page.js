"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, ArrowLeft, ChevronRight, ChevronLeft, Check } from "lucide-react";

import Sidebar from "@/components/sidebar/page";
import FormStepper from "@/components/viaturas/FormStepper";
import { 
  StepIdentificacao, 
  StepEspecificacoes, 
  StepCondicoes 
} from "@/components/viaturas/ViaturaFormSteps";

import { 
  DashboardWrapper, 
  SidebarArea, 
  MainContent, 
  ContentScrollArea,
  FormContainer
} from "@/components/ui/PageLayout";

import { PageHeader } from "@/components/ui/PageHeader";
import { SuccessAlert } from "@/components/ui/StateFeedback";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/ui/Button";

const STEPS = [
  { id: 1, title: "Identificação", desc: "Dados operacionais" },
  { id: 2, title: "Especificações", desc: "Dados do veículo" },
  { id: 3, title: "Status & Notas", desc: "Condições e detalhes" },
];

export default function NovaViaturaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [formData, setFormData] = useState({
    prefixo: "",
    tipoViatura: "Rádio Patrulha (RPA)",
    companhia: "1ª Cia - Araucária",
    placa: "",
    marca: "",
    modelo: "",
    ano: new Date().getFullYear(),
    kmAtual: "",
    combustivel: "Flex",
    situacao: "Operacional",
    observacoes: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSucesso(true);

      setTimeout(() => {
        router.push("/dashboard/viaturas");
      }, 1500);
    }, 800);
  };

  // Objeto de renderização direta dos componentes por etapa
  const renderStep = {
    1: <StepIdentificacao formData={formData} handleChange={handleChange} />,
    2: <StepEspecificacoes formData={formData} handleChange={handleChange} />,
    3: <StepCondicoes formData={formData} handleChange={handleChange} />,
  };

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        <PageHeader
          icon={Car}
          title="Cadastro de Nova Viatura"
          description="17º Batalhão de Polícia Militar — Formulário por Etapas"
          action={
            <Link href="/dashboard/viaturas">
              <IconButton icon={ArrowLeft} title="Voltar para a lista" />
            </Link>
          }
        />

        <ContentScrollArea className="max-w-3xl mx-auto w-full space-y-6">
          <FormStepper steps={STEPS} currentStep={currentStep} />

          {sucesso && (
            <SuccessAlert
              title="Viatura cadastrada com sucesso!"
              description="Redirecionando para o inventário da frota..."
            />
          )}

          <form onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
            <FormContainer>
              {renderStep[currentStep]}
            </FormContainer>

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
                  <PrimaryButton type="submit" icon={ChevronRight} iconPosition="right">
                    Próximo
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    type="submit"
                    variant="success"
                    disabled={loading || sucesso}
                    icon={Check}
                  >
                    {loading ? "Finalizando..." : "Concluir Cadastro"}
                  </PrimaryButton>
                )}
              </div>
            </div>
          </form>
        </ContentScrollArea>
      </MainContent>
    </DashboardWrapper>
  );
}