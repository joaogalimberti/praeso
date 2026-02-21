import cron from 'node-cron';
import prisma from '../config/prisma';
import { sendReminderEmail } from '../services/email.service';

export function startReminderJob() {
  // Roda a cada 15 minutos
  cron.schedule('*/15 * * * *', async () => {
    console.log('🔔 [CRON] Verificando lembretes pendentes...');

    try {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

      // Busca agendamentos de amanhã que ainda não receberam lembrete
      const appointments = await prisma.appointment.findMany({
        where: {
          date: {
            gte: tomorrow,
            lt: dayAfterTomorrow,
          },
          reminderSent: false,
          status: 'PENDING',
        },
        include: {
          user: true,
        },
      });

      console.log(`📊 [CRON] ${appointments.length} lembretes para enviar`);

      for (const apt of appointments) {
        try {
          const dateStr = apt.date.toLocaleDateString('pt-BR');
          const success = await sendReminderEmail(
            apt.clientContact,
            apt.clientName,
            dateStr,
            apt.time
          );

          if (success) {
            // Registra log
            await prisma.reminderLog.create({
              data: {
                appointmentId: apt.id,
                channel: 'email',
                success: true,
              },
            });

            // Marca como enviado
            await prisma.appointment.update({
              where: { id: apt.id },
              data: { reminderSent: true },
            });

            console.log(`✅ [CRON] Lembrete enviado: ${apt.clientName} - ${apt.clientContact}`);
          } else {
            // Registra falha
            await prisma.reminderLog.create({
              data: {
                appointmentId: apt.id,
                channel: 'email',
                success: false,
              },
            });

            console.log(`❌ [CRON] Falha ao enviar: ${apt.clientName}`);
          }
        } catch (error) {
          console.error(`❌ [CRON] Erro ao processar agendamento ${apt.id}:`, error);
        }
      }

      if (appointments.length === 0) {
        console.log('✅ [CRON] Nenhum lembrete pendente');
      }
    } catch (error) {
      console.error('❌ [CRON] Erro no job de lembretes:', error);
    }
  });

  console.log('✅ Job de lembretes iniciado (roda a cada 15 minutos)');
}
