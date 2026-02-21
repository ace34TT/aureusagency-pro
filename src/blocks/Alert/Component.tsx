import React from 'react'
import type { AlertBlock as AlertBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const AlertBlock: React.FC<AlertBlockProps> = ({ type, title, content }) => {
  const styles = {
    info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/30 dark:text-blue-200 dark:border-blue-900',
    warning:
      'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-200 dark:border-yellow-900',
    success:
      'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/30 dark:text-green-200 dark:border-green-900',
    expert:
      'bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-950/30 dark:text-purple-200 dark:border-purple-900',
  }

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    expert: <Lightbulb className="h-5 w-5 text-purple-500" />,
  }

  return (
    <BlockWrapper className="container my-8">
      <div
        className={cn(
          'border p-6 rounded-lg flex gap-4 items-start max-w-4xl mx-auto',
          styles[type],
        )}
      >
        <div className="mt-1 flex-shrink-0">{icons[type]}</div>
        <div>
          {title && <h4 className="font-semibold text-lg mb-2">{title}</h4>}
          <div className="prose dark:prose-invert max-w-none text-current opacity-90 marker:text-current">
            <RichText data={content} enableGutter={false} />
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
