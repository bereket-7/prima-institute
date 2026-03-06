import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'

const VALUES = [
  { title: 'Craft Over Certificate', desc: 'We measure success by what our graduates can do, not the paper they hold. Skills and portfolio are our metrics.' },
  { title: 'Industry as Classroom', desc: 'Our curriculum is built with working professionals, ensuring everything taught is directly applicable on day one.' },
  { title: 'Diversity of Perspective', desc: 'Our instructors and students come from across the globe. Different backgrounds create richer learning environments.' },
  { title: 'Lifelong Community', desc: 'Graduation is not the end. Our alumni network, mentorship programmes, and industry events keep the Prima family connected.' },
]

const MILESTONES = [
  { year: '2015', event: 'Prima Institute founded with a single Culinary Arts cohort of 8 students.' },
  { year: '2017', event: 'Expanded into Food & Drinks with launch of Barista and Mixology programmes.' },
  { year: '2019', event: 'Beauty & Makeup division launched; Nadia Khalil joins as Lead Artist.' },
  { year: '2021', event: 'Fashion Design programme introduced. Yuki Tanaka joins as Design Director.' },
  { year: '2023', event: 'Passed 1,000 graduates. New studio campus opens in Dubai Design District.' },
  { year: '2024', event: 'Launched scholarship programme for aspiring students with financial barriers.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-prima-charcoal pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1600&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-prima-charcoal/50" />
        </div>
        <div className="relative z-10 container-prima max-w-3xl">
          <span className="font-accent text-prima-gold text-sm tracking-[0.3em] uppercase mb-4 block">Our Story</span>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-none">
            Building the Creatives<br />
            <em className="font-accent not-italic text-prima-gold-light">of Tomorrow</em>
          </h1>
          <p className="text-white/70 text-lg font-body leading-relaxed">
            Prima Institute was founded on a simple belief: that rigorous, hands-on training by real industry professionals produces extraordinary graduates.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="divider-gold mb-8 block" />
            <h2 className="font-display text-4xl font-semibold text-prima-charcoal mb-6">
              We Exist to Transform Passion Into Profession
            </h2>
            <p className="text-prima-muted font-body leading-relaxed mb-5">
              Since 2015, Prima Institute has been the creative home for aspiring chefs, baristas, makeup artists, and fashion designers across the Middle East and beyond.
            </p>
            <p className="text-prima-muted font-body leading-relaxed mb-5">
              Our programmes combine classical foundations with modern industry practice. Students learn from instructors who are still active in the field — chefs who cook in Michelin-starred restaurants, makeup artists who work at fashion weeks, designers who build real collections.
            </p>
            <p className="text-prima-muted font-body leading-relaxed mb-8">
              We keep our classes small intentionally. With a maximum of 12 students per cohort, every student receives genuine mentorship, not just instruction.
            </p>
            <Link to="/courses" className="btn-primary">
              Explore Our Programmes <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=400&q=80" alt="" className="w-full aspect-square object-cover" />
            <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80" alt="" className="w-full aspect-square object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1558171813-8ef45e8b02dc?w=400&q=80" alt="" className="w-full aspect-square object-cover -mt-8" />
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" alt="" className="w-full aspect-square object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-prima-cream">
        <div className="container-prima">
          <SectionHeader eyebrow="What Drives Us" title="Our Values" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-white border border-prima-blush p-8">
                <span className="font-accent text-prima-gold text-4xl">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl font-semibold text-prima-charcoal mt-3 mb-3">{v.title}</h3>
                <p className="text-prima-muted font-body text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-prima-charcoal">
        <div className="container-prima">
          <SectionHeader eyebrow="Our Journey" title="A Decade of Excellence" light />
          <div className="max-w-3xl mx-auto">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex gap-8 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-px bg-prima-charcoal-soft flex-1 absolute top-0 bottom-0 left-[3.25rem]" />
                  <span className="font-display text-prima-gold font-bold text-lg w-24 shrink-0 z-10">{m.year}</span>
                </div>
                <div className="pb-2">
                  <div className="w-2 h-2 bg-prima-gold rounded-full mt-2 mb-3" />
                  <p className="text-white/70 font-body text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
