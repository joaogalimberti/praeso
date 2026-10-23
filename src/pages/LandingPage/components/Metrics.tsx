import { Info } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Metric = {
  value: string;
  label: string;
  note: string;
  kind: 'estimate' | 'goal' | 'demo';
};

const METRICS: Metric[] = [
  {
    value: '−40%',
    label: 'Ausências',
    note: 'Estimativa de impacto na redução de faltas com antecipação ativa.',
    kind: 'estimate',
  },
  {
    value: '+15%',
    label: 'Receita protegida',
    note: 'Projeção de faturamento preservado por redução de ociosidade.',
    kind: 'estimate',
  },
  {
    value: '91%',
    label: 'Taxa de confirmação',
    note: 'Meta operacional para agendas assistidas pela plataforma.',
    kind: 'goal',
  },
  {
    value: '24h',
    label: 'Tempo de implantação',
    note: 'Exemplo ilustrativo do tempo até a agenda estar operando.',
    kind: 'demo',
  },
];

const KIND_META: Record<Metric['kind'], { tag: string; color: string }> = {
  estimate: { tag: 'Estimativa', color: 'bg-paper-200 text-signal-warn ring-paper-300' },
  goal: { tag: 'Meta', color: 'bg-moss-50 text-moss-700 ring-moss-200' },
  demo: { tag: 'Ilustrativo', color: 'bg-ink-100 text-ink-600 ring-ink-200' },
};

export function Metrics() {
  return (
    <section id="indicadores" className="relative bg-paper-200/40 py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Indicadores</p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-ink-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Números que dizem o que significam.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-600">
            Cada número abaixo é classificado pelo que ele realmente é: estimativa, meta ou ilustração.
            Antes de tratarmos qualquer indicador como resultado comprovado, ele passa por validação.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => {
            const meta = KIND_META[m.kind];
            return (
              <Reveal key={m.label} delay={i * 80}>
                <article className="flex h-full flex-col rounded-3xl border border-ink-100 bg-paper-50 p-6 transition-all duration-300 hover:shadow-lift">
                  <span className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${meta.color}`}>
                    {meta.tag}
                  </span>
                  <p className="mt-5 text-4xl font-bold tracking-tight tabular-nums text-ink-950">{m.value}</p>
                  <p className="mt-1 text-sm font-semibold text-ink-900">{m.label}</p>
                  <p className="mt-2 text-[12px] leading-snug text-ink-500">{m.note}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8" delay={120}>
          <div className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-paper-50 p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-200 text-ink-700">
              <Info className="h-4.5 w-4.5" />
            </span>
            <p className="flex-1 text-[13px] leading-relaxed text-ink-600">
              Diferenciamos o que é <span className="font-semibold text-ink-900">estimado</span>, o que é{' '}
              <span className="font-semibold text-ink-900">meta</span> e o que é{' '}
              <span className="font-semibold text-ink-900">ilustrativo</span>. Nenhum indicador deve ser lido
              como resultado garantido enquanto não for validado com dados reais da sua operação.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-6" delay={160}>
          <p className="rounded-xl border border-signal-warn/20 bg-signal-warn/10 p-4 text-[12px] leading-relaxed text-signal-warn">
            Para validação: os indicadores ainda precisam ser confirmados com dados de operação reais
            antes de serem divulgados como resultados comprovados.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
