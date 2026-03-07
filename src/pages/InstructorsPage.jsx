import { Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import instructors from '../data/instructors.json'
import courses from '../data/courses.json'
import SectionHeader from '../components/ui/SectionHeader'

export default function InstructorsPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">{t('instructors.eyebrow')}</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('instructors.title')}</h1>
          <p className="text-white/60 font-body max-w-xl">
            {t('instructors.subtitle')}
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => {
              const instructorCourses = courses.filter((c) => instructor.courses.includes(c.id))
              return (
                <div key={instructor.id} className="bg-white border border-prima-blush group card-hover">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white">{instructor.name}</h3>
                        <p className="text-prima-gold text-xs font-body">{instructor.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={instructor.social.instagram} className="w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-prima-gold hover:text-prima-charcoal transition-all">
                          <Instagram size={14} />
                        </a>
                        <a href={instructor.social.linkedin} className="w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-prima-gold hover:text-prima-charcoal transition-all">
                          <Linkedin size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-prima-muted text-sm font-body leading-relaxed mb-5">
                      {instructor.bio.slice(0, 160)}…
                    </p>
                    <div className="mb-5">
                      <p className="text-prima-charcoal text-xs font-semibold tracking-widest uppercase mb-2">{t('instructors.specialties')}</p>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specialties.map((s) => (
                          <span key={s} className="bg-prima-cream text-prima-charcoal text-[10px] font-body px-2.5 py-1">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-prima-charcoal text-xs font-semibold tracking-widest uppercase mb-2">{t('instructors.teaching')}</p>
                      <div className="space-y-1.5">
                        {instructorCourses.map((c) => (
                          <Link
                            key={c.id}
                            to={`/courses/${c.slug}`}
                            className="flex items-center gap-2 text-xs font-body text-prima-muted hover:text-prima-gold transition-colors"
                          >
                            <span className="w-1 h-1 bg-prima-gold rounded-full" />
                            {c.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
