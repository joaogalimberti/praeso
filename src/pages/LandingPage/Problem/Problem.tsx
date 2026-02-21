import { AlertCircle, TrendingUp } from "lucide-react";

const Problem = () => {
  return (
    <section className="lg:min-h-screen flex flex-col justify-center py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Lado Esquerdo: O Visual de Agenda */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 relative">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-sm mx-auto">
                <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Agenda do Dia</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-transparent">
                      <div className="w-10 text-[10px] font-bold text-gray-400">{9 + i}:00</div>
                      <div className={`flex-1 h-8 rounded-lg ${i >= 4 ? 'bg-red-50 border border-red-100 flex items-center px-3' : 'bg-primary-50'}`}>
                        {i >= 4 && (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] font-bold text-red-600 uppercase">Ausência</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Badge */}
              <div className="absolute -bottom-6 right-0 md:-right-6 bg-white p-5 rounded-2xl shadow-2xl border border-gray-50 flex items-center gap-4 max-w-[240px] animate-bounce">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-black text-gray-900">30% Perda</div>
                  <div className="text-xs text-gray-500 leading-tight">Capacidade ociosa recorrente detectada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: A Explicação */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="inline-block px-4 py-2 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-6">
              O GARGALO OPERACIONAL
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-[1.2]">
              O ciclo invisível da <span className="text-primary-600 underline decoration-primary-200 underline-offset-8">incerteza</span>
            </h2>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-black text-xl">
                  01
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ocupação Ilusória</h3>
                  <p className="text-gray-600 leading-relaxed">Sua grade parece completa, mas a falta de confirmação antecipada gera uma falsa sensação de segurança financeira.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 font-black text-xl">
                  02
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">A Quebra de Expectativa</h3>
                  <p className="text-gray-600 leading-relaxed">Faltas não comunicadas impedem o preenchimento de lacunas com novos clientes, criando ociosidade crítica.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 font-black text-xl">
                  03
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ociosidade Estrutural</h3>
                  <p className="text-gray-600 leading-relaxed">Sua estrutura continua gerando custos fixos, enquanto a receita esperada simplesmente não se concretiza.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border-l-4 border-primary-600 italic text-gray-700">
              "A incerteza custa mais caro que o investimento na tecnologia certa."
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Problem;
