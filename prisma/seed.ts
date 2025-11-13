import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@capilizeia.com' },
    update: {},
    create: {
      email: 'admin@capilizeia.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Criar clientes de exemplo
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { email: 'maria@email.com' },
      update: {},
      create: {
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '11999999999',
        city: 'São Paulo',
        purchaseValue: 19.90,
        status: 'active',
      },
    }),
    prisma.customer.upsert({
      where: { email: 'joao@email.com' },
      update: {},
      create: {
        name: 'João Santos',
        email: 'joao@email.com',
        phone: '11988888888',
        city: 'Rio de Janeiro',
        purchaseValue: 9.90,
        status: 'active',
      },
    }),
    prisma.customer.upsert({
      where: { email: 'ana@email.com' },
      update: {},
      create: {
        name: 'Ana Costa',
        email: 'ana@email.com',
        phone: '11977777777',
        city: 'Belo Horizonte',
        purchaseValue: 49.90,
        status: 'active',
      },
    }),
  ]);

  console.log(`✅ ${customers.length} clientes criados`);

  // Criar configurações de pagamento
  const paymentSettings = await Promise.all([
    prisma.paymentSetting.upsert({
      where: { gatewayName: 'Stripe' },
      update: {},
      create: {
        gatewayName: 'Stripe',
        apiUrl: 'https://api.stripe.com/v1',
        publicKey: 'pk_test_xxxxxxxxxxxxx',
        privateKey: 'sk_test_xxxxxxxxxxxxx',
        isActive: true,
      },
    }),
    prisma.paymentSetting.upsert({
      where: { gatewayName: 'Mercado Pago' },
      update: {},
      create: {
        gatewayName: 'Mercado Pago',
        apiUrl: 'https://api.mercadopago.com',
        publicKey: 'APP_USR_xxxxxxxxxxxxx',
        privateKey: 'APP_USR_xxxxxxxxxxxxx',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${paymentSettings.length} gateways de pagamento configurados`);

  console.log('🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('   Email: admin@capilizeia.com');
  console.log('   Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
