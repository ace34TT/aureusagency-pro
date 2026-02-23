import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { BlockWrapper } from '@/components/BlockWrapper'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <BlockWrapper className="container my-16 relative overflow-hidden rounded-[28px] border border-border/60 bg-linear-to-b from-muted/50 via-background to-background shadow-[0_30px_80px_-60px_rgba(0,0,0,0.5)] ring-1 ring-border/40">
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.25),rgba(34,197,94,0))] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top_right,rgba(14,116,144,0.22),rgba(14,116,144,0))] blur-3xl" />

      <div className="relative grid grid-cols-4 gap-x-12 gap-y-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:gap-x-16 lg:py-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                  'group relative rounded-2xl border border-border/40 bg-background/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/70 hover:shadow-lg',
                )}
                key={index}
              >
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-base prose-p:text-foreground/80 prose-a:font-semibold prose-a:text-foreground prose-a:no-underline prose-a:decoration-foreground/40 hover:prose-a:text-foreground hover:prose-a:decoration-foreground prose-blockquote:border-foreground/20 prose-blockquote:bg-muted/60 prose-blockquote:px-6 prose-blockquote:py-4 prose-hr:border-border/60"
                  />
                )}

                {enableLink && (
                  <div className="mt-6 flex">
                    <CMSLink
                      {...link}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
                    />
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </BlockWrapper>
  )
}
