import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const GROUPS = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#recursos' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Painel', href: '#painel' },
      { label: 'Comparativo', href: '#comparativo' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Método', href: '#metodo' },
      { label: 'Indicadores', href: '#indicadores' },
      { label: 'A PRAESO', href: '#topo' },
    ],
  },
  {
    title: 'Contato',
    links: [
      { label: 'Acessar plataforma', href: '/login', isRouter: true },
      { label: 'Começar grátis', href: '#cta' },
    ],
  },
  {
    title: 'Privacidade',
    links: [
      { label: 'Termos de uso', href: '#' },
      { label: 'Política de privacidade', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-paper-100">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <a href="#topo" className="flex items-center gap-2.5" aria-label="PRAESO — Início">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-paper-50">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M6 4.5h7.5a4.5 4.5 0 0 1 0 9H9V20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[15px] font-bold tracking-tight text-ink-900">PRAESO</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              Inteligência de presença para clínicas e profissionais. Antecipamos confirmações,
              reduzimos faltas e protegemos a receita da sua agenda.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-100 bg-paper-50 px-3 py-1.5 text-[11px] text-ink-500">
              <Lock className="h-3.5 w-3.5 text-moss-600" />
              Dados tratados com confidencialidade
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{g.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      {l.isRouter ? (
                        <Link to={l.href} className="text-[13px] text-ink-600 transition-colors hover:text-ink-900">
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className="text-[13px] text-ink-600 transition-colors hover:text-ink-900">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-ink-400">
            © {new Date().getFullYear()} PRAESO. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-ink-400">
            <Mail className="h-3.5 w-3.5" />
            <span>contato@praeso.com.br</span>
          </div>
        </div>

        <p className="mt-6 text-[10px] leading-relaxed text-ink-300">
          Esta página apresenta demonstrações ilustrativas da interface e dos fluxos planejados. Indicadores
          marcados como estimativa, meta ou ilustrativo não representam resultados comprovados. Antes de anunciar
          integrações, funcionalidades ou métricas como disponíveis em produção, valide cada item com a operação real.
        </p>
      </div>
    </footer>
  );
}
