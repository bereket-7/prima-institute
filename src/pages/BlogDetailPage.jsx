import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'
import posts from '../data/blog-posts.json'
import { getCategoryLabelT } from '../utils/helpers'

const CATEGORY_ACCENT = {
  culinary:        'bg-amber-100 text-amber-800',
  'food-drinks':   'bg-orange-100 text-orange-800',
  'beauty-makeup': 'bg-pink-100 text-pink-800',
  fashion:         'bg-slate-100 text-slate-800',
  computer:        'bg-blue-100 text-blue-800',
}

function AuthorAvatar({ name }) {
  const initials = name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className="w-12 h-12 rounded-full bg-prima-gold flex items-center justify-center shrink-0">
      <span className="text-prima-charcoal text-sm font-display font-bold tracking-wider">{initials}</span>
    </div>
  )
}

function renderContent(blocks) {
  return blocks.map((block, i) => {
    if (block.type === 'heading') {
      return (
        <h2 key={i} className="font-display text-xl lg:text-2xl font-bold text-prima-charcoal mt-10 mb-4 pb-2 border-b border-prima-blush">
          {block.text}
        </h2>
      )
    }
    return (
      <p key={i} className="text-prima-charcoal/80 font-body text-base leading-relaxed mb-5">
        {block.text}
      </p>
    )
  })
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-prima-ivory pt-28">
        <p className="font-display text-2xl text-prima-charcoal mb-4">{t('blogDetail.notFound')}</p>
        <Link to="/blog" className="btn-primary">{t('blogDetail.backToBlog')}</Link>
      </div>
    )
  }

  // Related posts — same category, excluding current
  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2)

  return (
    <>
      {/* Hero image */}
      <div className="relative h-[45vh] lg:h-[55vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/80 via-prima-charcoal/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 lg:left-12 flex items-center gap-2 text-white/80 hover:text-white text-sm font-body transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('blogDetail.back')}
        </button>

        {/* Category badge */}
        <div className="absolute bottom-8 left-6 lg:left-12">
          <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${CATEGORY_ACCENT[post.category] || 'bg-gray-100 text-gray-800'}`}>
            {getCategoryLabelT(t, post.category)}
          </span>
        </div>
      </div>

      {/* Article */}
      <div className="bg-prima-ivory py-12 lg:py-16">
        <div className="container-prima">
          <div className="max-w-3xl mx-auto">

            {/* Title */}
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-prima-charcoal leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-prima-blush">
              <div className="flex items-center gap-3">
                <AuthorAvatar name={post.author.name} />
                <div>
                  <p className="font-semibold text-prima-charcoal font-body text-sm">{post.author.name}</p>
                  <p className="text-prima-muted text-xs font-body">{post.author.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-prima-muted text-xs font-body ml-auto">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> {post.readTime} {t('blogDetail.readTime')}
                </span>
                <span className="w-1 h-1 rounded-full bg-prima-blush" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
            </div>

            {/* Excerpt / Lead */}
            <p className="text-prima-charcoal/70 text-lg font-body leading-relaxed mb-8 italic border-l-4 border-prima-gold pl-5">
              {post.excerpt}
            </p>

            {/* Body content */}
            <div className="prose-custom">
              {post.content ? renderContent(post.content) : (
                <p className="text-prima-muted font-body">{t('blogDetail.comingSoon')}</p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-prima-blush">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-prima-blush text-prima-muted text-xs font-body rounded-full hover:border-prima-gold hover:text-prima-gold transition-colors cursor-default">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-accent text-prima-gold text-xs tracking-widest uppercase">{t('blogDetail.moreFromCategory')}</span>
                <div className="flex-1 h-px bg-prima-blush" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.slug}`}
                    className="group flex gap-4 bg-white border border-prima-blush rounded-xl p-4 hover:border-prima-gold hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-20 h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex flex-col justify-between min-w-0">
                      <p className="font-display text-sm font-semibold text-prima-charcoal group-hover:text-prima-gold transition-colors line-clamp-2 leading-snug">
                        {r.title}
                      </p>
                      <span className="text-prima-gold text-xs font-semibold flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                        {t('blogDetail.readLink')} <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <Link to="/blog" className="btn-outline inline-flex items-center gap-2">
              <ArrowLeft size={15} /> {t('blogDetail.backToAll')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
