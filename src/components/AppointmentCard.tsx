import { Calendar, Clock, User, Mail, Edit2, Trash2, Hourglass } from 'lucide-react';
import { format, formatDistanceToNow, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import StatusBadge from './StatusBadge';
import type { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: any) => void;
}

export default function AppointmentCard({
  appointment,
  onEdit,
  onDelete,
  onStatusChange,
}: AppointmentCardProps) {
  const appointmentDate = new Date(appointment.date);
  // Combinar data e hora para o cálculo de distância
  const [hours, minutes] = appointment.time.split(':');
  appointmentDate.setHours(parseInt(hours), parseInt(minutes));

  const dateFormatted = format(appointmentDate, "dd 'de' MMMM", {
    locale: ptBR,
  });

  const timeRemaining = formatDistanceToNow(appointmentDate, {
    addSuffix: true,
    locale: ptBR,
  });

  const isExpired = isPast(appointmentDate);

  return (
    <div className="card hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={appointment.status} />
          {!isExpired && (appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
            <span className="text-[10px] font-bold text-primary-500 flex items-center gap-1 bg-primary-50 px-1.5 py-0.5 rounded uppercase tracking-tight">
              <Hourglass className="w-2.5 h-2.5" />
              {timeRemaining}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{dateFormatted}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{appointment.clientContact}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        {appointment.status === 'PENDING' && (
          <button
            onClick={() => onStatusChange('CONFIRMED')}
            className="btn btn-primary text-sm flex-1"
          >
            Confirmar
          </button>
        )}
        {appointment.status === 'CONFIRMED' && (
          <button
            onClick={() => onStatusChange('COMPLETED')}
            className="btn btn-primary text-sm flex-1"
          >
            Concluir
          </button>
        )}
        <button
          onClick={onEdit}
          className="btn btn-secondary text-sm p-2"
          title="Editar"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="btn btn-danger text-sm p-2"
          title="Deletar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
