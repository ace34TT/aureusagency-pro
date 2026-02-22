import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Link from 'next/link'

import type { Achievement } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Media } from '@/components/Media'
import { MdArrowBackIos } from 'react-icons/md'
import { Calendar, ExternalLink } from 'lucide-react'

export const AchievementHero: React.FC<{
  achievement: Achievement
}> = ({ achievement }) => {
  const { tags, heroImage, populatedAuthors, publishedAt, title, projectLink } = achievement

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="px-5 sm:px-6 lg:px-8 relative min-h-150 flex items-center justify-center bg-linear-to-b from-[#f9f2ff] to-white pt-28 pb-24">
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
      {/* Content Card */}
      <div className="container relative z-10 flex justify-center rounded-2xl overflow-hidden ">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 backdrop-blur-xs shadow-2xl rounded-3xl p-8 md:p-12 w-full mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-primary transition-colors mb-8"
            title="Retour aux réalisations"
          >
            <MdArrowBackIos className={'-mr-1.5'} />
          </Link>

          <div className="uppercase text-sm mb-4 text-primary font-bold tracking-wider">
            {tags?.map((tag, index) => {
              if (typeof tag === 'object' && tag !== null) {
                const { name: tagTitle } = tag

                const titleToUse = tagTitle || 'Untitled tag'

                const isLast = index === tags.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <h1 className="mb-8 text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 border-t border-slate-100 pt-6">
            {hasAuthors && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold uppercase tracking-wide">Par</span>
                <span className="text-slate-900 font-medium">
                  {formatAuthors(populatedAuthors)}
                </span>
              </div>
            )}
            {publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" strokeWidth={2} />
                <time dateTime={publishedAt} className="text-white font-medium">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20"
              >
                <span className="font-medium text-white">Voir le projet</span>
                <ExternalLink size={18} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
