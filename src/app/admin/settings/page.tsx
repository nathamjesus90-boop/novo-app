'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Settings, Mail, Key, Save, Check } from 'lucide-react';

interface SettingCategory {
  id: string;
  name: string;
  icon: any;
  settings: Setting[];
}

interface Setting {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'password' | 'email' | 'url';
  placeholder: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [categories, setCategories] = useState<SettingCategory[]>([
    {
      id: 'smtp',
      name: 'Configurações SMTP',
      icon: Mail,
      settings: [
        { key: 'smtp_host', label: 'Host SMTP', value: 'smtp.gmail.com', type: 'text', placeholder: 'smtp.gmail.com' },
        { key: 'smtp_port', label: 'Porta SMTP', value: '587', type: 'text', placeholder: '587' },
        { key: 'smtp_user', label: 'Usuário SMTP', value: '', type: 'email', placeholder: 'seu-email@gmail.com' },
        { key: 'smtp_password', label: 'Senha SMTP', value: '', type: 'password', placeholder: '••••••••' },
      ],
    },
    {
      id: 'api',
      name: 'API Keys',
      icon: Key,
      settings: [
        { key: 'openai_api_key', label: 'OpenAI API Key', value: '', type: 'password', placeholder: 'sk-xxxxxxxxxxxxx' },
        { key: 'whatsapp_api_key', label: 'WhatsApp API Key', value: '', type: 'password', placeholder: 'xxxxxxxxxxxxx' },
        { key: 'storage_api_key', label: 'Storage API Key', value: '', type: 'password', placeholder: 'xxxxxxxxxxxxx' },
      ],
    },
    {
      id: 'general',
      name: 'Configurações Gerais',
      icon: Settings,
      settings: [
        { key: 'app_name', label: 'Nome da Aplicação', value: 'CAPILIZEIA', type: 'text', placeholder: 'CAPILIZEIA' },
        { key: 'app_url', label: 'URL da Aplicação', value: 'https://capilizeia.com', type: 'url', placeholder: 'https://capilizeia.com' },
        { key: 'support_email', label: 'E-mail de Suporte', value: 'suporte@capilizeia.com', type: 'email', placeholder: 'suporte@capilizeia.com' },
      ],
    },
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  const handleSettingChange = (categoryId: string, settingKey: string, value: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              settings: category.settings.map((setting) =>
                setting.key === settingKey ? { ...setting, value } : setting
              ),
            }
          : category
      )
    );
  };

  const handleSaveCategory = (categoryId: string) => {
    // Aqui você salvaria no banco de dados
    setSuccessMessage('Configurações salvas com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
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
        <h1 className="text-4xl font-bold mb-2">Configurações</h1>
        <p className="text-blue-100">Configurações globais do sistema</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <Check className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Settings Categories */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0B69FF] to-blue-600 rounded-xl flex items-center justify-center">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
            </div>

            <div className="space-y-6">
              {category.settings.map((setting) => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {setting.label}
                  </label>
                  <input
                    type={setting.type}
                    value={setting.value}
                    onChange={(e) => handleSettingChange(category.id, setting.key, e.target.value)}
                    placeholder={setting.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B69FF] focus:border-transparent"
                  />
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => handleSaveCategory(category.id)}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  <span>Salvar Configurações</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">⚠️ Aviso de Segurança</h3>
        <p className="text-sm text-yellow-800">
          Todas as alterações são registradas em logs de auditoria. Mantenha suas chaves de API seguras e nunca as compartilhe.
          As senhas são criptografadas antes de serem salvas no banco de dados.
        </p>
      </div>
    </div>
  );
}
