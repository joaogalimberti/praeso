import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';

const StatCard = ({ number, suffix, label, description, isVisible, icon: Icon }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = parseInt(number.replace(/\D/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isVisible, number]);

  return (
    <div className="relative group p-8 rounded-[2rem] bg-gray-50 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

      <div className="mb-6 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-primary-600">
        <Icon className="w-6 h-6" />
      </div>

      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
        {number.includes('R$') ? `R$ ${count.toLocaleString()}` : `${count}${suffix || ''}`}
      </div>

      <div className="text-lg font-bold text-gray-900 mb-2">{label}</div>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

      <div className="mt-8 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-[2000ms] ease-out"
          style={{ width: isVisible ? '100%' : '0%' }}
        ></div>
      </div>
    </div>
  );
};

const Stats = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="lg:min-h-screen flex flex-col justify-center py-24 bg-[#fafbfc] border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            A Prova da Previsibilidade
          </h2>
          <p className="text-lg text-gray-600">
            Dados reais que consolidam a autoridade da <span className="font-bold text-primary-600">PRAESO</span> no mercado de gestão de presença.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            number="70" suffix="%"
            label="Redução de Ausências"
            description="Recupere o controle total da sua grade de atendimento diária."
            isVisible={statsVisible}
            icon={TrendingUp}
          />
          <StatCard
            number="2400" suffix=""
            label="Receita Protegida"
            description="Média mensal recuperada por profissional com nosso protocolo."
            isVisible={statsVisible}
            icon={ShieldCheck}
          />
          <StatCard
            number="95" suffix="%"
            label="Taxa de Consciência"
            description="Índice de compromissos validados automaticamente pelo sistema."
            isVisible={statsVisible}
            icon={Users}
          />
          <StatCard
            number="05" suffix=" min"
            label="Implementação"
            description="Tempo médio para ativar sua nova gestão inteligente."
            isVisible={statsVisible}
            icon={Zap}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
