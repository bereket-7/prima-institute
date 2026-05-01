import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ChevronRight, ChevronLeft, User, BookOpen, ClipboardCheck } from 'lucide-react'
import courses from '../data/courses.json'
import { formatPrice } from '../utils/helpers'
import { useStore } from '../store/useStore'

const STEPS = [
  { label: 'Personal Info', icon: User },
  { label: 'Course Selection', icon: BookOpen },
  { label: 'Review & Submit', icon: ClipboardCheck },
]

const CATEGORY_LABELS = {
  culinary:        'Culinary Arts',
  'food-drinks':   'Bakery & Pastry',
  'beauty-makeup': 'Beauty & Hair Dressing',
  fashion:         'Fashion Design',
  computer:        'Computer Training',
}

const CATEGORY_ORDER = ['culinary', 'food-drinks', 'beauty-makeup', 'fashion', 'computer']

const groupedCourses = CATEGORY_ORDER.reduce((acc, cat) => {
  const items = courses.filter((c) => c.category === cat)
  if (items.length) acc[cat] = items
  return acc
}, {})

function InputField({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
        {label} {required && <span className="text-prima-gold">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-prima-blush px-4 py-3 text-sm font-body bg-prima-ivory focus:outline-none focus:border-prima-gold focus:bg-white transition-all rounded-sm"
      />
    </div>
  )
}

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
    showNotification('Application submitted! We will contact you within 2 business days.', 'success')
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-prima-ivory flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-prima-gold/10 border-2 border-prima-gold/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={44} className="text-prima-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-prima-charcoal mb-4">Application Received!</h2>
          <p className="text-prima-muted font-body leading-relaxed mb-3">
            Thank you for applying to <strong className="text-prima-charcoal">PRIMA Institute</strong>.
          </p>
          <p className="text-prima-muted font-body leading-relaxed mb-10">
            Our admissions team will review your application and contact you within{' '}
            <strong className="text-prima-charcoal">2 business days</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">Return Home</Link>
            <Link to="/courses" className="btn-outline">Browse Courses</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-prima-charcoal via-prima-charcoal to-prima-charcoal-soft pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.15),transparent_60%)]" />
        </div>
        <div className="container-prima max-w-3xl relative z-10">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">Join PRIMA</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-8">Enrollment Application</h1>

          {/* Stepper */}
          <div className="flex items-center">
            {STEPS.map(({ label, icon: Icon }, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center gap-2.5 text-xs font-body font-medium transition-colors ${i <= step ? 'text-prima-gold' : 'text-white/30'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center transition-all ${
                    i < step   ? 'bg-prima-gold text-prima-charcoal' :
                    i === step ? 'border-2 border-prima-gold text-prima-gold bg-prima-gold/10' :
                                 'border border-white/20 text-white/30'
                  }`}>
                    {i < step ? <CheckCircle size={14} /> : <Icon size={14} />}
                  </div>
                  <span className="hidden sm:block tracking-wide">{label}</span>
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
          <form onSubmit={handleSubmit}>

            {/* Step 0: Personal Info */}
            {step === 0 && (
              <div className="bg-white border border-prima-blush rounded-xl shadow-sm overflow-hidden">
                <div className="bg-prima-cream border-b border-prima-blush px-8 py-5">
                  <h2 className="font-display text-xl font-bold text-prima-charcoal">Personal Information</h2>
                  <p className="text-prima-muted text-sm font-body mt-1">Tell us a bit about yourself</p>
                </div>
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
                    <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                  <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
                  <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+251 9XX XXX XXX" />
                </div>
                <div className="px-8 pb-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={!form.firstName || !form.lastName || !form.email || !form.phone}
                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue to Course Selection <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Course Selection */}
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
                                form.courseId === course.id
                                  ? 'border-prima-gold bg-prima-gold/5 shadow-sm'
                                  : 'border-prima-blush hover:border-prima-gold/40 hover:bg-prima-ivory'
                              }`}
                            >
                              <input
                                type="radio"
                                name="courseId"
                                value={course.id}
                                checked={form.courseId === course.id}
                                onChange={handleChange}
                                className="accent-prima-gold shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-display font-semibold text-prima-charcoal text-sm leading-tight">{course.title}</p>
                                <p className="text-prima-muted text-xs font-body mt-0.5">{course.level} · {course.duration}</p>
                              </div>
                              <span className={`text-sm font-bold font-display shrink-0 ${form.courseId === course.id ? 'text-prima-gold' : 'text-prima-charcoal'}`}>
                                {formatPrice(course.price, 'ETB')}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  <div className="space-y-5 pt-4 border-t border-prima-blush">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Preferred Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full border border-prima-blush px-4 py-3 text-sm font-body bg-prima-ivory focus:outline-none focus:border-prima-gold focus:bg-white transition-all rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Payment Preference</label>
                      <select
                        name="paymentPlan"
                        value={form.paymentPlan}
                        onChange={handleChange}
                        className="w-full border border-prima-blush px-4 py-3 text-sm font-body bg-prima-ivory focus:outline-none focus:border-prima-gold focus:bg-white transition-all rounded-sm"
                      >
                        <option value="full">Full Payment (5% discount)</option>
                        <option value="installments">3 Monthly Installments</option>
                        <option value="discuss">Discuss with Admissions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">Additional Notes</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any questions or relevant experience to share?"
                        className="w-full border border-prima-blush px-4 py-3 text-sm font-body bg-prima-ivory focus:outline-none focus:border-prima-gold focus:bg-white transition-all rounded-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => setStep(0)} className="btn-outline flex items-center gap-2">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!form.courseId}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Review Application <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-white border border-prima-blush rounded-xl shadow-sm overflow-hidden">
                <div className="bg-prima-cream border-b border-prima-blush px-8 py-5">
                  <h2 className="font-display text-xl font-bold text-prima-charcoal">Review Your Application</h2>
                  <p className="text-prima-muted text-sm font-body mt-1">Please confirm your details before submitting</p>
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="rounded-lg border border-prima-blush bg-prima-ivory p-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-prima-gold font-body mb-3">Applicant</p>
                    <p className="font-display font-bold text-prima-charcoal text-lg">{form.firstName} {form.lastName}</p>
                    <p className="text-prima-muted text-sm font-body mt-1">{form.email}</p>
                    <p className="text-prima-muted text-sm font-body">{form.phone}</p>
                  </div>

                  {selectedCourse && (
                    <div className="rounded-lg border border-prima-gold/40 bg-prima-gold/5 p-5">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-prima-gold font-body mb-3">Selected Course</p>
                      <p className="font-display font-bold text-prima-charcoal text-lg">{selectedCourse.title}</p>
                      <p className="text-prima-muted text-sm font-body mt-1">{selectedCourse.level} · {selectedCourse.duration}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-prima-gold/20">
                        <span className="text-prima-muted text-xs font-body">
                          {form.paymentPlan === 'full' ? 'Full Payment (5% discount)' :
                           form.paymentPlan === 'installments' ? '3 Monthly Installments' : 'Discuss with Admissions'}
                        </span>
                        <span className="font-display font-bold text-prima-gold text-lg">{formatPrice(selectedCourse.price, 'ETB')}</span>
                      </div>
                    </div>
                  )}

                  {form.startDate && (
                    <div className="rounded-lg border border-prima-blush bg-prima-ivory p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-prima-muted font-body mb-1">Preferred Start Date</p>
                      <p className="text-prima-charcoal text-sm font-body font-semibold">
                        {new Date(form.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  )}

                  <label className="flex items-start gap-3 p-4 border border-prima-blush rounded-lg cursor-pointer hover:border-prima-gold/40 transition-colors">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={form.terms}
                      onChange={handleChange}
                      required
                      className="mt-0.5 accent-prima-gold shrink-0"
                    />
                    <span className="text-prima-muted text-sm font-body leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-prima-gold underline underline-offset-2 hover:text-prima-gold-light">Terms and Conditions</a>
                      {' '}and{' '}
                      <a href="#" className="text-prima-gold underline underline-offset-2 hover:text-prima-gold-light">Privacy Policy</a>
                      {' '}of PRIMA Institute.
                    </span>
                  </label>
                </div>
                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex items-center gap-2">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={!form.terms}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Application <CheckCircle size={16} />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Trust signals */}
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
