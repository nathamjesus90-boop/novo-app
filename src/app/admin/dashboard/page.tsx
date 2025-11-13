'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle, MessageSquare } from 'lucide-react';

const stats = [
  {
    name: 'Total de Vendas (Mês)',
    value: 'R$ 12.450',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Usuários Ativos',
    value: '248',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'from-[#0B69FF] to-blue-600',
  },
  {
    name: 'Crescimento Semanal',
    value: '+15.3%',
    change: '+3.1%',
    trend: 'up',
    icon: Activity,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Taxa de Conversão',
    value: '24.8%',
    change: '+2.4%',
    trend: 'up',
    icon: AlertCircle,
    color: 'from-[#FF4C29] to-red-600',
  },
];

const recentPayments = [
  { id: 1, client: 'Maria Silva', amount: 'R$ 19,90', plan: 'Pro', status: 'paid', date: '2024-01-15 14:32', gateway: 'Stripe' },
  { id: 2, client: 'João Santos', amount: 'R$ 9,90', plan: 'Essencial', status: 'paid', date: '2024-01-15 12:18', gateway: 'Mercado Pago' },
  { id: 3, client: 'Ana Costa', amount: 'R$ 49,90', plan: 'Ilimitado', status: 'paid', date: '2024-01-14 18:45', gateway: 'Stripe' },
  { id: 4, client: 'Pedro Lima', amount: 'R$ 19,90', plan: 'Pro', status: 'pending', date: '2024-01-14 16:22', gateway: 'PagSeguro' },
  { id: 5, client: 'Carla Souza', amount: 'R$ 9,90', plan: 'Essencial', status: 'paid', date: '2024-01-14 10:15', gateway: 'Stripe' },
  { id: 6, client: 'Lucas Oliveira', amount: 'R$ 49,90', plan: 'Ilimitado', status: 'paid', date: '2024-01-13 20:30', gateway: 'Mercado Pago' },
  { id: 7, client: 'Fernanda Alves', amount: 'R$ 19,90', plan: 'Pro', status: 'failed', date: '2024-01-13 15:45', gateway: 'PagSeguro' },
  { id: 8, client: 'Roberto Costa', amount: 'R$ 9,90', plan: 'Essencial', status: 'paid', date: '2024-01-13 11:20', gateway: 'Stripe' },
  { id: 9, client: 'Juliana Martins', amount: 'R$ 49,90', plan: 'Ilimitado', status: 'paid', date: '2024-01-12 19:10', gateway: 'Mercado Pago' },
  { id: 10, client: 'Ricardo Souza', amount: 'R$ 19,90', plan: 'Pro', status: 'paid', date: '2024-01-12 14:55', gateway: 'Stripe' },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B69FF] to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Dashboard Principal</h1>
        <p className="text-blue-100">Visão completa do seu negócio CAPILIZEIA</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="mt-2 flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">vs mês anterior</span>
                </div>
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Últimos 10 Pagamentos */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Últimos 10 Pagamentos Recebidos</h2>
            <p className="text-sm text-gray-500 mt-1">Histórico recente de transações</p>
          </div>
          <a
            href="/admin/payments"
            className="px-6 py-3 bg-gradient-to-r from-[#0B69FF] to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Ver Detalhes
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Cliente</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Plano</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Valor</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Gateway</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0B69FF] to-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold">
                        {payment.client.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{payment.client}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {payment.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-900">{payment.amount}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{payment.gateway}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status === 'paid' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : 'Falhou'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <span>⚡</span>
          <span>Ações Rápidas</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/customers"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
          >
            <Users className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-lg">Gerenciar Clientes</p>
            <p className="text-sm text-gray-400 mt-1">Ver todos os clientes</p>
          </a>
          <a
            href="/admin/payments"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
          >
            <DollarSign className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-lg">Configurar Pagamentos</p>
            <p className="text-sm text-gray-400 mt-1">Gateways e APIs</p>
          </a>
          <a
            href="/admin/whatsapp"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
          >
            <MessageSquare className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-lg">WhatsApp</p>
            <p className="text-sm text-gray-400 mt-1">Campanhas e mensagens</p>
          </a>
          <a
            href="/admin/settings"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
          >
            <Activity className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-lg">Configurações</p>
            <p className="text-sm text-gray-400 mt-1">SMTP, API Keys</p>
          </a>
        </div>
      </div>
    </div>
  );
}
