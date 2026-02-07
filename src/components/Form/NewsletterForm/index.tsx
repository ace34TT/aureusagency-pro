'use client'

import React from 'react'

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
        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 outline-none focus:border-primary/50 transition-all placeholder:text-slate-400"
        required
      />
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.15em] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
        style={{ backgroundColor: 'oklch(59.73% 0.224 279.77deg)', color: 'white' }}
      >
        S&apos;abonner
      </button>
    </form>
  )
}
