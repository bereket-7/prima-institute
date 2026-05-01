import { Link } from 'react-router-dom'
import { ArrowRight, ChefHat, Coffee, Sparkles, Scissors, Monitor, Award, Users, BookOpen, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import courses from '../data/courses.json'
import categories from '../data/categories.json'
import testimonials from '../data/testimonials.json'
import CourseCard from '../components/ui/CourseCard'
import SectionHeader from '../components/ui/SectionHeader'
import { useStore } from '../store/useStore'

const CATEGORY_ICONS = { culinary: ChefHat, 'food-drinks': Coffee, 'beauty-makeup': Sparkles, fashion: Scissors, computer: Monitor }

export default function HomePage() {
  const { t } = useTranslation()
  const { openEnrollModal } = useStore()
  const featured = courses.filter((c) => c.featured)

  const STATS = [
    { value: '2,000+', label: t('stats.graduates'), icon: Users },
    { value: '25', label: t('stats.courses'), icon: BookOpen },
    { value: '10', label: t('stats.instructors'), icon: Award },
    { value: '5.0', label: t('stats.rating'), icon: Star },
  ]

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero/photo_2026-05-01_07-30-41.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-prima-charcoal/90 via-prima-charcoal/70 to-prima-charcoal/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container-prima pt-24">
          <div className="max-w-2xl">
            <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-6 block animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              {t('hero.welcome')}
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none mb-6 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              {t('hero.title')}<br />
              <em className="font-accent text-prima-gold-light not-italic">{t('hero.titleAccent')}</em>
            </h1>
            <p className="text-white/75 text-lg lg:text-xl font-body leading-relaxed mb-10 max-w-lg animate-fade-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
              <Link to="/courses" className="btn-primary">
                {t('hero.exploreCourses')} <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-outline-gold">
                {t('hero.ourStory')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-body">{t('hero.scroll')}</span>
          <div className="w-px h-8 bg-gradient-to-b from-prima-gold to-transparent" />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className="bg-prima-charcoal dark:bg-prima-charcoal">
        <div className="container-prima">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-prima-charcoal-soft">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <Icon size={20} className="text-prima-gold mb-3" />
                <span className="font-display text-3xl lg:text-4xl font-bold text-white mb-1">{value}</span>
                <span className="text-prima-muted text-xs tracking-widest uppercase font-body">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disciplines / Categories ──────────────────────────────── */}
      <section className="section-padding bg-prima-ivory dark:bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow={t('categories.eyebrow')}
            title={t('categories.title')}
            subtitle={t('categories.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id]
              return (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="group relative overflow-hidden block"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/85 via-prima-charcoal/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Icon size={20} className="text-prima-gold mb-2" />
                    <h3 className="font-display text-xl font-semibold text-white mb-1">{cat.label}</h3>
                    <p className="font-accent text-prima-gold-light text-sm italic">{cat.headline}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-white/60 text-xs font-body">
                      <span>{cat.stats.courses} {t('common.courses')}</span>
                      <span>·</span>
                      <span>{cat.stats.students}+ {t('common.students')}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-prima-gold text-xs font-semibold tracking-wider uppercase group-hover:gap-4 transition-all">
                      {t('categories.explore')} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ──────────────────────────────────────── */}
      <section className="section-padding bg-prima-cream dark:bg-prima-cream">
        <div className="container-prima">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              eyebrow={t('featured.eyebrow')}
              title={t('featured.title')}
              align="left"
            />
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-sm text-prima-gold font-semibold tracking-wide hover:gap-4 transition-all">
              {t('featured.viewAll')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={openEnrollModal} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="btn-outline">{t('featured.viewAll')} {t('nav.courses')}</Link>
          </div>
        </div>
      </section>

      {/* ── Why Prima ─────────────────────────────────────────────── */}
      <section className="section-padding bg-prima-charcoal dark:bg-prima-charcoal overflow-hidden">
        <div className="container-prima">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow={t('whyPrima.eyebrow')}
                title={t('whyPrima.title')}
                subtitle={t('whyPrima.subtitle')}
                align="left"
                light
              />
              <ul className="space-y-6">
                {[
                  { title: t('whyPrima.point1Title'), desc: t('whyPrima.point1Desc') },
                  { title: t('whyPrima.point2Title'), desc: t('whyPrima.point2Desc') },
                  { title: t('whyPrima.point3Title'), desc: t('whyPrima.point3Desc') },
                  { title: t('whyPrima.point4Title'), desc: t('whyPrima.point4Desc') },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="w-2 h-2 bg-prima-gold rounded-full mt-2 shrink-0" />
                    <div>
                      <h4 className="font-display text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-prima-muted text-sm font-body leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-outline-gold mt-10 inline-flex">
                {t('whyPrima.learnMore')} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="/assets/images/about/photo_2026-04-06_11-17-38.jpg" alt="Culinary training" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
                <img src="/assets/images/courses/beauty-hair/photo_2026-04-06_16-17-22.jpg" alt="Beauty training" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
              </div>
              <div className="space-y-4">
                <img src="/assets/images/courses/fashion/photo_2026-04-06_16-16-01.jpg" alt="Fashion training" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
                <img src="/assets/images/about/photo_2026-04-06_11-17-44.jpg" alt="Bakery training" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className="section-padding bg-prima-ivory dark:bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow={t('testimonials.eyebrow')}
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.id} className="bg-white p-7 border border-prima-blush relative flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" className="text-prima-gold" />
                  ))}
                </div>
                <p className="text-prima-charcoal text-sm font-body leading-relaxed mb-6 flex-1 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-prima-blush">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-display text-sm font-semibold text-prima-charcoal">{t.name}</p>
                    <p className="text-prima-gold text-xs font-body">{t.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-prima-charcoal/80" />
        </div>
        <div className="relative z-10 container-prima text-center">
          <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-4 block">{t('cta.eyebrow')}</span>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 max-w-2xl mx-auto">
            {t('cta.title')}<br />
            <em className="font-accent not-italic text-prima-gold-light">{t('cta.titleAccent')}</em>
          </h2>
          <p className="text-white/70 text-lg font-body max-w-lg mx-auto mb-10">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/enroll" className="btn-primary py-4 px-8">
              {t('cta.applyNow')} <ArrowRight size={16} />
            </Link>
            <Link to="/courses" className="btn-outline-gold py-4 px-8">
              {t('cta.browseCourses')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
