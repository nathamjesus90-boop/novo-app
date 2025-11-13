// CAPILIZEIA - Tipos TypeScript

export interface OnboardingData {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  objetivo: 'queda' | 'crescimento' | 'hidratacao' | 'volume' | 'brilho';
  tipoCabelo: 'liso' | 'ondulado' | 'cacheado' | 'crespo';
  historicoQuimico: string[];
  rotinaAtual: string;
  consentimento: boolean;
  consentimentoWhatsApp: boolean;
}

export interface PhotoUpload {
  frontal: string | null;
  topo: string | null;
  lateral: string | null;
}

export interface DiagnosticoIA {
  queda_score: number;
  densidade_score: number;
  oleosidade_score: number;
  frizz_score: number;
  porosidade_score: number;
  quebra_score: number;
  health_score_total: number;
  recomendacoes: string[];
  problemas_principais: string[];
  nivel_urgencia: 'baixo' | 'medio' | 'alto' | 'critico';
}

export interface Plan {
  id: string;
  nome: string;
  preco: number;
  precoOriginal?: number;
  descricao: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  urgencia?: string;
}

export interface RotinaItem {
  dia: number;
  tipo: 'H' | 'N' | 'R'; // Hidratação, Nutrição, Reconstrução
  produtos: string[];
  passos: string[];
  duracao: string;
  video?: string;
}
