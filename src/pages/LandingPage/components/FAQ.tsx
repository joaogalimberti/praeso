import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type FAQItem = {
  q: string;
  a: string;
};

const FAQS: FAQItem[] = [
  {
    q: 'Preciso trocar o sistema ou software que minha clínica já utiliza?',
    a: 'Não! A PRAESO foi projetada para trabalhar em harmonia com a sua rotina atual. Ela atua como uma camada inteligente complementar para confirmação e antecipação de faltas, sem obrigar sua equipe a reaprender novos sistemas.'
  },
  {
    q: 'Como os pacientes recebem as confirmações?',
    a: 'As mensagens são enviadas diretamente pelo WhatsApp de forma humanizada, cordial e no momento cirúrgico (janela ideal de confirmação). O paciente só precisa responder naturalmente com palavras simples ou emojis.'
  },
  {
    q: 'E se o paciente desmarcar em cima da hora?',
    a: 'É exatamente aí que a PRAESO brilha! A plataforma identifica o cancelamento imediatamente e consulta sua lista de espera ou contatos pré-selecionados, oferecendo a vaga para outro paciente antes que o horário vire prejuízo.'
  },
  {
    q: 'Os dados dos meus pacientes estão protegidos?',
    a: 'Sim, seguimos rigidamente a LGPD (Lei Geral de Proteção de Dados). Utilizamos criptografia de ponta a ponta e não compartilhamos nenhuma informação com terceiros. A confidencialidade é prioridade absoluta.'
  },
  {
    q: 'Existe contrato de fidelidade ou taxa de cancelamento?',
    a: 'Nenhum. Você tem liberdade total para testar e cancelar a qualquer momento sem pegadinhas ou multas contratuais.'
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="relative min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 bg-paper-50 border-t border-ink-100/60 overflow-hidden">
      <div className="container-x max-w-4xl my-auto">
        <div className="text-center">
          <Reveal>
            <div className="eyebrow justify-center">
              <HelpCircle className="h-3.5 w-3.5 text-moss-600" />
              Perguntas Frequentes
            </div>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink-950">
              Tudo o que você precisa saber.
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-ink-600">
              Respostas diretas para as dúvidas mais comuns de médicos, dentistas e gestores de clínicas.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 sm:mt-10 space-y-2.5 sm:space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.q} delay={i * 30}>
                <div className="rounded-xl sm:rounded-2xl border border-ink-100 bg-paper-100/70 transition-all duration-200 shadow-soft overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-base text-ink-900 hover:text-moss-700 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-ink-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-moss-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-ink-600 leading-relaxed border-t border-ink-100/60 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
