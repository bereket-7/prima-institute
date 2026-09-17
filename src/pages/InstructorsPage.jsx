import { Award, BookOpen, Users, Target, Sparkles, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import courses from '../data/courses.json'
import categories from '../data/categories.json'
import { usePageMeta } from '../hooks/usePageMeta'
import { getCategoryLabelT } from '../utils/helpers'

const AREA_ICONS = {
  culinary: Sparkles,
  'food-drinks': Award,
  'beauty-makeup': Target,
  fashion: GraduationCap,
  computer: BookOpen,
}

const AREA_KEYS = ['culinary', 'food-drinks', 'beauty-makeup', 'fashion', 'computer']

export default function InstructorsPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('instructors.title'), description: t('instructors.subtitle') })

  const STATS = [
    { value: '10+', label: t('instructors.statInstructors') },
    { value: '50+', label: t('instructors.statYears') },
    { value: '2000+', label: t('instructors.statStudents') },
    { value: String(courses.length), label: t('instructors.statCourses') },
  ]

  return (
    <>
      <div className="relative bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal/90 pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container-prima relative">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-prima-gold" />
            <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase">{t('instructors.eyebrow')}</span>
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 max-w-3xl">
            {t('instructors.title')}
          </h1>
          <p className="text-white/70 font-body text-lg max-w-2xl leading-relaxed">
            {t('instructors.subtitle')}
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory dark:bg-prima-charcoal">
        <div className="container-prima">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20">
                <div className="text-4xl font-display font-bold text-prima-gold mb-2">{stat.value}</div>
                <div className="text-sm text-prima-muted dark:text-prima-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {AREA_KEYS.map((categorySlug) => {
              const category = categories.find((c) => c.slug === categorySlug)
              const categoryCourses = courses.filter((c) => c.category === categorySlug)
              const Icon = AREA_ICONS[categorySlug]
              const credentials = t(`instructors.areas.${categorySlug}.credentials`, { returnObjects: true })
              const highlights = t(`instructors.areas.${categorySlug}.highlights`, { returnObjects: true })

              return (
                <div key={categorySlug} className="bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20 p-8 group hover:border-prima-gold dark:hover:border-prima-gold transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-prima-gold/10 text-prima-gold mb-4 group-hover:bg-prima-gold group-hover:text-prima-charcoal transition-all duration-300">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-prima-charcoal dark:text-prima-cream mb-2">
                        {getCategoryLabelT(t, categorySlug) || category?.label}
                      </h3>
                      <p className="text-sm text-prima-muted dark:text-prima-muted">
                        {category?.description}
                      </p>
                    </div>

                    <div className="lg:w-1/3">
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-prima-charcoal dark:text-prima-cream mb-3">
                        {t('instructors.credentialsHeading')}
                      </h4>
                      <ul className="space-y-2">
                        {(Array.isArray(credentials) ? credentials : []).map((cred) => (
                          <li key={cred} className="flex items-start gap-2 text-sm text-prima-muted dark:text-prima-muted">
                            <Award className="w-4 h-4 text-prima-gold flex-shrink-0 mt-0.5" />
                            {cred}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:w-1/3">
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-prima-charcoal dark:text-prima-cream mb-3">
                        {t('instructors.specialtiesHeading')}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(highlights) ? highlights : []).map((highlight) => (
                          <span key={highlight} className="bg-prima-cream dark:bg-prima-charcoal text-prima-charcoal dark:text-prima-cream text-xs px-3 py-1 border border-prima-blush dark:border-prima-blush/20">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/categories/${categorySlug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-prima-gold hover:text-prima-charcoal dark:hover:text-prima-cream transition-colors"
                      >
                        {t('instructors.viewCourses', { count: categoryCourses.length })}
                        <span className="text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-prima-charcoal to-prima-charcoal/90">
        <div className="container-prima text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6">
            {t('instructors.ctaTitle')}
          </h2>
          <p className="text-white/70 font-body text-lg max-w-2xl mx-auto mb-8">
            {t('instructors.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn-primary">
              {t('instructors.ctaBrowse')}
            </Link>
            <Link to="/contact" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white hover:text-prima-charcoal">
              {t('instructors.ctaContact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
