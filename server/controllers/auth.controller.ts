import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, timezone } = req.body;

    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }

    // Verifica se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        timezone: timezone || 'America/Sao_Paulo',
      },
      select: {
        id: true,
        name: true,
        email: true,
        timezone: true,
        createdAt: true,
      },
    });

    // Gera token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user,
      token,
    });
  } catch (err: any) {
    console.error('Erro não tratado:', err);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log(`🔐 Tentativa de login para: ${email}`);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // 1. Busca usuário no banco
    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (dbError: any) {
      console.error('❌ Erro de Banco no Login:', dbError);
      return res.status(500).json({ 
        error: 'Erro de conexão com o banco de dados',
        details: dbError.message 
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'Email não cadastrado' });
    }

    // 2. Verifica senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // 3. Gera token
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET não configurado no servidor!');
      return res.status(500).json({ error: 'Erro de configuração no servidor (JWT_SECRET ausente)' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login bem-sucedido!');
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        timezone: user.timezone,
      },
      token,
    });
  } catch (error: any) {
    console.error('❌ Erro Crítico no Login:', error);
    res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: error.message,
      stack: error.stack
    });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        timezone: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
  }
}
