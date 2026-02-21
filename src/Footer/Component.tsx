import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { JSX } from 'react'
import {
  FaAngellist,
  FaApple,
  FaBandcamp,
  FaBehance,
  FaBitbucket,
  FaBluesky,
  FaDiscord,
  FaDribbble,
  FaEnvelope,
  FaFacebookF,
  FaFacebookMessenger,
  FaFigma,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaGoogle,
  FaHackerNews,
  FaInstagram,
  FaLine,
  FaLinkedinIn,
  FaMapLocationDot,
  FaMastodon,
  FaMedium,
  FaNewspaper,
  FaPhone,
  FaPinterestP,
  FaPodcast,
  FaProductHunt,
  FaQuora,
  FaRedditAlien,
  FaRss,
  FaSignal,
  FaSlack,
  FaSnapchat,
  FaSoundcloud,
  FaSpotify,
  FaStackOverflow,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaTumblr,
  FaTwitch,
  FaTwitter,
  FaVimeoV,
  FaWeixin,
  FaWhatsapp,
  FaXTwitter,
  FaYelp,
  FaYoutube,
} from 'react-icons/fa6'
import type { Footer, Global } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import Image from 'next/image'

import { NewsletterForm } from '@/components/Form/NewsletterForm'
import { HeaderNavItems } from '@/Header/Component.client'

export type SocialLinks = Global['socialLinks']

