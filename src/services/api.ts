/// <reference types="vite/client" />
import axios from 'axios';
import type { 
  Appointment, 
  CreateAppointmentDTO, 
  LoginDTO, 
  RegisterDTO, 
  AuthResponse,
  User,
  Status
} from '../types';

const api = axios.create({
  // Em produção, como o backend serve o frontend, basta usar '/api'
  // Em desenvolvimento, o Vite pode fazer proxy ou usamos o localhost:3000
  baseURL: (import.meta.env.VITE_API_URL as string) || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: RegisterDTO) => api.post<AuthResponse>('/auth/register', data),
  login: (data: LoginDTO) => api.post<AuthResponse>('/auth/login', data),
  getMe: () => api.get<User>('/auth/me'),
};

// Appointments
export const appointmentsAPI = {
  getAll: (params?: { status?: Status; startDate?: string; endDate?: string }) =>
    api.get<Appointment[]>('/appointments', { params }),
  getById: (id: string) => api.get<Appointment>(`/appointments/${id}`),
  create: (data: CreateAppointmentDTO) => api.post<Appointment>('/appointments', data),
  update: (id: string, data: Partial<CreateAppointmentDTO>) =>
    api.put<Appointment>(`/appointments/${id}`, data),
  updateStatus: (id: string, status: Status) =>
    api.patch<Appointment>(`/appointments/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

// Dashboard
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
