"use client"

import { useEffect, useState } from "react"
import { Calendar, ClipboardList, MousePointer2, Send } from "lucide-react"

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])

  const steps = [
    {
      n: "01",
      title: "Registro de Presença",
      tag: "Entrada de Dados",
      desc: "Insira os dados básicos do seu cliente. A PRAESO organiza as informações para iniciar o monitoramento inteligente.",
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600"
    },
    {
      n: "02",
      title: "Planejamento de Agenda",
      tag: "Organização",
      desc: "Defina os horários com facilidade. Nossa interface oferece clareza absoluta sobre sua grade de compromissos.",
      icon: Calendar,
      color: "bg-purple-50 text-purple-600"
    },
    {
      n: "03",
      title: "Antecipação Ativa",
      tag: "Engajamento",
      desc: "O sistema envia notificações estratégicas em momentos de alta atenção, preparando o cliente para o compromisso.",
      icon: Send,
      color: "bg-amber-50 text-amber-600"
    },
    {
      n: "04",
      title: "Confirmação e Controle",
      tag: "Resultado",
      desc: "O cliente valida a presença com um clique. Sua agenda se atualiza instantaneamente com foco em faturamento.",
      icon: MousePointer2,
      color: "bg-green-50 text-green-600"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleSteps((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 }
    )

    const stepElements = document.querySelectorAll('.step-item-tw')
    stepElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="lg:min-h-screen flex flex-col justify-center py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6">
            O MÉTODO
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            A Engenharia por trás do <span className="text-primary-600">Fluxo</span>
          </h2>
          <p className="text-lg text-gray-600">
            Quatro etapas desenhadas para eliminar a ociosidade e profissionalizar sua gestão de forma automatizada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.n}
              data-index={index}
              className={`step-item-tw group relative p-8 rounded-[2.5rem] bg-white border border-gray-100 transition-all duration-700 ${visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              {/* Number decoration */}
              <div className="absolute top-8 right-8 text-6xl font-black text-gray-50 group-hover:text-primary-50 transition-colors duration-500">
                {step.n}
              </div>

              <div className={`relative z-10 w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500`}>
                <step.icon className="w-8 h-8" />
              </div>

              <div className="relative z-10">
                <div className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-2">{step.tag}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-16 h-[2px] bg-gray-100">
                  <div className={`h-full bg-primary-600 transition-all duration-1000 delay-500 ${visibleSteps.includes(index) ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
