'use client';

import { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';

const mockClients = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 98765-4321',
    city: 'São Paulo',
    plan: 'Pro',
    status: 'active',
    healthScore: 72,
    lastDiagnostic: '2024-01-15',
    joined: '2023-12-01',
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@email.com',
    phone: '(21) 97654-3210',
    city: 'Rio de Janeiro',
    plan: 'Essencial',
    status: 'active',
    healthScore: 65,
    lastDiagnostic: '2024-01-14',
    joined: '2023-11-15',
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(31) 96543-2109',
    city: 'Belo Horizonte',
    plan: 'Ilimitado',
    status: 'active',
    healthScore: 88,
    lastDiagnostic: '2024-01-14',
    joined: '2023-10-20',
  },
  {
    id: 4,
    name: 'Pedro Lima',
    email: 'pedro@email.com',
    phone: '(41) 95432-1098',
    city: 'Curitiba',
    plan: 'Pro',
    status: 'pending',
    healthScore: 58,
    lastDiagnostic: '2024-01-13',
    joined: '2024-01-10',
  },
  {
    id: 5,
    name: 'Carla Souza',
    email: 'carla@email.com',
    phone: '(51) 94321-0987',
    city: 'Porto Alegre',
    plan: 'Essencial',
    status: 'active',
    healthScore: 79,
    lastDiagnostic: '2024-01-12',
    joined: '2023-09-05',
  },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || client.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Cidade', 'Plano', 'Status', 'Score', 'Último Diagnóstico'];
    const rows = filteredClients.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.city,
      c.plan,
      c.status,
      c.healthScore,
      c.lastDiagnostic,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes-capilizeia.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-2 text-gray-600">{filteredClients.length} clientes encontrados</p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B69FF] text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30"
        >
          <Download className="w-5 h-5" />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
            />
          </div>

          {/* Plan Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Todos os Planos</option>
              <option value="Essencial">Essencial</option>
              <option value="Pro">Pro</option>
              <option value="Ilimitado">Ilimitado</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0B69FF] to-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{client.city}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900 flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{client.email}</span>
                      </p>
                      <p className="text-sm text-gray-500 flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{client.phone}</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        client.plan === 'Ilimitado'
                          ? 'bg-purple-100 text-purple-800'
                          : client.plan === 'Pro'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        client.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : client.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {client.status === 'active' ? 'Ativo' : client.status === 'pending' ? 'Pendente' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className={`h-2 rounded-full ${
                            client.healthScore >= 80
                              ? 'bg-green-500'
                              : client.healthScore >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${client.healthScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{client.healthScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-[#0B69FF] hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-[#0B69FF] hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
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
