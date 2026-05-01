import { useState } from 'react'
import { ArrowRight, Clock, Search, Tag } from 'lucide-react'
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

// Initials avatar — same approach as testimonials
function AuthorAvatar({ name }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="w-10 h-10 rounded-full bg-prima-gold flex items-center justify-center shrink-0">
      <span className="text-prima-charcoal text-xs font-display font-bold tracking-wider">
        {initials}
      </span>
    </div>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery]     = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

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

          {/* Search & Filter */}
          <div className="mb-12 space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-prima-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-prima-blush text-prima-charcoal placeholder:text-prima-muted focus:outline-none focus:border-prima-gold transition-all shadow-sm rounded-sm text-sm font-body"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 text-xs font-body font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm ${
                    activeCategory === cat.value
                      ? 'bg-prima-gold text-prima-charcoal shadow-md'
                      : 'bg-white border border-prima-blush text-prima-muted hover:border-prima-gold hover:text-prima-gold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <article
                key={post.id}
                className="bg-white border border-prima-blush rounded-lg group hover:shadow-2xl hover:border-prima-gold transition-all duration-500 overflow-hidden flex flex-col animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-prima-gold text-prima-charcoal text-[10px] font-bold tracking-widest uppercase rounded-full shadow">
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-prima-muted text-xs font-body flex items-center gap-1">
                      <Clock size={12} /> {post.readTime} read
                    </span>
                    <span className="w-1 h-1 bg-prima-blush rounded-full" />
                    <span className="text-prima-muted text-xs font-body">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-lg font-bold text-prima-charcoal mb-3 group-hover:text-prima-gold transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-prima-muted text-sm font-body leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-prima-cream text-prima-muted text-[10px] font-body rounded-full"
                      >
                        <Tag size={9} /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-prima-blush">
                    <div className="flex items-center gap-2.5">
                      <AuthorAvatar name={post.author.name} />
                      <div>
                        <p className="text-sm font-body font-semibold text-prima-charcoal leading-tight">{post.author.name}</p>
                        <p className="text-[11px] text-prima-muted font-body">{post.author.title}</p>
                      </div>
                    </div>
                    <span className="text-prima-gold text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prima-cream mb-4">
                <Search className="text-prima-muted" size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-prima-charcoal mb-2">No articles found</h3>
              <p className="text-prima-muted font-body text-sm">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
