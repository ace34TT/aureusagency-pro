'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Quote } from 'lucide-react'
import { theme } from '@/utilities/theme'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { BlockWrapper } from '@/components/BlockWrapper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

type TestimonialsProps = {
  tagline?: string | null
  richHeadline?: any
  richDescription?: any
  testimonials?: {
    quote: string
    authorName: string
    authorRole: string
    authorImage?: string | Media
    id?: string
  }[]
}

export const Testimonials = ({
  tagline,
  richHeadline,
  richDescription,
  testimonials,
}: TestimonialsProps) => {
  return (
    <BlockWrapper className="">
      {/* Masque de transition pour éviter le rude cut et fondre les bulles */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      />

      {/* Cercles en arrière-plan (Coherents avec Process et Hero) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-[5%] h-125 w-125 rounded-full bg-purple-50/50 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-125 w-125 rounded-full bg-blue-50/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-30">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge identique au Process */}
          <p className={`text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] ${theme.inkSoft}`}>
            {tagline || 'Témoignages'}
          </p>
          {/* Titre identique au Process (Marcellus) */}
          <div className="mt-4 text-2xl sm:text-3xl md:text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight">
            {richHeadline && <RichText data={richHeadline} enableGutter={false} />}
          </div>
          <div className={`mt-4 text-sm sm:text-base ${theme.inkMuted}`}>
            {richDescription && <RichText data={richDescription} enableGutter={false} />}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-16 max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] px-5 sm:px-6 py-8 sm:py-10 md:p-12 lg:p-16 border border-[#0F172A]/10 shadow-[0_20px_60px_rgba(15,23,42,0.1)] relative">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            className="testimonial-swiper pb-10! sm:pb-12! px-2 sm:px-4!"
          >
            {(testimonials || []).map((t, index) => (
              <SwiperSlide key={t.id || index}>
                <div className="flex flex-col items-center text-center cursor-grab">
                  {/* Icône Quote stylisée */}
                  <div className="mb-6 sm:mb-8 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-sm border border-primary/10">
                    <Quote size={24} className="sm:hidden" />
                    <Quote size={28} className="hidden sm:block" />
                  </div>

                  {/* Contenu */}
                  <div className="font-sans italic text-base sm:text-lg md:text-2xl leading-relaxed text-[#0F172A] max-w-3xl mx-auto">
                    &quot;{t.quote}&quot;
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <h4 className="text-base sm:text-lg font-semibold text-[#0F172A] tracking-tight">
                      {t.authorName}
                    </h4>
                    <p className="mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] font-bold text-primary">
                      {t.authorRole}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Style pour la pagination et la navigation customisée */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #6c63ff !important;
          width: 20px !important;
          border-radius: 4px !important;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          background: #0f172a;
        }

        /* Navigation Arrows Styling */
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #6c63ff !important; /* Primary color */
          transform: scale(0.6);
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .testimonial-swiper .swiper-button-next:hover,
        .testimonial-swiper .swiper-button-prev:hover {
          transform: scale(0.8);
          color: #4a43cb !important;
        }

        @media (max-width: 640px) {
          .testimonial-swiper .swiper-button-next,
          .testimonial-swiper .swiper-button-prev {
            display: none; /* Hide on small mobile to prevent overlap */
          }
        }
      `}</style>
    </BlockWrapper>
  )
}

export default Testimonials
