import { CheckCircle2, Smartphone, Zap } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="lg:min-h-screen flex flex-col justify-center py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Lado do Texto */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 uppercase tracking-wider">
              Visibilidade 360º
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              Consciência total sobre sua <span className="text-primary-600 underline decoration-primary-200 underline-offset-8">agenda</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Visualize status de confirmação e métricas de performance em uma interface
              desenhada para quem não pode perder tempo com incertezas.
            </p>

            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Métricas de Previsibilidade</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Acompanhe sua taxa de presença e identifique tendências antes que elas virem prejuízo.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Gestão Onipresente</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Acesse de qualquer dispositivo — sua agenda sob controle onde quer que você esteja.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Resposta Instantânea</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Valide confirmações em tempo real, sem necessidade de intervenção manual da sua equipe.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado da Imagem: Mockup de Janela Premium */}
          <div className="flex-1 order-1 lg:order-2 w-full max-w-2xl relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl shadow-primary-500/10 border border-gray-100 overflow-hidden transform lg:hover:scale-[1.02] transition-transform duration-500">
              <div className="bg-gray-50/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">app.praeso.com.br</div>
                <div className="w-6"></div>
              </div>

              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4 relative group">
                <img
                  src="/dashboard.png"
                  alt="Interface PRAESO"
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/800x600/f8fafc/64748b?text=Visualização+do+Dashboard";
                  }}
                />

                {/* Floating indicator */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3 animate-pulse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-800">Sincronizado</span>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
