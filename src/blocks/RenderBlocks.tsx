import React, { Fragment } from 'react'

import type { Achievement, Page, Post } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Marquee } from '@/blocks/Marquee/Component'
import Services from '@/blocks/Services/Component'
import WorkShowcase from '@/blocks/WorkShowCase/Component'
import { Process } from '@/blocks/Process/config'
import Testimonials from '@/blocks/Testimonials/Component'
import BlogList from '@/blocks/BlogList/Component'
import AchievementList from '@/blocks/AchievementList/Component'
import { SplitSection } from '@/blocks/SplitSection/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock } from '@/blocks/Code/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  marquee: Marquee,
  services: Services,
  workShowcase: WorkShowcase,
  process: Process,
  testimonials: Testimonials,
  blogList: BlogList,
  achievementList: AchievementList,
  splitSection: SplitSection,
  banner: BannerBlock,
  code: CodeBlock,
}

export const RenderBlocks: React.FC<{
  blocks: (Page['layout'][0] | Post['layout'][0] | Achievement['layout'][0])[]
  searchParams?: { [key: string]: string | string[] | undefined }
}> = (props) => {
  const { blocks, searchParams } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer searchParams={searchParams} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
