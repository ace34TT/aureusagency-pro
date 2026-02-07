import { theme } from '@/utilities/theme'
import RichText from '@/components/RichText'

type ServiceProps = {
  tagline?: string | null
  richHeadline?: any
  richDescription?: any
  services?: {
    title: string
    description: string
    id?: string
  }[]
}

const Services = ({ tagline, richHeadline, richDescription, services }: ServiceProps) => {
  return (
    <section className={`relative px-6 py-24 overflow-hidden`}>
      {/* Cercles en arrière-plan (Coherents avec le reste du site) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-[5%] h-125 w-125 rounded-full bg-purple-50/50 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] h-125 w-125 rounded-full bg-blue-50/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>
              {tagline || 'Services'}
            </p>

            <div className="mt-4 text-3xl font-(--font-marcellus) text-[#0F172A] md:text-4xl">
              {richHeadline && <RichText data={richHeadline} enableGutter={false} />}
            </div>
            <div className={`mt-4 text-base ${theme.inkMuted}`}>
              {richDescription && <RichText data={richDescription} enableGutter={false} />}
            </div>

            <div className="mt-8 flex flex-col gap-4 text-sm uppercase tracking-[0.3em] text-[#0F172A]/60">
              <span>Design sur mesure</span>
              <span>Architecture rapide</span>
              <span>SEO propre</span>
              <span>Mesure des leads</span>
            </div>
          </div>

          <div className="grid gap-5">
            {(services || []).map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-start gap-6 rounded-3xl border border-[#0F172A]/10 bg-white/80 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold font-(--font-marcellus) text-primary">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                  <div className={`mt-2 text-sm ${theme.inkMuted}`}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
