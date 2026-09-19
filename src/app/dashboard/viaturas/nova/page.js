"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, ArrowLeft, ChevronRight, ChevronLeft, Check, ShieldAlert } from "lucide-react";

import Sidebar from "@/components/sidebar/page";
import FormStepper from "@/components/viaturas/FormStepper";

import { 
  DashboardWrapper, 
  SidebarArea, 
  MainContent,
  ContentScrollArea
} from "@/components/layout/DashboardLayout";

import { PageHeader } from "@/components/ui/PageHeader";
import { SuccessAlert } from "@/components/ui/StateFeedback";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/ui/Button";

const STEPS = [
  { id: 1, title: "Lotação & Geral", desc: "Identificação, placa e local" },
  { id: 2, title: "Documentação & Specs", desc: "Chassi, marca e renavam" },
  { id: 3, title: "Características & Rádio", desc: "Equipamentos, frota e AVL" },
  { id: 4, title: "Uso & Valores", desc: "KM, FIPE e débitos" },
  { id: 5, title: "Condições & Links", desc: "Estado, pasta digital e notas" },
];

export default function NovaViaturaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroMsg, setErroMsg] = useState("");

  const [formData, setFormData] = useState({
    // Step 1: Lotação e Identificação Geral
    prefixo: "",
    placa: "",
    patrimonio: "",
    subunidade: "1ª Cia - São José dos Pinhais",
    municipio: "São José dos Pinhais",
    atividadePredominante: "Patrulhamento Ostensivo",
    status: "Ativa",
    frotaCriterioGpm: "Sim",

    // Step 2: Documentação & Especificações
    marca: "",
    modelo: "",
    renavam: "",
    chassi: "",
    anoFabricacao: new Date().getFullYear(),
    anoModelo: new Date().getFullYear(),
    cor: "",
    cnpj: "",

    // Step 3: Características, Propriedade e Rádio
    propriedade: "Própria",
    especie: "Automóvel",
    tipoFrota: "Própria",
    combustivel: "Flex",
    blindagem: "Não",
    empregoExclusivo: "Não",
    plaquetaRadio: "",
    serialRadio: "",
    avl: "",

    // Step 4: Rodagem & Valores Financeiros
    km: "",
    dataKm: "",
    fipe: "",
    dataFipe: "",
    debitos: "0.00",
    dataDebitos: "",

    // Step 5: Condições Físicas & Registros
    estadoConservacao: "Bom",
    dataConservacao: "",
    pastaDigital: "",
    idViaturaPlanilha: "",
    observacao: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validação manual por etapa antes de prosseguir
  const handleNextStep = () => {
    setErroMsg("");

    // Validações específicas do Passo 1
    if (currentStep === 1) {
      if (!formData.prefixo.trim()) {
        setErroMsg("O campo Prefixo é obrigatório para continuar.");
        return;
      }
    }

    // Avançar passo
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErroMsg("");
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErroMsg("");

    try {
      const response = await fetch("/api/viaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar a viatura.");
      }

      setSucesso(true);
      setTimeout(() => {
        router.push("/dashboard/viaturas");
      }, 1500);

    } catch (error) {
      setErroMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 bg-slate-950/70 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-slate-600";
  const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1";

  return (
    <DashboardWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainContent>
        {/* Cabeçalho Fixo */}
        <div className="pb-3 border-b border-slate-800/80 mb-3 shrink-0">
          <PageHeader
            icon={Car}
            title="Cadastro Completo de Viatura"
            description="17º Batalhão de Polícia Militar — Gestão de Frota"
            action={
              <Link href="/dashboard/viaturas">
                <IconButton icon={ArrowLeft} title="Voltar para a lista" />
              </Link>
            }
          />
        </div>

        {/* Área Rolar Conteúdo e Formulário */}
        <ContentScrollArea className="flex-1 w-full flex flex-col justify-between max-w-4xl mx-auto space-y-4">
          <div className="space-y-4">
            
            {/* Indicador de Passos */}
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-xl border border-slate-800 shadow-sm backdrop-blur-sm overflow-x-auto">
              <FormStepper steps={STEPS} currentStep={currentStep} />
            </div>

            {sucesso && (
              <SuccessAlert
                title="Viatura cadastrada com sucesso!"
                description="Redirecionando para o inventário..."
              />
            )}

            {erroMsg && (
              <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-800/80 text-red-200 rounded-xl text-xs">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{erroMsg}</span>
              </div>
            )}

            <form id="viatura-form" onSubmit={handleSubmit}>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
                
                {/* STEP 1: Lotação, Placa e Identificação */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-medium text-slate-100">1. Identificação Geral & Lotação</h3>
                      <p className="text-[11px] text-slate-400">Dados cadastrais primários e emprego tático.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      <div>
                        <label className={labelClass}>Prefixo <span className="text-red-400">*</span></label>
                        <input type="text" name="prefixo" value={formData.prefixo} onChange={handleChange} placeholder="Ex: L1701" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Placa</label>
                        <input type="text" name="placa" value={formData.placa} onChange={handleChange} placeholder="Ex: ABC-1D23" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Nº do Patrimônio</label>
                        <input type="text" name="patrimonio" value={formData.patrimonio} onChange={handleChange} placeholder="Ex: PAT-98765" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Subunidade</label>
                        <input type="text" name="subunidade" value={formData.subunidade} onChange={handleChange} placeholder="Ex: 1ª Cia" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Município</label>
                        <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} placeholder="Ex: São José dos Pinhais" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Status Atual</label>
                        <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                          <option value="Disponível" className="bg-slate-900">Disponível</option>
                          <option value="Indisponível" className="bg-slate-900">Indisponível</option>
                          <option value="Manutenção" className="bg-slate-900">Manutenção</option>
                          <option value="Inoperante" className="bg-slate-900">Inoperante</option>
                          <option value="Recolhida" className="bg-slate-900">Recolhida</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Atividade Predominante</label>
                        <input type="text" name="atividadePredominante" value={formData.atividadePredominante} onChange={handleChange} placeholder="Ex: Patrulhamento Ostensivo" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Critério GPM</label>
                        <select name="frotaCriterioGpm" value={formData.frotaCriterioGpm} onChange={handleChange} className={inputClass}>
                          <option value="Ativa" className="bg-slate-900">Ativa</option>
                          <option value="Não" className="bg-slate-900">Não</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Especificações Técnicas e Registros */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-medium text-slate-100">2. Documentação & Especificações</h3>
                      <p className="text-[11px] text-slate-400">Marca, modelo e registros do Detran.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      <div>
                        <label className={labelClass}>Marca</label>
                        <input type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Ex: Renault" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Modelo</label>
                        <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ex: Duster 2.0" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Cor</label>
                        <input type="text" name="cor" value={formData.cor} onChange={handleChange} placeholder="Ex: Caracterizada PMPR" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>RENAVAM</label>
                        <input type="text" name="renavam" value={formData.renavam} onChange={handleChange} placeholder="Apenas números" className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Chassi</label>
                        <input type="text" name="chassi" value={formData.chassi} onChange={handleChange} placeholder="Código do Chassi" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Ano Fabricação</label>
                        <input type="number" name="anoFabricacao" value={formData.anoFabricacao} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Ano Modelo</label>
                        <input type="number" name="anoModelo" value={formData.anoModelo} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>CNPJ do Proprietário</label>
                        <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="CNPJ vinculado" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Propriedade, Equipamentos e Rádio */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-medium text-slate-100">3. Características & Equipamentos Embarcados</h3>
                      <p className="text-[11px] text-slate-400">Tipo de frota, dispositivos de rádio e AVL.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Propriedade</label>
                        <input type="text" name="propriedade" value={formData.propriedade} onChange={handleChange} placeholder="Ex: SESP / Locada" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Espécie</label>
                        <input type="text" name="especie" value={formData.especie} onChange={handleChange} placeholder="Ex: Passag / Carga" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Tipo de Frota</label>
                        <input type="text" name="tipoFrota" value={formData.tipoFrota} onChange={handleChange} placeholder="Ex: Operacional" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Combustível</label>
                        <select name="combustivel" value={formData.combustivel} onChange={handleChange} className={inputClass}>
                          <option value="Flex" className="bg-slate-900">Flex - Gasolina / Alcool</option>
                          <option value="Gasolina" className="bg-slate-900">Gasolina</option>
                          <option value="Diesel" className="bg-slate-900">Diesel</option>
                          <option value="Elétrico" className="bg-slate-900">Elétrico</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Blindagem</label>
                        <select name="blindagem" value={formData.blindagem} onChange={handleChange} className={inputClass}>
                          <option value="Não" className="bg-slate-900">Não</option>
                          <option value="Parcial" className="bg-slate-900">Parcial</option>
                          <option value="Sim" className="bg-slate-900">Sim</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Emprego Exclusivo</label>
                        <select name="empregoExclusivo" value={formData.empregoExclusivo} onChange={handleChange} className={inputClass}>
                          <option value="Não" className="bg-slate-900">Não</option>
                          <option value="Patrulha Rural" className="bg-slate-900">Patrulha Rural</option>
                          <option value="Patrulha Maria da Penha" className="bg-slate-900">Patrulha Maria da Penha</option>
                          <option value="Sim" className="bg-slate-900">Sim</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Plaqueta Rádio</label>
                        <input type="text" name="plaquetaRadio" value={formData.plaquetaRadio} onChange={handleChange} placeholder="Cód. Plaqueta" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Serial Rádio</label>
                        <input type="text" name="serialRadio" value={formData.serialRadio} onChange={handleChange} placeholder="Nº de Série" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Módulo AVL (GPS)</label>
                        <input type="text" name="avl" value={formData.avl} onChange={handleChange} placeholder="ID do rastreador" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Uso, FIPE e Valores */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-medium text-slate-100">4. Uso, Tabela FIPE & Financeiro</h3>
                      <p className="text-[11px] text-slate-400">Hodômetro, avaliação FIPE e débitos pendentes.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>Quilometragem (KM)</label>
                        <input 
                          type="text" 
                          name="km" 
                          value={formData.km} 
                          onChange={handleChange} 
                          placeholder="Ex: 61.026 ou 61026" 
                          className={inputClass} 
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Data Leitura KM</label>
                        <input type="date" name="dataKm" value={formData.dataKm} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Valor FIPE (R$)</label>
                        <input type="number" step="0.01" name="fipe" value={formData.fipe} onChange={handleChange} placeholder="0.00" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Data Consulta FIPE</label>
                        <input type="date" name="dataFipe" value={formData.dataFipe} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Débitos Pendentes (R$)</label>
                        <input type="number" step="0.01" name="debitos" value={formData.debitos} onChange={handleChange} placeholder="0.00" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Data Consulta Débitos</label>
                        <input type="date" name="dataDebitos" value={formData.dataDebitos} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Estado de Conservação, Pasta Digital e Notas */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-medium text-slate-100">5. Condições Físicas, Links & Vínculos</h3>
                      <p className="text-[11px] text-slate-400">Estado de conservação, pasta digital e notas adicionais.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className={labelClass}>Estado de Conservação</label>
                        <select name="estadoConservacao" value={formData.estadoConservacao} onChange={handleChange} className={inputClass}>
                          <option value="Ótimo" className="bg-slate-900">Ótimo</option>
                          <option value="Bom" className="bg-slate-900">Bom</option>
                          <option value="Regular" className="bg-slate-900">Regular</option>
                          <option value="Péssimo" className="bg-slate-900">Péssimo</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Data da Vistoria</label>
                        <input type="date" name="dataConservacao" value={formData.dataConservacao} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Link Pasta Digital</label>
                        <input type="text" name="pastaDigital" value={formData.pastaDigital} onChange={handleChange} placeholder="URL da pasta no Drive/Nuvem" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>ID Viatura Planilha Original</label>
                        <input type="text" name="idViaturaPlanilha" value={formData.idViaturaPlanilha} onChange={handleChange} placeholder="Ex: SGF-123" className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Observações Gerais</label>
                        <textarea
                          name="observacao"
                          rows={3}
                          value={formData.observacao}
                          onChange={handleChange}
                          placeholder="Histórico de avarias, avarias de pintura ou pendências..."
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Botões de Navegação */}
          <div className="flex items-center justify-between pt-4 pb-2 border-t border-slate-800/60 mt-auto">
            <SecondaryButton
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              icon={ChevronLeft}
            >
              Anterior
            </SecondaryButton>

            <div className="flex items-center gap-3">
              {currentStep < STEPS.length ? (
                <PrimaryButton 
                  type="button" 
                  onClick={handleNextStep}
                  icon={ChevronRight} 
                  iconPosition="right"
                >
                  Próximo
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  type="submit"
                  form="viatura-form"
                  variant="success"
                  disabled={loading || sucesso}
                  icon={Check}
                >
                  {loading ? "Salvando..." : "Concluir Cadastro"}
                </PrimaryButton>
              )}
            </div>
          </div>
        </ContentScrollArea>
      </MainContent>
    </DashboardWrapper>
  );
}