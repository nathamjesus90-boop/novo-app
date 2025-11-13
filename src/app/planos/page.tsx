'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Check, Crown, Zap, Clock, Shield, ArrowRight, CreditCard } from 'lucide-react';
import { PLANS } from '@/lib/constants';

export default function PlanosPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showCheckout, setShowCheckout] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [loading, setLoading] = useState(false);

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

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowCheckout(true);
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Em produção, aqui seria a integração com gateway de pagamento
    alert('🎉 Pagamento confirmado! Redirecionando para sua rotina...');
    
    // Redireciona para página de sucesso (a ser criada no próximo módulo)
    router.push('/');
  };

  const plan = PLANS.find(p => p.id === selectedPlan);

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF4C29] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            <Clock className="w-4 h-4" />
            50% OFF expira em {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            Escolha seu plano de <span className="text-[#0B69FF]">transformação</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todos os planos incluem diagnóstico por IA + rotina personalizada. Escolha o melhor para você.
          </p>
        </div>

        {/* Planos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((planItem) => (
            <div
              key={planItem.id}
              className={`relative bg-white rounded-3xl shadow-xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                planItem.popular ? 'border-4 border-[#0B69FF] shadow-2xl' : 'border-2 border-gray-200'
              }`}
            >
              {/* Badge */}
              {planItem.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black text-white ${
                  planItem.popular ? 'bg-[#0B69FF]' : 'bg-[#F5C84F]'
                }`}>
                  {planItem.badge}
                </div>
              )}

              {/* Ícone */}
              <div className="flex justify-center mb-4">
                {planItem.id === 'essencial' && (
                  <div className="w-16 h-16 bg-[#0B69FF]/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#0B69FF]" />
                  </div>
                )}
                {planItem.id === 'pro' && (
                  <div className="w-16 h-16 bg-[#27AE60]/10 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-[#27AE60]" />
                  </div>
                )}
                {planItem.id === 'ilimitado' && (
                  <div className="w-16 h-16 bg-[#F5C84F]/10 rounded-2xl flex items-center justify-center">
                    <Crown className="w-8 h-8 text-[#F5C84F]" />
                  </div>
                )}
              </div>

              {/* Nome */}
              <h3 className="text-2xl font-black text-center mb-2">{planItem.nome}</h3>
              <p className="text-sm text-gray-600 text-center mb-6">{planItem.descricao}</p>

              {/* Preço */}
              <div className="text-center mb-6">
                {planItem.precoOriginal && (
                  <div className="text-gray-400 line-through text-lg mb-1">
                    R$ {planItem.precoOriginal.toFixed(2)}
                  </div>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-gray-600 text-lg">R$</span>
                  <span className="text-5xl font-black text-[#0B69FF]">
                    {planItem.preco.toFixed(2).split('.')[0]}
                  </span>
                  <span className="text-2xl font-bold text-gray-600">
                    ,{planItem.preco.toFixed(2).split('.')[1]}
                  </span>
                  <span className="text-gray-600">/mês</span>
                </div>
                {planItem.precoOriginal && (
                  <div className="text-[#27AE60] font-bold text-sm mt-2">
                    Economize {Math.round((1 - planItem.preco / planItem.precoOriginal) * 100)}% hoje
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {planItem.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#27AE60] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Urgência */}
              {planItem.urgencia && (
                <div className="bg-[#FF4C29]/10 border border-[#FF4C29]/20 rounded-xl p-3 mb-4 text-center">
                  <p className="text-xs font-bold text-[#FF4C29]">{planItem.urgencia}</p>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={() => handleSelectPlan(planItem.id)}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-200 hover:scale-[1.02] ${
                  planItem.popular
                    ? 'bg-[#0B69FF] hover:bg-[#0952cc] text-white shadow-lg'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                Escolher {planItem.nome}
              </button>
            </div>
          ))}
        </div>

        {/* Checkout */}
        {showCheckout && plan && (
          <div id="checkout" className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-[#0B69FF]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-2">Finalize sua assinatura</h2>
              <p className="text-gray-600">
                Plano <span className="font-bold text-[#0B69FF]">{plan.nome}</span> - R$ {plan.preco.toFixed(2)}/mês
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Método de Pagamento */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Método de pagamento
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="p-4 border-2 border-[#0B69FF] bg-[#0B69FF]/5 rounded-xl text-center font-bold text-sm hover:bg-[#0B69FF]/10 transition-colors"
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-1 text-[#0B69FF]" />
                    Cartão
                  </button>
                  <button
                    type="button"
                    className="p-4 border-2 border-gray-200 rounded-xl text-center font-bold text-sm hover:border-gray-300 transition-colors"
                  >
                    <div className="text-2xl mb-1">💳</div>
                    PIX
                  </button>
                  <button
                    type="button"
                    className="p-4 border-2 border-gray-200 rounded-xl text-center font-bold text-sm hover:border-gray-300 transition-colors"
                  >
                    <div className="text-2xl mb-1">📄</div>
                    Boleto
                  </button>
                </div>
              </div>

              {/* Dados do Cartão */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Número do cartão
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nome no cartão
                </label>
                <input
                  type="text"
                  placeholder="MARIA SILVA"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B69FF] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Resumo */}
              <div className="bg-[#F3F4F6] rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plano {plan.nome}</span>
                  <span className="font-bold">R$ {plan.preco.toFixed(2)}</span>
                </div>
                {plan.precoOriginal && (
                  <div className="flex justify-between items-center text-[#27AE60]">
                    <span className="font-bold">Desconto 50%</span>
                    <span className="font-bold">-R$ {(plan.precoOriginal - plan.preco).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                  <span className="text-lg font-black">Total hoje</span>
                  <span className="text-2xl font-black text-[#0B69FF]">R$ {plan.preco.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Renovação automática. Cancele quando quiser.
                </p>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF4C29] hover:bg-[#ff3d1a] disabled:bg-gray-300 text-white py-5 rounded-xl font-black text-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    CONFIRMAR PAGAMENTO
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Pagamento 100% seguro e criptografado</span>
              </div>
            </form>
          </div>
        )}

        {/* Garantia */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-[#27AE60] to-[#0B69FF] rounded-3xl p-8 text-white text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-black mb-2">Garantia de 7 dias</h3>
          <p className="text-lg text-white/90">
            Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
          </p>
        </div>
      </main>
    </div>
  );
}
