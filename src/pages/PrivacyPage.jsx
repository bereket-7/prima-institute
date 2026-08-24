import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PrivacyPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('footer.privacy') })

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima max-w-3xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">{t('footer.privacy')}</h1>
          <p className="text-white/60 font-body">Last updated: January 2026</p>
        </div>
      </div>
      <section className="section-padding bg-prima-ivory">
        <div className="container-prima max-w-3xl prose-custom space-y-6 text-prima-charcoal font-body leading-relaxed">
          <p>
            PRIMA Institute collects personal information you submit through contact and enrollment forms, including your
            name, email, phone number, and course preferences. We use this information to respond to inquiries and process applications.
          </p>
          <p>
            We do not sell your personal data. Information may be shared with admissions staff and service providers
            (such as email delivery services) solely to operate our programmes.
          </p>
          <p>
            You may request correction or deletion of your data by emailing{' '}
            <a href="mailto:Ethioprima@gmail.com" className="text-prima-gold underline">Ethioprima@gmail.com</a>.
          </p>
          <p>
            Read our <Link to="/terms" className="text-prima-gold underline">{t('footer.terms')}</Link> for enrollment conditions.
          </p>
        </div>
      </section>
    </>
  )
}
