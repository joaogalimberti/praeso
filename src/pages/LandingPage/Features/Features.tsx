import { BarChart3, Layout, Rocket, Shield, Zap, CheckCircle2 } from "lucide-react";

const featuresData = [
  {
    icon: Rocket,
    title: 'Antecipação Estratégica',
    description: 'Protocolos de contato que preparam o cliente para o compromisso muito antes do horário marcado.'
  },
  {
    icon: CheckCircle2,
    title: 'Confirmação Ativa',
    description: 'Sistema inteligente que converte intenção em presença confirmada com um clique, sem fricção.'
  },
  {
    icon: Layout,
    title: 'Grade de Previsibilidade',
    description: 'Uma visão clara do seu dia que permite agir preventivamente sobre possíveis lacunas na agenda.'
  },
  {
    icon: BarChart3,
    title: 'Métricas de Performance',
    description: 'Dados precisos sobre a saúde da sua agenda e o crescimento real do seu faturamento.'
  },
  {
    icon: Zap,
    title: 'Automação Consciente',
    description: 'Configuração rápida que trabalha silenciosamente, garantindo atenção total aos seus pacientes.'
  },
  {
    icon: Shield,
    title: 'Proteção de Receita',
    description: 'Reduza drasticamente o prejuízo causado por ausências e recupere o controle financeiro.'
  }
];

const Features = () => {
  return (
    <section id="features" className="lg:min-h-screen flex flex-col justify-center py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6">
            TECNOLOGIA & GESTÃO
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Engenharia de <span className="text-primary-600">Presença</span>
          </h2>
          <p className="text-lg text-gray-600">
            Recursos desenhados milimetricamente para transformar sua agenda em um fluxo contínuo de compromissos cumpridos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((f, index) => (
            <div key={index} className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-500">
              <div className="mb-6 w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-primary-600 transition-transform group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white duration-500">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{f.description}</p>

              <div className="mt-8 flex items-center gap-2">
                <div className="h-1 w-8 bg-primary-200 rounded-full transition-all group-hover:w-16 group-hover:bg-primary-600 duration-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
