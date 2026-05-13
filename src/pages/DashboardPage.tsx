import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, XCircle, TrendingUp, Plus, LogOut, Hourglass } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { dashboardAPI, appointmentsAPI } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import AppointmentCard from '../components/AppointmentCard';
import Modal from '../components/Modal';
import AppointmentForm from '../components/AppointmentForm';
import toast from 'react-hot-toast';
import type { Appointment } from '../types';

interface Stats {
  total: number;
  confirmed: number;
  missed: number;
  pending: number;
  completed: number;
  confirmationRate: number;
}

type FilterType = 'TOTAL' | 'CONFIRMED' | 'MISSED' | 'PENDING' | 'NONE';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('NONE');

  const fetchDashboard = async () => {
    try {
      const statsResponse = await dashboardAPI.getStats();
      setStats(statsResponse.data.stats);
      setUpcomingAppointments(statsResponse.data.upcomingAppointments);
      setTodayAppointments(statsResponse.data.todayAppointments);

      // Buscar todos os agendamentos para permitir filtros globais
      const allResponse = await appointmentsAPI.getAll();
      setAllAppointments(allResponse.data);
    } catch (error) {
      toast.error('Erro ao carregar dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getFilteredAppointments = () => {
    if (activeFilter === 'NONE') return null;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return allAppointments.filter(apt => {
      // Parse data sem deslocamento de fuso horário
      const [year, month, day] = apt.date.split('T')[0].split('-').map(Number);
      const aptDate = new Date(year, month - 1, day);
      
      // Combinar com a hora para comparação precisa se necessário
      const [hours, minutes] = apt.time.split(':');
      const aptDateTime = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes));

      if (activeFilter === 'TOTAL') {
        return true;
      }
      if (activeFilter === 'CONFIRMED') {
        return apt.status === 'CONFIRMED' && aptDate >= startOfToday;
      }
      if (activeFilter === 'PENDING') {
        return apt.status === 'PENDING' && aptDate >= startOfToday;
      }
      if (activeFilter === 'MISSED') {
        return aptDate < startOfToday && apt.status !== 'CONFIRMED' && apt.status !== 'COMPLETED';
      }
      return true;
    });
  };

  const filteredList = getFilteredAppointments();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="hover:scale-110 transition-transform cursor-pointer"
                onClick={() => navigate('/')}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-[0.1em] text-gray-900 uppercase">PRAESO</span>
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                </div>
              </div>
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Olá, {user?.name}!
                </h1>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
                  {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors font-bold text-xs uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <button
            onClick={() => setActiveFilter(activeFilter === 'TOTAL' ? 'NONE' : 'TOTAL')}
            className={`card text-left transition-all ${activeFilter === 'TOTAL' ? 'ring-2 ring-blue-500 bg-blue-50/50 shadow-blue-100' : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total do Mês</p>
                <p className="text-xl font-black text-gray-900">{stats?.total || 0}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'CONFIRMED' ? 'NONE' : 'CONFIRMED')}
            className={`card text-left transition-all ${activeFilter === 'CONFIRMED' ? 'ring-2 ring-green-500 bg-green-50/50 shadow-green-100' : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Confirmados</p>
                <p className="text-xl font-black text-gray-900">{stats?.confirmed || 0}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'PENDING' ? 'NONE' : 'PENDING')}
            className={`card text-left transition-all ${activeFilter === 'PENDING' ? 'ring-2 ring-amber-500 bg-amber-50/50 shadow-amber-100' : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 rounded-xl">
                <Hourglass className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Pendentes</p>
                <p className="text-xl font-black text-gray-900">{stats?.pending || 0}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'MISSED' ? 'NONE' : 'MISSED')}
            className={`card text-left transition-all ${activeFilter === 'MISSED' ? 'ring-2 ring-red-500 bg-red-50/50 shadow-red-100' : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100 rounded-xl">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Faltas</p>
                <p className="text-xl font-black text-gray-900">{stats?.missed || 0}</p>
              </div>
            </div>
          </button>

          <div className="card bg-gradient-to-br from-indigo-600 to-primary-700 border-none shadow-xl shadow-indigo-500/30 overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-primary-100/70 uppercase tracking-widest leading-none mb-1">Confirmação</p>
                <p className="text-xl font-black text-white">{stats?.confirmationRate || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic List Selection */}
        {activeFilter !== 'NONE' ? (
          <div className="mb-8 animate-fade-in bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-1 h-12 rounded-full ${activeFilter === 'CONFIRMED' ? 'bg-green-500' :
                  activeFilter === 'PENDING' ? 'bg-amber-500' :
                    activeFilter === 'TOTAL' ? 'bg-blue-500' :
                      'bg-red-500'
                  }`}></div>
                <div>
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Visualização Ativa</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${activeFilter === 'CONFIRMED' ? 'bg-green-50 text-green-600' :
                      activeFilter === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                        activeFilter === 'TOTAL' ? 'bg-blue-50 text-blue-600' :
                          'bg-red-50 text-red-600'
                      }`}>
                      {activeFilter === 'CONFIRMED' ? 'Confirmados' :
                        activeFilter === 'PENDING' ? 'Pendentes' :
                          activeFilter === 'TOTAL' ? 'Todos os Agendamentos' :
                            'Faltas'}
                    </span>
                    <p className="text-sm font-bold text-gray-900">
                      Mostrando {filteredList?.length || 0} agendamentos encontrados
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveFilter('NONE')}
                className="flex items-center gap-1.5 p-2 px-3 bg-gray-50 hover:bg-gray-100 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-xl transition-all"
              >
                Limpar Filtro
              </button>
            </div>
          </div>
        ) : null}

        {/* Conditional Content Rendering */}
        {activeFilter !== 'NONE' ? (
          <div className="mb-8 animate-fade-in">
            {filteredList && filteredList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredList.map((apt) => (
                  <AppointmentCard
                    key={apt.id}
                    appointment={apt}
                    onEdit={() => {
                      setEditingAppointment(apt);
                      setIsModalOpen(true);
                    }}
                    onDelete={async () => {
                      if (confirm('Deseja realmente deletar este agendamento?')) {
                        try {
                          await appointmentsAPI.delete(apt.id);
                          toast.success('Agendamento deletado');
                          fetchDashboard();
                        } catch (error) {
                          toast.error('Erro ao deletar agendamento');
                        }
                      }
                    }}
                    onStatusChange={async (status) => {
                      try {
                        await appointmentsAPI.updateStatus(apt.id, status);
                        toast.success('Status atualizado');
                        fetchDashboard();
                      } catch (error) {
                        toast.error('Erro ao atualizar status');
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Nenhum agendamento encontrado para este filtro</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Today's Appointments */}
            {(activeFilter === 'TOTAL' || todayAppointments.length > 0) && (
              <div className="mb-8">
                <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                  {activeFilter === 'TOTAL' ? 'Todos de Hoje' : 'Atendimentos de Hoje'}
                </h2>
                {todayAppointments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {todayAppointments.map((apt) => (
                      <AppointmentCard
                        key={apt.id}
                        appointment={apt}
                        onEdit={() => {
                          setEditingAppointment(apt);
                          setIsModalOpen(true);
                        }}
                        onDelete={async () => {
                          if (confirm('Deseja realmente deletar este agendamento?')) {
                            try {
                              await appointmentsAPI.delete(apt.id);
                              toast.success('Agendamento deletado');
                              fetchDashboard();
                            } catch (error) {
                              toast.error('Erro ao deletar agendamento');
                            }
                          }
                        }}
                        onStatusChange={async (status) => {
                          try {
                            await appointmentsAPI.updateStatus(apt.id, status);
                            toast.success('Status atualizado');
                            fetchDashboard();
                          } catch (error) {
                            toast.error('Erro ao atualizar status');
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="card text-center py-6 border-dashed border-2 border-gray-100 bg-transparent shadow-none">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Sem atendimentos para hoje</p>
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Appointments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                  {activeFilter === 'TOTAL' ? 'Todo o Mês' : 'Próximos Agendamentos'}
                </h2>
                <button
                  onClick={() => {
                    setEditingAppointment(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary-700 transition-all flex items-center gap-2 shadow-lg shadow-primary-500/20 active:scale-95"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                  Novo Agendamento
                </button>
              </div>

              {upcomingAppointments.length === 0 && activeFilter === 'NONE' ? (
                <div className="card text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4 font-bold uppercase tracking-widest text-sm">Nenhum agendamento encontrado</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary"
                  >
                    Criar Primeiro Agendamento
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(activeFilter === 'TOTAL' ? allAppointments : upcomingAppointments).map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onEdit={() => {
                        setEditingAppointment(apt);
                        setIsModalOpen(true);
                      }}
                      onDelete={async () => {
                        if (confirm('Deseja realmente deletar este agendamento?')) {
                          try {
                            await appointmentsAPI.delete(apt.id);
                            toast.success('Agendamento deletado');
                            fetchDashboard();
                          } catch (error) {
                            toast.error('Erro ao deletar agendamento');
                          }
                        }
                      }}
                      onStatusChange={async (status) => {
                        try {
                          await appointmentsAPI.updateStatus(apt.id, status);
                          toast.success('Status atualizado');
                          fetchDashboard();
                        } catch (error) {
                          toast.error('Erro ao atualizar status');
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAppointment(null);
        }}
        title={editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
      >
        <AppointmentForm
          appointment={editingAppointment}
          onSuccess={() => {
            setIsModalOpen(false);
            setEditingAppointment(null);
            fetchDashboard();
            toast.success(
              editingAppointment ? 'Agendamento atualizado!' : 'Agendamento criado!'
            );
          }}
        />
      </Modal>
    </div>
  );
}
