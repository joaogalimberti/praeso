import { AlertTriangle, Clock3, TrendingDown, Users } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function Problem() {
  return (
    <section id="problema" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-50 border-t border-ink-100/60">
      <div className="container-x my-auto">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <Reveal>
            <div className="eyebrow justify-center lg:justify-start">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              O custo invisível
            </div>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Faltas não avisadas custam caro. Muito mais do que parecem.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-600">
              O prejuízo de uma ausência não é só a hora vaga. É a secretária perdendo tempo tentando ligar, custos fixos correndo sem receita e pacientes que queriam atendimento ficando de fora.
            </p>
          </Reveal>
        </div>

        {/* 3 Pilares do Problema - Mobile First Grid */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          <Reveal delay={60}>
            <div className="rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-100/60 p-5 sm:p-6 shadow-soft h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3.5 sm:mb-4">
                  <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-ink-900">Prejuízo Financeiro Direto</h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                  Clínicas perdem entre <b>18% e 35%</b> do seu faturamento potencial todos os meses apenas com horários vagos de pacientes que não aparecem.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-100 text-[11px] font-semibold text-red-600">
                Média de R$ 4.000 a R$ 15.000/mês perdidos
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-100/60 p-5 sm:p-6 shadow-soft h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3.5 sm:mb-4">
                  <Clock3 className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-ink-900">Tempo da Equipe Desperdiçado</h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                  Sua recepção passa mais de <b>2 horas por dia</b> enviando mensagens manuais, ligando e esperando respostas que muitas vezes nem chegam.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-100 text-[11px] font-semibold text-amber-700">
                +40 horas mensais em esforço braçal
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-2xl sm:rounded-3xl border border-ink-100 bg-paper-100/60 p-5 sm:p-6 shadow-soft h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-paper-200 text-ink-700 flex items-center justify-center mb-3.5 sm:mb-4">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-ink-900">Desistência Tardia Sem Encaixe</h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                  Quando o paciente avisa 15 minutos antes (ou nem avisa), é impossível contatar a lista de espera a tempo de preencher o horário.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-100 text-[11px] font-semibold text-ink-600">
                Horário 100% desperdiçado
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
