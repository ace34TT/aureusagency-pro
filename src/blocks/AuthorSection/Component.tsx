import React from 'react'
import type { AuthorSectionBlock as AuthorSectionBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Linkedin, Twitter, Github, Globe } from 'lucide-react'

export const AuthorSectionBlock: React.FC<AuthorSectionBlockProps> = ({
  photo,
  name,
  role,
  bio,
  socialLinks,
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      case 'website':
        return <Globe className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  return (
    <BlockWrapper className="container my-16 max-w-3xl mx-auto">
      <div className="p-8 pb-10 bg-card border rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left shadow-sm">
        <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 overflow-hidden rounded-full border-4 border-background shadow-md">
          {typeof photo === 'object' && photo !== null && (
            <Media
              resource={photo}
              className="w-full h-full object-cover"
              imgClassName="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-primary font-medium mb-4">{role}</p>
          <div className="prose dark:prose-invert text-muted-foreground mb-6">
            <RichText data={bio} enableGutter={false} />
          </div>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">{link.platform}</span>
                  {getIcon(link.platform)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </BlockWrapper>
  )
}
