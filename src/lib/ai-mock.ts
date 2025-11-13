// CAPILIZEIA - Mock da IA de Análise Capilar

import { DiagnosticoIA } from './types';

/**
 * Simula análise de IA baseada em fotos
 * Em produção, isso seria substituído por chamada real à API de IA (OpenAI Vision, etc)
 */
export async function analisarFotosIA(
  frontal: string,
  topo: string,
  lateral: string,
  dadosOnboarding?: any
): Promise<DiagnosticoIA> {
  // Simula delay de processamento da IA
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock realista baseado em padrões comuns
  const scores = {
    queda_score: Math.floor(Math.random() * 30) + 40, // 40-70
    densidade_score: Math.floor(Math.random() * 25) + 50, // 50-75
    oleosidade_score: Math.floor(Math.random() * 40) + 30, // 30-70
    frizz_score: Math.floor(Math.random() * 35) + 45, // 45-80
    porosidade_score: Math.floor(Math.random() * 30) + 50, // 50-80
    quebra_score: Math.floor(Math.random() * 25) + 35, // 35-60
  };

  // Calcula score total (média ponderada)
  const health_score_total = Math.round(
    (scores.queda_score * 0.25 +
      scores.densidade_score * 0.20 +
      scores.oleosidade_score * 0.15 +
      scores.frizz_score * 0.15 +
      scores.porosidade_score * 0.15 +
      scores.quebra_score * 0.10)
  );

  // Identifica problemas principais
  const problemas: string[] = [];
  if (scores.queda_score < 60) problemas.push('Queda acentuada');
  if (scores.densidade_score < 60) problemas.push('Baixa densidade');
  if (scores.oleosidade_score > 70) problemas.push('Oleosidade excessiva');
  if (scores.frizz_score > 70) problemas.push('Frizz intenso');
  if (scores.porosidade_score > 70) problemas.push('Alta porosidade');
  if (scores.quebra_score < 50) problemas.push('Quebra e pontas duplas');

  // Determina nível de urgência
  let nivel_urgencia: 'baixo' | 'medio' | 'alto' | 'critico';
  if (health_score_total >= 75) nivel_urgencia = 'baixo';
  else if (health_score_total >= 60) nivel_urgencia = 'medio';
  else if (health_score_total >= 45) nivel_urgencia = 'alto';
  else nivel_urgencia = 'critico';

  // Gera recomendações personalizadas
  const recomendacoes: string[] = [];
  
  if (scores.queda_score < 60) {
    recomendacoes.push('Iniciar tratamento anti-queda imediatamente com ativos como cafeína e biotina');
    recomendacoes.push('Evitar penteados muito apertados e uso excessivo de calor');
  }
  
  if (scores.densidade_score < 60) {
    recomendacoes.push('Usar produtos volumizadores e estimulantes de crescimento');
    recomendacoes.push('Massagear o couro cabeludo diariamente para estimular circulação');
  }
  
  if (scores.oleosidade_score > 70) {
    recomendacoes.push('Lavar com shampoo anti-resíduos 2x por semana');
    recomendacoes.push('Evitar produtos pesados na raiz');
  } else if (scores.oleosidade_score < 40) {
    recomendacoes.push('Aumentar hidratação com óleos naturais');
  }
  
  if (scores.frizz_score > 70) {
    recomendacoes.push('Cronograma capilar com foco em hidratação profunda');
    recomendacoes.push('Usar leave-in anti-frizz diariamente');
  }
  
  if (scores.porosidade_score > 70) {
    recomendacoes.push('Reconstrução capilar urgente com proteínas');
    recomendacoes.push('Selar cutículas com vinagre de maçã após lavagem');
  }
  
  if (scores.quebra_score < 50) {
    recomendacoes.push('Cortar pontas a cada 2 meses');
    recomendacoes.push('Usar ampolas de reconstrução semanalmente');
  }

  // Recomendações gerais baseadas no cronograma H/N/R
  recomendacoes.push('Seguir cronograma H/N/R: 2x Hidratação, 1x Nutrição, 1x Reconstrução por mês');
  recomendacoes.push('Beber no mínimo 2L de água por dia para hidratação interna');

  return {
    ...scores,
    health_score_total,
    recomendacoes,
    problemas_principais: problemas,
    nivel_urgencia,
  };
}

