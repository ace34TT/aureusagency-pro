import { cn } from '@/utilities/ui'
import { theme } from '@/utilities/theme'
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
    <section className="relative py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[10%] h-125 w-125 rounded-full bg-purple-50/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-125 w-125 rounded-full bg-blue-50/40 blur-[120px]" />
      </div>

      <Gutter>
        <div className="mx-auto container relative z-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-14 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className={cn(reverse ? 'lg:order-last' : 'lg:order-first')}>
              <div className="text-base leading-7 lg:max-w-lg">
                <h2 className="mt-2 text-3xl font-(--font-marcellus) text-[#0F172A] sm:text-4xl leading-tight">
                  {title}
                </h2>
                <div className={`max-w-xl mt-6 text-lg ${theme.inkMuted}`}>
                  {content && <RichText data={content} enableGutter={false} />}
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
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
                'relative isolate overflow-hidden rounded-[28px] bg-white border border-[#0F172A]/10 shadow-[0_20px_60px_rgba(15,23,42,0.1)]',
                reverse ? 'lg:order-first' : 'lg:order-last',
              )}
            >
              <div className="relative aspect-square md:aspect-4/3 lg:aspect-auto lg:h-150">
                {image && typeof image === 'object' && (
                  <MediaComponent
                    resource={image}
                    fill
                    imgClassName="absolute inset-0 h-full w-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
