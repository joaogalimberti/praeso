export type Status = 'PENDING' | 'CONFIRMED' | 'MISSED' | 'COMPLETED';

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Appointment {
    id: string;
    clientName: string;
    clientContact: string;
    date: string;
    time: string;
    status: Status;
    userId: string;
    createdAt: string;
    updatedAt: string;
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
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
