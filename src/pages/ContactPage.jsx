import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useStore } from "../store/useStore";

export default function ContactPage() {
  const { showNotification } = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000)); // Simulate send
    setSubmitting(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    showNotification(
      "Message sent! We'll get back to you within 24 hours.",
      "success",
    );
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <div className="bg-prima-charcoal pt-28 pb-16">
        <div className="container-prima">
          <span className="font-accent text-prima-gold text-sm tracking-[0.25em] uppercase mb-4 block">
            Reach Out
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 font-body max-w-xl">
            Have questions about our programmes? We'd love to hear from you.
          </p>
        </div>
      </div>

      <section className="section-padding bg-prima-ivory">
        <div className="container-prima">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-8">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                        {field === "name" ? "Full Name *" : "Email Address *"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-white"
                        placeholder={
                          field === "name" ? "Your name" : "your@email.com"
                        }
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-white"
                    placeholder="+2519 3416 0075"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option>Course Enquiry</option>
                    <option>Enrollment Information</option>
                    <option>Payment & Fees</option>
                    <option>Corporate Training</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-prima-charcoal mb-2 font-body">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-prima-blush px-4 py-3 text-sm font-body focus:outline-none focus:border-prima-gold transition-colors bg-white resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center"
                >
                  {submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-prima-charcoal mb-8">
                  Find Us
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Address",
                      content:
                        "Gerji Roba, Bole Sub City\nAddis Ababa, Ethiopia",
                    },
                    { icon: Phone, title: "Phone", content: "+251 911 408040" },
                    {
                      icon: Mail,
                      title: "Email",
                      content: "Ethioprima@gmail.com",
                    },
                    {
                      icon: Clock,
                      title: "Office Hours",
                      content:
                        "Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 2:00 PM",
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

              {/* Map */}
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
  );
}
