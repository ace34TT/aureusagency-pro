import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Media } from '@/components/Media'
import { MdArrowBackIos } from 'react-icons/md'
import { Calendar } from 'lucide-react'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative min-h-112 sm:min-h-128 lg:min-h-160 flex items-center justify-center bg-linear-to-b from-[#f9f2ff] to-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative h-full w-full">
          {/* Vos cercles ici */}
          <div className="absolute -top-[10%] -right-[5%] h-150 w-150 rounded-full bg-yellow-100/40 blur-[120px]" />
          <div className="absolute top-[10%] -left-[10%] h-200 w-200 rounded-full bg-blue-200/30 blur-[150px]" />
          {/* Ajustement du cercle du bas pour qu'il ne soit pas trop "écrasé" */}
          <div className="absolute bottom-[5%] left-[20%] h-175 w-225 rounded-full bg-purple-200/30 blur-[130px]" />
        </div>
      </div>
      {/* Content Card */}
      <div className="container relative z-10 flex justify-center rounded-2xl overflow-hidden px-2 sm:px-3">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            imgClassName="object-cover"
            resource={heroImage}
            className="absolute inset-0"
          />
        )}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
        <div className="relative z-10 backdrop-blur-xs shadow-2xl rounded-3xl p-6 sm:p-8 md:p-12 w-full  mx-auto">
          <Link
            href="/posts"
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-primary transition-colors mb-6 sm:mb-8"
            title="Retour aux articles"
          >
            <MdArrowBackIos className={'-mr-1.5'} />
          </Link>

          <div className="uppercase text-xs sm:text-sm mb-3 sm:mb-4 text-primary font-bold tracking-wider">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

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

          <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-slate-600 border-t border-slate-100 pt-5 sm:pt-6">
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
          </div>
        </div>
      </div>
    </div>
  )
}
