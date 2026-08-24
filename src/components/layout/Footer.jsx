import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStore } from '../../store/useStore'
import { sendContactEmail, isEmailConfigured } from '../../utils/email'

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

export default function Footer() {
  const { t } = useTranslation()
  const { showNotification } = useStore()
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!subscribeEmail) return
    setSubscribing(true)
    try {
      if (isEmailConfigured()) {
        await sendContactEmail({
          name: 'Newsletter Subscriber',
          email: subscribeEmail,
          phone: '',
          subject: 'Newsletter Subscription',
          message: 'Please add this email to the newsletter list.',
        })
      }
      showNotification('Thanks for subscribing!', 'success')
      setSubscribeEmail('')
    } catch {
      showNotification('Subscription failed. Please try again.', 'error')
    } finally {
      setSubscribing(false)
    }
  }

  const FOOTER_COURSES = [
    { label: t('categories.culinary'), to: '/categories/culinary' },
    { label: t('categories.foodDrinks'), to: '/categories/food-drinks' },
    { label: t('categories.beauty'), to: '/categories/beauty-makeup' },
    { label: t('categories.fashion'), to: '/categories/fashion' },
    { label: t('categories.computer'), to: '/categories/computer' },
  ]

  const FOOTER_LINKS = [
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.instructors'), to: '/instructors' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.blog'), to: '/blog' },
    { label: t('nav.contact'), to: '/contact' },
    { label: t('nav.enrollNow'), to: '/enroll' },
  ]

  const FOOTER_LEGAL = [
    { label: t('footer.privacy'), to: '/privacy' },
    { label: t('footer.terms'), to: '/terms' },
    { label: t('footer.cookies'), to: '/privacy' },
  ]

  return (
    <footer className="bg-gradient-to-b from-prima-charcoal to-black dark:from-prima-charcoal dark:to-black text-prima-cream relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-prima-gold/5 via-transparent to-transparent pointer-events-none" />

      {/* ── Main Footer ──────────────────────────────────────────── */}
      <div className="container-prima py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6 group">
              <span className="font-display font-bold text-3xl text-white block group-hover:text-prima-gold transition-colors duration-300">PRIMA</span>
              <span className="font-accent text-prima-gold text-xs tracking-[0.3em] uppercase">Institute</span>
            </div>
            <p className="text-prima-muted text-sm leading-relaxed mb-8 font-body">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: TikTokIcon, href: 'https://www.tiktok.com/@primaaddis', label: 'TikTok' },
                { icon: TelegramIcon, href: 'https://t.me/Yihee', label: 'Telegram' },
                { icon: Facebook, href: 'https://www.facebook.com/share/1C8dbmNpXk/?mibextid=wwXIfr', label: 'Facebook' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={['Telegram', 'Facebook', 'TikTok'].includes(label) ? '_blank' : undefined}
                  rel={['Telegram', 'Facebook', 'TikTok'].includes(label) ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-prima-muted hover:text-prima-charcoal hover:bg-prima-gold hover:border-prima-gold hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-prima-gold/20"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-6 relative inline-block">
              {t('footer.disciplines')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-prima-gold" />
            </h4>
            <ul className="space-y-3 mt-8">
              {FOOTER_COURSES.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-prima-muted text-sm hover:text-white transition-all duration-200 font-body flex items-center gap-3 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 bg-prima-gold/50 rounded-full group-hover:bg-prima-gold group-hover:scale-150 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-6 relative inline-block">
              {t('footer.quickLinks')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-prima-gold" />
            </h4>
            <ul className="space-y-3 mt-8">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-prima-muted text-sm hover:text-white transition-all duration-200 font-body flex items-center gap-3 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 bg-prima-gold/50 rounded-full group-hover:bg-prima-gold group-hover:scale-150 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold tracking-wider uppercase mb-6 relative inline-block">
              {t('footer.getInTouch')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-prima-gold" />
            </h4>
            <ul className="space-y-4 mt-8">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="text-prima-gold mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-prima-muted text-sm font-body group-hover:text-white transition-colors duration-200">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-prima-gold shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <a href="tel:+251911408040" className="text-prima-muted text-sm hover:text-white transition-colors duration-200 font-body">
                  +251 911 408040
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="text-prima-gold shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <a href="mailto:Ethioprima@gmail.com" className="text-prima-muted text-sm hover:text-white transition-colors duration-200 font-body">
                  Ethioprima@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-8 p-5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-prima-gold/50 transition-all duration-300">
              <p className="text-xs text-white font-semibold font-body mb-4 uppercase tracking-wider">{t('footer.subscribe')}</p>
              <form onSubmit={handleSubscribe} className="flex rounded-lg overflow-hidden shadow-lg">
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 bg-white/10 text-prima-cream text-sm px-4 py-3 border-0 focus:outline-none focus:bg-white/15 transition-all placeholder:text-prima-muted/70"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-prima-gold text-prima-charcoal text-sm font-bold px-6 hover:bg-prima-gold-light hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-60"
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────── */}
      <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container-prima py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-prima-muted text-xs font-body">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex gap-8">
            {FOOTER_LEGAL.map((item) => (
              <Link key={item.to + item.label} to={item.to} className="text-prima-muted text-xs hover:text-prima-gold transition-all duration-200 font-body relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-prima-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
