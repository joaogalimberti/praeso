import { useState, useId } from 'react';
import { Calculator, ArrowRight, TrendingUp, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

export function RevenueCalculator() {
  const [appointments, setAppointments] = useState<number>(140);
  const [ticketPrice, setTicketPrice] = useState<number>(250);
  const [noShowRate, setNoShowRate] = useState<number>(20);

  const appointmentsId = useId();
  const ticketPriceId = useId();
  const noShowRateId = useId();

  // Cálculos matemáticos em tempo real
  const monthlyNoShows = Math.round(appointments * (noShowRate / 100));
  const monthlyLostRevenue = monthlyNoShows * ticketPrice;
  const yearlyLostRevenue = monthlyLostRevenue * 12;

  // Com PRAESO, estimativa de redução de 75% das faltas
  const monthlyRecoveredRevenue = Math.round(monthlyLostRevenue * 0.75);
  const yearlyRecoveredRevenue = monthlyRecoveredRevenue * 12;
  const savedSecretaryHours = Math.round(appointments * 0.2);

  return (
    <section id="calculadora" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-50 overflow-hidden border-t border-ink-100/60">
      <div className="container-x my-auto">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="eyebrow justify-center">
              <Calculator className="h-3.5 w-3.5 text-moss-600" />
              Calculadora de Impacto
            </div>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Quanto dinheiro as faltas tiram da sua clínica?
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-ink-600">
              Ajuste os valores da sua operação e descubra quanto faturamento sua agenda pode recuperar todos os meses.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-8 sm:mt-10">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-paper-100 rounded-2xl sm:rounded-3xl border border-ink-100 p-4 sm:p-8 shadow-soft">
            {/* Lado Esquerdo: Sliders Interativos */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Slider 1: Consultas por Mês */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <label htmlFor={appointmentsId} className="text-xs sm:text-sm font-semibold text-ink-800">
                    Consultas agendadas por mês
                  </label>
                  <span className="text-sm sm:text-lg font-bold text-ink-950 bg-paper-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl border border-ink-200">
                    {appointments} <span className="text-[10px] sm:text-xs font-normal text-ink-500">consultas</span>
                  </span>
                </div>
                <input
                  id={appointmentsId}
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={appointments}
                  onChange={(e) => setAppointments(Number(e.target.value))}
                  className="w-full h-2 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-moss-600"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-ink-400 mt-1">
                  <span>30</span>
                  <span>250</span>
                  <span>500+</span>
                </div>
              </div>

              {/* Slider 2: Preço Médio da Consulta */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <label htmlFor={ticketPriceId} className="text-xs sm:text-sm font-semibold text-ink-800">
                    Valor médio por atendimento (R$)
                  </label>
                  <span className="text-sm sm:text-lg font-bold text-ink-950 bg-paper-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl border border-ink-200">
                    R$ {ticketPrice}
                  </span>
                </div>
                <input
                  id={ticketPriceId}
                  type="range"
                  min="80"
                  max="800"
                  step="10"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                  className="w-full h-2 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-moss-600"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-ink-400 mt-1">
                  <span>R$ 80</span>
                  <span>R$ 400</span>
                  <span>R$ 800+</span>
                </div>
              </div>

              {/* Slider 3: Taxa de Faltas */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <label htmlFor={noShowRateId} className="text-xs sm:text-sm font-semibold text-ink-800">
                    Taxa estimada de ausências (%)
                  </label>
                  <span className="text-sm sm:text-lg font-bold text-amber-700 bg-amber-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl border border-amber-200">
                    {noShowRate}% <span className="text-[10px] sm:text-xs font-normal text-amber-600">faltas</span>
                  </span>
                </div>
                <input
                  id={noShowRateId}
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={noShowRate}
                  onChange={(e) => setNoShowRate(Number(e.target.value))}
                  className="w-full h-2 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-ink-400 mt-1">
                  <span>5% (mínima)</span>
                  <span>20% (média)</span>
                  <span>40% (crítica)</span>
                </div>
              </div>

              {/* Resumo da perda invisível */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-paper-200/60 border border-ink-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-red-100 text-red-700 shrink-0">
                    <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-700">Prejuízo mensal estimado</p>
                    <p className="text-[10px] sm:text-[11px] text-ink-400">~{monthlyNoShows} consultas perdidas/mês</p>
                  </div>
                </div>
                <span className="text-xs sm:text-base font-bold text-red-600 shrink-0">
                  - R$ {monthlyLostRevenue.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Lado Direito: Card de Retorno & Economia com a PRAESO */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-moss-900 text-paper-50 p-5 sm:p-7 shadow-lift flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-moss-800 text-moss-200 text-[11px] sm:text-xs font-semibold">
                  <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-moss-400" />
                  Retorno Estimado com PRAESO
                </span>

                <div className="mt-4 sm:mt-5">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-moss-300 font-semibold">
                    Faturamento resgatado por mês
                  </p>
                  <p className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-paper-50">
                    + R$ {monthlyRecoveredRevenue.toLocaleString('pt-BR')}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-moss-300">
                    Projeção anual de até <b>R$ {yearlyRecoveredRevenue.toLocaleString('pt-BR')}</b> protegidos.
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-moss-800/80 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-moss-200 flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-moss-400" />
                      Tempo recepção economizado:
                    </span>
                    <span className="font-bold text-paper-50">{savedSecretaryHours}h / mês</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-moss-200 flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-moss-400" />
                      Ocupação média da agenda:
                    </span>
                    <span className="font-bold text-moss-300">Subindo para ~94%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-2 sm:pt-4 relative z-10">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-moss-500 hover:bg-moss-400 text-moss-950 font-bold py-3 text-xs sm:text-sm transition-all shadow-md active:scale-95"
                >
                  Recuperar essa receita
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-[9px] sm:text-[10px] text-moss-300 mt-2">
                  Teste sem fidelidade ou necessidade de cartão.
                </p>
              </div>

              {/* Fundo decorativo sutil */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-moss-800/50 blur-2xl pointer-events-none" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
