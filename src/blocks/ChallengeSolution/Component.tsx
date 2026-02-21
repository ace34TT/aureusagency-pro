import React from 'react'
import type { ChallengeSolutionBlock as ChallengeSolutionBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'

export const ChallengeSolutionBlock: React.FC<ChallengeSolutionBlockProps> = ({
  challengeTitle,
  challenge,
  solutionTitle,
  solution,
}) => {
  return (
    <BlockWrapper className="container my-20 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="w-8 h-[2px] bg-red-500 rounded-full" />
            <h3 className="text-2xl font-bold uppercase tracking-wider">{challengeTitle}</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none prose-lg text-muted-foreground">
            <RichText data={challenge} enableGutter={false} />
          </div>
        </div>

        <div className="flex flex-col gap-6 relative">
          <div className="absolute -left-12 lg:-left-24 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="flex items-center gap-4">
            <span className="w-8 h-[2px] bg-green-500 rounded-full" />
            <h3 className="text-2xl font-bold uppercase tracking-wider">{solutionTitle}</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none prose-lg text-muted-foreground">
            <RichText data={solution} enableGutter={false} />
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
