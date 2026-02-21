export type Status = 'PENDING' | 'CONFIRMED' | 'MISSED' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  email: string;
  timezone: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientContact: string;
  date: string;
  time: string;
  status: Status;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface DashboardStats {
  total: number;
  confirmed: number;
  missed: number;
  completed: number;
  confirmationRate: number;
}

export interface CreateAppointmentDTO {
  clientName: string;
  clientContact: string;
  date: string;
  time: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  timezone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
