import { CalendarClock, Radar, BellRing, MessageSquareReply, Gauge } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const FLOW = [
  { icon: CalendarClock, label: 'Agendamento' },
  { icon: Radar, label: 'Antecipação' },
  { icon: BellRing, label: 'Lembrete' },
  { icon: MessageSquareReply, label: 'Confirmação' },
  { icon: Gauge, label: 'Previsibilidade' },
];

export function Automation() {
  return (
    <section id="metodo" className="relative py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">O motor da previsibilidade</p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-ink-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Da marcação à previsibilidade — sem intervenção a cada etapa.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-600">
            Cada compromisso percorre um fluxo automático. A PRAESO orquestra lembretes, reconhece respostas
            e atualiza o status da agenda — você só acompanha.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={60}>
          <div className="rounded-3xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {FLOW.map((node, i) => (
                <div key={node.label} className="relative">
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-paper-100 p-4 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-100 text-moss-700 ring-1 ring-moss-200">
                      <node.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[12px] font-semibold text-ink-900">{node.label}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-ink-400">Etapa {i + 1}</span>
                  </div>
                  {i < FLOW.length - 1 && (
                    <span
                      className="absolute -right-2 top-1/2 hidden h-px w-4 bg-gradient-to-r from-moss-300 to-transparent lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-dot-blink" />
              Fluxo acionado automaticamente · sem ação manual por confirmação
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-center">
              <h3 className="text-2xl font-bold tracking-tight text-ink-950">A confirmação, reconhecida em conversa.</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                A PRAESO conduz uma conversa curta e natural com o paciente. Quando a presença é confirmada,
                o status do compromisso muda sozinho — a equipe não precisa tocar em nada.
              </p>
              <p className="mt-4 rounded-xl border border-signal-warn/25 bg-signal-warn/10 p-3 text-[12px] leading-snug text-signal-warn">
                Demonstração ilustrativa do fluxo planejado. Antes de anunciá-la como recurso em produção,
                valide a integração com o canal de mensagens da sua operação.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ConversationDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ConversationDemo() {
  return (
    <div className="rounded-3xl border border-ink-100 bg-paper-50 p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-100 text-moss-700 ring-1 ring-moss-200">
            <MessageSquareReply className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-ink-900">PRAESO · Confirmação</p>
            <p className="text-[10px] text-ink-400">Patrícia C. · 10:20</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-moss-100 px-2 py-0.5 text-[9px] font-semibold text-moss-700 ring-1 ring-moss-200">
          <span className="h-1 w-1 rounded-full bg-moss-500 animate-dot-blink" /> online
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <Msg side="bot" time="08:14">
          Olá, Patrícia! Confirmando seu horário amanhã às <b>10:20</b>. Podemos contar com sua presença?
        </Msg>
        <Msg side="user" time="08:16">
          Sim, vou comparecer. Obrigada!
        </Msg>
        <Msg side="bot" time="08:16">
          Perfeito. Registrei sua confirmação. Se algo mudar, é só responder aqui.
        </Msg>

        <div className="flex items-center gap-2 rounded-xl border border-moss-200 bg-moss-50 px-3 py-2.5 text-[11px] font-semibold text-moss-700">
          <span className="h-1.5 w-1.5 rounded-full bg-moss-500 animate-dot-blink" />
          Status atualizado: Confirmado
        </div>

        <div className="rounded-xl border border-ink-100 bg-paper-100 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Agenda atualizada</p>
          <div className="mt-2 flex items-center gap-2.5">
            <span className="text-[11px] font-semibold tabular-nums text-ink-500">10:20</span>
            <span className="h-1 w-6 rounded-full bg-moss-500" />
            <span className="text-[12px] font-semibold text-ink-900">Patrícia C.</span>
            <span className="ml-auto rounded-full bg-moss-100 px-2 py-0.5 text-[9px] font-semibold text-moss-700">
              Confirmado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Msg({ side, time, children }: { side: 'bot' | 'user'; time: string; children: React.ReactNode }) {
  const isBot = side === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] ${isBot ? '' : 'text-right'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
            isBot
              ? 'rounded-bl-sm border border-ink-100 bg-paper-100 text-ink-700'
              : 'rounded-br-sm bg-moss-600 text-paper-50'
          }`}
        >
          {children}
        </div>
        <p className="mt-1 text-[9px] text-ink-400">{time}</p>
      </div>
    </div>
  );
}
