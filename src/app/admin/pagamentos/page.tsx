'use client';

import { useState } from 'react';
import { CreditCard, Check, X, AlertCircle, Settings } from 'lucide-react';

const gateways = [
  { id: 'mercadopago', name: 'Mercado Pago', logo: '💳', active: true },
  { id: 'pagseguro', name: 'PagSeguro', logo: '🔒', active: false },
  { id: 'stripe', name: 'Stripe', logo: '💰', active: false },
  { id: 'pagarme', name: 'Pagar.me', logo: '💵', active: false },
];

const recentTransactions = [
  {
    id: 1,
    client: 'Maria Silva',
    amount: 'R$ 19,90',
    plan: 'Pro',
    gateway: 'Mercado Pago',
    status: 'paid',
    date: '2024-01-15 14:32',
    transactionId: 'MP-123456789',
  },
  {
    id: 2,
    client: 'João Santos',
    amount: 'R$ 9,90',
    plan: 'Essencial',
    gateway: 'Mercado Pago',
    status: 'paid',
    date: '2024-01-15 12:18',
    transactionId: 'MP-987654321',
  },
  {
    id: 3,
    client: 'Ana Costa',
    amount: 'R$ 49,90',
    plan: 'Ilimitado',
    gateway: 'Mercado Pago',
    status: 'paid',
    date: '2024-01-14 18:45',
    transactionId: 'MP-456789123',
  },
  {
    id: 4,
    client: 'Pedro Lima',
    amount: 'R$ 19,90',
    plan: 'Pro',
    gateway: 'Mercado Pago',
    status: 'pending',
    date: '2024-01-14 16:22',
    transactionId: 'MP-789123456',
  },
  {
    id: 5,
    client: 'Carla Souza',
    amount: 'R$ 9,90',
    plan: 'Essencial',
    gateway: 'Mercado Pago',
    status: 'failed',
    date: '2024-01-13 10:15',
    transactionId: 'MP-321654987',
  },
];

export default function PagamentosPage() {
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [sandboxMode, setSandboxMode] = useState(true);

  const handleSaveGateway = () => {
    alert(`Configurações salvas para ${selectedGateway}!`);
    setSelectedGateway(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pagamentos</h1>
        <p className="mt-2 text-gray-600">Configure gateways e gerencie transações</p>
      </div>

      {/* Gateway Configuration */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Gateways de Pagamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gateways.map((gateway) => (
            <button
              key={gateway.id}
              onClick={() => setSelectedGateway(gateway.id)}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                gateway.active
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-[#0B69FF] hover:bg-blue-50'
              }`}
            >
              {gateway.active && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="text-4xl mb-3">{gateway.logo}</div>
              <p className="font-medium text-gray-900">{gateway.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {gateway.active ? 'Ativo' : 'Inativo'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Gateway Settings Modal */}
      {selectedGateway && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Configurar {gateways.find((g) => g.id === selectedGateway)?.name}
              </h3>
              <button
                onClick={() => setSelectedGateway(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key / Public Key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="pk_live_..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secret Key / Access Token
                </label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="sk_live_..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://capilizeia.com/api/webhooks/payment"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="sandbox"
                  checked={sandboxMode}
                  onChange={(e) => setSandboxMode(e.target.checked)}
                  className="w-5 h-5 text-[#0B69FF] rounded focus:ring-[#0B69FF]"
                />
                <label htmlFor="sandbox" className="text-sm font-medium text-gray-700">
                  Modo Sandbox (Testes)
                </label>
              </div>

              <div className="flex items-start space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Mantenha suas chaves seguras. Nunca compartilhe suas credenciais de produção.
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveGateway}
                className="flex-1 px-6 py-3 bg-[#0B69FF] text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30"
              >
                Salvar Configurações
              </button>
              <button
                onClick={() => setSelectedGateway(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Transações Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gateway
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Transação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.client}</p>
                      <p className="text-sm text-gray-500">{transaction.plan}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900">{transaction.amount}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{transaction.gateway}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status === 'paid'
                        ? 'Pago'
                        : transaction.status === 'pending'
                        ? 'Pendente'
                        : 'Falhou'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{transaction.date}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-mono text-gray-500">{transaction.transactionId}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
