import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-prima-ivory flex items-center justify-center">
      <div className="text-center px-6">
        <span className="font-accent text-prima-gold text-8xl lg:text-[200px] leading-none block opacity-20">404</span>
        <h1 className="font-display text-4xl font-semibold text-prima-charcoal -mt-8 mb-4">{t('notFound.title')}</h1>
        <p className="text-prima-muted font-body max-w-sm mx-auto mb-8">
          {t('notFound.message')}
        </p>
        <Link to="/" className="btn-primary">{t('notFound.returnHome')}</Link>
      </div>
    </div>
  )
}
