import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const BlogPagination: React.FC<{
  page: number
  totalPages: number
}> = ({ page, totalPages }) => {
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <Link
        href={`?page=${page - 1}`}
        className={`p-2 rounded-full border transition-all ${
          hasPrevPage
            ? 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5'
            : 'border-slate-100 text-slate-300 pointer-events-none'
        }`}
        aria-disabled={!hasPrevPage}
        scroll={false}
      >
        <ChevronLeft size={20} />
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-900">{page}</span>
        <span className="text-sm text-slate-400">/</span>
        <span className="text-sm text-slate-500">{totalPages}</span>
      </div>

      <Link
        href={`?page=${page + 1}`}
        className={`p-2 rounded-full border transition-all ${
          hasNextPage
            ? 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5'
            : 'border-slate-100 text-slate-300 pointer-events-none'
        }`}
        aria-disabled={!hasNextPage}
        scroll={false}
      >
        <ChevronRight size={20} />
      </Link>
    </div>
  )
}
