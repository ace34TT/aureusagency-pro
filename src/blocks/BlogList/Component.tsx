import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { theme } from '@/utilities/theme'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'
import type { BlogListBlock } from '@/payload-types'
import { BlogPagination } from './BlogPagination'
import { BlockWrapper } from '@/components/BlockWrapper'

export const BlogList = async (
  props: BlogListBlock & {
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

  const posts = await payload.find({
    collection: 'posts',
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
    <BlockWrapper
      className={`relative px-6 ${mode === 'all' ? 'pt-0 pb-24' : 'py-24'} overflow-hidden`}
    >
      {/* Background Decor matching WorkShowcase */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[5%] h-125 w-125 rounded-full bg-purple-50/40 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] h-125 w-125 rounded-full bg-blue-50/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-10">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          {mode === 'latest' && (
            <div className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft} mb-4`}>
              {/* Optional Tagline if we had one, or just static 'Blog' */}
              BLOG
            </div>
          )}

          <div className="text-3xl md:text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight mb-6">
            {title && <RichText data={title} enableGutter={false} />}
          </div>
          <div className={`text-base ${theme.inkMuted}`}>
            {description && <RichText data={description} enableGutter={false} />}
          </div>
        </div>

        {/* Tag Filter */}
        {mode === 'all' && tags.docs.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="?"
              scroll={false}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all border ${
                !activeTagSlug
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-transparent text-[#0F172A]/60 border-[#0F172A]/10 hover:border-[#0F172A]/30'
              }`}
            >
              Tous
            </Link>
            {tags.docs.map((tag) => (
              <Link
                key={tag.id}
                href={`?tag=${tag.slug}`}
                scroll={false}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all border ${
                  activeTagSlug === tag.slug
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-transparent text-[#0F172A]/60 border-[#0F172A]/10 hover:border-[#0F172A]/30'
                }`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.docs.length > 0 ? (
            posts.docs.map((post) => {
              const { slug, title, meta, publishedAt, tags } = post
              const href = `/posts/${slug}`
              return (
                <Link href={href} key={post.id} className="group block h-full">
                  <article className="flex flex-col h-full rounded-[28px] border border-[#0F172A]/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                    {/* Decorative light blob on hover */}
                    <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-[#9AD5CA]/30 blur-2xl transition opacity-0 group-hover:opacity-100" />
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Image */}
                      <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100 mb-6">
                        {meta?.image && typeof meta.image !== 'string' && (
                          <Media
                            resource={meta.image}
                            imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            pictureClassName="w-full h-full block"
                            htmlElement={null}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1">
                        {/* Date & Tags */}
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#0F172A]/60 mb-3">
                          {publishedAt && (
                            <time dateTime={publishedAt} className="shrink-0">
                              {new Date(publishedAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </time>
                          )}
                        </div>

                        <h3 className="text-xl font-(--font-marcellus) text-[#0F172A] mb-3 leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </h3>

                        <p className={`line-clamp-3 mb-6 flex-1 text-sm ${theme.inkMuted}`}>
                          {meta?.description}
                        </p>

                        {tags && Array.isArray(tags) && tags.length > 0 && (
                          <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-[#0F172A]/5">
                            {tags.map((tag) => {
                              if (typeof tag === 'object' && tag !== null && 'name' in tag) {
                                return (
                                  <span
                                    key={tag.id}
                                    className="text-[10px] uppercase tracking-wider text-[#0F172A]/40 font-medium"
                                  >
                                    #{tag.name}
                                  </span>
                                )
                              }
                              return null
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-[32px] border border-[#0F172A]/10 bg-white/80 px-8 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:flex-row md:text-left">
                <div className="w-full max-w-[320px] shrink-0">
                  <img
                    src="/undraw_void_wez2.png"
                    alt="Aucun article trouvé"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#0F172A]/50">
                    Aucun résultat
                  </p>
                  <h3 className="mt-3 text-2xl font-(--font-marcellus) text-[#0F172A]">
                    Aucun article trouvé pour ce filtre
                  </h3>
                  <p className={`mt-3 text-sm ${theme.inkMuted}`}>
                    Essayez un autre tag ou revenez voir nos dernières publications.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="?"
                      scroll={false}
                      className="inline-flex items-center gap-2 rounded-full border border-[#0F172A] px-5 py-2 text-xs font-medium uppercase tracking-wider text-[#0F172A] transition-colors hover:bg-[#0F172A] hover:text-white"
                    >
                      Voir tous les articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {mode === 'all' && posts.totalPages > 1 && (
          <BlogPagination page={page} totalPages={posts.totalPages} />
        )}
      </div>
    </BlockWrapper>
  )
}

export default BlogList
