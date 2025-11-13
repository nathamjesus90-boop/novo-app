'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, Shield, Users, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COPY, TESTIMONIALS } from '@/lib/constants';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 32 });
  const [vagasRestantes] = useState(12);

  // Timer de urgência real
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="font-medium">{COPY.social.usuarios}</span>
            </div>
            <div className="flex items-center gap-1 text-[#F5C84F]">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{COPY.social.nota}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B69FF] via-[#0B69FF] to-[#27AE60] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Badge de Urgência */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#FF4C29] text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              <Clock className="w-4 h-4" />
              <span>Oferta expira em: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Headline Principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center leading-tight mb-6">
            {COPY.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-center text-white/90 mb-8 max-w-3xl mx-auto font-medium">
            {COPY.hero.subheadline}
          </p>

          {/* CTA Principal */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link 
              href="/onboarding"
              className="group bg-[#FF4C29] hover:bg-[#ff3d1a] text-white px-8 sm:px-12 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-black shadow-2xl hover:shadow-[#FF4C29]/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              {COPY.hero.cta}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-white/80 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {COPY.urgencia.garantia}
            </p>
          </div>

          {/* Vagas Limitadas */}
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full">
              <p className="text-sm font-bold text-white">
                🔥 Apenas <span className="text-[#F5C84F] text-lg">{vagasRestantes}</span> {COPY.urgencia.vagas}
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-[#F5C84F]">12.847+</p>
              <p className="text-sm text-white/80">Transformações</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div>
              <p className="text-3xl font-black text-[#F5C84F]">4.9/5.0</p>
              <p className="text-sm text-white/80">Avaliação média</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div>
              <p className="text-3xl font-black text-[#F5C84F]">2.341</p>
              <p className="text-sm text-white/80">Avaliações</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4">
            Sua transformação em <span className="text-[#0B69FF]">3 passos simples</span>
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Tecnologia de IA + Ciência capilar = Resultados reais em 30 dias
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="relative bg-gradient-to-br from-[#F3F4F6] to-white p-8 rounded-3xl border-2 border-gray-200 hover:border-[#0B69FF] transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0B69FF] text-white rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                1
              </div>
              <div className="mb-4">
                <div className="w-16 h-16 bg-[#0B69FF]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-[#0B69FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Envie 3 fotos</h3>
                <p className="text-gray-600">
                  Frontal, topo e lateral. Nossa IA analisa queda, densidade, oleosidade, frizz, porosidade e quebra em 60 segundos.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="relative bg-gradient-to-br from-[#F3F4F6] to-white p-8 rounded-3xl border-2 border-gray-200 hover:border-[#27AE60] transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#27AE60] text-white rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                2
              </div>
              <div className="mb-4">
                <div className="w-16 h-16 bg-[#27AE60]/10 rounded-2xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#27AE60]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Receba seu diagnóstico</h3>
                <p className="text-gray-600">
                  Nota de saúde (0-100), problemas detectados e rotina personalizada de 30 dias com cronograma H/N/R automático.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="relative bg-gradient-to-br from-[#F3F4F6] to-white p-8 rounded-3xl border-2 border-gray-200 hover:border-[#F5C84F] transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#F5C84F] text-white rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                3
              </div>
              <div className="mb-4">
                <div className="w-16 h-16 bg-[#F5C84F]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-[#F5C84F]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Transforme seu cabelo</h3>
                <p className="text-gray-600">
                  Siga sua rotina diária, receba lembretes no WhatsApp e veja a evolução mês a mês com antes/depois.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 sm:py-24 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4">
            Resultados <span className="text-[#27AE60]">comprovados</span>
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Mais de 12 mil mulheres já transformaram seus cabelos
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Antes/Depois */}
                <div className="grid grid-cols-2 gap-2 mb-4 rounded-2xl overflow-hidden">
                  <div className="relative">
                    <img src={testimonial.antes} alt="Antes" className="w-full h-32 object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Antes
                    </div>
                  </div>
                  <div className="relative">
                    <img src={testimonial.depois} alt="Depois" className="w-full h-32 object-cover" />
                    <div className="absolute bottom-2 left-2 bg-[#27AE60] text-white text-xs px-2 py-1 rounded">
                      Depois
                    </div>
                  </div>
                </div>

                {/* Avaliação */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.nota)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#F5C84F] fill-current" />
                  ))}
                </div>

                {/* Depoimento */}
                <p className="text-gray-700 mb-4 italic">"{testimonial.texto}"</p>

                {/* Autor */}
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.foto} 
                    alt={testimonial.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.nome}</p>
                    <p className="text-sm text-gray-500">{testimonial.cidade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0B69FF] to-[#27AE60] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Seu cabelo precisa disso HOJE.
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-white/90">
            Diagnóstico pronto — falta só você.
          </p>
          
          <Link 
            href="/onboarding"
            className="inline-flex items-center gap-3 bg-[#FF4C29] hover:bg-[#ff3d1a] text-white px-12 py-6 rounded-2xl text-xl font-black shadow-2xl hover:shadow-[#FF4C29]/50 transition-all duration-300 hover:scale-105"
          >
            COMEÇAR MINHA TRANSFORMAÇÃO AGORA
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="mt-6 text-sm text-white/80 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#0B69FF]" />
            <span className="text-xl font-bold">CAPILIZEIA</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Diagnóstico capilar por IA + Rotina inteligente
          </p>
          <p className="text-gray-500 text-xs">
            © 2024 CAPILIZEIA. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
