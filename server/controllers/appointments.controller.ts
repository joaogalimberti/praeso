import { Request, Response } from 'express';
import prisma from '../config/prisma';

export async function createAppointment(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { clientName, clientContact, date, time } = req.body;

    // Validações
    if (!clientName || !clientContact || !date || !time) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientContact,
        date: new Date(date),
        time,
        userId,
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
}

export async function getAppointments(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { status, startDate, endDate } = req.query;

    const where: any = { userId, isDeleted: false };

    if (status) {
      where.status = status as string;
    }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });

    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
}

export async function getAppointmentById(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: id as string,
        userId,
        isDeleted: false,
      } as any,
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamento' });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { clientName, clientContact, date, time } = req.body;

    // Verifica se o agendamento existe e pertence ao usuário e não está deletado
    const existing = await prisma.appointment.findFirst({
      where: { id: id as string, userId, isDeleted: false },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    const appointment = await prisma.appointment.update({
      where: { id: id as string },
      data: {
        clientName,
        clientContact,
        date: date ? new Date(date) : undefined,
        time,
      },
    });

    res.json(appointment);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento' });
  }
}

export async function updateAppointmentStatus(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'CONFIRMED', 'MISSED', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const existing = await prisma.appointment.findFirst({
      where: { id: id as string, userId, isDeleted: false },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    const appointment = await prisma.appointment.update({
      where: { id: id as string },
      data: { status: status as string },
    });

    res.json(appointment);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
}

export async function deleteAppointment(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const existing = await prisma.appointment.findFirst({
      where: { id: id as string, userId, isDeleted: false },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    // Soft Delete
    await prisma.appointment.update({
      where: { id: id as string },
      data: { isDeleted: true } as any,
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro ao deletar agendamento' });
  }
}
