import { Star, UserCheck } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Carlos Mendes',
      role: 'Cirurgião Dentista',
      stat: '-17% de faltas',
      text: 'O sistema se paga sozinho através da recuperação de receita que antes era perdida silenciosamente.',
      image: '/images/testimonial-1.jpg'
    },
    {
      name: 'Dra. Ana Paula',
      role: 'Fisioterapeuta',
      stat: '+12h livres/mês',
      text: 'Meus pacientes elogiam a clareza. Recuperei o controle total do meu dia e parei com a espera passiva.',
      image: '/images/testimonial-2.jpg'
    },
    {
      name: 'Dr. Roberto Silva',
      role: 'Psicólogo Clínico',
      stat: '100% Automação',
      text: 'Em poucos minutos o protocolo já estava rodando e gerando previsibilidade real para o meu consultório.',
      image: '/images/testimonial-3.jpg'
    }
  ];

  return (
    <section className="lg:min-h-screen flex flex-col justify-center py-24 bg-[#fafbfc]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6 tracking-wide">
            PROVA REAL
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Resultados de quem vive o dia a dia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col items-center text-center">
              <div className="mb-6 flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-green-100/50">
                {t.stat}
              </div>

              <blockquote className="text-gray-600 leading-relaxed italic mb-8 relative flex-1">
                <span className="absolute -top-4 -left-2 text-6xl text-gray-100 -z-10 leading-none font-serif">"</span>
                "{t.text}"
              </blockquote>

              <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-50 w-full">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=f1f5f9&color=64748b`;
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center text-white border-2 border-white">
                    <UserCheck className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 leading-tight">{t.name}</div>
                  <div className="text-xs text-primary-600 font-bold tracking-wide uppercase mt-1">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
