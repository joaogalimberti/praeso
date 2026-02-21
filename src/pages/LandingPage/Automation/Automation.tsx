"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Bell, CheckCircle2, Target, Clock, Send, ShieldCheck, UserCheck } from "lucide-react"

const Automation = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [messagesVisible, setMessagesVisible] = useState(false)
  const iphoneRef = useRef(null)

  const steps = [
    {
      n: "01",
      title: "Agendamento",
      desc: "Registro inicial",
      icon: Calendar,
      detail: "Cliente agendado no sistema",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      n: "02",
      title: "Antecipação",
      desc: "Início do protocolo",
      icon: Clock,
      detail: "48h antes: Primeira notificação enviada",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      n: "03",
      title: "Lembrete",
      desc: "Estratégico",
      icon: Bell,
      detail: "24h antes: Confirmação ativa solicitada",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      n: "04",
      title: "Confirmação",
      desc: "Validação ativa",
      icon: UserCheck,
      detail: "Cliente confirma presença automaticamente",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      n: "05",
      title: "Previsibilidade",
      desc: "Resultado final",
      icon: ShieldCheck,
      detail: "Agenda protegida e compromisso garantido",
      color: "text-primary-600",
      bg: "bg-primary-50"
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMessagesVisible(true)
      },
      { threshold: 0.5 }
    )

    if (iphoneRef.current) observer.observe(iphoneRef.current)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [steps.length])

  return (
    <section className="lg:min-h-screen flex flex-col justify-center py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6 tracking-wide">
            AUTOMAÇÃO INTELIGENTE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            O Motor da <span className="text-primary-600 leading-normal">Previsibilidade</span>
          </h2>
          <p className="text-lg text-gray-600">
            A inteligência da <span className="font-bold text-gray-900">PRAESO</span> automatiza o comportamento de presença,
            transformando incerteza em receita protegida.
          </p>
        </div>

        <div className="relative mb-32">
          {/* Progress Path */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden lg:block">
            <div
              className="h-full bg-primary-600 transition-all duration-[1500ms] ease-in-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index <= activeStep
              const isCurrent = index === activeStep

              return (
                <div
                  key={step.n}
                  className={`group cursor-pointer p-6 rounded-[2rem] border transition-all duration-500 flex flex-col items-center text-center ${isCurrent ? 'bg-white border-primary-100 shadow-2xl shadow-primary-500/10 scale-105' :
                    isActive ? 'bg-white border-gray-100' : 'bg-transparent border-transparent opacity-40'
                    }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`relative mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${isCurrent ? step.bg + ' ' + step.color :
                    isActive ? 'bg-gray-100 text-gray-900' : 'bg-gray-50 text-gray-400'
                    }`}>
                    <Icon className="w-7 h-7" />
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-2xl bg-current opacity-20 animate-ping"></div>
                    )}
                  </div>
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isCurrent ? step.color : 'text-gray-400'}`}>
                      Etapa {step.n}
                    </div>
                    <h4 className={`font-bold transition-colors ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</h4>
                    {isCurrent && (
                      <p className="text-[10px] text-gray-400 mt-2 font-medium leading-tight px-2">{step.detail}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Simulator Area */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 bg-gray-50 rounded-[3rem] p-8 md:p-16 lg:p-20">
          <div className="flex-1 max-w-sm" ref={iphoneRef}>
            {/* iPhone Mockup */}
            <div className="relative mx-auto border-[8px] border-gray-900 rounded-[3rem] w-full aspect-[9/19.5] shadow-2xl overflow-hidden bg-white">
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-gray-900 rounded-b-2xl z-20"></div>

              {/* WhatsApp UI Simulation */}
              <div className="h-full flex flex-col bg-[#e5ddd5]">
                {/* Header */}
                <div className="bg-[#075e54] pt-8 pb-3 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">P</div>
                  <div>
                    <div className="text-white font-bold text-sm">PRAESO</div>
                    <div className="text-white/70 text-[10px]">online</div>
                  </div>
                </div>

                {/* Screen content */}
                <div className="flex-1 p-4 space-y-4 overflow-hidden">
                  <div className="flex justify-center">
                    <span className="bg-[#dcf8c6]/90 px-3 py-1 rounded-lg text-[10px] shadow-sm uppercase font-bold text-gray-500">Hoje</span>
                  </div>

                  {/* Sent Message */}
                  <div className={`flex justify-end transition-all duration-700 delay-300 ${messagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <div className="bg-[#dcf8c6] border border-gray-200/20 p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                      <p className="text-xs text-gray-800 leading-relaxed">Olá João! Tudo bem? Passando para confirmar seu horário amanhã às 14:00.</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[9px] text-gray-500">10:05</span>
                        <div className="flex text-blue-500"><CheckCircle2 className="w-2.5 h-2.5" /></div>
                      </div>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className={`flex justify-start transition-all duration-300 delay-[1.5s] ${messagesVisible && !activeStep ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>

                  {/* Received Message */}
                  <div className={`flex justify-start transition-all duration-700 delay-[2s] ${messagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm">
                      <p className="text-xs text-gray-800 leading-relaxed font-medium">SIM, confirmado!</p>
                      <div className="flex justify-end mt-1">
                        <span className="text-[9px] text-gray-400">10:06</span>
                      </div>
                    </div>
                  </div>

                  {/* System Response */}
                  <div className={`flex justify-end transition-all duration-700 delay-[3s] ${messagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <div className="bg-[#dcf8c6] p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                      <p className="text-xs text-gray-800 leading-relaxed">Perfeito! Sua presença foi atualizada no sistema. Nos vemos amanhã! 🚀</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[9px] text-gray-500">10:06</span>
                        <div className="flex text-blue-500"><CheckCircle2 className="w-2.5 h-2.5" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-6">
              IA CONVERSACIONAL
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              Confirmação Natural com <br /> Inteligência Artificial
            </h3>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              A IA da <span className="font-bold text-gray-900">PRAESO</span> conversa naturalmente com seus clientes, processando respostas em linguagem humana sem a frieza de comandos robóticos.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 flex-shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">Processamento Natural</h5>
                  <p className="text-sm text-gray-500">Entende "sim", "confirmo", "vou sim" e variações semânticas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">Personalização</h5>
                  <p className="text-sm text-gray-500">Usa o nome do cliente e contexto da consulta para maior engajamento.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">Resposta Instantânea</h5>
                  <p className="text-sm text-gray-500">Atualiza sua agenda em tempo real no exato momento da confirmação.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Automation
