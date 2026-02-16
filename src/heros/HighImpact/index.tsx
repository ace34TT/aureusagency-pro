'use client'
import React from 'react'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  title,
  description,
  badge,
  features,
}) => {
  return (
    <section
      className={`relative min-h-screen overflow-hidden px-6 pb-24 pt-28 flex items-center justify-center bg-linear-to-b from-[#f9f2ff] to-white`}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // Crée un fondu progressif en haut et surtout en bas
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div className="relative h-full w-full">
          {/* Vos cercles ici */}
          <div className="absolute -top-[10%] -right-[5%] h-150 w-150 rounded-full bg-yellow-100/40 blur-[120px]" />
          <div className="absolute top-[10%] -left-[10%] h-200 w-200 rounded-full bg-blue-200/30 blur-[150px]" />
          {/* Ajustement du cercle du bas pour qu'il ne soit pas trop "écrasé" */}
          <div className="absolute bottom-[5%] left-[20%] h-175 w-225 rounded-full bg-purple-200/30 blur-[130px]" />
        </div>
      </div>

      <div className="relative mx-auto container z-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {badge && (
              <div className="inline-flex items-center gap-3 rounded-full border border-[#0F172A]/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#0F172A]/70">
                <span className="h-2 w-2 rounded-full bg-[#0F172A]" />
                {badge}
              </div>
            )}

            <div className="mt-6 text-4xl font-(--font-marcellus) leading-tight text-[#0F172A] md:text-6xl">
              {title && <RichText data={title} enableGutter={false} />}
            </div>

            <div className={'mt-6 max-w-xl text-lg text-[#0F172A]/70 md:text-xl'}>
              {description && <RichText data={description} enableGutter={false} />}
            </div>

            {Array.isArray(links) && links.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-8">
                {links.map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance={link.appearance === 'outline' ? 'outline' : 'default'}
                    />
                  )
                })}
              </div>
            )}
          </div>

          <div className="relative">
            {media && typeof media === 'object' && (
              <div>
                <Media
                  resource={media}
                  className="mx-auto"
                  imgClassName="w-full h-auto max-w-[500px]"
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {Array.isArray(features) && features.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-[#0F172A]/60">
            {features.map(({ text }, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
