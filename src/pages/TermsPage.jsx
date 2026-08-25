import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'

export default function TermsPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('footer.terms') })

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima max-w-3xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">{t('footer.terms')}</h1>
          <p className="text-white/60 font-body">Last updated: January 2026</p>
        </div>
      </div>
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima max-w-3xl prose-custom space-y-6 text-prima-charcoal font-body leading-relaxed">
          <p>
            By applying to or enrolling in PRIMA Institute programmes, you agree to these terms. Course fees,
            schedules, and materials may change with notice. Refunds follow our admissions policy communicated at enrollment.
          </p>
          <p>
            Students are expected to attend classes regularly, follow safety guidelines, and treat staff and peers with respect.
            PRIMA Institute reserves the right to dismiss students who violate institute policies.
          </p>
          <p>
            For questions about these terms, please <Link to="/contact" className="text-prima-gold underline">contact us</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
