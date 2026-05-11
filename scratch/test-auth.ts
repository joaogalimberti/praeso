import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function testAuth() {
  console.log('🔐 Iniciando teste de Autenticação...');
  
  const password = 'senha_teste_123';
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  
  try {
    console.log('1. Testando Bcrypt...');
    const hash = await bcrypt.hash(password, 10);
    console.log('✅ Hash gerado com sucesso');
    
    const isMatch = await bcrypt.compare(password, hash);
    console.log('✅ Comparação de senha:', isMatch ? 'OK' : 'FALHOU');

    console.log('2. Testando JWT...');
    const token = jwt.sign({ userId: 'test-123' }, secret, { expiresIn: '1h' });
    console.log('✅ Token gerado com sucesso');
    
    const decoded = jwt.verify(token, secret);
    console.log('✅ Token verificado com sucesso');
    
    console.log('🚀 Todos os sistemas de segurança estão operacionais!');
  } catch (error) {
    console.error('❌ ERRO NO SISTEMA DE AUTH:', error);
  }
}

testAuth();
