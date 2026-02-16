import { theme } from '@/utilities/theme'
import RichText from '@/components/RichText'

type WorkShowcaseProps = {
  tagline?: string | null
  richHeadline?: any
  richDescription?: any
  projects?: {
    name: string
    result: string
    summary: string
    link?: string
    id?: string
  }[]
}

const WorkShowcase = ({ tagline, richHeadline, richDescription, projects }: WorkShowcaseProps) => {
  return (
    <section id="work" className={`relative px-6 py-24 overflow-hidden`}>
      {/* Cercles en arrière-plan (Coherents avec le reste du site) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[10%] h-125 w-125 rounded-full bg-amber-50/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto container z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>
              {tagline || 'Etudes rapides'}
            </p>
            <div className="mt-4 text-3xl md:text-4xl font-(--font-marcellus) text-[#0F172A] leading-tight">
              {richHeadline && <RichText data={richHeadline} enableGutter={false} />}
            </div>
          </div>
          <div className={`max-w-md text-sm ${theme.inkMuted}`}>
            {richDescription && <RichText data={richDescription} enableGutter={false} />}
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(projects || []).map((item, index) => (
            <div
              key={item.id || index}
              className="group relative overflow-hidden rounded-[28px] border border-[#0F172A]/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)]"
            >
              <div className="relative z-10">
                <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-[#9AD5CA]/30 blur-2xl transition group-hover:scale-110" />
                <p className="text-xs uppercase tracking-[0.3em] text-[#0F172A]/60">{item.name}</p>
                <p className="mt-4 text-2xl font-semibold text-[#0F172A]">{item.result}</p>
                <div className={`mt-3 text-sm ${theme.inkMuted}`}>{item.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkShowcase
