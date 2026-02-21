import { useForm } from 'react-hook-form';
import { useAppointmentsStore } from '../store/useAppointmentsStore';
import type { CreateAppointmentDTO, Appointment } from '../types';

interface AppointmentFormProps {
  appointment?: Appointment | null;
  onSuccess: () => void;
}

export default function AppointmentForm({ appointment, onSuccess }: AppointmentFormProps) {
  const { createAppointment, updateAppointment, loading } = useAppointmentsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAppointmentDTO>({
    defaultValues: appointment
      ? {
          clientName: appointment.clientName,
          clientContact: appointment.clientContact,
          date: appointment.date.split('T')[0],
          time: appointment.time,
        }
      : undefined,
  });

  const onSubmit = async (data: CreateAppointmentDTO) => {
    try {
      if (appointment) {
        await updateAppointment(appointment.id, data);
      } else {
        await createAppointment(data);
      }
      onSuccess();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao salvar agendamento');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Cliente *
        </label>
        <input
          {...register('clientName', { required: 'Nome é obrigatório' })}
          type="text"
          className="input"
          placeholder="João Silva"
        />
        {errors.clientName && (
          <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email ou Telefone *
        </label>
        <input
          {...register('clientContact', { required: 'Contato é obrigatório' })}
          type="text"
          className="input"
          placeholder="joao@email.com ou (11) 99999-9999"
        />
        {errors.clientContact && (
          <p className="text-red-500 text-sm mt-1">{errors.clientContact.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data *
          </label>
          <input
            {...register('date', { required: 'Data é obrigatória' })}
            type="date"
            className="input"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora *
          </label>
          <input
            {...register('time', { required: 'Hora é obrigatória' })}
            type="time"
            className="input"
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1"
        >
          {loading ? 'Salvando...' : appointment ? 'Atualizar' : 'Criar Agendamento'}
        </button>
      </div>
    </form>
  );
}
