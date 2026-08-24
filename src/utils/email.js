import emailjs from '@emailjs/browser'

function getEmailConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }
}

export function isEmailConfigured() {
  const { serviceId, publicKey } = getEmailConfig()
  return Boolean(serviceId && publicKey)
}

export async function sendEmail(templateId, templateParams) {
  const { serviceId, publicKey } = getEmailConfig()

  if (!serviceId || !publicKey || !templateId) {
    throw new Error('EmailJS is not configured. Add credentials to your .env file.')
  }

  return emailjs.send(serviceId, templateId, templateParams, publicKey)
}

export async function sendContactEmail(params) {
  const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
  return sendEmail(templateId, {
    from_name: params.name,
    from_email: params.email,
    phone: params.phone || 'Not provided',
    subject: params.subject,
    message: params.message,
  })
}

export async function sendEnrollEmail(params) {
  const templateId = import.meta.env.VITE_EMAILJS_ENROLL_TEMPLATE_ID
  return sendEmail(templateId, {
    first_name: params.firstName,
    last_name: params.lastName,
    email: params.email,
    phone: params.phone,
    course_title: params.courseTitle,
    course_price: params.coursePrice,
    start_date: params.startDate || 'Not specified',
    payment_plan: params.paymentPlan,
    notes: params.notes || 'None',
  })
}
