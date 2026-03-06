import { useState } from 'react'
import SectionHeader from '../components/ui/SectionHeader'

const GALLERY_ITEMS = [
  { id: 1, category: 'culinary', src: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80', label: 'Culinary Arts' },
  { id: 2, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80', label: 'Beauty & Makeup' },
  { id: 3, category: 'fashion', src: 'https://images.unsplash.com/photo-1558171813-8ef45e8b02dc?w=600&q=80', label: 'Fashion Design' },
  { id: 4, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=80', label: 'Food & Drinks' },
  { id: 5, category: 'culinary', src: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&q=80', label: 'Kitchen Practice' },
  { id: 6, category: 'fashion', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', label: 'Styling Session' },
  { id: 7, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80', label: 'Cocktail Craft' },
  { id: 8, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', label: 'Bridal Makeup' },
  { id: 9, category: 'culinary', src: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=600&q=80', label: 'Pastry Class' },
  { id: 10, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', label: 'Coffee Arts' },
  { id: 11, category: 'fashion', src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80', label: 'Pattern Making' },
  { id: 12, category: 'culinary', src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', label: 'Culinary Masterclass' },
]

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'culinary', label: 'Culinary Arts' },
  { value: 'food-drinks', label: 'Food & Drinks' },
  { value: 'beauty-makeup', label: 'Beauty & Makeup' },
  { value: 'fashion', label: 'Fashion Design' },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === activeFilter)

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">Behind the Scenes</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-white/60 font-body max-w-xl">
            A glimpse into the creative energy that defines life at Prima Institute.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 text-xs font-body font-semibold tracking-widest uppercase transition-all ${
                  activeFilter === f.value
                    ? 'bg-prima-charcoal text-prima-cream'
                    : 'bg-white border border-prima-blush text-prima-muted hover:border-prima-gold hover:text-prima-gold'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry-like Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-prima-charcoal/0 group-hover:bg-prima-charcoal/50 transition-all flex items-end p-4">
                  <span className="text-white text-xs font-body font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img src={lightbox.src.replace('w=600', 'w=1200')} alt={lightbox.label} className="max-h-[85vh] object-contain" />
            <p className="text-white/70 text-sm font-body text-center mt-3">{lightbox.label}</p>
            <button onClick={() => setLightbox(null)} className="absolute top-0 right-0 -mt-8 text-white/60 hover:text-white text-2xl font-light">
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
