import React from 'react'
import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, role }) => {
  return (
    <BlockWrapper className="container my-12 max-w-4xl mx-auto">
      <blockquote className="border-l-4 border-primary pl-6 py-2 italic bg-muted/20 rounded-r-lg">
        <div className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
          <RichText data={quote} enableGutter={false} />
        </div>
        {(author || role) && (
          <footer className="mt-4 flex items-center gap-3">
            <div className="h-1 w-8 bg-primary/50" />
            <div className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              {author}
              {author && role && <span className="mx-2 opacity-50">•</span>}
              {role && <span className="text-primary">{role}</span>}
            </div>
          </footer>
        )}
      </blockquote>
    </BlockWrapper>
  )
}
