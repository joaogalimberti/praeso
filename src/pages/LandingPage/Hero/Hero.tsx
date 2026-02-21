import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle2, Zap } from "lucide-react"

function useTypingEffect(text: string, speed: number = 100, delay: number = 2000) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, speed / 2);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed, delay]);

  return displayedText;
}

const Hero = () => {
  const navigate = useNavigate()
  const [filledSlots, setFilledSlots] = useState(0)
  const typingText = useTypingEffect('sempre cheia.', 100, 3000);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilledSlots(prev => (prev >= 8 ? 0 : prev + 1))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative lg:min-h-screen flex flex-col justify-center pt-40 pb-20 md:pt-48 md:pb-32 lg:pt-32 lg:pb-16 overflow-hidden bg-[#fafbfc]">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Lado esquerdo - Texto */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Sua agenda <br />
              <span className="text-primary-600 min-h-[1.2em] inline-block">
                {typingText}
                <span className="inline-block w-[3px] h-[0.8em] bg-primary-600 ml-1 animate-pulse align-middle"></span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A <strong className="text-gray-900">PRAESO</strong> antecipa a presença dos seus clientes e elimina as lacunas na sua agenda de forma automática.
              <span className="block mt-2 font-medium text-primary-600 font-bold">Zero faltas. Máxima produtividade.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('/login')}
                className="group w-full sm:w-auto bg-primary-600 text-white px-8 py-5 rounded-2xl text-lg font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-500/25 active:scale-95"
              >
                Começar agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3">
              {[
                "14 dias grátis",
                "Sem cartão",
                "Cancele quando quiser"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Lado direito - Calendário Minimalista */}
          <div className="flex-1 w-full max-w-lg animate-fade-in lg:scale-90 xl:scale-100">
            <div className="relative">
              <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hoje</div>
                    <div className="text-lg font-extrabold text-gray-900">12 de Janeiro</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
                  </div>
                </div>

                <div className="p-4 md:p-6 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const hour = 9 + i
                    const isFilled = i < filledSlots

                    return (
                      <div
                        key={i}
                        className={`group flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-500 border-2 ${isFilled
                          ? 'bg-primary-50/30 border-primary-100'
                          : 'bg-transparent border-gray-50 hover:border-gray-100'
                          }`}
                      >
                        <div className={`text-xs font-bold w-12 ${isFilled ? 'text-primary-600' : 'text-gray-400'}`}>
                          {hour}:00
                        </div>
                        <div className="flex-1">
                          {isFilled ? (
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              <span className="text-xs font-bold text-gray-900">Confirmado</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300">Disponível</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Floating indicators */}
              <div className="absolute -top-4 -right-4 hidden md:flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-50 shadow-green-500/10">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400">STATUS</div>
                  <div className="text-xs font-bold text-gray-900">Confirmado</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-50 shadow-primary-500/10 transition-transform hover:scale-105">
                <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400">IA</div>
                  <div className="text-xs font-bold text-gray-900">Gap preenchido</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
