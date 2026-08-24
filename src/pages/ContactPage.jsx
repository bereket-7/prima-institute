import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { useStore } from '../store/useStore'
import { contactSchema } from '../utils/schemas'
import { isEmailConfigured, sendContactEmail } from '../utils/email'

const SUBJECT_OPTIONS = [
  'Course Enquiry',
  'Enrollment Information',
  'Payment & Fees',
  'Corporate Training',
  'General Question',
]

const inputClass =
  'w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-white'

const errorClass = 'text-red-600 text-xs font-body mt-1'

export default function ContactPage() {
  const { t } = useTranslation()
  const { showNotification } = useStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      if (!isEmailConfigured()) {
        throw new Error('EmailJS is not configured')
      }
      await sendContactEmail(data)
      reset()
      showNotification(t('notifications.contactSuccess'), 'success')
    } catch {
      showNotification(t('notifications.contactError'), 'error')
    }
  }

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">
            {t('contact.eyebrow')}
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-white/60 font-body max-w-xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-8">
                {t('contact.sendMessage')}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className={inputClass}
                      placeholder="Your name"
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                    {t('contact.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={inputClass}
                    placeholder="+2519 3416 0075"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                    {t('contact.subject')} *
                  </label>
                  <select {...register('subject')} className={inputClass} defaultValue="">
                    <option value="">{t('contact.selectTopic')}</option>
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {isSubmitting ? (
                    t('contact.sending')
                  ) : (
                    <>
                      <Send size={14} /> {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-8">
                  {t('contact.findUs')}
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: t('contact.address'),
                      content: 'Gerji Roba, Bole Sub City\nAddis Ababa, Ethiopia',
                    },
                    { icon: Phone, title: t('contact.phone'), content: '+251 911 408040' },
                    { icon: Mail, title: t('contact.email'), content: 'Ethioprima@gmail.com' },
                    {
                      icon: Clock,
                      title: t('contact.officeHours'),
                      content: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 2:00 PM',
                    },
                  ].map(({ icon: Icon, title, content }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-prima-cream border border-prima-blush flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-prima-gold" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-prima-charcoal text-sm mb-1">
                          {title}
                        </p>
                        <p className="text-prima-muted text-sm font-body whitespace-pre-line">
                          {content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg border border-prima-blush">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5577!2d38.7633!3d9.0192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnMDkuMSJOIDM4wrA0NSc0Ny45IkU!5e0!3m2!1sen!2set!4v1234567890"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prima Institute Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
