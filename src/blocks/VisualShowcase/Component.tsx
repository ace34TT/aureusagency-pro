import React from 'react'
import type { VisualShowcaseBlock as VisualShowcaseBlockProps } from '@/payload-types'
import { BlockWrapper } from '@/components/BlockWrapper'
import { Media } from '@/components/Media'

export const VisualShowcaseBlock: React.FC<VisualShowcaseBlockProps> = ({
  type,
  images,
  threejsUrl,
}) => {
  return (
    <BlockWrapper className="w-full my-24 overflow-hidden bg-muted/20 py-16">
      <div className="container max-w-7xl mx-auto">
        {type === 'images' && images && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {images.map((item, idx) => {
              const { image, caption } = item
              return (
                <div
                  key={idx}
                  className={`w-full relative rounded-2xl overflow-hidden shadow-2xl ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}
                >
                  {typeof image === 'object' && image !== null && (
                    <Media
                      resource={image}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                      imgClassName="w-full h-auto object-cover"
                    />
                  )}
                  {caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-6 pt-12">
                      <p className="text-white text-sm font-medium tracking-wide">{caption}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {type === 'threejs' && (
          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative flex items-center justify-center">
            {/* Simulation of Three.js canvas or embedding */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-indigo-950/50 to-purple-950/50">
              <span className="text-4xl mb-4">🧊</span>
              <h3 className="text-2xl font-bold text-white mb-2">Interactive 3D Experience</h3>
              <p className="text-white/70 max-w-md">
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
