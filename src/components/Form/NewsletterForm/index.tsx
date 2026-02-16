'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

export const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ta logique d'envoi ici
    console.log('Inscription newsletter')
  }

  return (
    <form className="relative flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="votre@email.com"
        className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-6 text-sm text-slate-900 outline-none focus:border-primary/50 transition-all placeholder:text-slate-400 h-11"
        required
      />
      <Button
        type="submit"
        className="w-full shadow-sm bg-[oklch(59.73%_0.224_279.77deg)] hover:bg-[oklch(55%_0.224_279.77deg)] text-white"
        size="default"
      >
        S&apos;abonner
      </Button>
    </form>
  )
}
