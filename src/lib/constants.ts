// CAPILIZEIA - Constantes e Configurações

import { Plan } from './types';

// PALETA DE CORES (Psicologia das Cores)
export const COLORS = {
  cta: '#0B69FF',        // Azul Royal - Autoridade e ação
  urgencia: '#FF4C29',   // Laranja profundo - Urgência
  premium: '#F5C84F',    // Dourado - Premium
  sucesso: '#27AE60',    // Verde escuro - Sucesso
  fundo: '#F3F4F6',      // Fundo neutro
};

// PLANOS
export const PLANS: Plan[] = [
  {
    id: 'essencial',
    nome: 'Essencial',
    preco: 9.90,
    precoOriginal: 19.90,
    descricao: 'Perfeito para começar sua transformação',
    features: [
      'Diagnóstico completo por IA',
      'Rotina personalizada de 30 dias',
      'Cronograma H/N/R automático',
      'Lembretes diários no WhatsApp',
      'Suporte via chat',
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    preco: 19.90,
    precoOriginal: 39.90,
    descricao: 'Resultados mais rápidos e acompanhamento',
    features: [
      'Tudo do Essencial +',
      'Reavaliação mensal automática',
      'Evolução antes/depois',
      'Kits de produtos recomendados',
      'Vídeos tutoriais exclusivos',
      'Suporte prioritário',
    ],
    badge: 'MAIS VENDIDO',
    popular: true,
  },
  {
    id: 'ilimitado',
    nome: 'Ilimitado',
    preco: 49.90,
    precoOriginal: 99.90,
    descricao: 'Transformação completa e resultados garantidos',
    features: [
      'Tudo do Pro +',
      'Diagnósticos ilimitados',
      'Consultoria personalizada',
      'Acesso a todos os kits',
      'Grupo VIP no WhatsApp',
      'Garantia de resultados em 90 dias',
      'Desconto em produtos parceiros',
    ],
    badge: 'RESULTADOS MAIS RÁPIDOS',
    urgencia: 'Apenas 12 vagas restantes',
  },
];

// TEXTOS PERSUASIVOS
export const COPY = {
  hero: {
    headline: 'Pare a queda. Ganhe densidade. Diagnóstico por IA em 60 segundos.',
    subheadline: 'Envie 3 fotos. A CAPILIZEIA cria sua rotina científica agora.',
    cta: 'FAZER DIAGNÓSTICO AGORA',
  },
  urgencia: {
    timer: 'Oferta expira em:',
    vagas: 'vagas restantes hoje',
    garantia: 'Garantia de 7 dias ou seu dinheiro de volta',
  },
  social: {
    usuarios: '12.847 mulheres já transformaram seus cabelos',
    nota: '4.9/5.0',
    avaliacoes: '2.341 avaliações',
  },
  microcopy: [
    'Seu cabelo precisa disso HOJE.',
    'Sua transformação começa em 60 segundos.',
    'Desbloqueie sua rotina.',
    'Seu fio responde rápido. Comece agora.',
    'Diagnóstico pronto — falta só você.',
  ],
};

// PERGUNTAS DO ONBOARDING
export const ONBOARDING_QUESTIONS = {
  objetivo: [
    { value: 'queda', label: 'Parar a queda', icon: '🛑' },
    { value: 'crescimento', label: 'Acelerar crescimento', icon: '📈' },
    { value: 'hidratacao', label: 'Hidratar profundamente', icon: '💧' },
    { value: 'volume', label: 'Ganhar volume', icon: '✨' },
    { value: 'brilho', label: 'Aumentar brilho', icon: '💎' },
  ],
  tipoCabelo: [
    { value: 'liso', label: 'Liso', icon: '1️⃣' },
    { value: 'ondulado', label: 'Ondulado', icon: '2️⃣' },
    { value: 'cacheado', label: 'Cacheado', icon: '3️⃣' },
    { value: 'crespo', label: 'Crespo', icon: '4️⃣' },
  ],
  historicoQuimico: [
    { value: 'alisamento', label: 'Alisamento/Progressiva' },
    { value: 'coloracao', label: 'Coloração/Descoloração' },
    { value: 'luzes', label: 'Luzes/Mechas' },
    { value: 'relaxamento', label: 'Relaxamento' },
    { value: 'permanente', label: 'Permanente' },
    { value: 'nenhum', label: 'Nenhum procedimento químico' },
  ],
};

// DEPOIMENTOS
export const TESTIMONIALS = [
  {
    nome: 'Mariana Silva',
    cidade: 'São Paulo, SP',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    texto: 'Em 30 dias minha queda reduziu 80%. O diagnóstico foi certeiro!',
    nota: 5,
    antes: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=200&h=200&fit=crop',
    depois: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=200&h=200&fit=crop',
  },
  {
    nome: 'Juliana Costa',
    cidade: 'Rio de Janeiro, RJ',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    texto: 'Meu cabelo nunca teve tanto volume e brilho. Rotina perfeita!',
    nota: 5,
    antes: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
    depois: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop',
  },
  {
    nome: 'Camila Rodrigues',
    cidade: 'Belo Horizonte, MG',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    texto: 'A IA identificou problemas que nenhum cabeleireiro viu. Incrível!',
    nota: 5,
    antes: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
    depois: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
  },
];
