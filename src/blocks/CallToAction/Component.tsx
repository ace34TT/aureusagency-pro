import React from 'react'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { CallToActionBlock as CallToActionBlockType, Media, Page } from '@/payload-types'
import { Gutter } from '@payloadcms/ui'

type CallToActionBlockProps = CallToActionBlockType & {
  id?: string
}

export const CallToActionBlock: React.FC<CallToActionBlockProps> = ({
  richText,
  links,
  backgroundImage,
}) => {
  const media = typeof backgroundImage === 'object' ? (backgroundImage as Media) : null

  return (
    <Gutter>
      <div className="relative isolate overflow-hidden  bg-primary/10 px-6 py-24 my-24">
        {media && (
          <div className="absolute inset-0 -z-10 h-full w-full">
            <MediaComponent
              priority
              resource={media}
              fill
              imgClassName="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 to-gray-900/50" />
          </div>
        )}
        <div className="mx-auto max-w-2xl text-center">
          {richText && (
            <RichText
              data={richText}
              className="text-primary [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-primary [&_h2]:sm:text-4xl"
            />
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  className="text-white border-white"
                  appearance={link.appearance === 'outline' ? 'outline' : 'default'} // Ensures correct appearance
                />
              )
            })}
          </div>
        </div>
      </div>
    </Gutter>
  )
}
