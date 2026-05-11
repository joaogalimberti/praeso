import axios from 'axios';

async function testRegister() {
  console.log('🧪 Testando Registro via API Local...');
  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', {
      name: 'Teste Debug',
      email: `debug_${Date.now()}@test.com`,
      password: 'password123'
    });
    console.log('✅ Registro bem-sucedido:', res.data);
  } catch (error: any) {
    console.error('❌ Erro no Registro:', error.response?.data || error.message);
  }
}

testRegister();
