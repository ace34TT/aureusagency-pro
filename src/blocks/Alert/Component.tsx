import React from 'react'
import type { AlertBlock as AlertBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { theme } from '@/utilities/theme'

export const AlertBlock: React.FC<AlertBlockProps> = ({ type, title, content }) => {
  const styles = {
    info: 'bg-white/80 text-[#0F172A] border-[#0F172A]/10',
    warning:
      'bg-white/80 text-[#0F172A] border-[#0F172A]/10',
    success:
      'bg-white/80 text-[#0F172A] border-[#0F172A]/10',
    expert:
      'bg-white/80 text-[#0F172A] border-[#0F172A]/10',
  }

  const icons = {
    info: <Info className="h-5 w-5 text-[#1B9AAA]" />,
    warning: <AlertTriangle className="h-5 w-5 text-[#F6B3A7]" />,
    success: <CheckCircle2 className="h-5 w-5 text-[#9AD5CA]" />,
    expert: <Lightbulb className="h-5 w-5 text-[#0F172A]" />,
  }

  const accent = {
    info: 'from-[#9AD5CA]/30',
    warning: 'from-[#F6B3A7]/30',
    success: 'from-[#9AD5CA]/35',
    expert: 'from-[#0F172A]/10',
  }

  return (
    <BlockWrapper className="relative pt-0 md:pt-0 lg:pt-0">
      <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        <div className="absolute -top-10 left-[20%] h-36 w-36 rounded-full bg-[#9AD5CA]/30 blur-[90px]" />
        <div className="absolute -bottom-10 right-[18%] h-40 w-40 rounded-full bg-[#F6B3A7]/25 blur-[100px]" />
      </div>

      <div
        className={cn(
          'relative z-10 border p-7 rounded-3xl flex gap-4 items-start max-w-4xl mx-auto shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm',
          styles[type],
        )}
      >
        <div
          className={cn(
            'mt-0.5 shrink-0 h-10 w-10 rounded-2xl border border-[#0F172A]/10 bg-white/80 flex items-center justify-center',
            accent[type],
          )}
        >
          {icons[type]}
        </div>
        <div>
          {title && <h4 className="font-(--font-marcellus) text-lg mb-2">{title}</h4>}
          <div className={`prose max-w-none text-sm md:text-base ${theme.inkMuted}`}>
            <RichText data={content} enableGutter={false} />
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
