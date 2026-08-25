import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { CheckCircle, ChevronRight, ChevronLeft, User, BookOpen, ClipboardCheck, X } from 'lucide-react'
import courses from '../data/courses.json'
import { formatPrice, CATEGORY_LABELS } from '../utils/helpers'
import { useStore } from '../store/useStore'
import { enrollSchema } from '../utils/schemas'
import { isEmailConfigured, sendEnrollEmail } from '../utils/email'

const STEPS = [
  { labelKey: 'enrollment.step1', icon: User },
  { labelKey: 'enrollment.step2', icon: BookOpen },
  { labelKey: 'enrollment.step3', icon: ClipboardCheck },
]

const CATEGORY_ORDER = ['culinary', 'food-drinks', 'beauty-makeup', 'fashion', 'computer']

const groupedCourses = CATEGORY_ORDER.reduce((acc, cat) => {
  const items = courses.filter((c) => c.category === cat)
  if (items.length) acc[cat] = items
  return acc
}, {})

const PAYMENT_KEYS = {
  full: 'enrollment.fullPayment',
  installments: 'enrollment.installments',
  discuss: 'enrollment.discussPayment',
}

const inputClass =
  'w-full border border-prima-blush px-4 py-3 text-sm font-body bg-prima-ivory focus:outline-none focus:border-prima-gold focus:bg-white transition-all rounded-sm'

const errorClass = 'text-red-600 text-xs font-body mt-1'

function FieldError({ message }) {
  if (!message) return null
  return <p className={errorClass}>{message}</p>
}

