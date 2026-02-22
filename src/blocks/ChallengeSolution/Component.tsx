import React from 'react'
import type { ChallengeSolutionBlock as ChallengeSolutionBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { theme } from '@/utilities/theme'

export const ChallengeSolutionBlock: React.FC<ChallengeSolutionBlockProps> = ({
  challengeTitle,
  challenge,
  solutionTitle,
  solution,
}) => {
  return (
    <BlockWrapper className="">
      <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        <div className="absolute -top-24 left-[15%] h-48 w-48 rounded-full bg-[#9AD5CA]/35 blur-[110px]" />
        <div className="absolute -bottom-20 right-[10%] h-56 w-56 rounded-full bg-[#F6B3A7]/30 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="rounded-[28px] border border-[#0F172A]/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>
              Challenge
            </p>
            <h3 className="mt-4 text-2xl font-(--font-marcellus) text-[#0F172A]">
              {challengeTitle}
            </h3>
            <div className={`mt-6 prose max-w-none text-sm md:text-base ${theme.inkMuted}`}>
              <RichText data={challenge} enableGutter={false} />
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <div className="h-24 w-px bg-linear-to-b from-transparent via-[#0F172A]/15 to-transparent" />
          </div>

          <div className="rounded-[28px] border border-[#0F172A]/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>
              Solution
            </p>
            <h3 className="mt-4 text-2xl font-(--font-marcellus) text-[#0F172A]">
              {solutionTitle}
            </h3>
            <div className={`mt-6 prose max-w-none text-sm md:text-base ${theme.inkMuted}`}>
              <RichText data={solution} enableGutter={false} />
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
