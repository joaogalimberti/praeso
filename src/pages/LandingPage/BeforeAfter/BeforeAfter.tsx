import { CheckCircle2, XCircle } from "lucide-react";

const BeforeAfter = () => {
  return (
    <section className="lg:min-h-screen flex flex-col justify-center py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6">
            A METAMORFOSE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            O Impacto da Previsibilidade
          </h2>
          <p className="text-lg text-gray-600">
            A transição definitiva da gestão reativa para uma cultura de presença confirmada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Lado ANTES: Gestão Reativa */}
          <div className="relative group p-8 md:p-12 rounded-[2.5rem] bg-gray-50 border border-gray-100 transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cenário Atual</div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">Gestão Reativa</h3>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                <XCircle className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {[
                "20-30% de ausências não planejadas",
                "Lacunas ociosas e 'buracos' na grade",
                "Dependência de processos manuais falhos",
                "Receita oscilante e imprevisível"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-300 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/50 rounded-2xl border border-gray-100">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-red-400 w-[65%]"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                <span>Eficiência</span>
                <span className="text-red-500">65% Baixa</span>
              </div>
            </div>
          </div>

          {/* Lado DEPOIS: PRAESO */}
          <div className="relative group p-8 md:p-12 rounded-[2.5rem] bg-primary-600 text-white shadow-2xl shadow-primary-500/20 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs font-bold text-primary-200 uppercase tracking-widest mb-1">Com PRAESO</div>
                  <h3 className="text-2xl font-black leading-tight">Cultura de Presença</h3>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  "Redução para 5-8% de ausências",
                  "Máxima ocupação da agenda diária",
                  "Protocolo 100% automatizado",
                  "Menos esforço, maior controle financeiro"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-300 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-white w-[98%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-primary-200 uppercase">
                  <span>Eficiência</span>
                  <span className="text-white">98% Máxima</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
