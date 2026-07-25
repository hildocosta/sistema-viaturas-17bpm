'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Car, 
  Hash, 
  Fuel, 
  Calendar, 
  Gauge, 
  Building2,
  Check,
  ChevronRight,
  ChevronLeft,
  Wrench,
  LayoutDashboard,
  FileText,
  Settings,
  Shield,
  Save
} from 'lucide-react';

export default function EditarViaturaPage() {
  const router = useRouter();
  const params = useParams();
  const viaturaId = params?.id;

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Estado do formulário pré-preenchido com dados simulados/existentes
  const [formData, setFormData] = useState({
    // Step 1: Identificação
    prefixo: 'M-1701',
    tipoViatura: 'Rádio Patrulha (RPA)',
    companhia: '1ª Cia - Araucária',
    
    // Step 2: Dados Veiculares
    placa: 'ABC1D23',
    marca: 'Renault',
    modelo: 'Duster Oroch',
    ano: 2022,
    kmAtual: '45200',
    combustivel: 'Flex',
    
    // Step 3: Estado & Observações
    situacao: 'Operacional',
    observacoes: 'Veículo com revisão em dia. Possui protetor de cárter reforçado e sinalizador em LED.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de requisição de atualização (PUT/PATCH)
    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
      
      setTimeout(() => {
        router.push(`/dashboard/viaturas/${viaturaId}`);
      }, 1500);
    }, 800);
  };

  const steps = [
    { id: 1, title: 'Identificação', desc: 'Dados operacionais' },
    { id: 2, title: 'Especificações', desc: 'Dados do veículo' },
    { id: 3, title: 'Status & Notas', desc: 'Condições e detalhes' },
  ];

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Fixa à Esquerda */}
      <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
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

      {/* Conteúdo Principal (Scrollável) */}
      <main className="flex-1 h-full overflow-y-auto p-8 container-sombrio">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Cabeçalho da Página */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <Link 
                href={`/dashboard/viaturas/${viaturaId}`} 
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-blue-400 transition-all text-slate-400"
                title="Voltar para a viatura"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Car className="text-amber-500" size={24} />
                  Editar Viatura — {formData.prefixo}
                </h1>
                <p className="text-xs text-slate-400">17º Batalhão de Polícia Militar — Atualização de Ficha</p>
              </div>
            </div>
          </div>

          {/* Stepper (Progresso das Etapas) */}
          <div className="grid grid-cols-3 gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div 
                  key={step.id} 
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    isCurrent ? 'bg-amber-500/10 border border-amber-500/30' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isCompleted ? <Check size={14} /> : step.id}
                  </div>
                  <div className="hidden sm:block overflow-hidden">
                    <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-amber-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alerta de Sucesso */}
          {sucesso && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Viatura atualizada com sucesso!</p>
                <p className="text-xs text-emerald-400/80">Redirecionando para o prontuário da viatura...</p>
              </div>
            </div>
          )}

          {/* Formulário por Etapas */}
          <form onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 min-h-[280px]">
              
              {/* STEP 1: Identificação Operacional */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                    <ShieldAlert size={16} /> Etapa 1: Identificação Operacional
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Prefixo / Código Militar *</label>
                      <div className="relative">
                        <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          name="prefixo"
                          required
                          placeholder="Ex: L0123 / M-1701"
                          value={formData.prefixo}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 uppercase placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Emprego / Tipo de Viatura</label>
                      <select
                        name="tipoViatura"
                        value={formData.tipoViatura}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Rádio Patrulha (RPA)">Rádio Patrulha (RPA)</option>
                        <option value="ROTAM">ROTAM</option>
                        <option value="P2 (Apt. Inteligência)">P2 (Apt. Inteligência)</option>
                        <option value="Trânsito">Trânsito</option>
                        <option value="Administrativo">Administrativo</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-400 mb-1">Subunidade / Cia Destino</label>
                      <div className="relative">
                        <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <select
                          name="companhia"
                          value={formData.companhia}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                        >
                          <option value="1ª Cia - Araucária">1ª Cia - Araucária</option>
                          <option value="2ª Cia - Campo Largo">2ª Cia - Campo Largo</option>
                          <option value="3ª Cia - S.J. Pinhais">3ª Cia - S.J. Pinhais</option>
                          <option value="HQ / Sede 17º BPM">HQ / Sede 17º BPM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Especificações Veiculares */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                    <Car size={16} /> Etapa 2: Especificações Veiculares
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Placa *</label>
                      <input
                        type="text"
                        name="placa"
                        required
                        placeholder="ABC1D23"
                        value={formData.placa}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 uppercase placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Marca *</label>
                      <input
                        type="text"
                        name="marca"
                        required
                        placeholder="Ex: Renault"
                        value={formData.marca}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Modelo *</label>
                      <input
                        type="text"
                        name="modelo"
                        required
                        placeholder="Ex: Duster Oroch"
                        value={formData.modelo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Ano de Fabricação *</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="number"
                          name="ano"
                          required
                          min="2000"
                          max={new Date().getFullYear() + 1}
                          value={formData.ano}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Odômetro Atual (KM) *</label>
                      <div className="relative">
                        <Gauge size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="number"
                          name="kmAtual"
                          required
                          placeholder="Ex: 45200"
                          value={formData.kmAtual}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Combustível</label>
                      <div className="relative">
                        <Fuel size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <select
                          name="combustivel"
                          value={formData.combustivel}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Flex">Flex (Gasolina/Etanol)</option>
                          <option value="Diesel">Diesel S10</option>
                          <option value="Gasolina">Gasolina</option>
                          <option value="Elétrico/Híbrido">Elétrico/Híbrido</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Status & Observações */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                    <Wrench size={16} /> Etapa 3: Condições Atualizadas e Observações
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Status Atual da Viatura</label>
                      <select
                        name="situacao"
                        value={formData.situacao}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Operacional">Operacional (Pronta para patrulhamento)</option>
                        <option value="Baixada">Baixada / Garagem</option>
                        <option value="Manutenção">Em Manutenção</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Observações de Avaria / Acessórios Especiais</label>
                      <textarea
                        name="observacoes"
                        rows={4}
                        placeholder="Informe detalhes sobre equipamentos instalados ou avarias..."
                        value={formData.observacoes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500 placeholder:text-slate-600 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Botões de Navegação do Formulário */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-4 py-2 rounded-lg border border-slate-800 text-slate-400 text-sm hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center gap-1.5"
              >
                <ChevronLeft size={16} /> Anterior
              </button>

              <div className="flex items-center gap-3">
                {currentStep < 3 ? (
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-sm transition-all flex items-center gap-1.5 shadow-lg shadow-amber-900/20"
                  >
                    Próximo <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || sucesso}
                    className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                  >
                    <Save size={16} />
                    {loading ? 'Salvando Alterações...' : 'Salvar Alterações'}
                  </button>
                )}
              </div>
            </div>
          </form>

        </div>
      </main>

    </div>
  );
}