import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PrivacyPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('footer.privacy'), description: t('legal.privacy.collectBody') })

  const sections = [
    { title: t('legal.privacy.collectTitle'), body: t('legal.privacy.collectBody') },
    { title: t('legal.privacy.useTitle'), body: t('legal.privacy.useBody') },
    { title: t('legal.privacy.rightsTitle'), body: t('legal.privacy.rightsBody') },
  ]

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima max-w-3xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">{t('footer.privacy')}</h1>
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

          <div id="cookies">
            <h2 className="font-display text-xl font-semibold text-prima-charcoal mb-3">
              {t('legal.privacy.cookiesTitle')}
            </h2>
            <p>{t('legal.privacy.cookiesBody')}</p>
          </div>

          <p>
            {t('legal.privacy.termsLink')}{' '}
            <Link to="/terms" className="text-prima-gold underline">{t('footer.terms')}</Link>
          </p>
          <p>
            <a href="mailto:Ethioprima@gmail.com" className="text-prima-gold underline">
              Ethioprima@gmail.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
