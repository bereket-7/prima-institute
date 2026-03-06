import { Link } from 'react-router-dom'
import { Clock, BookOpen, Star } from 'lucide-react'
import { CATEGORY_COLORS, CATEGORY_LABELS, formatPrice } from '../../utils/helpers'

export default function CourseCard({ course, onEnroll }) {
  const colorScheme = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.culinary

  return (
    <article className="bg-white group card-hover flex flex-col overflow-hidden border border-prima-blush/60">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge */}
        {course.badge && (
          <span className="absolute top-3 left-3 bg-prima-gold text-prima-charcoal text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
            {course.badge}
          </span>
        )}
        {/* Category */}
        <span className={`absolute top-3 right-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 ${colorScheme.bg} ${colorScheme.text}`}>
          {CATEGORY_LABELS[course.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-prima-muted text-xs font-body tracking-wide mb-1.5">{course.level}</p>
          <h3 className="font-display text-xl font-semibold text-prima-charcoal leading-snug group-hover:text-prima-gold transition-colors">
            {course.title}
          </h3>
        </div>

        <p className="text-prima-muted text-sm font-body leading-relaxed mb-4 flex-1">
          {course.description.length > 100
            ? course.description.slice(0, 100) + '…'
            : course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5 text-prima-muted text-xs font-body">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-prima-gold" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={13} className="text-prima-gold" />
            {course.sessions} sessions
          </span>
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-prima-blush">
          <div>
            <span className="font-display text-2xl font-semibold text-prima-charcoal">
              {formatPrice(course.price)}
            </span>
            <span className="text-prima-muted text-xs font-body ml-1">total</span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/courses/${course.slug}`}
              className="btn-outline text-xs py-2 px-4"
            >
              Details
            </Link>
            <button
              onClick={() => onEnroll && onEnroll(course)}
              className="btn-primary text-xs py-2 px-4"
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
