'use client'
import React from 'react'
import FastMarquee from 'react-fast-marquee'
import type { MarqueeBlock as MarqueeBlockProps } from '@/payload-types'

export const Marquee: React.FC<Partial<MarqueeBlockProps>> = (props) => {
  const { items, padding } = props
  const speedToUse =  50

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
    <section className={`relative ${ padding == 'both' && 'py-24' } ${padding === "top" && "pt-24"} ${padding === "bottom" && "pb-24"} overflow-hidden bg-white`}>
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
            <div key={index} className="mx-10 flex items-center py-4">
              <span className="cursor-default text-4xl md:text-6xl font-black tracking-tighter text-gray-400 transition-all duration-300 hover:text-primary hover:scale-105 leading-tight">
                {item.name}
              </span>
              <span className="ml-20 text-3xl text-gray-200 font-light">/</span>
            </div>
          ))}
        </FastMarquee>
      </div>
    </section>
  )
}
