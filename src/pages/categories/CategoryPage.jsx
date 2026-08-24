import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import categories from '../../data/categories.json'
import courses from '../../data/courses.json'
import CourseCard from '../../components/ui/CourseCard'
import SectionHeader from '../../components/ui/SectionHeader'

export default function CategoryPage() {
  const { slug } = useParams()
  const { t } = useTranslation()

  const category = categories.find((c) => c.slug === slug)
  if (!category) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl mb-4">{t('categoryPage.notFound')}</p>
        <Link to="/courses" className="btn-primary">{t('categoryPage.browseAll')}</Link>
      </div>
    </div>
  )

  const categoryCourses = courses.filter((c) => c.category === category.id)
  const instructorLabel = category.stats.instructors > 1
    ? t('categoryPage.expertInstructor_other')
    : t('categoryPage.expertInstructor_one')

  return (
    <>
      <div className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={category.image} alt={category.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/90 via-prima-charcoal/40 to-transparent" />
        </div>
        <div className="relative z-10 container-prima pt-32">
          <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-4 block">{t('categoryPage.discipline')}</span>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-3">{category.label}</h1>
          <p className="font-accent text-prima-gold-light text-2xl italic mb-6">{category.headline}</p>
          <p className="text-white/70 font-body max-w-xl mb-8">{category.description}</p>
          <div className="flex flex-wrap gap-6 text-white/60 text-sm font-body">
            <span>{category.stats.courses} {t('common.courses')}</span>
            <span>·</span>
            <span>{category.stats.students}+ {t('categoryPage.studentsEnrolled')}</span>
            <span>·</span>
            <span>{category.stats.instructors} {instructorLabel}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow={t('categoryPage.enrollToday')}
            title={t('categoryPage.coursesTitle', { label: category.label })}
            subtitle={t('categoryPage.coursesSubtitle', { count: categoryCourses.length })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-prima-cream py-16">
        <div className="container-prima text-center">
          <p className="font-accent text-prima-gold italic text-xl mb-3">{t('categoryPage.ctaQuestion')}</p>
          <h2 className="font-display text-3xl font-semibold text-prima-charcoal mb-6">
            {t('categoryPage.ctaTitle')}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">{t('categoryPage.bookConsultation')} <ArrowRight size={16} /></Link>
            <Link to="/courses" className="btn-outline">{t('categoryPage.viewAllCourses')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
