'use client';

import { useState } from 'react';
import { MessageSquare, Send, Users, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Boas-vindas',
    template: 'Olá {{nome}}! 👋 Bem-vindo à CAPILIZEIA! Sua jornada capilar começa agora.',
    sent: 248,
    delivered: 245,
    read: 198,
    replied: 42,
    status: 'active',
    lastSent: '2024-01-15 14:32',
  },
  {
    id: 2,
    name: 'Lembrete Diário',
    template: '⏰ {{nome}}, hora da sua rotina capilar! Hoje é dia de {{tipo_tratamento}}.',
    sent: 1240,
    delivered: 1235,
    read: 980,
    replied: 156,
    status: 'active',
    lastSent: '2024-01-15 08:00',
  },
  {
    id: 3,
    name: 'Check-in Semanal',
    template: '📊 {{nome}}, como está seu cabelo esta semana? Responda para ajustarmos sua rotina!',
    sent: 186,
    delivered: 184,
    read: 142,
    replied: 89,
    status: 'active',
    lastSent: '2024-01-14 10:00',
  },
  {
    id: 4,
    name: 'Carrinho Abandonado',
    template: '🛒 {{nome}}, notamos que você não finalizou sua assinatura. Temos 50% OFF esperando por você!',
    sent: 45,
    delivered: 44,
    read: 38,
    replied: 12,
    status: 'active',
    lastSent: '2024-01-15 16:45',
  },
];

const templates = [
  { id: 1, name: 'Boas-vindas', category: 'Onboarding' },
  { id: 2, name: 'Lembrete Diário', category: 'Rotina' },
  { id: 3, name: 'Check-in Semanal', category: 'Engajamento' },
  { id: 4, name: 'Carrinho Abandonado', category: 'Vendas' },
  { id: 5, name: 'Reavaliação Mensal', category: 'Rotina' },
  { id: 6, name: 'Oferta Limitada', category: 'Vendas' },
];

export default function WhatsAppPage() {
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleCreateCampaign = () => {
    alert(`Campanha "${campaignName}" criada com sucesso!`);
    setShowNewCampaign(false);
    setCampaignName('');
    setCampaignMessage('');
    setSelectedTemplate('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">WhatsApp</h1>
          <p className="mt-2 text-gray-600">Gerencie campanhas e templates de mensagens</p>
        </div>
        <button
          onClick={() => setShowNewCampaign(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-300 shadow-lg shadow-green-500/30"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Campanha</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mensagens Enviadas</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">1,719</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Send className="w-6 h-6 text-[#0B69FF]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Entrega</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">99.4%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Leitura</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">81.2%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Resposta</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">17.4%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#FF4C29]" />
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Campanhas Ativas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campanha
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enviadas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entregues
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lidas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Respostas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Envio
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500 mt-1 max-w-md truncate">{campaign.template}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{campaign.sent}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{campaign.delivered}</p>
                      <span className="text-xs text-green-600">
                        ({((campaign.delivered / campaign.sent) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{campaign.read}</p>
                      <span className="text-xs text-blue-600">
                        ({((campaign.read / campaign.delivered) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{campaign.replied}</p>
                      <span className="text-xs text-purple-600">
                        ({((campaign.replied / campaign.read) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500">{campaign.lastSent}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Templates Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#0B69FF] hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{template.name}</p>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-500">Clique para editar ou usar</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Nova Campanha WhatsApp</h3>
              <button
                onClick={() => setShowNewCampaign(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Campanha
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Ex: Promoção de Verão"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Base (Opcional)
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                >
                  <option value="">Criar do zero</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} ({template.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  placeholder="Olá {{nome}}! 👋 Sua mensagem aqui..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent resize-none"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Use variáveis: {'{'}{'{'} nome {'}'}{'}'}, {'{'}{'{'} plano {'}'}{'}'}, {'{'}{'{'} tipo_tratamento {'}'}{'}'}
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleCreateCampaign}
                className="flex-1 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-300 shadow-lg shadow-green-500/30"
              >
                Criar Campanha
              </button>
              <button
                onClick={() => setShowNewCampaign(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
