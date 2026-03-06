import { Link } from 'react-router-dom'
import { ArrowRight, ChefHat, Coffee, Sparkles, Scissors, Award, Users, BookOpen, Star } from 'lucide-react'
import courses from '../data/courses.json'
import categories from '../data/categories.json'
import testimonials from '../data/testimonials.json'
import CourseCard from '../components/ui/CourseCard'
import SectionHeader from '../components/ui/SectionHeader'
import { useStore } from '../store/useStore'

const STATS = [
  { value: '1,000+', label: 'Graduates', icon: Users },
  { value: '14', label: 'Courses Offered', icon: BookOpen },
  { value: '6', label: 'Expert Instructors', icon: Award },
  { value: '4.9', label: 'Average Rating', icon: Star },
]

const CATEGORY_ICONS = { culinary: ChefHat, 'food-drinks': Coffee, 'beauty-makeup': Sparkles, fashion: Scissors }

export default function HomePage() {
  const { openEnrollModal } = useStore()
  const featured = courses.filter((c) => c.featured)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-prima-charcoal/90 via-prima-charcoal/70 to-prima-charcoal/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container-prima pt-24">
          <div className="max-w-2xl">
            <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-6 block animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Welcome to Prima Institute
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none mb-6 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Where Passion<br />
              <em className="font-accent text-prima-gold-light not-italic">Becomes Craft</em>
            </h1>
            <p className="text-white/75 text-lg lg:text-xl font-body leading-relaxed mb-10 max-w-lg animate-fade-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
              Professional training in Culinary Arts, Food & Drinks, Beauty & Makeup, and Fashion Design — taught by world-class practitioners.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
              <Link to="/courses" className="btn-primary">
                Explore Courses <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-outline-gold">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-body">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-prima-gold to-transparent" />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className="bg-prima-charcoal">
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
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow="What We Teach"
            title="Four Creative Disciplines"
            subtitle="Each programme is built on industry knowledge, hands-on practice, and mentorship from active professionals."
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
                      <span>{cat.stats.courses} courses</span>
                      <span>·</span>
                      <span>{cat.stats.students}+ students</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-prima-gold text-xs font-semibold tracking-wider uppercase group-hover:gap-4 transition-all">
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ──────────────────────────────────────── */}
      <section className="section-padding bg-prima-cream">
        <div className="container-prima">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              eyebrow="Start Learning"
              title="Featured Courses"
              align="left"
            />
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-sm text-prima-gold font-semibold tracking-wide hover:gap-4 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={openEnrollModal} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="btn-outline">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* ── Why Prima ─────────────────────────────────────────────── */}
      <section className="section-padding bg-prima-charcoal overflow-hidden">
        <div className="container-prima">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Why Prima"
                title="Learning That Transforms Careers"
                subtitle="We don't just teach skills — we build professionals. Every course is designed with industry outcomes in mind."
                align="left"
                light
              />
              <ul className="space-y-6">
                {[
                  { title: 'World-Class Instructors', desc: 'Learn directly from Michelin-starred chefs, award-winning artists, and working fashion designers.' },
                  { title: 'Hands-On Curriculum', desc: 'At least 70% of every course is practical. We believe you learn by doing, not just listening.' },
                  { title: 'Industry Connections', desc: 'Our graduate network opens doors. We actively connect students with internships and job opportunities.' },
                  { title: 'Small Class Sizes', desc: 'Maximum 12 students per cohort ensures personalized attention and direct instructor feedback.' },
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
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=400&q=80" alt="" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80" alt="" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="space-y-4 mt-8">
                <img src="https://images.unsplash.com/photo-1558171813-8ef45e8b02dc?w=400&q=80" alt="" className="w-full aspect-[4/3] object-cover" />
                <img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&q=80" alt="" className="w-full aspect-square object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <SectionHeader
            eyebrow="Student Stories"
            title="Transformations That Speak"
            subtitle="Our graduates don't just find jobs — they build careers, launch businesses, and define industries."
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
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-prima-charcoal/80" />
        </div>
        <div className="relative z-10 container-prima text-center">
          <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-4 block">Your Journey Starts Here</span>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Ready to Begin<br />
            <em className="font-accent not-italic text-prima-gold-light">Your Transformation?</em>
          </h2>
          <p className="text-white/70 text-lg font-body max-w-lg mx-auto mb-10">
            Applications for our upcoming cohorts are now open. Seats are limited to 12 students per class.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/enroll" className="btn-primary py-4 px-8">
              Apply Now — It's Free <ArrowRight size={16} />
            </Link>
            <Link to="/courses" className="btn-outline-gold py-4 px-8">
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
