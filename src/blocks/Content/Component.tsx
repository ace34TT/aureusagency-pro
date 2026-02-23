import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { BlockWrapper } from '@/components/BlockWrapper'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { layout, columnOne, columnTwo } = props

  const renderColumn = (col: typeof columnOne | typeof columnTwo) => {
    if (!col) return null

    const { type, richText, enableLink, link, image } = col

    return (
      <div
        className={cn(
          'col-span-12',
          layout === 'twoColumns' ? 'lg:col-span-6' : '',
        )}
      >
        {type === 'text' && (
          <>
            {richText && (
              <RichText
                data={richText}
                enableGutter={false}
                className="prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-balance prose-p:text-sm sm:prose-p:text-base prose-p:text-foreground/80 prose-a:font-semibold prose-a:text-foreground prose-a:no-underline prose-a:decoration-foreground/40 hover:prose-a:text-foreground hover:prose-a:decoration-foreground prose-blockquote:border-foreground/20 prose-blockquote:bg-muted/60 prose-blockquote:px-5 sm:prose-blockquote:px-6 prose-blockquote:py-4 prose-hr:border-border/60"
              />
            )}
            {enableLink && (
              <div className="mt-5 sm:mt-6 flex">
                <CMSLink
                  {...link}
                  className="inline-flex items-center gap-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
                />
              </div>
            )}
          </>
        )}
        {type === 'image' && image && typeof image !== 'string' && (
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
            <Media
              resource={image}
              imgClassName="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <BlockWrapper className="container pt-0 md:pt-0 lg:pt-0">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 lg:gap-x-16 lg:gap-y-12">
        {renderColumn(columnOne)}
        {layout === 'twoColumns' && columnTwo && renderColumn(columnTwo)}
      </div>
    </BlockWrapper>
  )
}
