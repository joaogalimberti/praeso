import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import type { LoginDTO, RegisterDTO } from '../types';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register, loading } = useAuthStore();

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
    <div className="min-h-screen bg-paper-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Gradiente de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-paper opacity-25" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[480px] w-[700px] rounded-full bg-moss-200/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-paper-300/40 blur-3xl" />
      </div>

      <div className="w-full max-w-[420px] animate-fade-up">
        {/* Voltar */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
          Voltar ao início
        </button>

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink-950 text-paper-50 shadow-soft">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M6 4.5h7.5a4.5 4.5 0 0 1 0 9H9V20"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-base font-extrabold tracking-tight text-ink-950">PRAESO</span>
        </div>

        {/* Card principal */}
        <div className="rounded-2xl border border-ink-100 bg-paper-50 p-7 shadow-lift sm:p-8">
          {/* Cabeçalho */}
          <div className="mb-6">
            <h1 className="text-xl font-extrabold tracking-tight text-ink-950">
              {isLogin ? 'Bem-vindo de volta' : 'Criar sua conta'}
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              {isLogin
                ? 'Acesse a plataforma para gerenciar sua agenda.'
                : 'Comece a reduzir ausências na sua clínica.'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="mb-6 flex rounded-xl border border-ink-100 bg-paper-200/60 p-1 gap-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                isLogin
                  ? 'bg-paper-50 text-ink-950 shadow-soft ring-1 ring-ink-100'
                  : 'text-ink-500 hover:text-ink-800'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                !isLogin
                  ? 'bg-paper-50 text-ink-950 shadow-soft ring-1 ring-ink-100'
                  : 'text-ink-500 hover:text-ink-800'
              }`}
            >
              Criar conta
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <FieldGroup
                label="Nome completo"
                icon={<User className="h-4 w-4" />}
                error={errors.name?.message}
              >
                <input
                  {...registerForm('name', {
                    required: !isLogin && 'Nome é obrigatório',
                  })}
                  type="text"
                  placeholder="Como prefere ser chamado?"
                  className="form-input"
                />
              </FieldGroup>
            )}

            <FieldGroup
              label="E-mail"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
            >
              <input
                {...registerForm('email', {
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'E-mail inválido',
                  },
                })}
                type="email"
                placeholder="voce@suaclinica.com"
                className="form-input"
              />
            </FieldGroup>

            <FieldGroup
              label="Senha"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
            >
              <input
                {...registerForm('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Mínimo de 6 caracteres',
                  },
                })}
                type="password"
                placeholder="••••••••"
                className="form-input"
              />
            </FieldGroup>

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-all duration-300 hover:bg-moss-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lift"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-paper-50/30 border-t-paper-50 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  {isLogin ? 'Acessar conta' : 'Criar conta grátis'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Trust footer */}
        <div className="mt-5 flex items-center justify-center gap-4 text-[10px] font-medium text-ink-400">
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-moss-500" strokeWidth={2.5} />
            Sem cartão de crédito
          </span>
          <span className="h-3 w-px bg-ink-200" />
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-moss-500" strokeWidth={2.5} />
            Cancela quando quiser
          </span>
          <span className="h-3 w-px bg-ink-200" />
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-moss-500" strokeWidth={2.5} />
            Suporte incluso
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Campo de formulário ─────────────────────────────── */
function FieldGroup({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 group-focus-within:text-moss-600 transition-colors">
          {icon}
        </span>
        {/* injeta a classe no input filho via CSS global abaixo */}
        <div className="[&>input]:w-full [&>input]:rounded-xl [&>input]:border [&>input]:border-ink-100 [&>input]:bg-paper-200/50 [&>input]:py-3 [&>input]:pl-10 [&>input]:pr-4 [&>input]:text-sm [&>input]:text-ink-900 [&>input]:outline-none [&>input]:transition-all [&>input]:placeholder:text-ink-300 [&>input]:focus:border-moss-400 [&>input]:focus:bg-paper-50 [&>input]:focus:ring-2 [&>input]:focus:ring-moss-400/20">
          {children}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
