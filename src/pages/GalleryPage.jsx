import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const GALLERY_ITEMS = [
  // Culinary Arts - 8 images
  { id: 1, category: 'culinary', src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', label: 'Professional Kitchen Training' },
  { id: 2, category: 'culinary', src: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=80', label: 'Culinary Masterclass' },
  { id: 3, category: 'culinary', src: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80', label: 'Plating Techniques' },
  { id: 4, category: 'culinary', src: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800&q=80', label: 'Pastry & Baking' },
  { id: 5, category: 'culinary', src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb4c?w=800&q=80', label: 'Knife Skills Workshop' },
  { id: 6, category: 'culinary', src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80', label: 'International Cuisine' },
  { id: 7, category: 'culinary', src: 'https://images.unsplash.com/photo-1571805529673-0f56b922b359?w=800&q=80', label: 'Sauce Preparation' },
  { id: 8, category: 'culinary', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', label: 'Gourmet Presentation' },

  // Bakery & Pastry - 7 images
  { id: 9, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', label: 'Coffee Artistry' },
  { id: 10, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&q=80', label: 'Latte Art Mastery' },
  { id: 11, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80', label: 'Cocktail Mixology' },
  { id: 12, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', label: 'Barista Training' },
  { id: 13, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', label: 'Coffee Brewing Techniques' },
  { id: 14, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80', label: 'Beverage Styling' },
  { id: 15, category: 'food-drinks', src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', label: 'Specialty Drinks' },

  // Beauty & Makeup - 8 images
  { id: 16, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', label: 'Professional Makeup' },
  { id: 17, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', label: 'Bridal Makeup Session' },
  { id: 18, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', label: 'Beauty Workshop' },
  { id: 19, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80', label: 'Makeup Artistry' },
  { id: 20, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80', label: 'Skincare Training' },
  { id: 21, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&q=80', label: 'Editorial Makeup' },
  { id: 22, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', label: 'Color Theory Class' },
  { id: 23, category: 'beauty-makeup', src: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80', label: 'Beauty Techniques' },

  // Fashion Design - 7 images
  { id: 24, category: 'fashion', src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', label: 'Fashion Design Studio' },
  { id: 25, category: 'fashion', src: 'https://images.unsplash.com/photo-1558171813-8ef45e8b02dc?w=800&q=80', label: 'Pattern Making' },
  { id: 26, category: 'fashion', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80', label: 'Styling Workshop' },
  { id: 27, category: 'fashion', src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80', label: 'Garment Construction' },
  { id: 28, category: 'fashion', src: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c85?w=800&q=80', label: 'Fashion Sketching' },
  { id: 29, category: 'fashion', src: 'https://images.unsplash.com/photo-1558769132-92e717d613cd?w=800&q=80', label: 'Textile Design' },
  { id: 30, category: 'fashion', src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80', label: 'Fashion Portfolio' },

  // Computer Training - 6 images
  { id: 31, category: 'computer', src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', label: 'Programming Class' },
  { id: 32, category: 'computer', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', label: 'Web Development' },
  { id: 33, category: 'computer', src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', label: 'IT Training Lab' },
  { id: 34, category: 'computer', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', label: 'Team Collaboration' },
  { id: 35, category: 'computer', src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', label: 'Coding Workshop' },
  { id: 36, category: 'computer', src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80', label: 'Digital Skills Training' },
]

const FILTERS = [
  { value: 'all', label: 'All', count: 36 },
  { value: 'culinary', label: 'Culinary Arts', count: 8 },
  { value: 'food-drinks', label: 'Bakery & Pastry', count: 7 },
  { value: 'beauty-makeup', label: 'Beauty & Makeup', count: 8 },
  { value: 'fashion', label: 'Fashion Design', count: 7 },
  { value: 'computer', label: 'Computer', count: 6 },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === activeFilter)

  const nextImage = () => {
    const currentIndex = filtered.findIndex(item => item.id === lightbox.id)
    const nextIndex = (currentIndex + 1) % filtered.length
    setLightbox(filtered[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = filtered.findIndex(item => item.id === lightbox.id)
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length
    setLightbox(filtered[prevIndex])
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft dark:from-black dark:via-prima-charcoal dark:to-prima-charcoal-soft pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>
        <div className="container-prima relative z-10">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block animate-fade-in">Behind the Scenes</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-up">Our Gallery</h1>
          <p className="text-white/70 font-body max-w-2xl text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Explore the creative journey of our students and witness the transformation happening every day at Prima Institute.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory dark:bg-prima-ivory">
        <div className="container-prima">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`group relative px-6 py-3 text-sm font-body font-semibold tracking-wide uppercase transition-all duration-300 overflow-hidden ${
                  activeFilter === f.value
                    ? 'bg-prima-gold text-prima-charcoal shadow-lg scale-105'
                    : 'bg-white dark:bg-prima-charcoal-soft border border-prima-blush dark:border-white/10 text-prima-muted dark:text-prima-muted hover:border-prima-gold hover:text-prima-gold dark:hover:text-prima-gold hover:scale-105'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {f.label}
                  <span className={`text-xs ${activeFilter === f.value ? 'opacity-70' : 'opacity-50'}`}>({f.count})</span>
                </span>
                {activeFilter !== f.value && (
                  <span className="absolute inset-0 bg-prima-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Gallery Grid - Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setLightbox(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/90 via-prima-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <ZoomIn size={16} className="text-prima-gold" />
                      <span className="text-white text-xs font-body font-semibold tracking-wide uppercase">
                        View Image
                      </span>
                    </div>
                    <p className="text-white text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-prima-muted text-lg font-body">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-50"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-50"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-50"
            aria-label="Next"
          >
            →
          </button>

          {/* Image Container */}
          <div className="max-w-6xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src.replace('w=800', 'w=1600')}
              alt={lightbox.label}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-white text-lg font-display font-semibold mb-1">{lightbox.label}</p>
              <p className="text-white/50 text-sm font-body">
                {filtered.findIndex(item => item.id === lightbox.id) + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
