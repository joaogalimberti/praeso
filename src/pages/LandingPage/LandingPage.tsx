import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { RevenueCalculator } from './components/RevenueCalculator';
import { Comparison } from './components/Comparison';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-paper-100 text-ink-950 font-sans selection:bg-moss-500/20 selection:text-ink-950">
      <Header />
      <main>
        {/* 1. Hero com proposta de valor e impacto antes/depois */}
        <Hero />

        {/* 2. O Custo Invisível das Ausências */}
        <Problem />

        {/* 3. Simulador Interativo WhatsApp + Agenda em Tempo Real */}
        <InteractiveSimulator />

        {/* 4. Calculadora Interativa de Faturamento Recuperado */}
        <RevenueCalculator />

        {/* 5. Comparativo Direto: Gestão Reativa x PRAESO */}
        <Comparison />

        {/* 6. Como Funciona em 4 Etapas */}
        <HowItWorks />

        {/* 7. Engenharia de Recursos */}
        <Features />

        {/* 8. FAQ Interativo */}
        <FAQ />

        {/* 9. Chamada Final */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;