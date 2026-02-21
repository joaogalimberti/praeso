import type { Status } from '../types';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  PENDING: {
    label: 'Pendente',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  CONFIRMED: {
    label: 'Confirmado',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  MISSED: {
    label: 'Faltou',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  COMPLETED: {
    label: 'Concluído',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
