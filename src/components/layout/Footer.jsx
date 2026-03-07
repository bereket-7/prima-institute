import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'

// TikTok icon as SVG since it's not in lucide-react
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

// Telegram icon as SVG since it's not in lucide-react
const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
)

const FOOTER_COURSES = [
  { label: 'Culinary Arts', to: '/categories/culinary' },
  { label: 'Food & Drinks', to: '/categories/food-drinks' },
  { label: 'Beauty & Makeup', to: '/categories/beauty-makeup' },
  { label: 'Fashion Design', to: '/categories/fashion' },
]

const FOOTER_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Instructors', to: '/instructors' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Enroll Now', to: '/enroll' },
]

export default function Footer() {
  return (
    <footer className="bg-prima-charcoal text-prima-cream">
      {/* ── Main Footer ──────────────────────────────────────────── */}
      <div className="container-prima py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-display font-bold text-3xl text-white block">Prima</span>
              <span className="font-accent text-prima-gold text-xs tracking-[0.3em] uppercase">Institute</span>
            </div>
            <p className="text-prima-muted text-sm leading-relaxed mb-6 font-body">
              Where creativity meets craft. Transforming passionate learners into industry-ready professionals since 2015.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: TikTokIcon, href: '#', label: 'TikTok' },
                { icon: TelegramIcon, href: 'https://t.me/primainstitute', label: 'Telegram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={label === 'Telegram' ? '_blank' : undefined}
                  rel={label === 'Telegram' ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 border border-prima-charcoal-soft flex items-center justify-center text-prima-muted hover:text-prima-gold hover:border-prima-gold transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-6">
              Disciplines
            </h4>
            <ul className="space-y-3">
              {FOOTER_COURSES.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-prima-muted text-sm hover:text-prima-gold transition-colors font-body flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-prima-gold rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-prima-muted text-sm hover:text-prima-gold transition-colors font-body flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-prima-gold rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-prima-gold mt-0.5 shrink-0" />
                <span className="text-prima-muted text-sm font-body">
                  Gerji Roba, Bole Sub City, Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-prima-gold shrink-0" />
                <a href="tel:+251911408040" className="text-prima-muted text-sm hover:text-prima-gold transition-colors font-body">
                  +251 911 408040
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-prima-gold shrink-0" />
                <a href="mailto:hello@primainstitute.et" className="text-prima-muted text-sm hover:text-prima-gold transition-colors font-body">
                  hello@primainstitute.et
                </a>
              </li>
            </ul>

            <div className="mt-8 p-4 border border-prima-charcoal-soft">
              <p className="text-xs text-prima-muted font-body mb-3">Subscribe for new course updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-prima-charcoal-soft text-prima-cream text-sm px-3 py-2 border border-prima-charcoal-soft focus:outline-none focus:border-prima-gold transition-colors placeholder:text-prima-muted"
                />
                <button className="bg-prima-gold text-prima-charcoal text-xs font-semibold px-4 hover:bg-prima-gold-light transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────── */}
      <div className="border-t border-prima-charcoal-soft">
        <div className="container-prima py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-prima-muted text-xs font-body">
            © {new Date().getFullYear()} Prima Institute. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-prima-muted text-xs hover:text-prima-gold transition-colors font-body">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