export default function EnrollPage() {
  const { t } = useTranslation()
  const { showNotification } = useStore()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [prefilledCourse, setPrefilledCourse] = useState(null)
  const [showPrefillBanner, setShowPrefillBanner] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      courseId: '',
      startDate: '',
      paymentPlan: 'full',
      message: '',
      terms: false,
    },
  })

  const formValues = watch()
  const selectedCourse = courses.find((c) => c.id === formValues.courseId)

  useEffect(() => {
    const courseId = searchParams.get('courseId')
    if (!courseId) return

    const course = courses.find((c) => c.id === courseId)
    if (!course) return

    setValue('courseId', course.id)
    setPrefilledCourse(course)
    setShowPrefillBanner(true)
    setStep(1)
  }, [searchParams, setValue])

  const onSubmit = async (data) => {
    const course = courses.find((c) => c.id === data.courseId)
    if (!course) return

    try {
      if (!isEmailConfigured()) {
        throw new Error('EmailJS is not configured')
      }
      await sendEnrollEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        courseTitle: course.title,
        coursePrice: formatPrice(course.price, 'ETB'),
        startDate: data.startDate,
        paymentPlan: PAYMENT_KEYS[data.paymentPlan] ? t(PAYMENT_KEYS[data.paymentPlan]) : data.paymentPlan,
        notes: data.message,
      })
      setSubmitted(true)
      showNotification(t('notifications.enrollSuccess'), 'success')
    } catch {
      showNotification(t('notifications.enrollError'), 'error')
    }
  }

  const goToCourseStep = async () => {
    const valid = await trigger(['firstName', 'lastName', 'email', 'phone'])
    if (valid) setStep(1)
  }

  const goToReviewStep = async () => {
    const valid = await trigger(['courseId'])
    if (valid) setStep(2)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-prima-ivory flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-prima-gold/10 border-2 border-prima-gold/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={44} className="text-prima-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-prima-charcoal mb-4">{t('enrollment.successTitle')}</h2>
          <p className="text-prima-muted font-body leading-relaxed mb-10">
            {t('enrollment.successMessage')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">{t('enrollment.returnHome')}</Link>
            <Link to="/courses" className="btn-outline">{t('enrollment.browseCourses')}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.15),transparent_60%)]" />
        </div>
        <div className="container-prima max-w-3xl relative z-10">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">{t('enrollment.eyebrow')}</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-8">{t('enrollment.title')}</h1>

          <div className="flex items-center">
            {STEPS.map(({ labelKey, icon: Icon }, i) => (
              <div key={labelKey} className="flex items-center">
                <div className={`flex items-center gap-2.5 text-xs font-body font-medium transition-colors ${i <= step ? 'text-prima-gold' : 'text-white/30'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center transition-all ${
                    i < step   ? 'bg-prima-gold text-prima-charcoal' :
                    i === step ? 'border-2 border-prima-gold text-prima-gold bg-prima-gold/10' :
                                 'border border-white/20 text-white/30'
                  }`}>
                    {i < step ? <CheckCircle size={14} /> : <Icon size={14} />}
                  </div>
                  <span className="hidden sm:block tracking-wide">{t(labelKey)}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px mx-3 transition-colors ${i < step ? 'bg-prima-gold' : 'bg-white/15'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima max-w-3xl">
          {showPrefillBanner && prefilledCourse && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-prima-gold/40 bg-prima-gold/5 px-5 py-4">
              <p className="text-sm font-body text-prima-charcoal">
                {t('enrollment.enrollingIn')}{' '}
                <strong className="font-display text-prima-charcoal">{prefilledCourse.title}</strong>
              </p>
              <button
                type="button"
                onClick={() => setShowPrefillBanner(false)}
                className="text-prima-muted hover:text-prima-charcoal transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {step === 0 && (
              <div className="bg-white border border-prima-blush rounded-xl shadow-sm overflow-hidden">
                <div className="bg-prima-cream border-b border-prima-blush px-8 py-5">
                  <h2 className="font-display text-xl font-bold text-prima-charcoal">Personal Information</h2>
                  <p className="text-prima-muted text-sm font-body mt-1">Tell us a bit about yourself</p>
                </div>
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                        First Name <span className="text-prima-gold">*</span>
                      </label>
                      <input type="text" {...register('firstName')} className={inputClass} />
                      <FieldError message={errors.firstName?.message} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                        Last Name <span className="text-prima-gold">*</span>
                      </label>
                      <input type="text" {...register('lastName')} className={inputClass} />
                      <FieldError message={errors.lastName?.message} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                      Email Address <span className="text-prima-gold">*</span>
                    </label>
                    <input type="email" {...register('email')} className={inputClass} placeholder="you@example.com" />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                      Phone Number <span className="text-prima-gold">*</span>
                    </label>
                    <input type="tel" {...register('phone')} className={inputClass} placeholder="+251 9XX XXX XXX" />
                    <FieldError message={errors.phone?.message} />
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <button type="button" onClick={goToCourseStep} className="btn-primary w-full sm:w-auto justify-center">
                    Continue to Course Selection <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white border border-prima-blush rounded-xl shadow-sm overflow-hidden">
                <div className="bg-prima-cream border-b border-prima-blush px-8 py-5">
                  <h2 className="font-display text-xl font-bold text-prima-charcoal">Select Your Course</h2>
                  <p className="text-prima-muted text-sm font-body mt-1">Choose the programme you would like to enroll in</p>
                </div>
                <div className="p-6 sm:p-8 space-y-8">
                  {CATEGORY_ORDER.map((cat) => {
                    const items = groupedCourses[cat]
                    if (!items) return null
                    return (
                      <div key={cat}>
                        <h3 className="text-xs font-bold tracking-widest uppercase text-prima-gold font-body mb-3 flex items-center gap-2">
                          <span className="w-6 h-px bg-prima-gold inline-block" />
                          {CATEGORY_LABELS[cat]}
                        </h3>
                        <div className="space-y-2">
                          {items.map((course) => (
                            <label
                              key={course.id}
                              className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                formValues.courseId === course.id
                                  ? 'border-prima-gold bg-prima-gold/5 shadow-sm'
                                  : 'border-prima-blush hover:border-prima-gold/40 hover:bg-prima-ivory'
                              }`}
                            >
                              <input
                                type="radio"
                                value={course.id}
                                {...register('courseId')}
                                className="accent-prima-gold shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-display font-semibold text-prima-charcoal text-sm leading-tight">{course.title}</p>
                                <p className="text-prima-muted text-xs font-body mt-0.5">{course.level} · {course.duration}</p>
                              </div>
                              <span className={`text-sm font-bold font-display shrink-0 ${formValues.courseId === course.id ? 'text-prima-gold' : 'text-prima-charcoal'}`}>
                                {formatPrice(course.price, 'ETB')}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  <FieldError message={errors.courseId?.message} />

                  <div className="space-y-5 pt-4 border-t border-prima-blush">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Preferred Start Date</label>
                      <input type="date" {...register('startDate')} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Payment Preference</label>
                      <select {...register('paymentPlan')} className={inputClass}>
                        <option value="full">Full Payment (5% discount)</option>
                        <option value="installments">3 Monthly Installments</option>
                        <option value="discuss">Discuss with Admissions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Additional Notes</label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Any questions or relevant experience to share?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => setStep(0)} className="btn-outline flex items-center gap-2">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button type="button" onClick={goToReviewStep} className="btn-primary">
                    Review Application <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white border border-prima-blush rounded-xl shadow-sm overflow-hidden">
                <div className="bg-prima-cream border-b border-prima-blush px-8 py-5">
                  <h2 className="font-display text-xl font-bold text-prima-charcoal">Review Your Application</h2>
                  <p className="text-prima-muted text-sm font-body mt-1">Please confirm your details before submitting</p>
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="rounded-lg border border-prima-blush bg-prima-ivory p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-prima-gold font-body mb-3">Applicant</p>
                    <p className="font-display font-bold text-prima-charcoal text-lg">{formValues.firstName} {formValues.lastName}</p>
                    <p className="text-prima-muted text-sm font-body mt-1">{formValues.email}</p>
                    <p className="text-prima-muted text-sm font-body">{formValues.phone}</p>
                  </div>

                  {selectedCourse && (
                    <div className="rounded-lg border border-prima-gold/40 bg-prima-gold/5 p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-prima-gold font-body mb-3">Selected Course</p>
                      <p className="font-display font-bold text-prima-charcoal text-lg">{selectedCourse.title}</p>
                      <p className="text-prima-muted text-sm font-body mt-1">{selectedCourse.level} · {selectedCourse.duration}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-prima-gold/20">
                        <span className="text-prima-muted text-xs font-body">
                          {t(PAYMENT_KEYS[formValues.paymentPlan])}
                        </span>
                        <span className="font-display font-bold text-prima-gold text-lg">{formatPrice(selectedCourse.price, 'ETB')}</span>
                      </div>
                    </div>
                  )}

                  {formValues.startDate && (
                    <div className="rounded-lg border border-prima-blush bg-prima-ivory p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-prima-muted font-body mb-1">Preferred Start Date</p>
                      <p className="text-prima-charcoal text-sm font-body font-semibold">
                        {new Date(formValues.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  )}

                  <label className="flex items-start gap-3 p-4 border border-prima-blush rounded-lg cursor-pointer hover:border-prima-gold/40 transition-colors">
                    <input
                      type="checkbox"
                      {...register('terms')}
                      className="mt-0.5 accent-prima-gold shrink-0"
                    />
                    <span className="text-prima-muted text-sm font-body leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-prima-gold underline underline-offset-2 hover:text-prima-gold-light">Terms and Conditions</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-prima-gold underline underline-offset-2 hover:text-prima-gold-light">Privacy Policy</Link>
                      {' '}of PRIMA Institute.
                    </span>
                  </label>
                  <FieldError message={errors.terms?.message} />
                </div>
                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex items-center gap-2">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
                    {isSubmitting ? 'Submitting…' : <>Submit Application <CheckCircle size={16} /></>}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { title: 'Free Application', desc: 'No application fee required' },
              { title: '2-Day Response', desc: 'Our team replies within 2 business days' },
              { title: 'Flexible Payment', desc: 'Installment plans available on request' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border border-prima-blush rounded-lg p-4">
                <div className="w-2 h-2 rounded-full bg-prima-gold mx-auto mb-3" />
                <p className="font-display text-sm font-semibold text-prima-charcoal mb-1">{title}</p>
                <p className="text-prima-muted text-xs font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
