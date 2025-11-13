'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CreditCard, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface PaymentGateway {
  id: string;
  gatewayName: string;
  apiUrl: string;
  publicKey: string;
  privateKey: string;
  isActive: boolean;
}

const mockGateways: PaymentGateway[] = [
  {
    id: '1',
    gatewayName: 'Stripe',
    apiUrl: 'https://api.stripe.com/v1',
    publicKey: 'pk_test_xxxxxxxxxxxxx',
    privateKey: 'sk_test_xxxxxxxxxxxxx',
    isActive: true,
  },
  {
    id: '2',
    gatewayName: 'Mercado Pago',
    apiUrl: 'https://api.mercadopago.com',
    publicKey: 'APP_USR_xxxxxxxxxxxxx',
    privateKey: 'APP_USR_xxxxxxxxxxxxx',
    isActive: true,
  },
];

export default function PaymentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [gateways, setGateways] = useState<PaymentGateway[]>(mockGateways);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    gatewayName: '',
    apiUrl: '',
    publicKey: '',
    privateKey: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Edit existing
      setGateways(
        gateways.map((g) =>
          g.id === editingId
            ? { ...g, ...formData }
            : g
        )
      );
      setSuccessMessage('Gateway atualizado com sucesso!');
    } else {
      // Add new
      const newGateway: PaymentGateway = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
      };
      setGateways([...gateways, newGateway]);
      setSuccessMessage('Gateway adicionado com sucesso!');
    }

    setFormData({ gatewayName: '', apiUrl: '', publicKey: '', privateKey: '' });
    setIsAdding(false);
    setEditingId(null);

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEdit = (gateway: PaymentGateway) => {
    setFormData({
      gatewayName: gateway.gatewayName,
      apiUrl: gateway.apiUrl,
      publicKey: gateway.publicKey,
      privateKey: gateway.privateKey,
    });
    setEditingId(gateway.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este gateway?')) {
      setGateways(gateways.filter((g) => g.id !== id));
      setSuccessMessage('Gateway removido com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const toggleActive = (id: string) => {
    setGateways(
      gateways.map((g) =>
        g.id === id ? { ...g, isActive: !g.isActive } : g
      )
    );
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B69FF]"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B69FF] to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Pagamentos</h1>
        <p className="text-blue-100">Configuração de gateways de pagamento</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <Check className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Add Gateway Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#0B69FF] to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Novo Gateway</span>
        </button>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Editar Gateway' : 'Novo Gateway de Pagamento'}
            </h2>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ gatewayName: '', apiUrl: '', publicKey: '', privateKey: '' });
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gateway Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Gateway *
                </label>
                <input
                  type="text"
                  value={formData.gatewayName}
                  onChange={(e) => setFormData({ ...formData, gatewayName: e.target.value })}
                  placeholder="Ex: Stripe, Mercado Pago, PagSeguro"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                  required
                />
              </div>

              {/* API URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da API *
                </label>
                <input
                  type="url"
                  value={formData.apiUrl}
                  onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
                  placeholder="https://api.gateway.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                  required
                />
              </div>

              {/* Public Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chave Pública *
                </label>
                <input
                  type="text"
                  value={formData.publicKey}
                  onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                  placeholder="pk_xxxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                  required
                />
              </div>

              {/* Private Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chave Privada *
                </label>
                <input
                  type="password"
                  value={formData.privateKey}
                  onChange={(e) => setFormData({ ...formData, privateKey: e.target.value })}
                  placeholder="sk_xxxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ gatewayName: '', apiUrl: '', publicKey: '', privateKey: '' });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300"
              >
                {editingId ? 'Atualizar Configurações' : 'Salvar Configurações'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gateways List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {gateways.map((gateway) => (
          <div
            key={gateway.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0B69FF] to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{gateway.gatewayName}</h3>
                  <p className="text-sm text-gray-500">{gateway.apiUrl}</p>
                </div>
              </div>
              <button
                onClick={() => toggleActive(gateway.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  gateway.isActive
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {gateway.isActive ? 'Ativo' : 'Inativo'}
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Chave Pública</p>
                <p className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  {gateway.publicKey}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Chave Privada</p>
                <p className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  {'•'.repeat(20)}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(gateway)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDelete(gateway.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remover</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
