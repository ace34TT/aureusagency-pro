import { theme } from '@/utilities/theme'

const Proof = () => {
  return (
    <section className={`relative px-6 py-24 ${theme.page}`}>
      <div className="relative mx-auto container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-[#0F172A]/10 bg-white/80 p-10 shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
            <p className={`text-xs uppercase tracking-[0.35em] ${theme.inkSoft}`}>Preuves</p>
            <h2 className="mt-4 text-3xl font-(--font-marcellus) text-[#0F172A] md:text-4xl">
              Des resultats concrets sur la prise de contact.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { label: 'Taux de clic', value: '+62%' },
                { label: 'Demandes email', value: 'x3.1' },
                { label: 'Temps moyen', value: '-38%' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-[#F5F2EB] p-5 text-center">
                  <p className="text-2xl font-semibold text-[#0F172A]">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#0F172A]/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-[30px] border border-[#0F172A]/10 bg-[#0F172A] p-8 text-[#F5F2EB]">
            <p className="text-xs uppercase tracking-[0.35em] text-[#F5F2EB]/70">Temoignage</p>
            <p className="text-lg leading-relaxed">
              &#34;On a recu des demandes qualifiees des la premiere semaine. La page est claire,
              rapide et facile a partager.&#34;
            </p>
            <div>
              <p className="text-sm font-semibold">Lina B.</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#F5F2EB]/60">
                Cabinet conseil
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proof
