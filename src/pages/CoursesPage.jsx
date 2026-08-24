import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, SlidersHorizontal } from 'lucide-react'
import courses from '../data/courses.json'
import CourseCard from '../components/ui/CourseCard'
import { getCategoryLabelT } from '../utils/helpers'

const CATEGORIES = ['all', 'culinary', 'food-drinks', 'beauty-makeup', 'fashion', 'computer']
const LEVELS = ['all', 'Beginner', 'Intermediate', 'Beginner to Advanced', 'Beginner to Intermediate']
const DURATIONS = ['all', 'Short (< 2 months)', 'Medium (2-4 months)', 'Long (5+ months)']

function matchDuration(course, filter) {
  if (filter === 'all') return true
  const months = parseInt(course.duration)
  const weeks = course.duration.toLowerCase().includes('week')
  const numWeeks = weeks ? parseInt(course.duration) : months * 4
  if (filter === 'Short (< 2 months)') return numWeeks < 8
  if (filter === 'Medium (2-4 months)') return numWeeks >= 8 && numWeeks <= 16
  if (filter === 'Long (5+ months)') return numWeeks > 16
  return true
}

export default function CoursesPage() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('all')
  const [duration, setDuration] = useState('all')

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase())
      const matchCat   = category === 'all' || c.category === category
      const matchLevel = level === 'all' || c.level === level
      const matchDur   = matchDuration(c, duration)
      return matchSearch && matchCat && matchLevel && matchDur
    })
  }, [search, category, level, duration])

  const filters = [
    { value: category, onChange: setCategory, options: CATEGORIES, label: t('coursesPage.filterCategory') },
    { value: level, onChange: setLevel, options: LEVELS, label: t('coursesPage.filterLevel') },
    { value: duration, onChange: setDuration, options: DURATIONS, label: t('coursesPage.filterDuration') },
  ]

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">{t('coursesPage.eyebrow')}</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('coursesPage.title')}</h1>
          <p className="text-white/60 font-body max-w-xl">{t('coursesPage.subtitle')}</p>
        </div>
      </div>

      <div className="bg-prima-ivory py-12">
        <div className="container-prima">
          <div className="bg-white border border-prima-blush p-6 mb-10 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-prima-muted" />
              <input
                type="text"
                placeholder={t('coursesPage.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-prima-blush text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-prima-ivory"
              />
            </div>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {filters.map(({ value, onChange, options, label }) => (
                <select
                  key={label}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="px-4 py-2.5 border border-prima-blush text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-prima-ivory text-prima-charcoal min-w-[140px]"
                >
                  <option value="all">{t('coursesPage.allFilter', { label })}</option>
                  {options.slice(1).map((o) => (
                    <option key={o} value={o}>
                      {CATEGORIES.includes(o) ? getCategoryLabelT(t, o) : o}
                    </option>
                  ))}
                </select>
              ))}
            </div>
            <SlidersHorizontal size={18} className="text-prima-muted hidden lg:block" />
          </div>

          <p className="text-prima-muted text-sm font-body mb-6">
            {t('coursesPage.showing')}{' '}
            <strong className="text-prima-charcoal">{filtered.length}</strong>{' '}
            {t(filtered.length === 1 ? 'coursesPage.course_one' : 'coursesPage.course_other')}
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-prima-charcoal mb-3">{t('coursesPage.noResults')}</p>
              <p className="text-prima-muted font-body text-sm">{t('coursesPage.noResultsHint')}</p>
              <button
                onClick={() => { setSearch(''); setCategory('all'); setLevel('all'); setDuration('all') }}
                className="btn-outline mt-6"
              >
                {t('coursesPage.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
