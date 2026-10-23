import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  Send,
  Calendar
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Scenario = 'confirm' | 'cancel_fill' | 'reschedule';

export function InteractiveSimulator() {
  const [scenario, setScenario] = useState<Scenario>('confirm');
  const [animating, setAnimating] = useState(false);

  const handleSelectScenario = (sc: Scenario) => {
    if (sc === scenario) return;
    setAnimating(true);
    setScenario(sc);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <section id="simulador" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-100 overflow-hidden border-t border-ink-100/60">
      <div className="container-x my-auto">
        {/* Header da seção */}
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="eyebrow justify-center">
              <Sparkles className="h-3.5 w-3.5 text-moss-600" />
              Simulador Interativo
            </div>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Veja a PRAESO agindo em tempo real.
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-ink-600">
              Escolha uma situação comum do dia a dia e observe como a automação resolve no WhatsApp e atualiza a sua agenda instantaneamente.
            </p>
          </Reveal>

          {/* Botões seletores de cenário - Mobile Scrollable / Wrap */}
          <Reveal delay={80} className="mt-6 sm:mt-8">
            <div className="inline-flex max-w-full overflow-x-auto p-1 sm:p-1.5 rounded-2xl bg-paper-200/80 border border-ink-100 gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => handleSelectScenario('confirm')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  scenario === 'confirm'
                    ? 'bg-paper-50 text-ink-950 shadow-soft ring-1 ring-ink-200'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${scenario === 'confirm' ? 'text-moss-600' : 'text-ink-400'}`} />
                <span>1. Confirmação</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScenario('cancel_fill')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  scenario === 'cancel_fill'
                    ? 'bg-paper-50 text-ink-950 shadow-soft ring-1 ring-ink-200'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${scenario === 'cancel_fill' ? 'text-moss-600' : 'text-ink-400'}`} />
                <span>2. Desistência + Encaixe</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScenario('reschedule')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  scenario === 'reschedule'
                    ? 'bg-paper-50 text-ink-950 shadow-soft ring-1 ring-ink-200'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <Clock className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${scenario === 'reschedule' ? 'text-moss-600' : 'text-ink-400'}`} />
                <span>3. Reagendamento</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Simulador Interativo Dividido */}
        <Reveal delay={140} className="mt-8 sm:mt-10">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Lado Esquerdo: Chat WhatsApp */}
            <div className="lg:col-span-6 flex flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 shadow-soft overflow-hidden">
              {/* WhatsApp Header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-paper-100 border-b border-ink-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-moss-600 flex items-center justify-center text-paper-50 font-bold text-xs">
                      PR
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 ring-2 ring-paper-50" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-ink-900">PRAESO · Confirmação Ativa</h3>
                    <p className="text-[9px] sm:text-[10px] text-ink-400">Canal oficial no WhatsApp</p>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-moss-700 bg-moss-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ring-1 ring-moss-200">
                  IA Ativa
                </span>
              </div>

              {/* Chat Messages */}
              <div className={`p-4 sm:p-5 flex-1 space-y-3 bg-[#FAF9F5] transition-opacity duration-300 min-h-[260px] sm:min-h-[290px] ${animating ? 'opacity-30' : 'opacity-100'}`}>
                {scenario === 'confirm' && (
                  <>
                    <BotBubble time="08:30">
                      Olá, <b>Mariana</b>! Tudo bem? Passando para confirmar sua consulta com a <b>Dra. Camila</b> amanhã às <b>10:30</b>. Podemos confirmar sua presença?
                    </BotBubble>
                    <UserBubble time="08:32">
                      Olá! Sim, confirmo sim. Estarei aí no horário!
                    </UserBubble>
                    <BotBubble time="08:32">
                      Excelente, presença confirmada com sucesso! Seu horário está 100% garantido. Até amanhã! 🩺
                    </BotBubble>
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-moss-50 border border-moss-200 text-moss-800 text-[11px] sm:text-xs font-medium animate-fade-in">
                      <CheckCircle2 className="h-4 w-4 text-moss-600 shrink-0" />
                      <span>Status alterado automaticamente para <b>Confirmado</b> na agenda.</span>
                    </div>
                  </>
                )}

                {scenario === 'cancel_fill' && (
                  <>
                    <BotBubble time="09:00">
                      Olá, <b>Lucas</b>! Lembrando do seu horário hoje às <b>14:00</b>. Você confirma seu comparecimento?
                    </BotBubble>
                    <UserBubble time="09:05">
                      Poxa, tive uma emergência no trabalho e não vou conseguir ir hoje. Desculpe!
                    </UserBubble>
                    <BotBubble time="09:05">
                      Sem problemas, Lucas! Desmarcamos seu horário e liberamos a vaga. Quando quiser remarcar, só me avisar.
                    </BotBubble>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-medium animate-fade-in">
                      ⚠️ <b>Vaga das 14:00 liberada.</b> Acionando lista de espera inteligente...
                    </div>
                    <BotBubble time="09:06" highlight>
                      <i>Mensagem para lista de espera:</i> Olá <b>Beatriz</b>! Surgiu uma vaga hoje às <b>14:00</b> com a Dra. Camila. Deseja antecipar sua consulta?
                    </BotBubble>
                    <UserBubble time="09:07">
                      Nossa, perfeito! Quero sim, por favor!
                    </UserBubble>
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-moss-50 border border-moss-200 text-moss-800 text-[11px] sm:text-xs font-medium animate-fade-in">
                      <CheckCircle2 className="h-4 w-4 text-moss-600 shrink-0" />
                      <span><b>Horário salvo!</b> Beatriz encaixada em 2 minutos sem custo de no-show.</span>
                    </div>
                  </>
                )}

                {scenario === 'reschedule' && (
                  <>
                    <BotBubble time="11:15">
                      Olá, <b>Rodrigo</b>! Confirmando sua consulta de retorno amanhã às <b>16:00</b>.
                    </BotBubble>
                    <UserBubble time="11:18">
                      Olá! Amanhã não consigo esse horário. Teria como mudar para sexta-feira à tarde?
                    </UserBubble>
                    <BotBubble time="11:18">
                      Claro! Na sexta temos disponível às <b>14:30</b> ou às <b>16:45</b>. Qual prefere?
                    </BotBubble>
                    <UserBubble time="11:19">
                      Perfeito, sexta às 16:45 fica ótimo!
                    </UserBubble>
                    <BotBubble time="11:19">
                      Reagendado para <b>sexta às 16:45</b>! O horário de amanhã já foi liberado para outro paciente. Obrigado!
                    </BotBubble>
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-moss-50 border border-moss-200 text-moss-800 text-[11px] sm:text-xs font-medium animate-fade-in">
                      <CheckCircle2 className="h-4 w-4 text-moss-600 shrink-0" />
                      <span>Reagendamento automático sem precisar da secretária no telefone.</span>
                    </div>
                  </>
                )}
              </div>

              {/* Chat Input Mock */}
              <div className="p-2.5 sm:p-3 bg-paper-50 border-t border-ink-100 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="Respostas processadas em linguagem natural pela IA..."
                  className="flex-1 bg-paper-100 text-[10px] sm:text-[11px] text-ink-400 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-ink-100 outline-none cursor-default"
                />
                <button
                  type="button"
                  aria-label="Simular envio de mensagem"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-moss-600 text-paper-50 flex items-center justify-center shrink-0"
                >
                  <Send className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                </button>
              </div>
            </div>

            {/* Lado Direito: A Agenda da Clínica Respondendo */}
            <div className="lg:col-span-6 flex flex-col rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-50 shadow-soft p-4 sm:p-6">
              <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-ink-100">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="p-1.5 sm:p-2 rounded-xl bg-paper-200 text-ink-700">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-ink-950">Agenda da Clínica · Hoje</h3>
                    <p className="text-[10px] sm:text-[11px] text-ink-400">Dra. Camila Santos · Consultório 2</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-moss-700 bg-moss-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-moss-500 animate-pulse" />
                  Sincronizado
                </div>
              </div>

              {/* Slots da agenda */}
              <div className={`mt-3.5 sm:mt-4 space-y-2 sm:space-y-2.5 flex-1 transition-opacity duration-300 ${animating ? 'opacity-30' : 'opacity-100'}`}>
                {/* Slot 1 */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-ink-100 bg-paper-100/60">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-semibold text-[11px] sm:text-xs text-ink-500 w-10 sm:w-12">09:30</span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-ink-900">Eduardo Melo</p>
                      <p className="text-[9px] sm:text-[10px] text-ink-400">Primeira Consulta · R$ 250</p>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-moss-700 bg-moss-100/80 px-2 py-0.5 rounded-full ring-1 ring-moss-200">
                    Confirmado
                  </span>
                </div>

                {/* Slot em Destaque 2 */}
                <div className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-500 ${
                  scenario === 'confirm'
                    ? 'border-moss-300 bg-moss-50 shadow-sm ring-1 ring-moss-300'
                    : scenario === 'cancel_fill'
                    ? 'border-emerald-300 bg-emerald-50/60 shadow-sm'
                    : 'border-ink-200 bg-paper-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="font-bold text-[11px] sm:text-xs text-ink-800 w-10 sm:w-12">
                        {scenario === 'cancel_fill' ? '14:00' : '10:30'}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <p className="text-xs sm:text-sm font-bold text-ink-950">
                            {scenario === 'confirm'
                              ? 'Mariana Albuquerque'
                              : scenario === 'cancel_fill'
                              ? 'Beatriz Souza (Encaixe)'
                              : 'Mariana Albuquerque'}
                          </p>
                          {scenario === 'cancel_fill' && (
                            <span className="text-[8px] sm:text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
                              Salvo
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-ink-500">
                          {scenario === 'cancel_fill' ? 'Vaga recuperada em 2 min' : 'Consulta de Rotina · R$ 250'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                        scenario === 'confirm' || scenario === 'cancel_fill'
                          ? 'bg-moss-600 text-paper-50'
                          : 'bg-paper-200 text-ink-600'
                      }`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {scenario === 'confirm' ? 'Confirmado' : scenario === 'cancel_fill' ? 'Encaixado' : 'Aguardando'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slot 3 */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-ink-100 bg-paper-100/60">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-semibold text-[11px] sm:text-xs text-ink-500 w-10 sm:w-12">11:30</span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-ink-900">Gabriel Ramos</p>
                      <p className="text-[9px] sm:text-[10px] text-ink-400">Retorno Clínico</p>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-moss-700 bg-moss-100/80 px-2 py-0.5 rounded-full ring-1 ring-moss-200">
                    Confirmado
                  </span>
                </div>

                {/* Slot 4 */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-ink-100 bg-paper-100/60">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-semibold text-[11px] sm:text-xs text-ink-500 w-10 sm:w-12">15:00</span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-ink-900">Fernanda Prado</p>
                      <p className="text-[9px] sm:text-[10px] text-ink-400">Exame Avaliativo · R$ 300</p>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full ring-1 ring-amber-200">
                    Lembrete Enviado
                  </span>
                </div>
              </div>

              {/* Status do consultório */}
              <div className="mt-4 sm:mt-5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-paper-100 border border-ink-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-ink-400">Ocupação</p>
                  <p className="text-xs sm:text-sm font-bold text-ink-900">92% capacidade</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-moss-600">Receita Salva</p>
                  <p className="text-xs sm:text-sm font-bold text-moss-800">+ R$ 750,00</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BotBubble({ time, children, highlight }: { time: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex justify-start">
      <div className={`max-w-[90%] sm:max-w-[88%] rounded-2xl rounded-bl-sm p-2.5 sm:p-3 text-[11px] sm:text-xs leading-relaxed text-ink-800 ${
        highlight ? 'bg-amber-100/80 border border-amber-200 text-amber-950' : 'bg-paper-50 border border-ink-100'
      }`}>
        {children}
        <span className="block mt-1 text-[8px] sm:text-[9px] text-ink-400 text-right">{time}</span>
      </div>
    </div>
  );
}

function UserBubble({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[88%] sm:max-w-[85%] rounded-2xl rounded-br-sm p-2.5 sm:p-3 text-[11px] sm:text-xs leading-relaxed bg-moss-600 text-paper-50">
        {children}
        <span className="block mt-1 text-[8px] sm:text-[9px] text-moss-200 text-right">{time}</span>
      </div>
    </div>
  );
}
