import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import type { LoginDTO, RegisterDTO } from '../types';

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

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register, loading } = useAuthStore();
  const typingText = useTypingEffect('garante a presença.', 100, 3000);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO & RegisterDTO>();

  const onSubmit = async (data: LoginDTO & RegisterDTO) => {
    try {
      if (isLogin) {
        await login({ email: data.email, password: data.password });
        toast.success('Login realizado com sucesso!');
      } else {
        await register(data);
        toast.success('Conta criada com sucesso!');
      }
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-white lg:grid lg:grid-cols-2 overflow-hidden">
      {/* Left Column: Branding & Messaging */}
      <div className="hidden lg:flex relative overflow-hidden bg-[#fafbfc] flex-col justify-center px-12 xl:px-20">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-200/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-lg">
          <div
            className="flex items-center gap-2 mb-8 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <span className="text-2xl font-black tracking-[0.15em] text-gray-900 uppercase">PRAESO</span>
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
              A inteligência que <br />
              <span className="text-primary-600 min-h-[1.2em] inline-block">
                {typingText}
                <span className="inline-block w-[2px] h-[0.9em] bg-primary-600 ml-1 animate-pulse align-middle"></span>
              </span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-md">
              Protocolos de confirmação que eliminam o "no-show" e elevam a produtividade do seu negócio.
            </p>

            <div className="grid gap-4 pt-2">
              {[
                { title: "Zero Esforço", desc: "Automação total via WhatsApp" },
                { title: "Cultura de Presença", desc: "Seus clientes confirmam em um clique" },
                { title: "Segurança Total", desc: "Dados protegidos com criptografia" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 h-auto bg-primary-200/50 rounded-full"></div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-12 xl:left-20 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          PRAESO &copy; 2026 &mdash; SINTA O CONTROLE
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center p-6 md:p-10 relative bg-white overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div
              className="flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className="text-xl font-black tracking-widest text-gray-900 uppercase">PRAESO</span>
              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-sm text-gray-500">
              {isLogin
                ? 'Acesse para gerenciar sua agenda.'
                : 'Junte-se a profissionais produtivos.'}
            </p>
          </div>

          <div className="bg-white">
            <div className="flex p-1 bg-gray-50 rounded-xl mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${isLogin
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${!isLogin
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Criar Conta
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <div className="group">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                      {...registerForm('name', {
                        required: !isLogin && 'Nome é obrigatório',
                      })}
                      type="text"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all outline-none text-sm text-gray-900 placeholder:text-gray-300"
                      placeholder="Como deseja ser chamado?"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[9px] font-bold mt-1 ml-1 uppercase">{errors.name.message}</p>
                  )}
                </div>
              )}

              <div className="group">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">
                  E-mail Profissional
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    {...registerForm('email', {
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido',
                      },
                    })}
                    type="email"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all outline-none text-sm text-gray-900 placeholder:text-gray-300"
                    placeholder="exemplo@suaempresa.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[9px] font-bold mt-1 ml-1 uppercase">{errors.email.message}</p>
                )}
              </div>

              <div className="group">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">
                  Senha Segura
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    {...registerForm('password', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Mínimo de 6 caracteres',
                      },
                    })}
                    type="password"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 focus:bg-white focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all outline-none text-sm text-gray-900 placeholder:text-gray-300"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[9px] font-bold mt-1 ml-1 uppercase">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3.5 rounded-xl text-md font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-2 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">
                  {loading ? 'Processando...' : isLogin ? 'Acessar Conta' : 'Criar Praeso'}
                </span>
              </button>
            </form>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-[9px] font-bold text-gray-300 uppercase tracking-widest text-center">
            <span>Privacidade garantida</span>
            <div className="w-1 h-1 rounded-full bg-gray-100"></div>
            <span>Suporte 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
