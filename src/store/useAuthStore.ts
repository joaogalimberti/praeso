import { create } from 'zustand';
import { authAPI } from '../services/api';
import type { User, LoginDTO, RegisterDTO } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginDTO) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  login: async (data: LoginDTO) => {
    set({ loading: true });
    try {
      const response = await authAPI.login(data);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (error: any) {
      set({ loading: false });
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
  },

  register: async (data: RegisterDTO) => {
    set({ loading: true });
    try {
      const response = await authAPI.register(data);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (error: any) {
      set({ loading: false });
      throw new Error(error.response?.data?.error || 'Erro ao criar conta');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const response = await authAPI.getMe();
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));
