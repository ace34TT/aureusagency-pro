'use client'
import React from 'react'
import FastMarquee from 'react-fast-marquee'
import type { MarqueeBlock as MarqueeBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'

export const Marquee: React.FC<Partial<MarqueeBlockProps>> = (props) => {
  const { items, padding } = props
  const speedToUse = 50

  const fallbackExpertise = [
    { name: 'Next.js 15' },
    { name: 'Payload CMS' },
    { name: 'UI/UX Design' },
    { name: 'Tailwind CSS' },
    { name: 'TypeScript' },
    { name: 'SEO Strategy' },
    { name: 'Performance' },
    { name: 'Ultra Fast' },
  ]

  const dataToUse = items && items.length > 0 ? items : fallbackExpertise

  const content = [...dataToUse, ...dataToUse]

  return (
    <BlockWrapper
      className={`relative ${padding == 'both' && 'py-8 sm:py-20 lg:py-24'} ${
        padding === 'top' && 'pt-8 sm:pt-20 lg:pt-24'
      } ${padding === 'bottom' && 'pb-8 sm:pb-20 lg:pb-24'} overflow-hidden bg-white`}
    >
      <div
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <FastMarquee gradient={false} speed={speedToUse} pauseOnHover={true} play={true}>
          {content.map((item, index) => (
            <div key={index} className="mx-5 sm:mx-8 lg:mx-10 flex items-center py-3 sm:py-4">
              <span className="cursor-default text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-400 transition-all duration-300 hover:text-primary hover:scale-105 leading-tight">
                {item.name}
              </span>
              <span className="ml-8 sm:ml-12 lg:ml-20 text-xl sm:text-2xl md:text-3xl text-gray-200 font-light">
                /
              </span>
            </div>
          ))}
        </FastMarquee>
      </div>
    </BlockWrapper>
  )
}
