import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'
import '@/styles/typography.css'
import { getServerSideURL } from '@/utilities/getURL'
import { GoogleTagManager } from '@next/third-parties/google'

import localFont from 'next/font/local'

const overcameOutline = localFont({
  src: '../../../public/fonts/overcame-demo.outline.ttf',
  variable: '--font-outline',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, overcameOutline.variable)}
      lang="fr"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-N4SN4C35" />
        <Providers>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Aureus Agency',
    template: '%s | Aureus Agency',
  },
  description: 'Agence innovation digital',
  keywords: [
    'Agence web',
    'Développement',
    'Design',
    'SEO',
    'Marketing Digital',
    'Payload CMS',
    'Next.js',
  ],
  publisher: 'Aureus Agency',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@aureusagency',
  },
}
