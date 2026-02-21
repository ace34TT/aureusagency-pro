'use client'

import React, { useEffect, useState } from 'react'

export const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: string }[]>([])

  useEffect(() => {
    // Select all h2, h3 inside the main article container
    const elements = Array.from(document.querySelectorAll('article h2, article h3, article h4'))
      .filter((el) => el.textContent)
      .map((el, i) => {
        // give it an ID if it doesn't have one
        if (!el.id) {
          el.id = `heading-${i}-${el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase(),
        }
      })

    setHeadings(elements)
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24 pt-8 border-l border-primary/20 pl-6 lg:block hidden">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
        Sommaire
      </h3>
      <ul className="flex flex-col gap-3">
        {headings.map((heading) => {
          return (
            <li
              key={heading.id}
              className={`transition-colors text-sm hover:text-primary ${heading.level === 'h3' ? 'ml-4' : heading.level === 'h4' ? 'ml-8 text-xs' : 'font-medium'}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="line-clamp-2 text-muted-foreground/80 hover:text-primary transition-colors"
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
