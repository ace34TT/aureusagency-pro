import React from 'react'
import type { ResultsBlock as ResultsBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import { theme } from '@/utilities/theme'

export const ResultsBlock: React.FC<ResultsBlockProps> = ({ title, kpis }) => {
  return (
    <BlockWrapper className="">
      <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        <div className="absolute -top-20 left-[12%] h-52 w-52 rounded-full bg-[#9AD5CA]/35 blur-[120px]" />
        <div className="absolute -bottom-24 right-[10%] h-64 w-64 rounded-full bg-[#F6B3A7]/30 blur-[130px]" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center text-center">
        {title && (
          <>
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>Resultats</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-(--font-marcellus) text-[#0F172A]">
              {title}
            </h2>
          </>
        )}

        {kpis && kpis.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-8 lg:p-10 rounded-[26px] border border-[#0F172A]/10 bg-white/75 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <span className="text-4xl md:text-5xl font-semibold text-[#0F172A]">
                  {kpi.stat}
                </span>
                <span className={`mt-3 text-sm md:text-base text-center ${theme.inkMuted}`}>
                  {kpi.description}
                </span>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </BlockWrapper>
  )
}
