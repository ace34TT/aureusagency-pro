import React from 'react'
import type { AchievementOverviewBlock as AchievementOverviewBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import { Media } from '@/components/Media'

export const AchievementOverviewBlock: React.FC<AchievementOverviewBlockProps> = ({
  clientLogo,
  year,
  role,
  industry,
  stack,
}) => {
  return (
    <BlockWrapper className="container my-12 mb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 border-y py-12">
        <div className="md:w-1/3 flex flex-col items-center md:items-start gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Client
          </p>
          {typeof clientLogo === 'object' && clientLogo !== null && (
            <div className="w-48 h-auto max-h-24 object-contain">
              <Media
                resource={clientLogo}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:invert"
                imgClassName="object-contain"
              />
            </div>
          )}
        </div>

        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Year
            </span>
            <span className="text-lg font-medium">{year}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Role
            </span>
            <span className="text-lg font-medium">{role}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Industry
            </span>
            <span className="text-lg font-medium">{industry}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Tech Stack
            </span>
            <span className="text-lg font-medium">{stack}</span>
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
