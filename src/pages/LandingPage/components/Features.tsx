import { Radar, MessageSquareReply, LayoutGrid, Gauge, Workflow } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function Features() {
  return (
    <section id="recursos" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-100 overflow-hidden border-t border-ink-100/60">
      <div className="container-x my-auto">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow justify-center">Engenharia de presença</p>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Recursos que trabalham pela sua agenda.
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-ink-600">
              Cada tecnologia responde a três pilares: o que faz, como aparece na prática e qual benefício gera para sua clínica.
            </p>
          </Reveal>
        </div>

        {/* Mobile First Grid */}
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          <Reveal delay={60}>
            <FeatureAnticipation />
          </Reveal>
          <Reveal delay={100}>
            <FeatureConfirmation />
          </Reveal>
          <Reveal delay={140}>
            <FeaturePredictability />
          </Reveal>
          <Reveal delay={180}>
            <FeatureMetrics />
          </Reveal>
          <Reveal delay={220} className="md:col-span-2 lg:col-span-2">
            <FeatureAutomation />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Triple({ does, appears, benefit }: { does: string; appears: string; benefit: string }) {
  return (
    <dl className="mt-4 sm:mt-5 grid gap-2.5 sm:gap-3 border-t border-ink-100 pt-3.5 sm:pt-4 sm:grid-cols-3 text-left">
      <div>
        <dt className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">O que faz</dt>
        <dd className="mt-0.5 text-xs text-ink-700 leading-snug">{does}</dd>
      </div>
      <div>
        <dt className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">Na prática</dt>
        <dd className="mt-0.5 text-xs text-ink-700 leading-snug">{appears}</dd>
      </div>
      <div>
        <dt className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-moss-700">Benefício</dt>
        <dd className="mt-0.5 text-xs font-semibold text-moss-900 leading-snug">{benefit}</dd>
      </div>
    </dl>
  );
}

function FeatureAnticipation() {
  return (
    <article className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-moss-50 text-moss-700 ring-1 ring-moss-200">
          <Radar className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
        <h3 className="text-sm sm:text-base font-bold text-ink-900">Antecipação Estratégica</h3>
      </div>
      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
        A IA observa o histórico e identifica com antecedência quais horários têm alto risco de ausência.
      </p>

      <div className="mt-4 grid flex-1 grid-cols-2 gap-2 sm:gap-2.5">
        {[
          { t: '09:00', risk: false },
          { t: '10:20', risk: true },
          { t: '11:40', risk: false },
          { t: '14:20', risk: false },
        ].map((row) => (
          <div
            key={row.t}
            className={`rounded-xl border p-2 sm:p-2.5 ${row.risk ? 'border-amber-200 bg-amber-50/50' : 'border-ink-100 bg-paper-100/60'}`}
          >
            <p className="text-[10px] sm:text-[11px] font-bold tabular-nums text-ink-600">{row.t}</p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-ink-100">
              <div
                className={`h-full rounded-full ${row.risk ? 'bg-amber-500' : 'bg-moss-500'}`}
                style={{ width: row.risk ? '38%' : '88%' }}
              />
            </div>
            <p className={`mt-1.5 text-[9px] sm:text-[10px] font-bold ${row.risk ? 'text-amber-700' : 'text-moss-700'}`}>
              {row.risk ? 'Risco Alto' : 'Estável'}
            </p>
          </div>
        ))}
      </div>

      <Triple
        does="Avalia padrão de histórico de presença."
        appears="Indicador de probabilidade na agenda."
        benefit="Ação preventiva antes do horário vago."
      />
    </article>
  );
}

function FeatureConfirmation() {
  return (
    <article className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-moss-50 text-moss-700 ring-1 ring-moss-200">
          <MessageSquareReply className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
        <h3 className="text-sm sm:text-base font-bold text-ink-900">Confirmação Ativa</h3>
      </div>
      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
        Mensagens no WhatsApp no momento exato com tom cordial, sem parecer spam robótico.
      </p>

      <div className="mt-4 flex-1 space-y-2">
        <div className="rounded-xl rounded-bl-sm border border-ink-100 bg-paper-100 p-2 text-[11px] text-ink-700">
          Confirmando amanhã às 10:20 com a Dra. Camila?
        </div>
        <div className="flex justify-end">
          <div className="rounded-xl rounded-br-sm bg-moss-600 p-2 text-[11px] text-paper-50">
            Confirmadíssimo, estarei aí!
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-moss-50 px-2 py-1 text-[10px] font-semibold text-moss-700 ring-1 ring-moss-200">
          <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-pulse" />
          Status atualizado para Confirmado
        </div>
      </div>

      <Triple
        does="Dispara confirmações no canal WhatsApp."
        appears="Agenda muda de cor no mesmo segundo."
        benefit="Secretária não perde horas ligando."
      />
    </article>
  );
}

function FeaturePredictability() {
  return (
    <article className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-moss-50 text-moss-700 ring-1 ring-moss-200">
          <LayoutGrid className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
        <h3 className="text-sm sm:text-base font-bold text-ink-900">Visão de Ocupação</h3>
      </div>
      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
        Visão consolidada da semana com mapa de calor para antecipar períodos ociosos.
      </p>

      <div className="mt-4 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1">
          {[
            'bg-moss-500', 'bg-moss-500', 'bg-moss-400', 'bg-moss-500', 'bg-moss-500', 'bg-moss-300', 'bg-paper-200',
            'bg-moss-500', 'bg-moss-400', 'bg-moss-500', 'bg-moss-300', 'bg-moss-500', 'bg-paper-200', 'bg-paper-200',
            'bg-moss-400', 'bg-moss-500', 'bg-moss-500', 'bg-moss-500', 'bg-moss-400', 'bg-moss-300', 'bg-paper-200',
          ].map((c, i) => (
            <div key={i} className={`h-6 rounded-md ${c}`} />
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[10px] text-ink-400">
          <span>Ocupação Semanal</span>
          <span className="font-bold text-moss-700">92% preenchida</span>
        </div>
      </div>

      <Triple
        does="Mapeia o índice de ocupação da semana."
        appears="Visual limpo com densidade de horários."
        benefit="Decisões de encaixe com precisão."
      />
    </article>
  );
}

function FeatureMetrics() {
  return (
    <article className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-moss-50 text-moss-700 ring-1 ring-moss-200">
          <Gauge className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
        <h3 className="text-sm sm:text-base font-bold text-ink-900">Métricas & Indicadores</h3>
      </div>
      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
        Indicadores operacionais sobre faturamento recuperado e taxa de presença da clínica.
      </p>

      <div className="mt-4 flex-1 space-y-2.5">
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-ink-700">
            <span>Presença Confirmada</span>
            <span className="text-moss-700 font-bold">94%</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-moss-500 w-[94%]" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-ink-700">
            <span>Faltas Evitadas no Mês</span>
            <span className="text-moss-700 font-bold">28 vagas</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-moss-500 w-[82%]" />
          </div>
        </div>
      </div>

      <Triple
        does="Mede presenças e receitas preservadas."
        appears="Painel com números transparentes."
        benefit="Fim do achismo na gestão clínica."
      />
    </article>
  );
}

function FeatureAutomation() {
  return (
    <article className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-moss-50 text-moss-700 ring-1 ring-moss-200">
          <Workflow className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-ink-900">Fluxos Automatizados Conscientes</h3>
          <p className="text-[10px] sm:text-xs text-ink-400">Automação que preserva a experiência do paciente</p>
        </div>
      </div>

      <div className="mt-4 flex-1 grid sm:grid-cols-2 gap-2 sm:gap-2.5">
        {[
          '1. Lembrete com 24h de antecedência',
          '2. Reconhecimento de resposta por IA',
          '3. Acionamento de lista de espera',
          '4. Reagendamento sem intervenção manual',
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl border border-ink-100 bg-paper-100/60 text-xs font-medium text-ink-800">
            <span className="w-1.5 h-1.5 rounded-full bg-moss-500 shrink-0" />
            <span>{step}</span>
          </div>
        ))}
      </div>

      <Triple
        does="Executa fluxos do início ao fim."
        appears="Tudo funciona sem cliques extras."
        benefit="Mais tempo para o atendimento presencial."
      />
    </article>
  );
}
