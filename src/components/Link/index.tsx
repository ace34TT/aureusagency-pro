import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  ExternalLink,
  Info,
  Phone,
  Play,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  enableIcon?: boolean | null
  icon?:
    | 'arrowRight'
    | 'arrowLeft'
    | 'chevronRight'
    | 'chevronLeft'
    | 'plus'
    | 'externalLink'
    | 'download'
    | 'play'
    | 'info'
    | 'phone'
    | 'calendar'
    | null
  iconPosition?: 'left' | 'right' | null
}

const icons = {
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  plus: Plus,
  externalLink: ExternalLink,
  download: Download,
  play: Play,
  info: Info,
  phone: Phone,
  calendar: Calendar,
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    enableIcon,
    icon,
    iconPosition = 'right',
  } = props

  const Icon = enableIcon && icon && icons[icon] ? icons[icon] : null
  const iconSize = sizeFromProps === 'lg' ? 20 : 16 // Adjust icon size based on button size if needed

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className, 'inline-flex items-center gap-2')}
        href={href || url || ''}
        {...newTabProps}
      >
        {Icon && iconPosition === 'left' && <Icon size={iconSize} className="scale-x-[-1]" />}
        {label && label}
        {children && children}
        {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link
        className={cn(className, 'flex items-center gap-2')}
        href={href || url || ''}
        {...newTabProps}
      >
        {Icon && iconPosition === 'left' && <Icon size={iconSize} className="scale-x-[-1]" />}
        {label && label}
        {children && children}
        {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
      </Link>
    </Button>
  )
}
