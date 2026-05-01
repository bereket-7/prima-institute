import { useState, useMemo } from 'react'
import { ArrowRight, Clock, Search, Tag, BookOpen } from 'lucide-react'
import posts from '../data/blog-posts.json'
import { CATEGORY_LABELS } from '../utils/helpers'

const CATEGORIES = [
  { value: 'all',           label: 'All Posts' },
  { value: 'culinary',      label: 'Culinary' },
  { value: 'food-drinks',   label: 'Bakery & Pastry' },
  { value: 'beauty-makeup', label: 'Beauty & Hair' },
  { value: 'fashion',       label: 'Fashion' },
  { value: 'computer',      label: 'Computer' },
]

const CATEGORY_ACCENT = {
  culinary:       'bg-amber-100 text-amber-800',
  'food-drinks':  'bg-orange-100 text-orange-800',
  'beauty-makeup':'bg-pink-100 text-pink-800',
  fashion:        'bg-slate-100 text-slate-800',
  computer:       'bg-blue-100 text-blue-800',
}

function AuthorAvatar({ name }) {
  const initials = name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className="w-9 h-9 rounded-full bg-prima-gold flex items-center justify-center shrink-0">
      <span className="text-prima-charcoal text-xs font-display font-bold tracking-wider">{initials}</span>
    </div>
  )
}

function CategoryBadge({ category }) {
  const label = CATEGORY_LABELS[category] || category
  const accent = CATEGORY_ACCENT[category] || 'bg-gray-100 text-gray-800'
  return (
    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${accent}`}>
      {label}
    </span>
  )
}

function PostCard({ post, featured = false }) {
  return (
    <article className={`group bg-white border border-prima-blush rounded-xl overflow-hidden hover:shadow-2xl hover:border-prima-gold/50 transition-all duration-500 flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
      {/* Image */}
      <div className={`overflow-hidden relative shrink-0 ${featured ? 'lg:w-1/2 aspect-[4/3] lg:aspect-auto' : 'aspect-[16/10]'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-6 ${featured ? 'lg:p-10 justify-center' : ''}`}>
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3 text-prima-muted text-xs font-body">
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {post.readTime} read
          </span>
          <span className="w-1 h-1 rounded-full bg-prima-blush" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>

        {/* Title */}
        <h2 className={`font-display font-bold text-prima-charcoal group-hover:text-prima-gold transition-colors leading-snug mb-3 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg line-clamp-2'}`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className={`text-prima-muted text-sm font-body leading-relaxed mb-5 ${featured ? 'line-clamp-3 text-base' : 'line-clamp-2'}`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-prima-ivory text-prima-muted text-[10px] font-body rounded-full border border-prima-blush">
              <Tag size={8} /> {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-prima-blush mt-auto">
          <div className="flex items-center gap-2.5">
            <AuthorAvatar name={post.author.name} />
            <div>
              <p className="text-sm font-semibold text-prima-charcoal font-body leading-tight">{post.author.name}</p>
              <p className="text-[11px] text-prima-muted font-body">{post.author.title}</p>
            </div>
          </div>
          <span className="text-prima-gold text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
            Read <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery]       = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    return matchesSearch && matchesCategory
  }), [searchQuery, activeCategory])

  const [featured, ...rest] = filteredPosts

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>
        <div className="container-prima relative z-10">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">Knowledge Hub</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">Tips & Insights</h1>
          <p className="text-white/70 font-body max-w-2xl text-lg">
            Practical wisdom from our expert instructors — delivered straight to your feed.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">

          {/* Search & Filters */}
          <div className="mb-12 space-y-5">
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-prima-muted" size={17} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-prima-blush text-prima-charcoal placeholder:text-prima-muted focus:outline-none focus:border-prima-gold transition-colors shadow-sm rounded-lg text-sm font-body"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 text-xs font-body font-semibold tracking-widest uppercase transition-all duration-300 rounded-full border ${
                    activeCategory === cat.value
                      ? 'bg-prima-gold border-prima-gold text-prima-charcoal shadow-md scale-105'
                      : 'bg-white border-prima-blush text-prima-muted hover:border-prima-gold hover:text-prima-gold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="space-y-10">
              {/* Featured post — full width horizontal */}
              {featured && (
                <div className="animate-fade-up">
                  <div className="flex items-center gap-3 mb-5">
                    <BookOpen size={16} className="text-prima-gold" />
                    <span className="font-accent text-prima-gold text-xs tracking-widest uppercase">Featured</span>
                    <div className="flex-1 h-px bg-prima-blush" />
                  </div>
                  <PostCard post={featured} featured />
                </div>
              )}

              {/* Rest — 3-col grid */}
              {rest.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-accent text-prima-muted text-xs tracking-widest uppercase">More Articles</span>
                    <div className="flex-1 h-px bg-prima-blush" />
                    <span className="text-prima-muted text-xs font-body">{rest.length} article{rest.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, i) => (
                      <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prima-cream mb-5">
                <Search className="text-prima-muted" size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-prima-charcoal mb-2">No articles found</h3>
              <p className="text-prima-muted font-body text-sm">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
                className="btn-outline mt-6"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
