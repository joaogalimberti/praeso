import { create } from 'zustand';
import { appointmentsAPI } from '../services/api';
import type { Appointment, CreateAppointmentDTO, Status } from '../types';

interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
  fetchAppointments: (params?: any) => Promise<void>;
  createAppointment: (data: CreateAppointmentDTO) => Promise<void>;
  updateAppointment: (id: string, data: Partial<CreateAppointmentDTO>) => Promise<void>;
  updateStatus: (id: string, status: Status) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
}

export const useAppointmentsStore = create<AppointmentsState>((set, get) => ({
  appointments: [],
  loading: false,

  fetchAppointments: async (params) => {
    set({ loading: true });
    try {
      const response = await appointmentsAPI.getAll(params);
      set({ appointments: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createAppointment: async (data) => {
    set({ loading: true });
    try {
      const response = await appointmentsAPI.create(data);
      set((state) => ({
        appointments: [...state.appointments, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateAppointment: async (id, data) => {
    set({ loading: true });
    try {
      const response = await appointmentsAPI.update(id, data);
      set((state) => ({
        appointments: state.appointments.map((apt) =>
          apt.id === id ? response.data : apt
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await appointmentsAPI.updateStatus(id, status);
      set((state) => ({
        appointments: state.appointments.map((apt) =>
          apt.id === id ? response.data : apt
        ),
      }));
    } catch (error) {
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      await appointmentsAPI.delete(id);
      set((state) => ({
        appointments: state.appointments.filter((apt) => apt.id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },
}));
