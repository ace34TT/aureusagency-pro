import React from 'react'
import Image from 'next/image'
import { Layout, Paintbrush, Rocket, Search } from 'lucide-react'
import { theme } from '@/utilities/theme'
import RichText from '@/components/RichText'

type ProcessProps = {
  tagline?: string | null
  richHeadline?: any
  steps?: {
    title: string
    copy: string
    icon: 'search' | 'layout' | 'paintbrush' | 'rocket'
    id?: string
  }[]
}

const icons = {
  search: Search,
  layout: Layout,
  paintbrush: Paintbrush,
  rocket: Rocket,
}

const Process = ({ tagline, richHeadline, steps }: ProcessProps) => {
  const colors = ['bg-blue-50', 'bg-purple-50', 'bg-pink-50', 'bg-amber-50']
  const textColors = ['text-[#6C63FF]', 'text-purple-500', 'text-pink-500', 'text-amber-500']

  return (
    <section className="relative px-6 py-24 overflow-hidden bg-white">
      {/* Cercles animés en arrière-plan pour la cohérence */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] h-125 w-125 rounded-full bg-blue-50/50 blur-[120px] animate-glow" />
      </div>

      <div className="relative mx-auto container z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* CÔTÉ GAUCHE : IMAGE & VISUEL */}
          <div>
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>
              {tagline || 'Notre Méthode'}
            </p>
            <div className="mt-4 text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight">
              {richHeadline && <RichText data={richHeadline} enableGutter={false} />}
            </div>

            <div className="mt-12 space-y-8">
              {(steps || []).map((step, index) => {
                const colorClass = colors[index % colors.length]
                const textColorClass = textColors[index % textColors.length]
                const Icon = icons[step.icon] || Search

                return (
                  <div key={step.id || index} className="group flex gap-6">
                    {/* Icône avec ligne verticale */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colorClass} border border-[#0F172A]/5 transition-transform group-hover:scale-110 shadow-sm`}
                      >
                        <Icon className={`w-6 h-6 ${textColorClass}`} />
                      </div>
                      {index !== (steps?.length || 0) - 1 && (
                        <div className="w-px h-full bg-linear-to-b from-[#0F172A]/10 to-transparent mt-4" />
                      )}
                    </div>

                    {/* Texte */}
                    <div className="pb-8">
                      <h3 className="text-xl font-semibold text-[#0F172A] flex items-center gap-3">
                        {step.title}
                      </h3>
                      <div className={`mt-3 text-sm leading-relaxed ${theme.inkMuted}`}>
                        {step.copy}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CÔTÉ DROIT : CONTENU & ÉTAPES */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-3xl border border-[#0F172A]/5">
              <Image
                src="/Frame 182.png" // Remplacez par une image de collaboration tech
                alt="Notre processus de travail"
                width={600}
                height={600}
                className="w-full h-auto bg-slate-50 p-8 "
              />
            </div>
            {/* Décoration sous l'image */}
            <div className="absolute -bottom-6 -right-6 h-full w-full rounded-3xl border-2 border-dashed border-primary/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
