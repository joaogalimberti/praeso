import { CalendarDays, TrendingUp, Users, Clock, Check, Activity, BellRing } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type SlotStatus = 'confirmed' | 'pending' | 'available';

type Slot = {
  time: string;
  patient: string;
  service: string;
  status: SlotStatus;
};

const STATUS_META: Record<SlotStatus, { label: string; dot: string; chip: string; bar: string }> = {
  confirmed: {
    label: 'Confirmado',
    dot: 'bg-moss-500',
    chip: 'bg-moss-50 text-moss-700 ring-1 ring-moss-200',
    bar: 'bg-moss-500',
  },
  pending: {
    label: 'Aguardando',
    dot: 'bg-signal-warn',
    chip: 'bg-paper-200 text-signal-warn ring-1 ring-paper-300',
    bar: 'bg-signal-warn',
  },
  available: {
    label: 'Disponível',
    dot: 'bg-ink-200',
    chip: 'bg-ink-50 text-ink-500 ring-1 ring-ink-100',
    bar: 'bg-ink-200',
  },
};

const SAMPLE_SLOTS: Slot[] = [
  { time: '09:00', patient: 'Marina A.', service: 'Avaliação', status: 'confirmed' },
  { time: '09:40', patient: 'Carlos B.', service: 'Retorno', status: 'confirmed' },
  { time: '10:20', patient: 'Patrícia C.', service: 'Consulta', status: 'confirmed' },
  { time: '11:00', patient: 'João D.', service: 'Procedimento', status: 'confirmed' },
  { time: '11:40', patient: '—', service: 'Livre', status: 'available' },
  { time: '13:00', patient: 'Eliane F.', service: 'Retorno', status: 'confirmed' },
];

export function Dashboard() {
  return (
    <section id="painel" className="relative py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Visibilidade 360º</p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-ink-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Um painel que parece o software que você já usa.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-600">
            Agenda do dia, confirmações, horários disponíveis, próximos compromissos e indicadores
            operacionais — tudo em uma tela. Demonstração ilustrativa da interface.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <DashboardMock />
        </Reveal>

        <p className="mt-6 text-center text-xs text-ink-400">
          Dados ilustrativos para fins de demonstração.
        </p>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-paper-50 shadow-lift">
      <div className="flex items-center justify-between border-b border-ink-100 bg-paper-100 px-5 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-paper-50">
            <Activity className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-ink-900">PRAESO · Painel</p>
            <p className="text-[10px] text-ink-400">Clínica Centro · Sala 1</p>
          </div>
        </div>
        <span className="hidden rounded-full bg-moss-50 px-2.5 py-1 text-[10px] font-semibold text-moss-700 ring-1 ring-moss-200 sm:inline">
          Ao vivo
        </span>
      </div>

      <div className="grid gap-px bg-ink-100 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden bg-paper-50 p-4 lg:block">
          <nav className="space-y-1">
            {[
              { label: 'Visão geral', icon: TrendingUp, active: true },
              { label: 'Agenda', icon: CalendarDays },
              { label: 'Pacientes', icon: Users },
              { label: 'Automações', icon: Activity },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ${
                  item.active ? 'bg-ink-900 font-semibold text-paper-50' : 'text-ink-600'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
            ))}
          </nav>

          <div className="mt-6 rounded-xl bg-moss-50 p-3 ring-1 ring-moss-200">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-moss-700">Receita protegida</p>
            <p className="mt-1 text-xl font-bold tabular-nums text-ink-900">R$ 2.480</p>
            <p className="mt-0.5 text-[10px] text-ink-500">hoje · 3 antecipações</p>
          </div>
        </aside>

        <div className="bg-paper-50 p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Kpi icon={Check} label="Confirmações hoje" value="12" delta="+3" />
            <Kpi icon={Clock} label="Aguardando" value="2" delta="-1" />
            <Kpi icon={Users} label="Pacientes" value="38" delta="+5" />
            <Kpi icon={TrendingUp} label="Ocupação" value="82%" delta="+6%" />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-ink-100 bg-paper-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink-900">Agenda do dia</p>
                <span className="text-[10px] text-ink-400">10 de outubro</span>
              </div>
              <ul className="mt-3 divide-y divide-ink-100">
                {SAMPLE_SLOTS.slice(0, 6).map((slot) => {
                  const meta = STATUS_META[slot.status];
                  const isAvail = slot.status === 'available';
                  return (
                    <li key={slot.time} className={`flex items-center gap-3 px-1 py-2.5 ${isAvail ? 'opacity-60' : ''}`}>
                      <span className="w-10 text-[11px] font-semibold tabular-nums text-ink-500">{slot.time}</span>
                      <span className={`h-6 w-[3px] rounded-full ${meta.bar}`} />
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-[12px] font-semibold ${isAvail ? 'text-ink-400' : 'text-ink-900'}`}>
                          {slot.patient}
                        </p>
                        <p className="truncate text-[10px] text-ink-400">{slot.service}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${meta.chip}`}>
                        <span className={`h-1 w-1 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-ink-100 bg-paper-50 p-4">
                <p className="text-[13px] font-semibold text-ink-900">Próximos compromissos</p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    { t: '13:00', p: 'Eliane F.', s: 'Retorno' },
                    { t: '13:40', p: 'Rafael G.', s: 'Avaliação' },
                    { t: '14:20', p: 'Sandra H.', s: 'Consulta' },
                  ].map((row) => (
                    <li key={row.t} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-200 text-[11px] font-bold text-ink-700">
                        {row.t}
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-ink-900">{row.p}</p>
                        <p className="text-[10px] text-ink-400">{row.s}</p>
                      </div>
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-moss-500" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-ink-100 bg-paper-50 p-4">
                <div className="flex items-center gap-2">
                  <BellRing className="h-3.5 w-3.5 text-moss-600" />
                  <p className="text-[13px] font-semibold text-ink-900">Atividade recente</p>
                </div>
                <ul className="mt-3 space-y-2 text-[11px] text-ink-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />
                    Patrícia C. confirmou 10:20
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal-warn" />
                    Lembrete enviado para Rafael G.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />
                    Horário 11:40 reofertado
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta }: { icon: typeof Check; label: string; value: string; delta: string }) {
  const up = delta.trim().startsWith('+');
  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-3.5">
      <div className="flex items-center justify-between">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-paper-200 text-ink-600">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className={`text-[10px] font-semibold ${up ? 'text-moss-700' : 'text-signal-danger'}`}>{delta}</span>
      </div>
      <p className="mt-2 text-xl font-bold tabular-nums text-ink-900">{value}</p>
      <p className="text-[10px] text-ink-400">{label}</p>
    </div>
  );
}
