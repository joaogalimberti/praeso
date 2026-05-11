import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function test() {
  console.log('🔍 Iniciando teste de conexão...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:.*@/, ':****@')); // Esconde a senha

  try {
    await prisma.$connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    
    const count = await prisma.user.count();
    console.log(`📊 Número de usuários no banco: ${count}`);
    
    console.log('🚀 Teste concluído com sucesso!');
  } catch (error) {
    console.error('❌ ERRO NA CONEXÃO:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
