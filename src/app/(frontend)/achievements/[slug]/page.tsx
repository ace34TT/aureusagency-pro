import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { AchievementHero } from '@/heros/AchievementHero'
import { RelatedAchievements } from '@/blocks/RelatedAchievements/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const achievements = await payload.find({
    collection: 'achievements',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return achievements.docs.map(({ slug }) => {
    return { slug }
  })
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Achievement({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/achievements/' + decodedSlug
  const achievement = await queryAchievementBySlug({ slug: decodedSlug })

  if (!achievement) return <PayloadRedirects url={url} />

  return (
    <article className="">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <AchievementHero achievement={achievement} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container mx-auto">
          <RenderBlocks blocks={achievement.layout} />
          {achievement.relatedAchievements && achievement.relatedAchievements.length > 0 && (
            <RelatedAchievements
              className="mt-12 max-w-208 lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={achievement.relatedAchievements.filter((doc) => typeof doc === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const achievement = await queryAchievementBySlug({ slug: decodedSlug })

  return generateMeta({ doc: achievement })
}

const queryAchievementBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'achievements',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    // On retourne le premier document trouvé, ou null s'il n'y a rien
    return result.docs?.[0] || null
  } catch (error) {
    // Log l'erreur côté serveur pour le debug
    console.error(
      `[Aureus Agency] Erreur lors de la récupération de l'achievement (slug: ${slug}):`,
      error,
    )

    // On retourne null pour que le composant puisse gérer l'affichage (ex: redirection 404)
    return null
  }
})
