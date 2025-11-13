'use client';

import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle } from 'lucide-react';

const stats = [
  {
    name: 'MRR (Receita Mensal)',
    value: 'R$ 12.450',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Assinantes Ativos',
    value: '248',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'from-[#0B69FF] to-blue-600',
  },
  {
    name: 'ARPU (Ticket Médio)',
    value: 'R$ 50,20',
    change: '+3.1%',
    trend: 'up',
    icon: Activity,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Churn Rate',
    value: '4.2%',
    change: '-1.3%',
    trend: 'down',
    icon: AlertCircle,
    color: 'from-[#FF4C29] to-red-600',
  },
];

const recentClients = [
  { name: 'Maria Silva', email: 'maria@email.com', plan: 'Pro', status: 'active', date: '2024-01-15' },
  { name: 'João Santos', email: 'joao@email.com', plan: 'Essencial', status: 'active', date: '2024-01-14' },
  { name: 'Ana Costa', email: 'ana@email.com', plan: 'Ilimitado', status: 'active', date: '2024-01-14' },
  { name: 'Pedro Lima', email: 'pedro@email.com', plan: 'Pro', status: 'pending', date: '2024-01-13' },
  { name: 'Carla Souza', email: 'carla@email.com', plan: 'Essencial', status: 'active', date: '2024-01-13' },
];

const recentPayments = [
  { client: 'Maria Silva', amount: 'R$ 19,90', plan: 'Pro', status: 'paid', date: '2024-01-15 14:32' },
  { client: 'João Santos', amount: 'R$ 9,90', plan: 'Essencial', status: 'paid', date: '2024-01-15 12:18' },
  { client: 'Ana Costa', amount: 'R$ 49,90', plan: 'Ilimitado', status: 'paid', date: '2024-01-14 18:45' },
  { client: 'Pedro Lima', amount: 'R$ 19,90', plan: 'Pro', status: 'pending', date: '2024-01-14 16:22' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Visão geral do seu negócio CAPILIZEIA</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="mt-2 flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  )}
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Clientes Recentes</h2>
            <a href="/admin/clientes" className="text-sm font-medium text-[#0B69FF] hover:text-blue-700">
              Ver todos
            </a>
          </div>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0B69FF] to-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {client.plan}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">{client.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pagamentos Recentes</h2>
            <a href="/admin/pagamentos" className="text-sm font-medium text-[#0B69FF] hover:text-blue-700">
              Ver todos
            </a>
          </div>
          <div className="space-y-4">
            {recentPayments.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{payment.client}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{payment.amount}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#0B69FF] to-blue-600 rounded-2xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/clientes"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <Users className="w-8 h-8 mb-2" />
            <p className="font-medium">Gerenciar Clientes</p>
          </a>
          <a
            href="/admin/pagamentos"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <DollarSign className="w-8 h-8 mb-2" />
            <p className="font-medium">Configurar Pagamentos</p>
          </a>
          <a
            href="/admin/whatsapp"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <MessageSquare className="w-8 h-8 mb-2" />
            <p className="font-medium">Campanhas WhatsApp</p>
          </a>
          <a
            href="/admin/diagnosticos"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <Activity className="w-8 h-8 mb-2" />
            <p className="font-medium">Ver Diagnósticos</p>
          </a>
        </div>
      </div>
    </div>
  );
}