export async function Footer() {
  const footerData: Footer = (await getCachedGlobal('footer', 1)()) as Footer
  const globalData: Global = (await getCachedGlobal('global', 1)()) as Global

  const { logo, navItems, legalLinks } = footerData

  const { socialLinks } = globalData
  const logoUrl = getMediaUrl(typeof logo === 'string' ? logo : logo?.url || '')

  const iconMap: Record<string, JSX.Element> = {
    ANGELLIST: <FaAngellist size={22} className="text-current" />,
    APPLE_MUSIC: <FaApple size={22} className="text-current" />,
    BANDCAMP: <FaBandcamp size={22} className="text-current" />,
    BEHANCE: <FaBehance size={22} className="text-current" />,
    BITBUCKET: <FaBitbucket size={22} className="text-current" />,
    BLUESKY: <FaBluesky size={22} className="text-current" />,
    DISCORD: <FaDiscord size={22} className="text-current" />,
    DRIBBBLE: <FaDribbble size={22} className="text-current" />,
    EMAIL: <FaEnvelope size={22} className="text-current" />,
    FACEBOOK: <FaFacebookF size={22} className="text-current" />,
    FACEBOOK_MESSENGER: <FaFacebookMessenger size={22} className="text-current" />,
    FIGMA: <FaFigma size={22} className="text-current" />,
    GITHUB: <FaGithub size={22} className="text-current" />,
    GITLAB: <FaGitlab size={22} className="text-current" />,
    GOOGLE: <FaGoogle size={22} className="text-current" />,
    GOOGLE_BUSINESS: <FaGoogle size={22} className="text-current" />,
    HACKER_NEWS: <FaHackerNews size={22} className="text-current" />,
    INSTAGRAM: <FaInstagram size={22} className="text-current" />,
    LINE: <FaLine size={22} className="text-current" />,
    LINKEDIN: <FaLinkedinIn size={22} className="text-current" />,
    MASTODON: <FaMastodon size={22} className="text-current" />,
    MEDIUM: <FaMedium size={22} className="text-current" />,
    MESSENGER: <FaFacebookMessenger size={22} className="text-current" />,
    PHONE: <FaPhone size={22} className="text-current" />,
    PINTEREST: <FaPinterestP size={22} className="text-current" />,
    PODCASTS: <FaPodcast size={22} className="text-current" />,
    PRODUCT_HUNT: <FaProductHunt size={22} className="text-current" />,
    QUORA: <FaQuora size={22} className="text-current" />,
    REDDIT: <FaRedditAlien size={22} className="text-current" />,
    RSS: <FaRss size={22} className="text-current" />,
    SIGNAL: <FaSignal size={22} className="text-current" />,
    SLACK: <FaSlack size={22} className="text-current" />,
    SNAPCHAT: <FaSnapchat size={22} className="text-current" />,
    SOUNDCLOUD: <FaSoundcloud size={22} className="text-current" />,
    SPOTIFY: <FaSpotify size={22} className="text-current" />,
    STACK_OVERFLOW: <FaStackOverflow size={22} className="text-current" />,
    SUBSTACK: <FaNewspaper size={22} className="text-current" />,
    TELEGRAM: <FaTelegram size={22} className="text-current" />,
    THREADS: <FaThreads size={22} className="text-current" />,
    TIKTOK: <FaTiktok size={22} className="text-current" />,
    TRIPADVISOR: <FaMapLocationDot size={22} className="text-current" />,
    TUMBLR: <FaTumblr size={22} className="text-current" />,
    TWITCH: <FaTwitch size={22} className="text-current" />,
    TWITTER: <FaTwitter size={22} className="text-current" />,
    VIMEO: <FaVimeoV size={22} className="text-current" />,
    WEBSITE: <FaGlobe size={22} className="text-current" />,
    WEB: <FaGlobe size={22} className="text-current" />,
    SITE: <FaGlobe size={22} className="text-current" />,
    WECHAT: <FaWeixin size={22} className="text-current" />,
    WHATSAPP: <FaWhatsapp size={22} className="text-current" />,
    X: <FaXTwitter size={22} className="text-current" />,
    YELP: <FaYelp size={22} className="text-current" />,
    YOUTUBE: <FaYoutube size={22} className="text-current" />,
  }

  const renderLinks = (links: HeaderNavItems) =>
    links?.map((item, index) => {
      const { link, id } = item

      // Détermination de l'URL : Priorité à la référence interne, sinon URL custom
      const href =
        link.type === 'reference'
          ? typeof link.reference?.value === 'object'
            ? `/${link.reference.value.slug}`
            : '#'
          : (link.url ?? '#')

      return (
        <li key={id || index}>
          <Link
            href={href}
            target={link.newTab ? '_blank' : undefined}
            rel={link.newTab ? 'noopener noreferrer' : undefined}
            className="hover:text-primary transition-colors text-slate-600"
          >
            {link.label}
          </Link>
        </li>
      )
    })

  const renderSocialIcons = (links: SocialLinks) =>
    links?.map((link) => {
      const icon = iconMap[link.platform.toUpperCase()]
      if (!icon) return null

      return (
        <li key={`${link.url}-${link.platform}`}>
          <Link
            href={link.url}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-primary hover:text-primary hover:bg-slate-50"
            aria-label={link.url}
          >
            {icon}
          </Link>
        </li>
      )
    })

  return (
    <footer className="relative bg-white text-[#0F172A] py-8 sm:py-16 px-5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cercles en arrière-plan (Plus subtils pour le thème clair) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[30%] -left-[10%] h-125 w-125 rounded-full bg-purple-100/50 blur-[100px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-125 w-125 rounded-full bg-blue-100/50 blur-[100px]" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 sm:gap-12 mb-10 sm:mb-12">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-start max-w-3xl">
            {logo && (
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 shrink-0">
                <Image
                  src={logoUrl}
                  alt={''}
                  fill
                  sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 112px"
                  className="object-contain object-top-left"
                />
              </div>
            )}
            <div className="space-y-6 pt-0 sm:pt-2 max-w-sm">
              <div className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Une agence dédiée à l&apos;excellence digitale et à la performance mesurable.
              </div>
              <div>
                <h4 className="font-(--font-marcellus) text-base sm:text-lg mb-3 text-[#0F172A]">
                  Restez informé
                </h4>
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="font-(--font-marcellus) text-base sm:text-lg mb-3 sm:mb-4 text-[#0F172A] uppercase tracking-wider">
                Menu
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600 font-medium">
                {renderLinks(navItems || [])}
              </ul>
            </div>
            <div>
              <h3 className="font-(--font-marcellus) text-base sm:text-lg mb-3 sm:mb-4 text-[#0F172A] uppercase tracking-wider">
                Légal
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-500">
                {renderLinks(legalLinks || [])}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] font-medium text-center md:text-left">
            © {new Date().getFullYear()} Aureus Agency. Tous droits réservés.
          </div>
          {socialLinks?.length ? (
            <ul className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4">
              {renderSocialIcons(socialLinks)}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
