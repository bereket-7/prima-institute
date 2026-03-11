import { Award, BookOpen, Users, Target, Sparkles, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import courses from '../data/courses.json'
import categories from '../data/categories.json'

export default function InstructorsPage() {
  const { t } = useTranslation()
  
  const EXPERTISE_AREAS = [
    {
      category: 'culinary',
      icon: <Sparkles className="w-8 h-8" />,
      credentials: ['International Culinary Certifications', '15+ Years Industry Experience', 'Award-Winning Chefs'],
      highlights: ['Fine Dining Expertise', 'Traditional Ethiopian Cuisine', 'Modern Fusion Techniques']
    },
    {
      category: 'food-drinks',
      icon: <Award className="w-8 h-8" />,
      credentials: ['Certified Sommeliers & Baristas', 'International Competition Winners', 'Beverage Industry Veterans'],
      highlights: ['Coffee Roasting & Brewing', 'Mixology & Bartending', 'Wine & Spirits Knowledge']
    },
    {
      category: 'beauty-makeup',
      icon: <Target className="w-8 h-8" />,
      credentials: ['Licensed Cosmetologists', 'Celebrity Makeup Artists', 'Skincare Specialists'],
      highlights: ['Bridal & Special Events', 'Film & Fashion Makeup', 'Skincare & Aesthetics']
    },
    {
      category: 'fashion',
      icon: <GraduationCap className="w-8 h-8" />,
      credentials: ['Fashion Design Degrees', 'Runway Show Experience', 'Textile & Pattern Experts'],
      highlights: ['Traditional Ethiopian Fashion', 'Contemporary Design', 'Sustainable Fashion']
    },
    {
      category: 'computer',
      icon: <BookOpen className="w-8 h-8" />,
      credentials: ['IT Professionals', 'Software Development Experts', 'Digital Marketing Specialists'],
      highlights: ['Web Development', 'Graphic Design', 'Digital Marketing']
    }
  ]

  return (
    <>
      {/* Hero */}
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

      {/* Teaching Excellence Stats */}
      <section className="section-padding bg-prima-ivory dark:bg-prima-charcoal">
        <div className="container-prima">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20">
              <div className="text-4xl font-display font-bold text-prima-gold mb-2">10+</div>
              <div className="text-sm text-prima-muted dark:text-prima-muted uppercase tracking-wider">Expert Instructors</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20">
              <div className="text-4xl font-display font-bold text-prima-gold mb-2">50+</div>
              <div className="text-sm text-prima-muted dark:text-prima-muted uppercase tracking-wider">Years Combined</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20">
              <div className="text-4xl font-display font-bold text-prima-gold mb-2">2000+</div>
              <div className="text-sm text-prima-muted dark:text-prima-muted uppercase tracking-wider">Students Taught</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20">
              <div className="text-4xl font-display font-bold text-prima-gold mb-2">25</div>
              <div className="text-sm text-prima-muted dark:text-prima-muted uppercase tracking-wider">Courses Offered</div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="space-y-8">
            {EXPERTISE_AREAS.map((area) => {
              const category = categories.find(c => c.slug === area.category)
              const categoryCourses = courses.filter(c => c.category === area.category)
              
              return (
                <div key={area.category} className="bg-white dark:bg-prima-charcoal/50 border border-prima-blush dark:border-prima-blush/20 p-8 group hover:border-prima-gold dark:hover:border-prima-gold transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Icon & Category */}
                    <div className="lg:w-1/4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-prima-gold/10 text-prima-gold mb-4 group-hover:bg-prima-gold group-hover:text-prima-charcoal transition-all duration-300">
                        {area.icon}
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-prima-charcoal dark:text-prima-cream mb-2">
                        {category?.label}
                      </h3>
                      <p className="text-sm text-prima-muted dark:text-prima-muted">
                        {category?.description}
                      </p>
                    </div>

                    {/* Credentials */}
                    <div className="lg:w-1/3">
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-prima-charcoal dark:text-prima-cream mb-3">Instructor Credentials</h4>
                      <ul className="space-y-2">
                        {area.credentials.map((cred, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-prima-muted dark:text-prima-muted">
                            <Award className="w-4 h-4 text-prima-gold flex-shrink-0 mt-0.5" />
                            {cred}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlights & Courses */}
                    <div className="lg:w-1/3">
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-prima-charcoal dark:text-prima-cream mb-3">Teaching Specialties</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {area.highlights.map((highlight, idx) => (
                          <span key={idx} className="bg-prima-cream dark:bg-prima-charcoal text-prima-charcoal dark:text-prima-cream text-xs px-3 py-1 border border-prima-blush dark:border-prima-blush/20">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <Link 
                        to={`/categories/${area.category}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-prima-gold hover:text-prima-charcoal dark:hover:text-prima-cream transition-colors"
                      >
                        View {categoryCourses.length} Courses
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

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-prima-charcoal to-prima-charcoal/90">
        <div className="container-prima text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6">
            Learn from Industry Professionals
          </h2>
          <p className="text-white/70 font-body text-lg max-w-2xl mx-auto mb-8">
            Our instructors bring real-world experience and passion to every class. Start your journey with Prima Institute today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn-primary">
              Browse All Courses
            </Link>
            <Link to="/contact" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white hover:text-prima-charcoal">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
