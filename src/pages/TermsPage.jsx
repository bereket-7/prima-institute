import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'

export default function TermsPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('footer.terms'), description: t('legal.terms.enrollmentBody') })

  const sections = [
    { title: t('legal.terms.enrollmentTitle'), body: t('legal.terms.enrollmentBody') },
    { title: t('legal.terms.conductTitle'), body: t('legal.terms.conductBody') },
    { title: t('legal.terms.liabilityTitle'), body: t('legal.terms.liabilityBody') },
    { title: t('legal.terms.contactTitle'), body: t('legal.terms.contactBody') },
  ]

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima max-w-3xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">{t('footer.terms')}</h1>
          <p className="text-white/60 font-body">{t('legal.lastUpdated')}</p>
        </div>
      </div>
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima max-w-3xl prose-custom space-y-8 text-prima-charcoal font-body leading-relaxed">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl font-semibold text-prima-charcoal mb-3">{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
          <p>
            <Link to="/contact" className="text-prima-gold underline">{t('nav.contact')}</Link>
          </p>
        </div>
      </section>
    </>
  )
}
