import type { Metadata } from 'next'

import type { Achievement, Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Achievement> | null
  path?: string
}): Promise<Metadata> => {
  const { doc, path } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title : 'Payload Website Template'

  const serverUrl = getServerSideURL()
  const url = path ? `${serverUrl}${path}` : serverUrl

  // Parse keywords: handled as comma-separated string from the admin panel
  let keywords: string[] | undefined = undefined
  const meta: any = doc?.meta
  if (meta?.keywords) {
    if (typeof meta.keywords === 'string') {
      keywords = meta.keywords.split(',').map((k: string) => k.trim())
    } else if (Array.isArray(meta.keywords)) {
      keywords = meta.keywords
    }
  }

  return {
    description: doc?.meta?.description,
    keywords,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url,
    }),
    alternates: {
      canonical: url,
    },
    title,
  }
}
