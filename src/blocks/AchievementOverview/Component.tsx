import React from 'react'
import type { AchievementOverviewBlock as AchievementOverviewBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import { Media } from '@/components/Media'
import { theme } from '@/utilities/theme'

export const AchievementOverviewBlock: React.FC<AchievementOverviewBlockProps> = ({
  clientLogo,
  year,
  role,
  industry,
  stack,
}) => {
  const details = [
    { label: 'Year', value: year },
    { label: 'Role', value: role },
    { label: 'Industry', value: industry },
    { label: 'Tech Stack', value: stack },
  ]

  return (
    <BlockWrapper className="relative pt-0 md:pt-0 lg:pt-0">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 right-[10%] h-48 w-48 rounded-full bg-[#9AD5CA]/35 blur-[100px]" />
        <div className="absolute bottom-0 left-[5%] h-56 w-56 rounded-full bg-[#F6B3A7]/30 blur-[110px]" />
      </div>

      <div className="">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[28px] border border-[#0F172A]/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>Client</p>
            <h3 className="mt-4 text-2xl font-(--font-marcellus) text-[#0F172A]">
              Apercu du projet
            </h3>

            {typeof clientLogo === 'object' && clientLogo !== null && (
              <div className="mt-8 rounded-2xl border border-[#0F172A]/5 bg-[#F5F2EB]/70 p-6">
                <div className="w-48 max-w-full h-auto max-h-24 object-contain">
                  <Media
                    resource={clientLogo}
                    className="w-full h-full object-contain mix-blend-multiply"
                    imgClassName="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="group rounded-[22px] border border-[#0F172A]/10 bg-white/70 p-6 transition-all hover:-translate-y-1 hover:border-[#0F172A]/20 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              >
                <p className={`text-[0.65rem] uppercase tracking-[0.35em] ${theme.inkSoft}`}>
                  {detail.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-[#0F172A]">
                  {detail.value || '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
