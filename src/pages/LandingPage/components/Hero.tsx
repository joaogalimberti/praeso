import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '−40%', label: 'Ausências evitadas' },
  { value: '91%',  label: 'Taxa de confirmação' },
  { value: '5 min', label: 'Para entrar no ar' },
  { value: '24/7', label: 'IA monitorando' },
];

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-paper-100 px-6 pt-24 pb-0"
    >
      {/* Ruído de fundo sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-paper opacity-20" />
      {/* Gradiente radial central */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center pt-32">
        <div className="h-[520px] w-[820px] rounded-full bg-moss-200/20 blur-[120px]" />
      </div>

      {/* ── Eyebrow ── */}
      <div className="animate-fade-up eyebrow justify-center">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-moss-400 animate-ping opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss-600" />
        </span>
        Inteligência de presença para clínicas
      </div>

      {/* ── Título ── */}
      <h1
        className="animate-fade-up mx-auto mt-6 max-w-4xl text-center text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-950 sm:text-6xl lg:text-[5rem]"
        style={{ animationDelay: '80ms' }}
      >
        Menos faltas.{' '}
        <span className="text-moss-700">Agenda cheia.</span>
      </h1>

      {/* ── Subtítulo ── */}
      <p
        className="animate-fade-up mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-ink-500 sm:text-base lg:text-lg"
        style={{ animationDelay: '160ms' }}
      >
        A PRAESO antecipa confirmações no WhatsApp, resgata pacientes da lista de espera e protege a receita da sua clínica — sem nenhum esforço manual.
      </p>

      {/* ── CTAs ── */}
      <div
        className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row"
        style={{ animationDelay: '240ms' }}
      >
        <Link
          to="/login"
          className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-all duration-300 hover:bg-moss-700 active:scale-[0.98] shadow-lift"
        >
          Começar teste gratuito
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
        <a
          href="#simulador"
          className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-paper-50 px-6 py-3.5 text-sm font-semibold text-ink-700 transition-all duration-300 hover:border-ink-300 hover:bg-paper-200 active:scale-[0.98]"
        >
          Ver como funciona
        </a>
      </div>

      {/* ── Trust line ── */}
      <ul
        className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500"
        style={{ animationDelay: '300ms' }}
      >
        {['Setup em 5 minutos', 'Sem taxa de adesão', 'Cancela quando quiser'].map((t) => (
          <li key={t} className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-moss-600" strokeWidth={2.5} />
            {t}
          </li>
        ))}
      </ul>

      {/* ── Mockup de produto ── */}
      <div
        className="animate-fade-up relative mx-auto mt-14 w-full max-w-4xl"
        style={{ animationDelay: '360ms' }}
      >
        {/* Gradiente fade-out inferior para merge com a próxima seção */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-paper-100 to-transparent rounded-b-3xl" />

        <div className="overflow-hidden rounded-t-2xl border border-ink-100 bg-paper-50 shadow-lift sm:rounded-t-3xl">
          {/* Barra de navegador mockada */}
          <div className="flex items-center gap-2 border-b border-ink-100 bg-paper-200/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-300" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-moss-300" />
            <div className="ml-3 flex-1 max-w-xs rounded-md bg-paper-50 border border-ink-100 px-3 py-1 text-[11px] text-ink-400 font-mono">
              app.praeso.com.br
            </div>
          </div>

          {/* Dashboard mockup content */}
          <DashboardMockup />
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="animate-fade-up w-full max-w-4xl" style={{ animationDelay: '440ms' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 border-x border-b border-ink-100 overflow-hidden rounded-b-2xl bg-paper-50 divide-x divide-ink-100">
          {STATS.map((s) => (
            <div key={s.value} className="px-5 py-5 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-950 tabular-nums">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] font-medium text-ink-500 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* padding final para não colapsar com próxima seção */}
      <div className="h-16 sm:h-20" />
    </section>
  );
}

/* ─── Dashboard Mockup ─────────────────────────────────────── */
function DashboardMockup() {
  const slots = [
    { time: '08:30', name: 'Eduardo Melo',    tag: 'confirmed', value: 'R$ 250' },
    { time: '10:00', name: 'Mariana Silva',   tag: 'confirmed', value: 'R$ 250' },
    { time: '11:30', name: 'Gabriel Ramos',   tag: 'waiting',   value: 'R$ 180' },
    { time: '14:00', name: 'Beatriz Souza',   tag: 'rescued',   value: 'R$ 300' },
    { time: '15:30', name: 'Fernanda Prado',  tag: 'confirmed', value: 'R$ 250' },
    { time: '17:00', name: 'Rodrigo Lima',    tag: 'confirmed', value: 'R$ 250' },
  ];

  const tagConfig: Record<string, { label: string; cls: string }> = {
    confirmed: { label: 'Confirmado',  cls: 'text-moss-700 bg-moss-50 ring-1 ring-moss-200' },
    waiting:   { label: 'Aguardando', cls: 'text-amber-700 bg-amber-50 ring-1 ring-amber-200' },
    rescued:   { label: '✦ Encaixe',  cls: 'text-paper-50 bg-moss-600' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_340px] divide-y sm:divide-y-0 sm:divide-x divide-ink-100">
      {/* Agenda */}
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Agenda do dia</p>
            <p className="text-sm font-bold text-ink-900 mt-0.5">Dra. Camila Santos · Consultório 2</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-moss-700 bg-moss-50 px-2.5 py-1 rounded-full ring-1 ring-moss-200">
            <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-pulse" />
            Sincronizado
          </div>
        </div>

        {/* Slot list */}
        <div className="space-y-2">
          {slots.map((s) => {
            const t = tagConfig[s.tag];
            return (
              <div
                key={s.time}
                className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 ${
                  s.tag === 'rescued'
                    ? 'border-moss-300 bg-moss-50/60'
                    : 'border-ink-100 bg-paper-100/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 text-xs font-semibold tabular-nums text-ink-500">{s.time}</span>
                  <div>
                    <p className="text-xs font-semibold text-ink-900">{s.name}</p>
                    <p className="text-[10px] text-ink-400">{s.value}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${t.cls}`}>
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Barra de ocupação */}
        <div className="mt-4 rounded-xl border border-ink-100 bg-paper-200/40 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-ink-400">Ocupação</p>
            <p className="text-sm font-bold text-ink-900">6 / 6 horários</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider font-bold text-moss-600">Receita salva</p>
            <p className="text-sm font-bold text-moss-800">+ R$ 1.480</p>
          </div>
        </div>
      </div>

      {/* Painel lateral – WhatsApp */}
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Confirmações ativas</p>
          <p className="text-sm font-bold text-ink-900 mt-0.5">Canal WhatsApp · IA</p>
        </div>

        <div className="flex-1 space-y-2.5">
          {/* Mensagem da IA */}
          <div className="rounded-2xl rounded-bl-sm border border-ink-100 bg-paper-200/70 p-3 text-[11px] leading-relaxed text-ink-700">
            Olá, <b>Mariana</b>! Confirmando sua consulta com a <b>Dra. Camila</b> amanhã às <b>10:00</b>. Você confirma?
          </div>

          {/* Resposta do paciente */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-moss-600 p-3 text-[11px] leading-relaxed text-paper-50 max-w-[85%]">
              Sim, confirmo! Estarei aí no horário.
            </div>
          </div>

          {/* Status update */}
          <div className="flex items-center gap-2 rounded-xl bg-moss-50 border border-moss-200 px-3 py-2 text-[11px] font-semibold text-moss-800">
            <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-pulse shrink-0" />
            Agenda atualizada para <span className="text-moss-900 font-bold ml-0.5">Confirmado</span>
          </div>

          {/* Segundo fluxo */}
          <div className="mt-1 rounded-2xl rounded-bl-sm border border-amber-200 bg-amber-50/70 p-3 text-[11px] leading-relaxed text-amber-900">
            ⚠️ <b>Lucas</b> cancelou às 14:00. Acionando lista de espera...
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-moss-50 border border-moss-200 px-3 py-2 text-[11px] font-semibold text-moss-800">
            <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-pulse shrink-0" />
            <b>Beatriz</b> encaixada em 2 minutos. Horário salvo.
          </div>
        </div>
      </div>
    </div>
  );
}
