import { theme } from '@/utilities/theme'
import RichText from '@/components/RichText'
import React from 'react'
import { BlockWrapper } from '@/components/BlockWrapper'

type ServiceProps = {
  tagline?: string | null
  richHeadline?: any
  richDescription?: any
  services?: {
    title: string
    description: string
    id?: string
  }[]
}

const Services = ({ tagline, richHeadline, richDescription, services }: ServiceProps) => {
  return (
    <BlockWrapper className="relative px-5 sm:px-6 lg:px-8 py-8 sm:py-20 lg:py-24 overflow-hidden">
      {/* Cercles en arrière-plan (Coherents avec le reste du site) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-[5%] h-125 w-125 rounded-full bg-purple-50/50 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-125 w-125 rounded-full bg-blue-50/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-10">
        <div className="grid gap-10 md:gap-12 lg:gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="text-center lg:text-left">
            <p className={`text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] ${theme.inkSoft}`}>
              {tagline || 'Services'}
            </p>
            <div className="mt-4 text-2xl sm:text-3xl md:text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight">
              {richHeadline && <RichText data={richHeadline} enableGutter={false} />}
            </div>
            <div className={`mt-4 text-sm sm:text-base ${theme.inkMuted}`}>
              {richDescription && <RichText data={richDescription} enableGutter={false} />}
            </div>

            <div className="mt-7 sm:mt-8 flex flex-col items-center lg:items-start gap-3 sm:gap-4 text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0F172A]/60">
              <span>Design sur mesure</span>
              <span>Architecture rapide</span>
              <span>SEO propre</span>
              <span>Mesure des leads</span>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {(services || []).map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-start gap-4 sm:gap-6 rounded-3xl border border-[#0F172A]/10 bg-white/80 p-5 sm:p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-base sm:text-lg font-(--font-marcellus) text-primary">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#0F172A]">
                    {item.title}
                  </h3>
                  <div className={`mt-2 text-sm ${theme.inkMuted}`}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}

export default Services
