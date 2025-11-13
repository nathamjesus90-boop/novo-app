'use client';

import { useState } from 'react';
import { Search, Eye, Download, Calendar, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const mockDiagnostics = [
  {
    id: 1,
    clientName: 'Maria Silva',
    clientEmail: 'maria@email.com',
    date: '2024-01-15 14:32',
    healthScore: 72,
    problems: ['Queda moderada', 'Oleosidade alta'],
    aiResponse: {
      queda_score: 65,
      densidade_score: 78,
      oleosidade_score: 45,
      frizz_score: 70,
      porosidade_score: 80,
      quebra_score: 75,
      health_score_total: 72,
      recomendacoes: ['Hidratação semanal', 'Shampoo anti-oleosidade', 'Tratamento antiqueda'],
    },
    photos: [
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
    ],
  },
  {
    id: 2,
    clientName: 'João Santos',
    clientEmail: 'joao@email.com',
    date: '2024-01-14 12:18',
    healthScore: 65,
    problems: ['Densidade baixa', 'Quebra severa'],
    aiResponse: {
      queda_score: 58,
      densidade_score: 52,
      oleosidade_score: 70,
      frizz_score: 65,
      porosidade_score: 60,
      quebra_score: 48,
      health_score_total: 65,
      recomendacoes: ['Nutrição intensa', 'Corte para remover pontas', 'Suplementação capilar'],
    },
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    ],
  },
  {
    id: 3,
    clientName: 'Ana Costa',
    clientEmail: 'ana@email.com',
    date: '2024-01-14 18:45',
    healthScore: 88,
    problems: ['Frizz leve'],
    aiResponse: {
      queda_score: 90,
      densidade_score: 92,
      oleosidade_score: 85,
      frizz_score: 78,
      porosidade_score: 88,
      quebra_score: 95,
      health_score_total: 88,
      recomendacoes: ['Manutenção com hidratação quinzenal', 'Finalizador anti-frizz'],
    },
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    ],
  },
];

export default function DiagnosticosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<typeof mockDiagnostics[0] | null>(null);

  const filteredDiagnostics = mockDiagnostics.filter(
    (diagnostic) =>
      diagnostic.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnostic.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-4 h-4" />;
    if (score >= 60) return <AlertTriangle className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Diagnósticos</h1>
          <p className="mt-2 text-gray-600">{filteredDiagnostics.length} diagnósticos realizados</p>
        </div>
        <button className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B69FF] text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30">
          <Download className="w-5 h-5" />
          <span>Exportar Relatório</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou email do cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
          />
        </div>
      </div>

      {/* Diagnostics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDiagnostics.map((diagnostic) => (
          <div
            key={diagnostic.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Client Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0B69FF] to-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {diagnostic.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{diagnostic.clientName}</p>
                  <p className="text-sm text-gray-500">{diagnostic.clientEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDiagnostic(diagnostic)}
                className="p-2 text-gray-400 hover:text-[#0B69FF] hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Health Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Score de Saúde</span>
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(diagnostic.healthScore)}`}>
                  {getScoreIcon(diagnostic.healthScore)}
                  <span>{diagnostic.healthScore}/100</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    diagnostic.healthScore >= 80
                      ? 'bg-green-500'
                      : diagnostic.healthScore >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${diagnostic.healthScore}%` }}
                />
              </div>
            </div>

            {/* Problems */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Problemas Detectados:</p>
              <div className="flex flex-wrap gap-2">
                {diagnostic.problems.map((problem, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium"
                  >
                    {problem}
                  </span>
                ))}
              </div>
            </div>

            {/* Photos Preview */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Fotos Enviadas:</p>
              <div className="grid grid-cols-3 gap-2">
                {diagnostic.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{diagnostic.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Diagnostic Detail Modal */}
      {selectedDiagnostic && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Detalhes do Diagnóstico</h3>
              <button
                onClick={() => setSelectedDiagnostic(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Client Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0B69FF] to-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedDiagnostic.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedDiagnostic.clientName}</p>
                  <p className="text-sm text-gray-500">{selectedDiagnostic.clientEmail}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{selectedDiagnostic.date}</p>
            </div>

            {/* Photos */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Fotos Enviadas</h4>
              <div className="grid grid-cols-3 gap-4">
                {selectedDiagnostic.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* AI Scores */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Análise da IA</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(selectedDiagnostic.aiResponse)
                  .filter(([key]) => key.includes('_score'))
                  .map(([key, value]) => {
                    const label = key
                      .replace('_score', '')
                      .replace('_', ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase());
                    return (
                      <div key={key} className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">{label}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900">{value}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Recomendações</h4>
              <ul className="space-y-2">
                {selectedDiagnostic.aiResponse.recomendacoes.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                    <span className="text-[#0B69FF] font-bold">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* JSON Raw Data */}
            <div className="mt-6">
              <details className="bg-gray-50 rounded-xl p-4">
                <summary className="font-medium text-gray-900 cursor-pointer">
                  Ver JSON Completo da IA
                </summary>
                <pre className="mt-4 text-xs text-gray-600 overflow-x-auto">
                  {JSON.stringify(selectedDiagnostic.aiResponse, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
