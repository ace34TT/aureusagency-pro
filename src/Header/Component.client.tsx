'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, useCallback, useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { createPortal } from 'react-dom'
import { RiCloseLargeLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CMSLink } from '@/components/Link'

export type HeaderNavItems = NonNullable<Header['navItems']>
export type HeaderButtons = NonNullable<Header['buttons']>

interface HeaderClientProps {
  data: Header
}

const getPathSegment = (path: string) => path.split('/')[1] ?? ''

const MobileMenu: FC<{
  isOpen: boolean
  onClose: () => void
  menus: HeaderNavItems
  buttons?: HeaderButtons | null
  logoUrl: string
  activeSegment: string
}> = ({ isOpen, onClose, menus, buttons, logoUrl, activeSegment }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-9999 lg:hidden',
          'transition-all duration-300 ease-in-out',
          'w-full sm:w-96 border-l border-[#0F172A]/10 bg-[#F5F2EB] text-[#0F172A] shadow-[0_30px_80px_rgba(15,23,42,0.18)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#0F172A]/10">
            {logoUrl ? (
              <div className="relative w-12 h-12">
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={100}
                  height={24}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : null}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-[#0F172A] hover:text-[#0F172A]/70 transition-colors duration-300"
            >
              <RiCloseLargeLine size={24} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <div className="grow overflow-y-auto">
            <ul className="flex flex-col">
              {menus.map(({ link }) => {
                const href =
                  link.type === 'reference'
                    ? typeof link.reference?.value === 'object'
                      ? `/${link.reference.value.slug}`
                      : '#'
                    : (link.url ?? '#')
                const isActive = activeSegment === getPathSegment(href)

                return (
                  <li key={href} className="border-b border-[#0F172A]/10 last:border-b-0">
                    <Link
                      href={href}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'block px-6 py-4 text-base font-medium transition-colors duration-300',
                        isActive
                          ? 'font-bold text-[#0F172A] bg-[#0F172A]/5'
                          : 'text-[#0F172A]/70 hover:text-[#0F172A]',
                      )}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="p-6 border-t border-[#0F172A]/10">
            <div className="space-y-3">
              {buttons?.map((button) => (
                <div key={button.link.url ?? button.link.label} onClick={onClose}>
                  <CMSLink
                    {...button.link}
                    appearance={button.link.appearance || 'default'}
                    className="w-full justify-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0F172A]/35 z-9998 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
    </>,
    document.body,
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [localIsMenuOpen, setLocalIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const activeSegment = getPathSegment(pathname)
  const closeMenu = useCallback(() => setLocalIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setLocalIsMenuOpen((isOpen) => !isOpen), [])
  const { logo, navItems, buttons } = data
  const navMenus: HeaderNavItems = navItems ?? []
  const navButtons: HeaderButtons = buttons ?? []
  const logoUrl = typeof logo === 'string' ? logo : (logo?.url ?? '')

  useEffect(() => {
    // 1. Reset du thème lors du changement de page
    setHeaderTheme(null)

    // 2. Gestion du Scroll (Optimisée avec throttle ou simple toggle)
    const handleScroll = () => {
      const isCurrentlyScrolled = window.scrollY > 0
      // On n'Update l'état que si la valeur change vraiment
      setIsScrolled((prev) => (prev !== isCurrentlyScrolled ? isCurrentlyScrolled : prev))
    }

    // 3. Gestion du Resize (Fermeture menu)
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLocalIsMenuOpen(false)
      }
    }

    // Ajout des listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    // Exécution immédiate au montage
    handleScroll()
    handleResize()

    // Nettoyage unique
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname]) // Se relance uniquement au changement de page

  // Gestion séparée du thème pour éviter les boucles infinies
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
  }, [headerTheme, theme])

  const renderNavItems = (items: HeaderNavItems, isScrolled: boolean) =>
    items.map(({ link }, index) => {
      // 1. On détermine l'URL correcte
      const href =
        link.type === 'reference'
          ? typeof link.reference?.value === 'object'
            ? `/${link.reference.value.slug}`
            : '#'
          : (link.url ?? '#')

      return (
        <li key={link.label + index} className="relative">
          <Link
            href={href}
            target={link.newTab ? '_blank' : undefined}
            rel={link.newTab ? 'noopener noreferrer' : undefined}
            className={cn(
              'relative transition-all duration-300 px-4 py-2 inline-block hover:scale-105 animate-in group',
              activeSegment === getPathSegment(href) ? 'font-bold' : 'font-normal',
              isScrolled ? 'text-white hover:text-purple-100' : 'text-black hover:text-primary',
              'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-primary after:transition-all after:duration-300',
              activeSegment === getPathSegment(href)
                ? 'after:w-full'
                : 'after:w-0 hover:after:w-full',
            )}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        </li>
      )
    })

  return (
    <>
      <nav
        className={cn(
          'max-w-screen overflow-x-hidden h-20 md:h-20 lg:h-24 flex items-center fixed top-0 left-0 right-0 z-999 transition-all duration-300 ease-in-out font-[Roboto]',
          isScrolled ? 'bg-[#13233C80] border-white backdrop-blur-md' : '',
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-0">
          <div className="w-full flex items-center justify-between h-20 md:h-20 lg:h-24 relative">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center w-full">
              {/* Left Logo */}
              <div className="flex items-center w-16 h-16">
                <Link href="/" className="flex items-center w-full h-full">
                  <div className={cn('relative transition-all duration-200 ease-in-out')}>
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Logo"
                        width={200}
                        height={200}
                        className="object-contain w-full h-full"
                        priority
                      />
                    ) : null}
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center gap-24">
                <ul className="flex items-center space-x-8">
                  {renderNavItems(navMenus, isScrolled)}
                </ul>
                <div className="flex items-center gap-4">
                  {navButtons.map((button, i) => (
                    <CMSLink
                      key={i}
                      {...button.link}
                      appearance={button.link.appearance || 'default'}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Logo (visible only on mobile) */}
            <div className="flex lg:hidden left-0">
              <Link href="/" className="flex items-center">
                {logoUrl ? (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      width={200}
                      height={200}
                      className="object-contain w-full h-full"
                      priority
                    />
                  </div>
                ) : null}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              aria-label={localIsMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={localIsMenuOpen}
              className={cn(
                'mt-1 flex lg:hidden right-0 transition-colors duration-300 cursor-pointer md:mt-0',
                isScrolled ? 'text-white hover:text-blue-200' : 'text-[#0F172A] hover:text-primary',
              )}
            >
              {localIsMenuOpen ? (
                <RiCloseLargeLine size={30} aria-hidden="true" />
              ) : (
                <GiHamburgerMenu size={30} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={localIsMenuOpen}
        onClose={closeMenu}
        menus={navMenus}
        buttons={navButtons}
        logoUrl={logoUrl}
        activeSegment={activeSegment}
      />
    </>
  )
}
