import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import posts from '../data/blog-posts.json'
import instructors from '../data/instructors.json'
import { CATEGORY_LABELS } from '../utils/helpers'
import SectionHeader from '../components/ui/SectionHeader'

export default function BlogPage() {
  const getAuthor = (id) => instructors.find((i) => i.id === id)

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">Knowledge</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">Tips & Insights</h1>
          <p className="text-white/60 font-body max-w-xl">
            Practical wisdom from our instructors — delivered straight to your feed.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => {
              const author = getAuthor(post.author)
              const isFeatured = i === 0
              return (
                <article key={post.id} className={`bg-white border border-prima-blush group card-hover overflow-hidden ${isFeatured ? 'md:col-span-2' : ''}`}>
                  <div className={`grid ${isFeatured ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                    <div className={`overflow-hidden ${isFeatured ? 'aspect-[4/3] md:aspect-auto' : 'aspect-video'}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-7 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-prima-gold text-[10px] font-semibold tracking-widest uppercase font-body">
                          {CATEGORY_LABELS[post.category] || post.category}
                        </span>
                        <span className="w-1 h-1 bg-prima-blush rounded-full" />
                        <span className="text-prima-muted text-[10px] font-body flex items-center gap-1">
                          <Clock size={10} /> {post.readTime} read
                        </span>
                      </div>
                      <h2 className={`font-display font-semibold text-prima-charcoal mb-3 group-hover:text-prima-gold transition-colors ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                        {post.title}
                      </h2>
                      <p className="text-prima-muted text-sm font-body leading-relaxed mb-6 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-prima-blush">
                        {author && (
                          <div className="flex items-center gap-2">
                            <img src={author.image} alt={author.name} className="w-7 h-7 rounded-full object-cover object-top" />
                            <span className="text-xs font-body text-prima-charcoal">{author.name}</span>
                          </div>
                        )}
                        <span className="text-prima-gold text-xs font-semibold tracking-wide flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer">
                          Read More <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
