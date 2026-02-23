import { cn } from '@/utilities/ui'
import { theme } from '@/utilities/theme'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import { Page, SplitSectionBlock as SplitSectionBlockProps } from '@/payload-types'
import { Gutter } from '@payloadcms/ui'
import { BlockWrapper } from '@/components/BlockWrapper'

export const SplitSection: React.FC<SplitSectionBlockProps> = ({
  content,
  image,
  links,
  reverse,
  title,
}) => {
  return (
    <BlockWrapper className="relative py-8 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] sm:left-[10%] h-64 w-64 sm:h-125 sm:w-125 rounded-full bg-purple-50/40 blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] sm:right-[10%] h-64 w-64 sm:h-125 sm:w-125 rounded-full bg-blue-50/40 blur-[80px] sm:blur-[120px]" />
      </div>

      <Gutter>
        <div className="mx-auto container relative z-10 px-5 sm:px-6 lg:px-0">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-10 lg:gap-x-14 gap-y-10 sm:gap-y-14 lg:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className={cn(reverse ? 'lg:order-last' : 'lg:order-first')}>
              <div className="text-base leading-7 lg:max-w-lg text-center lg:text-left">
                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight">
                  {title}
                </h2>
                <div
                  className={`max-w-xl mt-4 sm:mt-6 text-sm sm:text-base md:text-lg ${theme.inkMuted} mx-auto lg:mx-0`}
                >
                  {content && <RichText data={content} enableGutter={false} />}
                </div>
                <div className="mt-6 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
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
              <div className="relative aspect-square sm:aspect-4/3 lg:aspect-auto lg:h-150">
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
    </BlockWrapper>
  )
}
