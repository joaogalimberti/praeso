import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

export function Comparison() {
  const [activeTab, setActiveTab] = useState<'both' | 'without' | 'with'>('both');

  return (
    <section id="comparativo" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-100 overflow-hidden border-t border-ink-100/60">
      <div className="container-x my-auto">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="eyebrow justify-center">
              <Zap className="h-3.5 w-3.5 text-moss-600" />
              Comparativo Direto
            </div>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Operação manual vs. Inteligência PRAESO
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-ink-600">
              A mesma clínica, os mesmos médicos. A diferença está em antecipar decisões com precisão em vez de correr atrás do prejuízo.
            </p>
          </Reveal>

          {/* Toggle em dispositivos móveis */}
          <div className="mt-5 inline-flex p-1 rounded-xl bg-paper-200/80 border border-ink-100 sm:hidden">
            <button
              onClick={() => setActiveTab('without')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'without' ? 'bg-paper-50 text-red-700 shadow-xs' : 'text-ink-600'
              }`}
            >
              Sem PRAESO
            </button>
            <button
              onClick={() => setActiveTab('with')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'with' ? 'bg-moss-600 text-paper-50 shadow-xs' : 'text-ink-600'
              }`}
            >
              Com PRAESO
            </button>
          </div>
        </div>

        {/* Grade Comparativa - Mobile First */}
        <div className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* Coluna 1: Sem PRAESO */}
          <Reveal delay={80} className={`h-full ${activeTab === 'with' ? 'hidden sm:block' : ''}`}>
            <div className="h-full rounded-2xl sm:rounded-3xl border border-red-200/80 bg-paper-50 p-5 sm:p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-ink-100">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="p-1.5 sm:p-2 rounded-xl bg-red-50 text-red-600">
                      <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-ink-950">Gestão Reativa (Manual)</h3>
                      <p className="text-[10px] sm:text-xs text-ink-400">Mensagens manuais e incerteza</p>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase">
                    Ineficiente
                  </span>
                </div>

                <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {[
                    { title: 'Lembretes manuais um a um', desc: 'A secretária passa a manhã inteira no WhatsApp enviando textos repetitivos.' },
                    { title: 'Faltas descobertas na hora', desc: 'O paciente simplesmente não aparece e ninguém sabia com antecedência.' },
                    { title: 'Janela de encaixe perdida', desc: 'Quando o paciente cancela em cima da hora, não dá tempo de chamar mais ninguém.' },
                    { title: 'Receita que escorre pelo ralo', desc: 'Prejuízo invisível todo mês que diminui o lucro líquido da clínica.' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 p-1 rounded-full bg-red-100/60 text-red-600 shrink-0">
                        <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-ink-900">{item.title}</p>
                        <p className="text-[11px] sm:text-xs text-ink-500 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-ink-100 text-xs text-red-600 font-semibold flex items-center justify-between">
                <span>Taxa de comparecimento:</span>
                <span className="text-sm font-bold">~65% a 75%</span>
              </div>
            </div>
          </Reveal>

          {/* Coluna 2: Com PRAESO */}
          <Reveal delay={120} className={`h-full ${activeTab === 'without' ? 'hidden sm:block' : ''}`}>
            <div className="h-full rounded-2xl sm:rounded-3xl border border-moss-300 bg-moss-50/70 p-5 sm:p-7 shadow-lift ring-1 ring-moss-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-moss-200">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="p-1.5 sm:p-2 rounded-xl bg-moss-600 text-paper-50">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-moss-950">Presença Inteligente (PRAESO)</h3>
                      <p className="text-[10px] sm:text-xs text-moss-700">Automação inteligente e agenda cheia</p>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-moss-800 bg-moss-200/80 px-2 py-0.5 rounded-full uppercase">
                    Recomendado
                  </span>
                </div>

                <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {[
                    { title: 'Confirmação ativa humanizada', desc: 'WhatsApp automático no timing exato com tom cordial de conversa real.' },
                    { title: 'Detecção de risco antes da consulta', desc: 'Você sabe com horas de antecedência quais pacientes têm probabilidade de faltar.' },
                    { title: 'Encaixe automático da lista de espera', desc: 'Desistências viram vagas preenchidas em menos de 3 minutos sem trabalho manual.' },
                    { title: 'Previsibilidade e faturamento máximo', desc: 'Receita protegida e sua recepção focada em encantar quem está na clínica.' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 p-1 rounded-full bg-moss-200 text-moss-700 shrink-0">
                        <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-ink-950">{item.title}</p>
                        <p className="text-[11px] sm:text-xs text-moss-800 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-moss-200 flex items-center justify-between">
                <span className="text-xs text-moss-800 font-semibold">Taxa de comparecimento:</span>
                <span className="text-sm sm:text-base font-extrabold text-moss-900">92% a 98%</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA Banner Minimalista */}
        <Reveal delay={160} className="mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-paper-50 border border-ink-100 shadow-soft text-center sm:text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-moss-600 shrink-0" />
              <p className="text-xs sm:text-sm text-ink-700">
                Transforme a agenda da sua clínica em um ativo previsível sem aumentar a equipe.
              </p>
            </div>
            <Link to="/login" className="btn-accent w-full sm:w-auto shrink-0 text-xs sm:text-sm py-2.5 px-5">
              Experimentar gratuitamente
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
