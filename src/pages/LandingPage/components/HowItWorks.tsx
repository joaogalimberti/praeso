import { useState } from 'react';
import { Database, CalendarRange, Radar, MessageSquareReply, Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const STEPS = [
  {
    n: '01',
    icon: Database,
    title: 'Entrada de dados',
    short: 'Sua agenda entra na plataforma.',
    desc: 'Importamos horários, pacientes e regras de atendimento. A PRAESO trabalha a partir da agenda que já existe — nada de planilhas paralelas.',
  },
  {
    n: '02',
    icon: CalendarRange,
    title: 'Organização da agenda',
    short: 'Cada horário ganha contexto.',
    desc: 'Status, prioridades e janelas de risco ficam claros. Você enxerga a agenda como um sistema, não como uma lista de nomes.',
  },
  {
    n: '03',
    icon: Radar,
    title: 'Antecipação ativa',
    short: 'A plataforma age antes.',
    desc: 'Lembretes e confirmações são acionados no momento certo. Horários vagos são identificados e reofertados com antecedência.',
  },
  {
    n: '04',
    icon: MessageSquareReply,
    title: 'Confirmação e controle',
    short: 'A agenda se atualiza sozinha.',
    desc: 'Cada resposta do paciente atualiza o status do compromisso. Você acompanha tudo em tempo real e intervém apenas onde faz sentido.',
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(2);
  const step = STEPS[active];

  return (
    <section id="como-funciona" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-200/40 border-t border-ink-100/60 overflow-hidden">
      <div className="container-x my-auto">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow justify-center">Como funciona</p>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Quatro etapas, do dado à previsibilidade.
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-ink-600">
              Um processo conectado: a cada etapa, a agenda ganha mais clareza e zero improviso.
            </p>
          </Reveal>
        </div>

        {/* Botoes das etapas - Mobile Scrollable / Grid */}
        <Reveal className="mt-8 sm:mt-10" delay={60}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.n}
                  onClick={() => setActive(i)}
                  className={`group relative flex flex-col items-start rounded-xl sm:rounded-2xl border p-3.5 sm:p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-ink-900 bg-paper-50 shadow-soft ring-1 ring-ink-900'
                      : 'border-ink-100 bg-paper-50/50 hover:border-ink-200 hover:bg-paper-50'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={`text-xs font-bold tabular-nums ${isActive ? 'text-ink-900' : 'text-ink-400'}`}>
                      {s.n}
                    </span>
                    <s.icon className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${isActive ? 'text-moss-600' : 'text-ink-400'}`} strokeWidth={2} />
                  </div>
                  <p className={`mt-3 sm:mt-4 text-xs sm:text-sm font-semibold ${isActive ? 'text-ink-900' : 'text-ink-700'}`}>
                    {s.title}
                  </p>
                  <p className="hidden sm:block mt-1 text-[11px] leading-snug text-ink-500">{s.short}</p>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Card de Detalhes da Etapa Ativa */}
        <Reveal className="mt-5 sm:mt-6" delay={120}>
          <div className="grid gap-6 sm:gap-8 rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-ink-900 text-paper-50">
                  <step.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                </span>
                <span className="text-xs font-bold tracking-wider text-ink-400">PASSO {step.n}</span>
              </div>
              <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold tracking-tight text-ink-950">{step.title}</h3>
              <p className="mt-2 text-xs sm:text-base leading-relaxed text-ink-600">{step.desc}</p>

              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
                {OUTCOMES[active].map((o) => (
                  <li key={o} className="flex items-start gap-2 text-xs sm:text-sm text-ink-700">
                    <Check className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-moss-600" strokeWidth={2.5} />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <StepVisual variant={step.n} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const OUTCOMES: string[][] = [
  ['Importação da agenda em poucos minutos', 'Pacientes e serviços reconhecidos', 'Nenhuma planilha paralela para manter'],
  ['Status claro para cada compromisso', 'Riscos e prioridades evidentes', 'Visão de sistema, não de lista'],
  ['Lembretes na janela ideal', 'Reoferta de vagas com antecedência', 'Equipe liberada do trabalho manual'],
  ['Status atualizado sem intervenção', 'Painel em tempo real', 'Controle humano apenas onde precisa'],
];

function StepVisual({ variant }: { variant: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl sm:rounded-2xl border border-ink-100 bg-paper-100 p-4 sm:p-6 min-h-[220px] sm:min-h-[280px]">
      {variant === '01' && <ImportV />}
      {variant === '02' && <OrganizeV />}
      {variant === '03' && <AnticipateV />}
      {variant === '04' && <ConfirmV />}
    </div>
  );
}

function ImportV() {
  return (
    <div className="w-full space-y-2">
      {['Maria S.', 'Carlos B.', 'Patrícia C.'].map((p, i) => (
        <div key={p} className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-ink-100 bg-paper-50 p-2.5 sm:p-3">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-paper-200 text-[10px] sm:text-[11px] font-bold text-ink-700">
            {p.charAt(0)}
          </span>
          <div className="flex-1">
            <p className="text-xs sm:text-[13px] font-semibold text-ink-900">{p}</p>
            <p className="text-[9px] sm:text-[10px] text-ink-400">10:0{i * 2 + 2} · Consulta</p>
          </div>
          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-moss-600" strokeWidth={2.5} />
        </div>
      ))}
      <p className="rounded-xl border border-dashed border-ink-200 bg-paper-50 p-2 sm:p-2.5 text-center text-[10px] sm:text-[11px] text-ink-400">
        Agenda importada · 42 horários reconhecidos
      </p>
    </div>
  );
}

function OrganizeV() {
  return (
    <div className="w-full space-y-2">
      {[
        { t: '09:00', s: 'Confirmado', c: 'bg-moss-50 text-moss-700 ring-moss-200', w: 'w-full' },
        { t: '09:40', s: 'Confirmado', c: 'bg-moss-50 text-moss-700 ring-moss-200', w: 'w-full' },
        { t: '10:20', s: 'Risco', c: 'bg-paper-200 text-signal-warn ring-paper-300', w: 'w-1/3' },
        { t: '11:00', s: 'Confirmado', c: 'bg-moss-50 text-moss-700 ring-moss-200', w: 'w-full' },
        { t: '11:40', s: 'Livre', c: 'bg-ink-50 text-ink-500 ring-ink-100', w: 'w-0' },
      ].map((row) => (
        <div key={row.t} className="flex items-center gap-2 sm:gap-3 rounded-xl border border-ink-100 bg-paper-50 p-2 sm:p-2.5">
          <span className="w-10 sm:w-12 text-[10px] sm:text-[11px] font-semibold tabular-nums text-ink-500">{row.t}</span>
          <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold ring-1 ${row.c}`}>{row.s}</span>
          <span className="ml-auto h-1.5 w-12 sm:w-16 rounded-full bg-ink-100">
            <span className={`block h-full rounded-full bg-moss-500 ${row.w}`} />
          </span>
        </div>
      ))}
    </div>
  );
}

function AnticipateV() {
  return (
    <div className="w-full space-y-2.5 sm:space-y-3">
      <div className="rounded-xl border border-ink-100 bg-paper-50 p-3">
        <p className="text-[11px] font-semibold text-ink-700">10:20 · Patrícia C.</p>
        <p className="mt-0.5 text-[9px] sm:text-[10px] text-ink-400">Risco detectado · acionando fluxo</p>
        <div className="mt-2.5 space-y-1.5">
          {['Lembrete enviado', 'Aguardando resposta', 'Reoferta preparada'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${i < 1 ? 'bg-moss-500' : 'bg-ink-200'}`} />
              <span className={`text-[10px] ${i < 1 ? 'text-ink-700' : 'text-ink-400'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-moss-200 bg-moss-50 p-2.5 sm:p-3 text-[10px] sm:text-[11px] font-semibold text-moss-700">
        Vaga 11:40 preenchida por Carla M.
      </div>
    </div>
  );
}

function ConfirmV() {
  return (
    <div className="w-full space-y-2.5 sm:space-y-3">
      <div className="rounded-2xl rounded-bl-sm border border-ink-100 bg-paper-50 px-3 py-2 text-[11px] sm:text-[12px] text-ink-700">
        Confirmando amanhã às 10:20. Podemos contar com sua presença?
      </div>
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-sm bg-moss-600 px-3 py-2 text-[11px] sm:text-[12px] text-paper-50">
          Sim, confirmado!
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-moss-200 bg-moss-50 px-3 py-2 text-[10px] sm:text-[11px] font-semibold text-moss-700">
        <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-dot-blink" />
        Agenda atualizada: 10:20 → Confirmado
      </div>
    </div>
  );
}
