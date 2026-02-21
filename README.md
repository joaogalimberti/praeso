# No-Show Reducer 🚀

Este projeto é uma solução full-stack projetada para reduzir o "no-show" (não comparecimento) em agendamentos, permitindo o gerenciamento eficiente de clientes, monitoramento de confirmações e visualização de estatísticas em tempo real.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React + Vite**: Framework moderno para uma interface rápida e reativa.
- **Tailwind CSS**: Estilização premium com design system consistente.
- **Zustand**: Gerenciamento de estado global (Auth, UI).
- **Lucide React**: Biblioteca de ícones elegantes.
- **Date-fns**: Manipulação precisa de datas e cálculos de tempo (ex: "tempo restante").
- **Axios**: Cliente HTTP para comunicação com a API.

### Backend
- **Node.js + Express**: Servidor robusto e escalável.
- **Prisma ORM**: Mapeamento objeto-relacional para interações seguras e tipadas com o banco de dados.
- **PostgreSQL (Supabase)**: Banco de dados relacional de alta performance.
- **JWT (JSON Web Tokens)**: Autenticação segura entre frontend e backend.
- **BcryptJS**: Criptografia de senhas para máxima segurança.

## 🏗️ Arquitetura e Integração

O projeto segue um modelo **Client-Server**:

1.  **Frontend (Client)**:
    - Os componentes React solicitam dados via `appointmentsAPI` e `dashboardAPI` (em `src/services/api.ts`).
    - O Token JWT é armazenado no `localStorage` e enviado automaticamente em cada requisição através de interceptores do Axios.
2.  **Backend (Server)**:
    - Recebe as requisições, valida o token JWT usando um middleware de autenticação.
    - O **Dashboard Controller** executa consultas complexas via Prisma para calcular estatísticas mensais, taxas de confirmação e agendamentos pendentes.
    - Implementamos o padrão **Soft-Delete**: ao invés de excluir um dado permanentemente, ele é marcado como `isDeleted`, preservando o histórico para as estatísticas mensais.

## 📊 Funcionalidades do Dashboard

- **Estatísticas em Tempo Real**: Total do mês, Confirmados, Pendentes e Faltas.
- **Filtros Interativos**: Clique em qualquer card de estatística para filtrar a lista de agendamentos abaixo.
- **Tempo Restante**: Cada card de agendamento calcula dinamicamente quanto tempo falta para o serviço.
- **Gestão de Status**: Altere rapidamente entre Pendente, Confirmado ou Concluído.

## 🛡️ Segurança

- **Proteção de Chaves**: O arquivo `.gitignore` impede que chaves de API e arquivos de ambiente (`.env`) sejam enviados para o GitHub.
- **Criptografia**: Senhas nunca são salvas em texto puro.
- **Autenticação**: Rotas de agendamento são protegidas e só podem ser acessadas pelo proprietário dos dados.

---
*Desenvolvido com foco em estética premium e performance.*
