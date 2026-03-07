import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ChevronRight } from 'lucide-react'
import courses from '../data/courses.json'
import { formatPrice } from '../utils/helpers'
import { useStore } from '../store/useStore'

const STEPS = ['Personal Info', 'Course Selection', 'Review & Submit']

export default function EnrollPage() {
  const { showNotification } = useStore()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    courseId: '', startDate: '', paymentPlan: 'full',
    message: '', terms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const selectedCourse = courses.find((c) => c.id === form.courseId)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    showNotification('Application submitted! Check your email.', 'success')
  }

  if (submitted) return (
    <div className="min-h-screen bg-prima-ivory flex items-center justify-center pt-20">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 bg-prima-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-prima-gold" />
        </div>
        <h2 className="font-display text-3xl font-semibold text-prima-charcoal mb-4">Application Received!</h2>
        <p className="text-prima-muted font-body leading-relaxed mb-8">
          Thank you for applying to Prima Institute. Our admissions team will review your application and contact you within 2 business days.
        </p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    </div>
  )

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima max-w-3xl">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">Join Prima</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Enrollment Application</h1>

          {/* Stepper */}
          <div className="flex items-center gap-0 mt-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 text-xs font-body font-medium ${
                  i <= step ? 'text-prima-gold' : 'text-white/40'
                }`}>
                  <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold ${
                    i < step ? 'bg-prima-gold text-prima-charcoal' :
                    i === step ? 'border-2 border-prima-gold text-prima-gold' :
                    'border border-white/30 text-white/40'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </span>
                  <span className="hidden sm:block">{s}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="mx-3 text-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima max-w-3xl">
          <form onSubmit={handleSubmit}>
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <div className="bg-white border border-prima-blush p-4 sm:p-6 md:p-8">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-prima-charcoal mb-6 sm:mb-8">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                  {[['firstName', 'First Name', 'text'], ['lastName', 'Last Name', 'text']].map(([name, label, type]) => (
                    <div key={name}>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">{label} *</label>
                      <input type={type} name={name} value={form[name]} onChange={handleChange} required className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  {[['email', 'Email Address', 'email'], ['phone', 'Phone Number', 'tel']].map(([name, label, type]) => (
                    <div key={name}>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">{label} *</label>
                      <input type={type} name={name} value={form[name]} onChange={handleChange} required className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors" />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setStep(1)} className="btn-primary mt-8">
                  Continue to Course Selection <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 1: Course Selection */}
            {step === 1 && (
              <div className="bg-white border border-prima-blush p-4 sm:p-6 md:p-8">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-prima-charcoal mb-6 sm:mb-8">Select Your Course</h2>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className={`flex gap-4 p-4 border cursor-pointer transition-colors ${
                        form.courseId === course.id
                          ? 'border-prima-gold bg-prima-cream'
                          : 'border-prima-blush hover:border-prima-gold/50'
                      }`}
                    >
                      <input type="radio" name="courseId" value={course.id} checked={form.courseId === course.id} onChange={handleChange} className="mt-1 accent-prima-gold" />
                      <div>
                        <p className="font-display font-semibold text-prima-charcoal text-sm">{course.title}</p>
                        <p className="text-prima-muted text-xs font-body">{course.duration} · {formatPrice(course.price)}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Preferred Start Date</label>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Payment Preference</label>
                    <select name="paymentPlan" value={form.paymentPlan} onChange={handleChange} className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors">
                      <option value="full">Full Payment (5% discount)</option>
                      <option value="installments">3 Monthly Installments</option>
                      <option value="discuss">Discuss with Admissions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Additional Notes</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors resize-none" placeholder="Any questions or relevant experience to share?" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button type="button" onClick={() => setStep(0)} className="btn-outline">Back</button>
                  <button type="button" onClick={() => setStep(2)} className="btn-primary" disabled={!form.courseId}>
                    Review Application <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-white border border-prima-blush p-4 sm:p-6 md:p-8">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-prima-charcoal mb-6 sm:mb-8">Review Your Application</h2>
                <div className="space-y-6 mb-8">
                  <div className="p-5 bg-prima-ivory border border-prima-blush">
                    <p className="text-xs font-semibold tracking-widest uppercase text-prima-muted mb-3 font-body">Applicant</p>
                    <p className="font-display font-semibold text-prima-charcoal">{form.firstName} {form.lastName}</p>
                    <p className="text-prima-muted text-sm font-body">{form.email} · {form.phone}</p>
                  </div>
                  {selectedCourse && (
                    <div className="p-5 bg-prima-ivory border border-prima-blush">
                      <p className="text-xs font-semibold tracking-widest uppercase text-prima-muted mb-3 font-body">Selected Course</p>
                      <p className="font-display font-semibold text-prima-charcoal">{selectedCourse.title}</p>
                      <p className="text-prima-muted text-sm font-body">{selectedCourse.duration} · {formatPrice(selectedCourse.price)}</p>
                    </div>
                  )}
                </div>
                <label className="flex items-start gap-3 mb-8">
                  <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} required className="mt-1 accent-prima-gold" />
                  <span className="text-prima-muted text-sm font-body">
                    I agree to the <a href="#" className="text-prima-gold underline">Terms and Conditions</a> and <a href="#" className="text-prima-gold underline">Privacy Policy</a> of Prima Institute.
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button type="submit" className="btn-primary" disabled={!form.terms}>
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
