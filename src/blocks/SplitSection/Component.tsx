import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { Page, SplitSectionBlock as SplitSectionBlockProps } from '@/payload-types'
import { Gutter } from '@payloadcms/ui'

export const SplitSection: React.FC<SplitSectionBlockProps> = ({
  content,
  image,
  links,
  reverse,
  title,
}) => {
  return (
    <section className="py-24">
      <Gutter>
        <div className="mx-auto container">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className={cn(reverse ? 'lg:order-last' : 'lg:order-first')}>
              <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {title}
                </h2>
                <div className="max-w-xl">{content && <RichText data={content} />}</div>
                <div className="mt-8">
                  {(links || []).map(({ link }, i) => {
                    return (
                      <CMSLink
                        key={i}
                        {...link}
                        className=""
                        appearance={link.appearance === 'outline' ? 'outline' : 'default'}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
            <div
              className={cn(
                'relative isolate overflow-hidden rounded-3xl bg-gray-900',
                reverse ? 'lg:order-first' : 'lg:order-last',
              )}
            >
              {image && typeof image === 'object' && (
                <MediaComponent
                  resource={image}
                  fill
                  imgClassName="absolute inset-0 -z-10 h-full w-full object-cover"
                />
              )}
              {/* Optional overlay if needed, currently just the image */}
              <div className="min-h-100 w-full"></div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
