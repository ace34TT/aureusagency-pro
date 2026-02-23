import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { theme } from '@/utilities/theme'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'
import type { AchievementListBlock } from '@/payload-types'
import { BlogPagination } from '@/blocks/BlogList/BlogPagination' // Reuse pagination if compatible, or duplicate it. Assuming compatible or will verify.
import { BlockWrapper } from '@/components/BlockWrapper'

export const AchievementList = async (
  props: AchievementListBlock & {
    searchParams?: { [key: string]: string | string[] | undefined }
  },
) => {
  const { title, description, limit = 6, mode = 'latest', searchParams } = props

  const payload = await getPayload({ config: configPromise })

  const page =
    mode === 'all' && searchParams?.page ? Number.parseInt(searchParams.page as string, 10) : 1

  const activeTagSlug = searchParams?.tag as string | undefined

  // Fetch all tags for filter
  const tags = await payload.find({
    collection: 'tags',
    limit: 100,
    pagination: false,
    sort: 'name',
  })

  // Find active tag ID if slug is present
  let activeTagId: string | undefined
  if (activeTagSlug) {
    const activeTagDoc = tags.docs.find((tag) => tag.slug === activeTagSlug)
    if (activeTagDoc) {
      activeTagId = activeTagDoc.id
    }
  }

  const achievements = await payload.find({
    collection: 'achievements',
    depth: 1,
    limit: limit || 6,
    page,
    pagination: mode === 'all',
    sort: '-publishedAt',
    where: activeTagId
      ? {
          tags: {
            equals: activeTagId,
          },
        }
      : undefined,
  })

  return (
    <BlockWrapper className="pt-0 md:pt-0 lg:pt-12 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] sm:right-[5%] h-64 w-64 sm:h-125 sm:w-125 rounded-full bg-purple-50/40 blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] sm:left-[5%] h-64 w-64 sm:h-125 sm:w-125 rounded-full bg-blue-50/40 blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 max-w-2xl text-center lg:text-left">
          <div className="text-2xl sm:text-3xl md:text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight mb-4 sm:mb-6">
            {title && <RichText data={title} enableGutter={false} />}
          </div>
          <div className={`text-sm sm:text-base md:text-lg ${theme.inkMuted}`}>
            {description && <RichText data={description} enableGutter={false} />}
          </div>
        </div>

        {/* Tag Filter */}
        {mode === 'all' && tags.docs.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center lg:justify-start">
            <Link
              href="?"
              scroll={false}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                !activeTagSlug
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous
            </Link>
            {tags.docs.map((tag) => (
              <Link
                key={tag.id}
                href={`?tag=${tag.slug}`}
                scroll={false}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTagSlug === tag.slug
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.docs.length > 0 ? (
            achievements.docs.map((achievement) => {
              const { slug, title, heroImage, publishedAt, tags } = achievement
              const href = `/achievements/${slug}`

              // Helper to get image URL or object
              const image = heroImage

              return (
                <Link href={href} key={achievement.id} className="group block h-full">
                  <article className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                      {image && (typeof image === 'string' || typeof image === 'object') && (
                        <Media
                          resource={image}
                          imgClassName="w-full h-full object-cover"
                          pictureClassName="w-full h-full block"
                          htmlElement={null}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-8">
                      {/* Date & Tags */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-medium text-slate-500 mb-3 sm:mb-4 uppercase tracking-wider">
                        {publishedAt && (
                          <time dateTime={publishedAt} className="shrink-0">
                            {new Date(publishedAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                        )}

                        {tags && Array.isArray(tags) && tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => {
                              if (typeof tag === 'object' && tag !== null && 'name' in tag) {
                                return (
                                  <span
                                    key={tag.id}
                                    className="bg-primary/5 text-primary px-2 py-1 rounded-md text-[10px] font-bold"
                                  >
                                    {tag.name}
                                  </span>
                                )
                              }
                              return null
                            })}
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-primary transition-colors">
                        {title}
                      </h3>

                      {/* Description or content - Achievements might not have 'meta.description' populated same way as posts if not using SEO plugin fully or if it's different.
                          Based on schema, we have 'content'. Extracting excerpt would be hard.
                          Since we removed 'meta' usage in step 299 where we reused 'meta' but maybe achievements don't populate 'meta.description' in cards well?
                          Let's assume 'meta.description' exists if SEO plugin is used.
                       */}
                      {/*
                      <p className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                        {meta?.description}
                      </p>
                      */}

                      <div className="flex items-center gap-3 pt-5 sm:pt-6 border-t border-slate-100 mt-auto">
                        <div className="text-[0.65rem] sm:text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
                          Voir le projet
                        </div>
                        <div className="w-8 h-px bg-primary/50 group-hover:w-12 transition-all" />
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              Aucun succès trouvé pour ce filtre.
            </div>
          )}
        </div>

        {mode === 'all' && achievements.totalPages > 1 && (
          <BlogPagination page={page} totalPages={achievements.totalPages} />
        )}
      </div>
    </BlockWrapper>
  )
}

export default AchievementList
