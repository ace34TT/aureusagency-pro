import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

// Use 'any' for now since Achievement type is not yet generated
export const revalidateAchievement: CollectionAfterChangeHook<any> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/achievements/${doc.slug}`

      payload.logger.info(`Revalidating achievement at path: ${path}`)

      revalidatePath(path)
      revalidateTag('achievements-sitemap')
    }

    // If the achievement was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/achievements/${previousDoc.slug}`

      payload.logger.info(`Revalidating old achievement at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('achievements-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<any> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/achievements/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('achievements-sitemap')
  }

  return doc
}
