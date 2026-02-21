import React from 'react'
import { cn } from '@/utilities/ui'

type BlockWrapperProps = React.HTMLAttributes<HTMLElement> & {
  blockType?: string
  className?: string
  children: React.ReactNode
}

export const BlockWrapper: React.FC<BlockWrapperProps> = ({
  blockType,
  className,
  children,
  ...rest
}) => {
  return (
    <section
      className={cn(
        'py-8 md:py-24', // Default vertical padding for blocks
        className,
      )}
      data-block-type={blockType}
      {...rest}
    >
      {children}
    </section>
  )
}