/**
 * Gera rotina personalizada de 30 dias baseada no diagnóstico
 */
export function gerarRotina30Dias(diagnostico: DiagnosticoIA) {
  const rotina = [];
  
  // Lógica do cronograma H/N/R baseado no diagnóstico
  let hidroCount = 0;
  let nutriCount = 0;
  let reconstruCount = 0;

  for (let dia = 1; dia <= 30; dia++) {
    let tipo: 'H' | 'N' | 'R';
    
    // Determina tipo baseado em prioridades do diagnóstico
    if (diagnostico.frizz_score > 70 || diagnostico.oleosidade_score < 40) {
      // Prioriza Hidratação
      if (hidroCount < 12) {
        tipo = 'H';
        hidroCount++;
      } else if (nutriCount < 6) {
        tipo = 'N';
        nutriCount++;
      } else {
        tipo = 'R';
        reconstruCount++;
      }
    } else if (diagnostico.porosidade_score > 70 || diagnostico.quebra_score < 50) {
      // Prioriza Reconstrução
      if (reconstruCount < 8) {
        tipo = 'R';
        reconstruCount++;
      } else if (hidroCount < 12) {
        tipo = 'H';
        hidroCount++;
      } else {
        tipo = 'N';
        nutriCount++;
      }
    } else {
      // Balanceado
      if (dia % 7 === 0) {
        tipo = 'R';
        reconstruCount++;
      } else if (dia % 4 === 0) {
        tipo = 'N';
        nutriCount++;
      } else {
        tipo = 'H';
        hidroCount++;
      }
    }

    rotina.push({
      dia,
      tipo,
      produtos: getProdutosPorTipo(tipo),
      passos: getPassosPorTipo(tipo),
      duracao: tipo === 'R' ? '45-60 min' : '30-40 min',
    });
  }

  return rotina;
}

function getProdutosPorTipo(tipo: 'H' | 'N' | 'R'): string[] {
  switch (tipo) {
    case 'H':
      return [
        'Shampoo hidratante',
        'Máscara de hidratação profunda',
        'Leave-in hidratante',
        'Óleo finalizador',
      ];
    case 'N':
      return [
        'Shampoo nutritivo',
        'Máscara de nutrição',
        'Óleo de coco ou argan',
        'Creme de pentear nutritivo',
      ];
    case 'R':
      return [
        'Shampoo anti-resíduos',
        'Máscara de reconstrução com proteínas',
        'Ampola de queratina',
        'Leave-in reconstrutor',
      ];
  }
}

function getPassosPorTipo(tipo: 'H' | 'N' | 'R'): string[] {
  switch (tipo) {
    case 'H':
      return [
        'Lave com shampoo hidratante massageando suavemente',
        'Aplique máscara de hidratação do comprimento às pontas',
        'Deixe agir por 20 minutos com touca térmica',
        'Enxágue com água fria',
        'Aplique leave-in e finalize com óleo',
      ];
    case 'N':
      return [
        'Lave com shampoo nutritivo',
        'Aplique máscara de nutrição generosamente',
        'Adicione gotas de óleo natural à máscara',
        'Deixe agir por 30 minutos',
        'Enxágue e finalize com creme de pentear',
      ];
    case 'R':
      return [
        'Lave com shampoo anti-resíduos para abrir cutículas',
        'Aplique máscara de reconstrução com proteínas',
        'Adicione ampola de queratina',
        'Deixe agir por 40 minutos com touca térmica',
        'Enxágue bem e finalize com leave-in reconstrutor',
      ];
  }
}
