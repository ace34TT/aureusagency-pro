import React from 'react'
import type { VisualShowcaseBlock as VisualShowcaseBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import { Media } from '@/components/Media'
import { theme } from '@/utilities/theme'

export const VisualShowcaseBlock: React.FC<VisualShowcaseBlockProps> = ({
  type,
  images,
  threejsUrl,
}) => {
  return (
    <BlockWrapper className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        <div className="absolute -top-24 left-[10%] h-56 w-56 rounded-full bg-[#9AD5CA]/35 blur-[120px]" />
        <div className="absolute -bottom-20 right-[8%] h-64 w-64 rounded-full bg-[#F6B3A7]/30 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto">
        {type === 'images' && images && images.length > 0 && (
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5">
              {images.map((item, idx) => {
                const { image, caption } = item
                return (
                  <div
                    key={idx}
                    className="group relative w-[85%] sm:w-[70%] lg:w-[55%] shrink-0 snap-center rounded-[28px] border border-[#0F172A]/10 bg-white/70 shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
                  >
                    {typeof image === 'object' && image !== null && (
                      <Media
                        resource={image}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        imgClassName="w-full h-auto object-cover"
                      />
                    )}
                    {caption && (
                      <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent p-6 pt-12">
                        <p className="text-white text-sm font-medium tracking-wide">{caption}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {type === 'threejs' && (
          <div className="w-full aspect-video rounded-4xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.2)] border border-[#0F172A]/20 bg-[#0F172A] relative flex items-center justify-center">
            {/* Simulation of Three.js canvas or embedding */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-linear-to-br from-[#0F172A]/60 to-[#1E2A44]/80">
              <span className="text-4xl mb-4">🧊</span>
              <h3 className="text-2xl font-(--font-marcellus) text-white mb-2">
                Interactive 3D Experience
              </h3>
              <p className={`max-w-md text-sm ${theme.inkMuted} text-white/70`}>
                En production, ce composant chargera le modèle Three.js défini :{' '}
                <code className="text-pink-400 bg-black/40 px-2 py-1 rounded">
                  {threejsUrl || 'Aucune URL fournie'}
                </code>
              </p>
            </div>
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}
