// Importação de todos os componentes modulares
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Problem from './Problem/Problem';
import Stats from './Stats/Stats';
import BeforeAfter from './BeforeAfter/BeforeAfter';
import Features from './Features/Features';
import HowItWorks from './HowItWorks/HowItWorks';
import DashboardPreview from './DashboardPreview/DashboardPreview';
import Automation from './Automation/Automation';
import Testimonials from './Testimonials/Testimonials';
import Footer from './Footer/Footer';


const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />

      <main>
        {/* Seção Principal */}
        <Hero />

        {/* Seção de Conscientização */}
        <Problem />

        {/* Seção de Prova Social e Dados */}
        <Stats />

        {/* Comparativo de Valor */}
        <BeforeAfter />

        {/* Listagem de Funcionalidades */}
        <Features />

        {/* Passo a Passo */}
        <HowItWorks />

        {/* Demonstração do Produto */}
        <DashboardPreview />
        <Automation />

        {/* Prova Social (Depoimentos) */}
        <Testimonials />

      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;