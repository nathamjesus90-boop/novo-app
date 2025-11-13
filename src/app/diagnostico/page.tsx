'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, AlertCircle, TrendingUp, Lock, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { DiagnosticoIA } from '@/lib/types';
import { analisarFotosIA } from '@/lib/ai-mock';

export default function DiagnosticoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [diagnostico, setDiagnostico] = useState<DiagnosticoIA | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    // Recupera dados do localStorage
    const onboardingData = localStorage.getItem('onboardingData');
    const photos = localStorage.getItem('photos');

    if (!onboardingData || !photos) {
      router.push('/onboarding');
      return;
    }

    // Simula análise da IA
    const photosData = JSON.parse(photos);
    analisarFotosIA(photosData.frontal, photosData.topo, photosData.lateral)
      .then(resultado => {
        setDiagnostico(resultado);
        setLoading(false);
      });
  }, [router]);

  // Timer de urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading || !diagnostico) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#0B69FF] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analisando seu cabelo...</h2>
          <p className="text-gray-600">Nossa IA está processando suas fotos</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-[#27AE60]';
    if (score >= 60) return 'text-[#F5C84F]';
    if (score >= 45) return 'text-[#FF4C29]';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-[#27AE60]';
    if (score >= 60) return 'bg-[#F5C84F]';
    if (score >= 45) return 'bg-[#FF4C29]';
    return 'bg-red-600';
  };

  const getUrgenciaText = (nivel: string) => {
    switch (nivel) {
      case 'baixo': return 'Manutenção preventiva';
      case 'medio': return 'Atenção necessária';
      case 'alto': return 'Tratamento urgente';
      case 'critico': return 'Intervenção imediata';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#0B69FF]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0B69FF] to-[#27AE60] bg-clip-text text-transparent">
              CAPILIZEIA
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#FF4C29] text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
            <Clock className="w-4 h-4" />
            <span>{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Score Principal */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 border-2 border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#27AE60]/10 text-[#27AE60] px-4 py-2 rounded-full text-sm font-bold mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Análise Concluída
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              Seu Diagnóstico Capilar
            </h1>
            
            {/* Score Total */}
            <div className="relative inline-block">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-8 border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div 
                  className={`absolute inset-0 ${getScoreBgColor(diagnostico.health_score_total)}`}
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((diagnostico.health_score_total / 100) * 2 * Math.PI)}% ${50 - 50 * Math.cos((diagnostico.health_score_total / 100) * 2 * Math.PI)}%, 100% 100%, 0% 100%)`,
                    opacity: 0.2
                  }}
                />
                <div className="relative z-10">
                  <div className={`text-5xl sm:text-6xl font-black ${getScoreColor(diagnostico.health_score_total)}`}>
                    {diagnostico.health_score_total}
                  </div>
                  <div className="text-sm text-gray-600 font-bold">de 100</div>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-600 mt-6">
              Nível de urgência: <span className={`font-black ${getScoreColor(diagnostico.health_score_total)}`}>
                {getUrgenciaText(diagnostico.nivel_urgencia)}
              </span>
            </p>
          </div>

          {/* Problemas Detectados */}
          {diagnostico.problemas_principais.length > 0 && (
            <div className="bg-[#FF4C29]/5 border-2 border-[#FF4C29]/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-[#FF4C29]" />
                <h3 className="text-xl font-black text-gray-900">Problemas Detectados</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {diagnostico.problemas_principais.map((problema, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-[#FF4C29] rounded-full" />
                    <span className="font-medium">{problema}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Análise Detalhada - Preview */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Queda</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBgColor(diagnostico.queda_score)}`}
                    style={{ width: `${diagnostico.queda_score}%` }}
                  />
                </div>
                <span className={`text-lg font-black ${getScoreColor(diagnostico.queda_score)}`}>
                  {diagnostico.queda_score}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Densidade</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBgColor(diagnostico.densidade_score)}`}
                    style={{ width: `${diagnostico.densidade_score}%` }}
                  />
                </div>
                <span className={`text-lg font-black ${getScoreColor(diagnostico.densidade_score)}`}>
                  {diagnostico.densidade_score}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Oleosidade</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBgColor(diagnostico.oleosidade_score)}`}
                    style={{ width: `${diagnostico.oleosidade_score}%` }}
                  />
                </div>
                <span className={`text-lg font-black ${getScoreColor(diagnostico.oleosidade_score)}`}>
                  {diagnostico.oleosidade_score}
                </span>
              </div>
            </div>
          </div>

          {/* Recomendações - Preview Bloqueado */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10 flex items-end justify-center pb-8">
              <div className="text-center">
                <Lock className="w-12 h-12 text-[#0B69FF] mx-auto mb-4" />
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Desbloqueie sua rotina completa
                </h3>
                <p className="text-gray-600 mb-4">
                  Veja todas as recomendações + rotina de 30 dias
                </p>
              </div>
            </div>

            <div className="blur-sm pointer-events-none">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#27AE60]" />
                Recomendações Personalizadas
              </h3>
              <div className="space-y-3">
                {diagnostico.recomendacoes.slice(0, 3).map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 border-2 border-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-[#27AE60] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Paywall */}
        <div className="bg-gradient-to-br from-[#0B69FF] to-[#27AE60] rounded-3xl shadow-2xl p-8 sm:p-12 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF4C29] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            <Clock className="w-4 h-4" />
            50% OFF expira em {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Sua transformação começa agora
          </h2>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Desbloqueie sua rotina completa de 30 dias + cronograma H/N/R + lembretes diários
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">Rotina personalizada</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">Lembretes no WhatsApp</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">Evolução mensal</span>
            </div>
          </div>

          <Link
            href="/planos"
            className="inline-flex items-center gap-3 bg-[#FF4C29] hover:bg-[#ff3d1a] text-white px-12 py-6 rounded-2xl text-xl font-black shadow-2xl hover:shadow-[#FF4C29]/50 transition-all duration-300 hover:scale-105"
          >
            DESBLOQUEAR MINHA ROTINA — 50% OFF HOJE
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-sm text-white/80 mt-4">
            🔒 Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </div>
      </main>
    </div>
  );
}
