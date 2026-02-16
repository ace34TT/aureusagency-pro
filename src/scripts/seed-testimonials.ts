import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function seedTestimonials() {
  const payload = await getPayload({ config: configPromise })

  console.log('--- UPDATING HOME PAGE TESTIMONIALS ---')

  const homeQuery = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
  })

  if (homeQuery.docs.length === 0) {
    console.error('Home page not found. Please seed the home page first.')
    process.exit(1)
  }

  const homePage = homeQuery.docs[0]
  const layout = homePage.layout || []

  // Define the Testimonials Block Data
  const testimonialsBlock = {
    blockType: 'testimonials' as const,
    tagline: 'Témoignages',
    richHeadline: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Témoignages', version: 1 }],
            version: 1,
          },
        ],
        direction: 'ltr' as 'ltr' | 'rtl' | null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    testimonials: [
      {
        authorName: 'Jean Dupont',
        authorRole: 'CEO, TechStart',
        quote:
          'Une équipe exceptionnelle qui a su comprendre notre vision et la sublimer. Le résultat dépasse nos attentes.',
      },
      {
        authorName: 'Sophie Martin',
        authorRole: 'CMO, LuxeBrand',
        quote:
          'Leur attention aux détails et leur expertise technique sont incomparables. Un partenaire de confiance.',
      },
    ],
  }

  // Find existing Testimonials block and replace it, or append if not found
  const testimonialIndex = layout.findIndex((block: any) => block.blockType === 'testimonials')
  let newLayout = [...layout]

  if (testimonialIndex > -1) {
    console.log('Found existing Testimonials block. Updating...')
    newLayout[testimonialIndex] = testimonialsBlock
  } else {
    console.log('No Testimonials block found. Appending...')
    newLayout.push(testimonialsBlock)
  }

  await payload.update({
    collection: 'pages',
    id: homePage.id,
    data: {
      layout: newLayout,
    },
    context: { disableRevalidate: true },
  })

  console.log('Updated Home page with Testimonials.')
  console.log('--- COMPLETE ---')
  process.exit(0)
}

seedTestimonials().catch((err) => {
  console.error(err)
  process.exit(1)
})
