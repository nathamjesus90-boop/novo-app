'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Search, Download, Filter, UserCheck, UserX, Clock } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  purchaseValue: number;
  status: string;
  createdAt: string;
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', purchaseValue: 19.90, status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'João Santos', email: 'joao@email.com', purchaseValue: 9.90, status: 'active', createdAt: '2024-01-14' },
  { id: '3', name: 'Ana Costa', email: 'ana@email.com', purchaseValue: 49.90, status: 'active', createdAt: '2024-01-14' },
  { id: '4', name: 'Pedro Lima', email: 'pedro@email.com', purchaseValue: 19.90, status: 'trial', createdAt: '2024-01-13' },
  { id: '5', name: 'Carla Souza', email: 'carla@email.com', purchaseValue: 9.90, status: 'active', createdAt: '2024-01-13' },
  { id: '6', name: 'Lucas Oliveira', email: 'lucas@email.com', purchaseValue: 49.90, status: 'cancelled', createdAt: '2024-01-12' },
  { id: '7', name: 'Fernanda Alves', email: 'fernanda@email.com', purchaseValue: 19.90, status: 'active', createdAt: '2024-01-12' },
  { id: '8', name: 'Roberto Costa', email: 'roberto@email.com', purchaseValue: 9.90, status: 'active', createdAt: '2024-01-11' },
];

export default function CustomersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Nome', 'E-mail', 'Valor da Compra', 'Status', 'Data'];
    const rows = filteredCustomers.map((c) => [
      c.id,
      c.name,
      c.email,
      `R$ ${c.purchaseValue.toFixed(2)}`,
      c.status,
      c.createdAt,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
        <h1 className="text-4xl font-bold mb-2">Clientes</h1>
        <p className="text-blue-100">Gerenciamento completo de todos os clientes</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="cancelled">Cancelado</option>
                <option value="trial">Em Teste</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Ativos</p>
                <p className="text-2xl font-bold text-green-900">
                  {customers.filter((c) => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center space-x-3">
              <UserX className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600 font-medium">Cancelados</p>
                <p className="text-2xl font-bold text-red-900">
                  {customers.filter((c) => c.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-600 font-medium">Em Teste</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {customers.filter((c) => c.status === 'trial').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nome</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">E-mail</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Valor da Compra</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">#{customer.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0B69FF] to-[#FF4C29] rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{customer.email}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    R$ {customer.purchaseValue.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : customer.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {customer.status === 'active'
                        ? 'Ativo'
                        : customer.status === 'cancelled'
                        ? 'Cancelado'
                        : 'Em Teste'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{customer.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
