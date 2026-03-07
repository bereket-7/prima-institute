import { useParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import categories from '../../data/categories.json'
import courses from '../../data/courses.json'
import CourseCard from '../../components/ui/CourseCard'
import SectionHeader from '../../components/ui/SectionHeader'
import { useStore } from '../../store/useStore'

export default function CategoryPage() {
  const { slug } = useParams()
  const { openEnrollModal } = useStore()

  const category = categories.find((c) => c.slug === slug)
  if (!category) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl mb-4">Category not found</p>
        <Link to="/courses" className="btn-primary">Browse All Courses</Link>
      </div>
    </div>
  )

  const categoryCourses = courses.filter((c) => c.category === category.id)

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={category.image} alt={category.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/90 via-prima-charcoal/40 to-transparent" />
        </div>
        <div className="relative z-10 container-prima pt-32">
          <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-4 block">Discipline</span>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-3">{category.label}</h1>
          <p className="font-accent text-prima-gold-light text-2xl italic mb-6">{category.headline}</p>
          <p className="text-white/70 font-body max-w-xl mb-8">{category.description}</p>
          <div className="flex flex-wrap gap-6 text-white/60 text-sm font-body">
            <span>{category.stats.courses} courses</span>
            <span>·</span>
            <span>{category.stats.students}+ students enrolled</span>
            <span>·</span>
            <span>{category.stats.instructors} expert instructor{category.stats.instructors > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Courses */}
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow="Enroll Today"
            title={`${category.label} Courses`}
            subtitle={`Choose from ${categoryCourses.length} professional programmes designed for real industry outcomes.`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={openEnrollModal} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-prima-cream py-16">
        <div className="container-prima text-center">
          <p className="font-accent text-prima-gold italic text-xl mb-3">Not sure which course is right for you?</p>
          <h2 className="font-display text-3xl font-semibold text-prima-charcoal mb-6">
            Talk to Our Admissions Team
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Book a Free Consultation <ArrowRight size={16} /></Link>
            <Link to="/courses" className="btn-outline">View All Courses</Link>
          </div>
        </div>
      </section>
    </>
  )
}
