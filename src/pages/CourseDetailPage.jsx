import { useParams, Link, useNavigate } from 'react-router-dom'
import { Clock, BookOpen, Users, CheckCircle, ChevronLeft, ArrowRight } from 'lucide-react'
import courses from '../data/courses.json'
import instructors from '../data/instructors.json'
import { getInstructor } from '../utils/helpers'
import { useStore } from '../store/useStore'

export default function CourseDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { openEnrollModal } = useStore()

  const course = courses.find((c) => c.slug === slug)
  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl mb-4">Course not found</p>
        <Link to="/courses" className="btn-primary">Back to Courses</Link>
      </div>
    </div>
  )

  const instructor = getInstructor(instructors, course.instructor)
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <div className="relative bg-prima-charcoal pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={course.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-prima-charcoal/60" />
        </div>
        <div className="relative z-10 container-prima pb-16">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body mb-8 transition-colors">
            <ChevronLeft size={16} /> Back
          </button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {course.badge && (
                <span className="bg-prima-gold text-prima-charcoal text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4 inline-block">
                  {course.badge}
                </span>
              )}
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">{course.title}</h1>
              <p className="font-accent text-prima-gold-light text-xl italic mb-6">{course.subtitle}</p>
              <p className="text-white/70 font-body leading-relaxed mb-8">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-white/70 text-sm font-body mb-8">
                <span className="flex items-center gap-2"><Clock size={14} className="text-prima-gold" />{course.duration}</span>
                <span className="flex items-center gap-2"><BookOpen size={14} className="text-prima-gold" />{course.sessions} sessions</span>
                <span className="flex items-center gap-2"><Users size={14} className="text-prima-gold" />Max 12 students</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => openEnrollModal(course)} className="btn-primary py-3 px-8">
                  Enroll Now <ArrowRight size={16} />
                </button>
                <Link to="/contact" className="btn-outline-gold py-3 px-8">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src={course.image} alt={course.title} className="w-full aspect-video object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-prima-ivory py-16">
        <div className="container-prima">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Syllabus */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-6">Course Syllabus</h2>
                <div className="space-y-3">
                  {course.syllabus.map((mod) => (
                    <div key={mod.module} className="flex items-start gap-4 p-4 bg-white border border-prima-blush">
                      <span className="w-8 h-8 bg-prima-gold text-prima-charcoal text-xs font-bold flex items-center justify-center shrink-0">
                        {String(mod.module).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <p className="font-display font-semibold text-prima-charcoal">{mod.title}</p>
                        <p className="text-prima-muted text-xs font-body">{mod.weeks} week{mod.weeks > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-6">What You'll Achieve</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3 p-4 bg-white border border-prima-blush">
                      <CheckCircle size={16} className="text-prima-gold mt-0.5 shrink-0" />
                      <p className="text-prima-charcoal text-sm font-body">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Instructor Card */}
              {instructor && (
                <div className="bg-white border border-prima-blush p-6">
                  <h3 className="font-display text-lg font-semibold text-prima-charcoal mb-5">Your Instructor</h3>
                  <div className="flex items-start gap-4 mb-4">
                    <img src={instructor.image} alt={instructor.name} className="w-16 h-16 object-cover" />
                    <div>
                      <p className="font-display font-semibold text-prima-charcoal">{instructor.name}</p>
                      <p className="text-prima-gold text-xs font-body">{instructor.title}</p>
                    </div>
                  </div>
                  <p className="text-prima-muted text-sm font-body leading-relaxed mb-4">{instructor.bio.slice(0, 150)}…</p>
                  <ul className="space-y-1">
                    {instructor.credentials.map((c) => (
                      <li key={c} className="text-xs text-prima-charcoal font-body flex items-center gap-2">
                        <span className="w-1 h-1 bg-prima-gold rounded-full" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Enroll CTA */}
              <div className="bg-prima-charcoal p-6 text-center">
                <p className="text-white/60 text-sm font-body mb-4">Ready to start your journey?</p>
                <button onClick={() => openEnrollModal(course)} className="btn-primary w-full justify-center mb-3">
                  Enroll in This Course
                </button>
                <Link to="/contact" className="btn-outline-gold w-full justify-center">
                  Contact for Details
                </Link>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-8">Related Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((c) => (
                  <div key={c.id} className="bg-white border border-prima-blush overflow-hidden card-hover">
                    <img src={c.image} alt={c.title} className="w-full aspect-video object-cover" />
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-prima-charcoal mb-2">{c.title}</h3>
                      <p className="text-prima-muted text-xs font-body mb-4">{c.duration} · {c.level}</p>
                      <Link to={`/courses/${c.slug}`} className="text-prima-gold text-xs font-semibold tracking-wide hover:gap-4 flex items-center gap-2 transition-all">
                        View Course <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
