import React from 'react'
import type { ResultsBlock as ResultsBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'

export const ResultsBlock: React.FC<ResultsBlockProps> = ({ title, kpis }) => {
  return (
    <BlockWrapper className="container my-24 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center">
        {title && (
          <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase tracking-tight">{title}</h2>
        )}

        {kpis && kpis.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-8 lg:p-12 border-2 border-primary/10 rounded-3xl bg-card hover:border-primary/50 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]"
              >
                <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/60 drop-shadow-sm mb-4">
                  {kpi.stat}
                </span>
                <span className="text-lg md:text-xl font-medium text-muted-foreground">
                  {kpi.description}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}
