import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Search, Tag } from 'lucide-react'
import posts from '../data/blog-posts.json'
import instructors from '../data/instructors.json'
import { CATEGORY_LABELS } from '../utils/helpers'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const getAuthor = (id) => instructors.find((i) => i.id === id)

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'culinary', label: 'Culinary' },
    { value: 'food-drinks', label: 'Food & Drinks' },
    { value: 'beauty-makeup', label: 'Beauty' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'computer', label: 'Computer' },
  ]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft dark:from-black dark:via-prima-charcoal dark:to-prima-charcoal-soft pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>
        <div className="container-prima relative z-10">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block animate-fade-in">Knowledge Hub</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-up">Tips & Insights</h1>
          <p className="text-white/70 font-body max-w-2xl text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Practical wisdom from our expert instructors — delivered straight to your feed.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory dark:bg-prima-ivory">
        <div className="container-prima">
          {/* Search & Filter Bar */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-prima-muted" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-prima-charcoal-soft border border-prima-blush dark:border-white/10 rounded-lg text-prima-charcoal dark:text-prima-cream placeholder:text-prima-muted focus:outline-none focus:border-prima-gold transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2.5 text-sm font-body font-semibold tracking-wide uppercase transition-all duration-300 rounded-full ${
                    activeCategory === cat.value
                      ? 'bg-prima-gold text-prima-charcoal shadow-lg scale-105'
                      : 'bg-white dark:bg-prima-charcoal-soft border border-prima-blush dark:border-white/10 text-prima-muted dark:text-prima-muted hover:border-prima-gold hover:text-prima-gold hover:scale-105'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => {
              const author = getAuthor(post.author)
              const isFeatured = i === 0

              return (
                <article
                  key={post.id}
                  className={`bg-white dark:bg-prima-charcoal-soft border border-prima-blush dark:border-white/10 rounded-lg group hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-up ${
                    isFeatured ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`grid ${isFeatured ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Image */}
                    <div className={`overflow-hidden relative ${isFeatured ? 'aspect-[16/10] lg:aspect-auto' : 'aspect-[16/10]'}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-prima-gold text-prima-charcoal text-xs font-bold tracking-wider uppercase rounded-full shadow-lg">
                          {CATEGORY_LABELS[post.category] || post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-prima-muted dark:text-prima-muted text-xs font-body flex items-center gap-1.5">
                          <Clock size={14} /> {post.readTime} read
                        </span>
                        <span className="w-1 h-1 bg-prima-blush dark:bg-white/20 rounded-full" />
                        <span className="text-prima-muted dark:text-prima-muted text-xs font-body">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className={`font-display font-bold text-prima-charcoal dark:text-prima-cream mb-3 group-hover:text-prima-gold transition-colors line-clamp-2 ${
                        isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className={`text-prima-muted dark:text-prima-muted text-sm font-body leading-relaxed mb-6 flex-1 ${
                        isFeatured ? 'line-clamp-3' : 'line-clamp-2'
                      }`}>
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-prima-cream dark:bg-black/30 text-prima-muted dark:text-prima-muted text-xs font-body rounded-full"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-prima-blush dark:border-white/10">
                        {author && (
                          <div className="flex items-center gap-3">
                            <img
                              src={author.image}
                              alt={author.name}
                              className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-prima-blush dark:ring-white/10"
                            />
                            <div>
                              <p className="text-sm font-body font-semibold text-prima-charcoal dark:text-prima-cream">{author.name}</p>
                              <p className="text-xs text-prima-muted dark:text-prima-muted">{author.title}</p>
                            </div>
                          </div>
                        )}
                        <button className="text-prima-gold text-sm font-semibold tracking-wide flex items-center gap-2 group-hover:gap-4 transition-all">
                          Read <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prima-cream dark:bg-prima-charcoal-soft mb-4">
                <Search className="text-prima-muted" size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-prima-charcoal dark:text-prima-cream mb-2">No articles found</h3>
              <p className="text-prima-muted dark:text-prima-muted font-body">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
