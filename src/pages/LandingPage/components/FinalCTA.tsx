import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

export function FinalCTA() {
  return (
    <section id="cta" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-100 border-t border-ink-100/60 overflow-hidden">
      <div className="container-x my-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-moss-300 bg-moss-50/90 px-5 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-lift">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-moss-200/40 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-moss-100/60 blur-3xl" />
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">
                <Sparkles className="h-3.5 w-3.5 text-moss-600" />
                Comece hoje mesmo
              </p>
              <h2 className="mt-4 text-balance text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink-950">
                Transforme ausências em faturamento protegido.
              </h2>
              <p className="mt-4 sm:mt-5 text-xs sm:text-base lg:text-lg leading-relaxed text-ink-700">
                Teste a PRAESO na sua rotina clínica. Sem taxa de adesão, sem cartão e sem contrato de fidelidade — veja a sua taxa de presença subir já na primeira semana.
              </p>

              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/login" className="btn-accent w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold shadow-lift">
                  Começar teste gratuito
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </Link>
                <a
                  href="#simulador"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-paper-50 px-5 py-3.5 text-xs sm:text-sm font-semibold text-ink-700 transition-colors hover:bg-paper-100 hover:text-ink-900"
                >
                  Experimentar simulador
                </a>
              </div>

              <ul className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ink-600">
                <li className="inline-flex items-center gap-1.5 sm:gap-2">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-moss-600" strokeWidth={2.5} />
                  Setup rápido em 5 min
                </li>
                <li className="inline-flex items-center gap-1.5 sm:gap-2">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-moss-600" strokeWidth={2.5} />
                  Sem cartão de crédito
                </li>
                <li className="inline-flex items-center gap-1.5 sm:gap-2">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-moss-600" strokeWidth={2.5} />
                  Cancele quando quiser
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
