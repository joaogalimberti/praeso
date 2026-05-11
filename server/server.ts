import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import appointmentsRoutes from './routes/appointments.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { startReminderJob } from './jobs/reminder.job';
import { testEmailConnection } from './services/email.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Rota de health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Servir arquivos estáticos do Frontend (após o build)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Rota raiz e API
app.get('/api', (_req, res) => {
  res.json({
    message: 'Appointment No-Show Reducer API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      appointments: '/api/appointments',
      dashboard: '/api/dashboard',
    },
  });
});

// Todas as outras rotas servem o index.html (SPA)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  res.sendFile(path.join(distPath, 'index.html'));
});

// Handler de erros
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicia servidor
app.listen(PORT, async () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Appointment No-Show Reducer API                     ║
║                                                           ║
║   Server: http://localhost:${PORT}                          ║
║   Environment: ${process.env.NODE_ENV || 'development'}                                 ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);

  // Testa conexão com email
  const emailOk = await testEmailConnection();
  if (emailOk) {
    console.log('✅ Email configurado corretamente');
  } else {
    console.log('⚠️  Email não configurado (configure .env para produção)');
  }

  // Inicia job de lembretes
  startReminderJob();

  console.log('\n📚 Documentação da API:');
  console.log('   POST   /api/auth/register');
  console.log('   POST   /api/auth/login');
  console.log('   GET    /api/auth/me');
  console.log('   GET    /api/dashboard/stats');
  console.log('   GET    /api/appointments');
  console.log('   POST   /api/appointments');
  console.log('   PUT    /api/appointments/:id');
  console.log('   PATCH  /api/appointments/:id/status');
  console.log('   DELETE /api/appointments/:id\n');
});
