import { Request, Response } from 'express';
import prisma from '../config/prisma';

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Estatísticas do mês
    // 1. Total do mês (mesmo que excluídos)
    const totalCount = await prisma.appointment.count({
      where: {
        userId,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    // 2. Confirmados (Que ainda serão atendidos)
    const confirmedCount = await prisma.appointment.count({
      where: {
        userId,
        status: 'CONFIRMED',
        date: { gte: startOfDay },
        isDeleted: false,
      } as any,
    });

    // 3. Faltas (Já passou e não confirmou/concluiu)
    const missedCount = await prisma.appointment.count({
      where: {
        userId,
        date: { lt: startOfDay },
        status: { notIn: ['CONFIRMED', 'COMPLETED'] },
        isDeleted: false,
      } as any,
    });

    // 4. Pendentes (Futuros aguardando confirmação)
    const pendingCount = await prisma.appointment.count({
      where: {
        userId,
        status: 'PENDING',
        date: { gte: startOfDay },
        isDeleted: false,
      } as any,
    });

    // 5. Concluídos (Apenas para referência interna ou futura)
    const completedCount = await prisma.appointment.count({
      where: {
        userId,
        status: 'COMPLETED',
        isDeleted: false,
      } as any,
    });

    // Taxa de confirmação: (confirmados / total do mês)
    const confirmationRate = totalCount > 0 ? (confirmedCount / totalCount) * 100 : 0;

    // Próximos atendimentos (mais próximos)
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        userId,
        date: { gte: startOfDay },
        status: { in: ['PENDING', 'CONFIRMED'] },
        isDeleted: false,
      } as any,
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
      take: 20,
    });

    // Atendimentos de hoje
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const todayAppointments = await prisma.appointment.findMany({
      where: {
        userId,
        date: { gte: startOfDay, lte: endOfDay },
        isDeleted: false,
      } as any,
      orderBy: { time: 'asc' },
    });

    res.json({
      stats: {
        total: totalCount,
        confirmed: confirmedCount,
        missed: missedCount,
        pending: pendingCount,
        completed: completedCount,
        confirmationRate: parseFloat(confirmationRate.toFixed(1)),
      },
      upcomingAppointments,
      todayAppointments,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
}
