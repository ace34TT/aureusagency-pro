import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="relative min-h-[300px] px-6 pt-12 pb-8 overflow-hidden flex items-end justify-center bg-linear-to-b from-[#f9f2ff] to-white">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-[5%] h-125 w-125 rounded-full bg-purple-50/50 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-125 w-125 rounded-full bg-blue-50/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {children ||
            (richText && (
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-[-1] mt-10">
                  <p className="text-[12rem] md:text-[18rem] leading-none font-outline text-primary/5 opacity-40 whitespace-nowrap mb-0 font-extrabold">
                    Aureus
                  </p>
                </div>
                <div
                  className="prose prose-lg md:prose-xl mx-auto
                            [&_h1]:font-(--font-marcellus)! [&_h1]:text-[#313040]! [&_h1]:text-7xl! [&_h1]:md:text-5xl! [&_h1]:leading-none! [&_h1]:mb-8!
                            prose-p:text-2xl prose-p:text-slate-700 prose-a:text-primary hover:prose-a:text-primary/80"
                >
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className={'font-light uppercase'}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
