'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { ONBOARDING_QUESTIONS } from '@/lib/constants';
import { OnboardingData, PhotoUpload } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Estado do formulário
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    consentimento: false,
    consentimentoWhatsApp: false,
    historicoQuimico: [],
  });

  // Estado das fotos
  const [photos, setPhotos] = useState<PhotoUpload>({
    frontal: null,
    topo: null,
    lateral: null,
  });

  const totalSteps = 6;

  // Handlers
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePhotoUpload = (tipo: keyof PhotoUpload, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [tipo]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simula salvamento dos dados
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Salva no localStorage para usar na próxima página
    localStorage.setItem('onboardingData', JSON.stringify(formData));
    localStorage.setItem('photos', JSON.stringify(photos));
    
    // Redireciona para diagnóstico
    router.push('/diagnostico');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.nome && formData.email && formData.telefone;
      case 2:
        return formData.objetivo;
      case 3:
        return formData.tipoCabelo;
      case 4:
        return formData.historicoQuimico && formData.historicoQuimico.length > 0;
      case 5:
        return formData.cidade && formData.rotinaAtual;
      case 6:
        return photos.frontal && photos.topo && photos.lateral && formData.consentimento;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0B69FF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#0B69FF]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#0B69FF] to-[#27AE60] bg-clip-text text-transparent">
              CAPILIZEIA
            </span>
          </div>

          <div className="text-sm font-medium text-gray-600">
            {step}/{totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-[#0B69FF] to-[#27AE60] transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12">
          
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">
                  Vamos começar! 👋
                </h1>
                <p className="text-lg text-gray-600">
                  Primeiro, precisamos conhecer você
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Seu nome completo
                </label>
                <input
                  type="text"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Maria Silva"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Seu melhor e-mail
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maria@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  WhatsApp (com DDD)
                </label>
                <input
                  type="tel"
                  value={formData.telefone || ''}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors text-base"
                />
                <p className="text-xs text-gray-500 mt-2">
                  📱 Enviaremos sua rotina e lembretes diários aqui
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Objetivo */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">
                  Qual seu maior objetivo? 🎯
                </h1>
                <p className="text-lg text-gray-600">
                  Escolha o que mais te incomoda agora
                </p>
              </div>

              <div className="grid gap-3">
                {ONBOARDING_QUESTIONS.objetivo.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, objetivo: option.value as any })}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      formData.objetivo === option.value
                        ? 'border-[#0B69FF] bg-[#0B69FF]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{option.icon}</span>
                      <span className="text-lg font-bold">{option.label}</span>
                      {formData.objetivo === option.value && (
                        <CheckCircle2 className="w-5 h-5 text-[#0B69FF] ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Tipo de Cabelo */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">
                  Qual seu tipo de cabelo? 💇‍♀️
                </h1>
                <p className="text-lg text-gray-600">
                  Isso ajuda a personalizar sua rotina
                </p>
              </div>

              <div className="grid gap-3">
                {ONBOARDING_QUESTIONS.tipoCabelo.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, tipoCabelo: option.value as any })}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      formData.tipoCabelo === option.value
                        ? 'border-[#0B69FF] bg-[#0B69FF]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{option.icon}</span>
                      <span className="text-lg font-bold">{option.label}</span>
                      {formData.tipoCabelo === option.value && (
                        <CheckCircle2 className="w-5 h-5 text-[#0B69FF] ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Histórico Químico */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">
                  Já fez química no cabelo? 🧪
                </h1>
                <p className="text-lg text-gray-600">
                  Pode selecionar mais de uma opção
                </p>
              </div>

              <div className="grid gap-3">
                {ONBOARDING_QUESTIONS.historicoQuimico.map((option) => {
                  const isSelected = formData.historicoQuimico?.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        const current = formData.historicoQuimico || [];
                        const updated = isSelected
                          ? current.filter(v => v !== option.value)
                          : [...current, option.value];
                        setFormData({ ...formData, historicoQuimico: updated });
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                        isSelected
                          ? 'border-[#0B69FF] bg-[#0B69FF]/5 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">{option.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#0B69FF] ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Cidade e Rotina */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">
                  Quase lá! 🌟
                </h1>
                <p className="text-lg text-gray-600">
                  Últimas informações importantes
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Sua cidade
                </label>
                <input
                  type="text"
                  value={formData.cidade || ''}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  placeholder="São Paulo, SP"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors text-base"
                />
                <p className="text-xs text-gray-500 mt-2">
                  🌡️ O clima influencia na saúde capilar
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Descreva sua rotina capilar atual
                </label>
                <textarea
                  value={formData.rotinaAtual || ''}
                  onChange={(e) => setFormData({ ...formData, rotinaAtual: e.target.value })}
                  placeholder="Ex: Lavo 3x por semana, uso máscara 1x por semana..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors text-base resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 6: Upload de Fotos */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-3">
                  Envie 3 fotos do seu cabelo 📸
                </h1>
                <p className="text-lg text-gray-600">
                  A IA precisa analisar diferentes ângulos
                </p>
              </div>

              {/* Upload Frontal */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  1. Foto Frontal
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload('frontal', e)}
                    className="hidden"
                    id="frontal"
                  />
                  <label
                    htmlFor="frontal"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[#0B69FF] ${
                      photos.frontal ? 'border-[#27AE60] bg-[#27AE60]/5' : 'border-gray-300'
                    }`}
                  >
                    {photos.frontal ? (
                      <div className="relative w-full h-full">
                        <img src={photos.frontal} alt="Frontal" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute top-2 right-2 bg-[#27AE60] text-white p-2 rounded-full">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Clique para enviar</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Upload Topo */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  2. Foto do Topo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload('topo', e)}
                    className="hidden"
                    id="topo"
                  />
                  <label
                    htmlFor="topo"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[#0B69FF] ${
                      photos.topo ? 'border-[#27AE60] bg-[#27AE60]/5' : 'border-gray-300'
                    }`}
                  >
                    {photos.topo ? (
                      <div className="relative w-full h-full">
                        <img src={photos.topo} alt="Topo" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute top-2 right-2 bg-[#27AE60] text-white p-2 rounded-full">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Clique para enviar</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Upload Lateral */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  3. Foto Lateral
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload('lateral', e)}
                    className="hidden"
                    id="lateral"
                  />
                  <label
                    htmlFor="lateral"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[#0B69FF] ${
                      photos.lateral ? 'border-[#27AE60] bg-[#27AE60]/5' : 'border-gray-300'
                    }`}
                  >
                    {photos.lateral ? (
                      <div className="relative w-full h-full">
                        <img src={photos.lateral} alt="Lateral" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute top-2 right-2 bg-[#27AE60] text-white p-2 rounded-full">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Clique para enviar</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Consentimentos */}
              <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentimento || false}
                    onChange={(e) => setFormData({ ...formData, consentimento: e.target.checked })}
                    className="mt-1 w-5 h-5 text-[#0B69FF] border-gray-300 rounded focus:ring-[#0B69FF]"
                  />
                  <span className="text-sm text-gray-700">
                    Autorizo o uso das minhas fotos para análise por IA e concordo com os{' '}
                    <span className="text-[#0B69FF] font-bold">Termos de Uso</span> e{' '}
                    <span className="text-[#0B69FF] font-bold">Política de Privacidade</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentimentoWhatsApp || false}
                    onChange={(e) => setFormData({ ...formData, consentimentoWhatsApp: e.target.checked })}
                    className="mt-1 w-5 h-5 text-[#0B69FF] border-gray-300 rounded focus:ring-[#0B69FF]"
                  />
                  <span className="text-sm text-gray-700">
                    Quero receber minha rotina e lembretes diários no WhatsApp
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex gap-4 mt-8 pt-6 border-t-2 border-gray-200">
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 bg-[#0B69FF] hover:bg-[#0952cc] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="flex-1 bg-[#FF4C29] hover:bg-[#ff3d1a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    Analisar Meu Cabelo
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
