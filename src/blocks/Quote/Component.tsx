import React from 'react'
import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { theme } from '@/utilities/theme'

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, role }) => {
  return (
    <BlockWrapper className="relative pt-0 md:pt-0 lg:pt-0">
      <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        <div className="absolute -top-12 left-[20%] h-40 w-40 rounded-full bg-[#9AD5CA]/35 blur-[100px]" />
        <div className="absolute -bottom-12 right-[18%] h-44 w-44 rounded-full bg-[#F6B3A7]/30 blur-[110px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        <blockquote className="relative overflow-hidden rounded-4xl border border-[#0F172A]/10 bg-white/80 px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <div className="absolute -left-6 -top-6 text-7xl text-[#0F172A]/10">“</div>
          <div className="relative text-xl md:text-2xl leading-relaxed text-[#0F172A]">
          <RichText data={quote} enableGutter={false} />
          </div>
          {(author || role) && (
            <footer className="mt-6 flex flex-wrap items-center gap-4">
              <div className="h-1 w-8 bg-[#0F172A]/40" />
              <div className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>
                {author}
              </div>
              {role && (
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1B9AAA]">
                  {role}
                </span>
              )}
            </footer>
          )}
        </blockquote>
      </div>
    </BlockWrapper>
  )
}
