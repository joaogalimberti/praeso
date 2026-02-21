#!/bin/bash

echo "🚀 Appointment No-Show Reducer - Setup Automático"
echo "=================================================="
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verifica Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Instale Node.js 18+ primeiro.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"
echo ""

# Backend
echo "🔧 Instalando dependências do Backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do backend${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Backend instalado${NC}"
echo ""

# Verifica PostgreSQL
echo "🗄️  Verificando PostgreSQL..."
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL encontrado${NC}"
    
    # Cria banco se não existir
    echo "📊 Criando banco de dados..."
    createdb appointments 2>/dev/null
    
    # Executa migrations
    echo "🔄 Executando migrations..."
    npx prisma migrate dev --name init
    npx prisma generate
    echo -e "${GREEN}✅ Banco configurado${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL não encontrado${NC}"
    echo "Por favor, instale PostgreSQL e configure DATABASE_URL no .env"
fi
echo ""

# Frontend
echo "🎨 Instalando dependências do Frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do frontend${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Frontend instalado${NC}"
echo ""

# Finalização
echo "=================================================="
echo -e "${GREEN}✨ Setup concluído com sucesso!${NC}"
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1. Configure o arquivo backend/.env com suas credenciais"
echo "2. Inicie o backend:"
echo -e "   ${YELLOW}cd backend && npm run dev${NC}"
echo ""
echo "3. Em outro terminal, inicie o frontend:"
echo -e "   ${YELLOW}cd frontend && npm run dev${NC}"
echo ""
echo "4. Acesse: http://localhost:5173"
echo ""
echo "📚 Documentação completa: README.md"
echo "=================================================="
