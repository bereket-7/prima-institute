import { useState } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const GALLERY_ITEMS = [
  // Culinary Arts
  { id: 1,  category: 'culinary',      src: '/assets/images/gallery/culinary/photo_2026-04-08_05-03-03.jpg',      label: 'Professional Kitchen Training' },
  { id: 2,  category: 'culinary',      src: '/assets/images/gallery/culinary/photo_2026-05-01_07-36-01.jpg',      label: 'Culinary Masterclass' },
  { id: 3,  category: 'culinary',      src: '/assets/images/gallery/culinary/photo_2026-05-01_07-36-31.jpg',      label: 'Plating Techniques' },
  { id: 4,  category: 'culinary',      src: '/assets/images/courses/culinary/photo_2026-04-06_11-14-17.jpg',      label: 'Knife Skills Workshop' },
  { id: 5,  category: 'culinary',      src: '/assets/images/courses/culinary/photo_2026-04-06_11-14-39.jpg',      label: 'Ethiopian Traditional Food' },
  { id: 6,  category: 'culinary',      src: '/assets/images/courses/culinary/photo_2026-04-06_11-14-46.jpg',      label: 'International Cuisine' },
  { id: 7,  category: 'culinary',      src: '/assets/images/courses/culinary/photo_2026-04-06_11-15-16.jpg',      label: 'Sauce Preparation' },
  { id: 8,  category: 'culinary',      src: '/assets/images/courses/culinary/photo_2026-05-01_07-38-52.jpg',      label: 'Gourmet Presentation' },

  // Bakery & Pastry
  { id: 9,  category: 'food-drinks',   src: '/assets/images/gallery/bakery-pastry/photo_2026-05-01_07-31-20.jpg', label: 'Pastry Arts' },
  { id: 10, category: 'food-drinks',   src: '/assets/images/gallery/bakery-pastry/photo_2026-05-01_07-35-46.jpg', label: 'Cake Decoration' },
  { id: 11, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-12-43.jpg', label: 'Baking Techniques' },
  { id: 12, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-12-50.jpg', label: 'Artisan Bread' },
  { id: 13, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-12-56.jpg', label: 'Pastry Workshop' },
  { id: 14, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-13-29.jpg', label: 'Chocolate Work' },
  { id: 15, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-13-35.jpg', label: 'Wedding Cakes' },
  { id: 16, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-13-47.jpg', label: 'Sugar Arts' },
  { id: 17, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-13-58.jpg', label: 'Laminated Doughs' },
  { id: 18, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-15-33.jpg', label: 'Tarts & Pastries' },
  { id: 19, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-15-38.jpg', label: 'Baking Mastery' },
  { id: 20, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-15-43.jpg', label: 'Pastry Finishing' },
  { id: 21, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-16-00.jpg', label: 'Cake Design' },
  { id: 22, category: 'food-drinks',   src: '/assets/images/courses/bakery-pastry/photo_2026-04-06_11-16-12.jpg', label: 'Bakery Session' },

  // Beauty & Hair Dressing
  { id: 23, category: 'beauty-makeup', src: '/assets/images/gallery/beauty-hair/photo_2026-05-01_07-39-21.jpg',   label: 'Beauty Workshop' },
  { id: 24, category: 'beauty-makeup', src: '/assets/images/courses/beauty-hair/photo_2026-04-06_16-17-22.jpg',   label: 'Professional Makeup' },
  { id: 25, category: 'beauty-makeup', src: '/assets/images/courses/beauty-hair/photo_2026-04-06_16-17-28.jpg',   label: 'Bridal Makeup Session' },
  { id: 26, category: 'beauty-makeup', src: '/assets/images/courses/beauty-hair/photo_2026-04-06_16-17-43.jpg',   label: 'Hair Styling' },
  { id: 27, category: 'beauty-makeup', src: '/assets/images/courses/beauty-hair/photo_2026-05-01_07-41-26.jpg',   label: 'Hair Dressing Class' },

  // Fashion Design
  { id: 28, category: 'fashion',       src: '/assets/images/gallery/fashion/photo_2026-05-01_07-42-01.jpg',       label: 'Fashion Design Studio' },
  { id: 29, category: 'fashion',       src: '/assets/images/courses/fashion/photo_2026-04-06_16-16-01.jpg',       label: 'Garment Construction' },
  { id: 30, category: 'fashion',       src: '/assets/images/courses/fashion/photo_2026-04-06_16-16-15.jpg',       label: 'Pattern Making' },
  { id: 31, category: 'fashion',       src: '/assets/images/courses/fashion/photo_2026-05-01_07-42-48.jpg',       label: 'Fashion Portfolio' },

  // General (includes computer training image)
  { id: 32, category: 'common',        src: '/assets/images/gallery/computer/photo_2026-05-01_07-31-28.jpg',      label: 'Computer Training Lab' },
  { id: 33, category: 'common',        src: '/assets/images/gallery/common/photo_2026-05-01_07-37-14.jpg',        label: 'PRIMA Institute' },
  { id: 34, category: 'common',        src: '/assets/images/gallery/common/photo_2026-05-01_07-55-54.jpg',        label: 'Student Life' },
  { id: 35, category: 'common',        src: '/assets/images/gallery/common/photo_2026-05-01_07-56-01.jpg',        label: 'Training Session' },
]

const FILTERS = [
  { value: 'all',           label: 'All',              count: 35 },
  { value: 'culinary',      label: 'Culinary Arts',    count: 8  },
  { value: 'food-drinks',   label: 'Bakery & Pastry',  count: 14 },
  { value: 'beauty-makeup', label: 'Beauty & Hair',    count: 5  },
  { value: 'fashion',       label: 'Fashion Design',   count: 4  },
  { value: 'common',        label: 'General',          count: 4  },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeFilter)

  const currentIndex = lightbox ? filtered.findIndex(i => i.id === lightbox.id) : -1

  const navigate = (dir) => {
    const next = (currentIndex + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        </div>
        <div className="container-prima relative z-10">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">Behind the Scenes</span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-white/70 font-body max-w-2xl text-lg">
            Explore the creative journey of our students and witness the transformation happening every day at PRIMA Institute.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`relative px-5 py-2.5 text-xs font-body font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm overflow-hidden ${
                  activeFilter === f.value
                    ? 'bg-prima-gold text-prima-charcoal shadow-md'
                    : 'bg-white border border-prima-blush text-prima-muted hover:border-prima-gold hover:text-prima-gold'
                }`}
              >
                {f.label}
                <span className={`ml-2 text-[10px] ${activeFilter === f.value ? 'opacity-60' : 'opacity-40'}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Uniform Grid — 4 cols desktop, 3 tablet, 2 mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition-all duration-400 bg-prima-charcoal"
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => setLightbox(item)}
              >
                {/* Fixed aspect ratio container — all images same size */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-prima-charcoal/85 via-prima-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-3">
                  <div className="flex items-center gap-1.5 mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={13} className="text-prima-gold" />
                    <span className="text-white text-[10px] font-body font-semibold tracking-widest uppercase">View</span>
                  </div>
                  <p className="text-white/90 text-xs font-body font-medium leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.label}
                  </p>
                </div>

                {/* Gold border flash on hover */}
                <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-2 group-hover:ring-prima-gold/60 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-prima-muted text-lg font-body">No images in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 z-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-prima-gold flex items-center justify-center text-white hover:text-prima-charcoal transition-all hover:scale-110 z-50"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-prima-gold flex items-center justify-center text-white hover:text-prima-charcoal transition-all hover:scale-110 z-50"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image */}
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-5 text-center">
              <p className="text-white font-display font-semibold text-lg mb-1">{lightbox.label}</p>
              <p className="text-white/40 text-sm font-body">{currentIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
