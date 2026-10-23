import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAV = [
  { label: 'Simulador', href: '#simulador' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Comparativo', href: '#comparativo' },
  { label: 'Dúvidas', href: '#faq' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-100/80 bg-paper-100/90 backdrop-blur-md shadow-xs'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#topo" className="flex items-center gap-2.5 group" aria-label="PRAESO — Início">
          <Logo />
          <span className="text-[15px] font-extrabold tracking-tight text-ink-950 group-hover:text-moss-700 transition-colors">
            PRAESO
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs lg:text-sm font-medium text-ink-600 transition-colors hover:text-ink-950 hover:bg-paper-200/50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="btn-link text-xs lg:text-sm">
            Entrar
          </Link>
          <a href="#cta" className="btn-primary text-xs lg:text-sm py-2 px-4.5">
            Testar grátis
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-paper-50 text-ink-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`mx-3 mb-3 origin-top rounded-2xl border border-ink-100 bg-paper-50 p-4 shadow-lift transition-all duration-300 ${
            open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <nav className="flex flex-col" aria-label="Navegação mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-paper-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-ink-100 pt-3">
            <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost w-full justify-center text-sm py-2.5">
              Acessar plataforma
            </Link>
            <a href="#cta" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm py-2.5">
              Começar grátis
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950 text-paper-50 shadow-xs">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M6 4.5h7.5a4.5 4.5 0 0 1 0 9H9V20"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
