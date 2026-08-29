import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, ArrowRight, Send,
  CheckCircle, MessageSquare, Users, Baby,
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'

/* ── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ── Data ──────────────────────────────────────────────────── */
const CONTACT_PHONE = '+44 7944 219712'
const CONTACT_PHONE_HREF = 'tel:+447944219712'
const CONTACT_EMAIL = 'Hello@marvza.com'
const CONTACT_EMAIL_HREF = 'mailto:Hello@marvza.com'

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: 'Call Us',
    detail: CONTACT_PHONE,
    sub: 'Mon–Fri, 8am–6pm',
    href: CONTACT_PHONE_HREF,
    actionLabel: 'Call now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    detail: CONTACT_EMAIL,
    sub: 'We typically reply within 24 hours',
    href: CONTACT_EMAIL_HREF,
    actionLabel: 'Send email',
  },
  {
    icon: MapPin,
    title: 'Our Location',
    detail: 'London, United Kingdom',
    sub: 'Serving all London boroughs',
    href: null,
    actionLabel: null,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    detail: 'Mon–Fri, 8am–6pm',
    sub: 'Emergency cover available outside hours',
    href: null,
    actionLabel: null,
  },
]

const ENQUIRY_TYPES = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'family', label: 'I\'m a Family Looking for a Nanny' },
  { value: 'nanny', label: 'I\'m a Nanny Looking for Work' },
  { value: 'partnership', label: 'Business / Partnership' },
  { value: 'other', label: 'Other' },
]

const QUICK_LINKS = [
  {
    icon: Users,
    title: 'Request a Nanny',
    description: 'Tell us about your family and childcare needs.',
    to: '/request-nanny',
    cta: 'Start a request',
  },
  {
    icon: Baby,
    title: 'Become a Nanny',
    description: 'Join our network of trusted childcare professionals.',
    to: '/apply',
    cta: 'Apply now',
  },
]

/* ── Reusable section helpers ──────────────────────────────── */
function Section({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ text }) {
  return (
    <motion.p variants={fadeUp} className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
      {text}
    </motion.p>
  )
}

function SectionHeading({ children, centre = false }) {
  return (
    <motion.h2
      variants={fadeUp}
      className={`font-serif text-3xl sm:text-4xl font-semibold text-text leading-tight ${centre ? 'text-center' : ''}`}
    >
      {children}
    </motion.h2>
  )
}

/* ── Contact Form ──────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    // Simulate a short delay — replace with real API call when endpoint exists
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white rounded-2xl border border-border p-8 sm:p-10 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-success-bg flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={28} className="text-success" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-text mb-3">Message received</h3>
          <p className="text-sm text-text-muted leading-relaxed max-w-sm mx-auto mb-6">
            Thank you for getting in touch. A member of our team will respond within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', type: 'general', message: '' }) }}
            className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-border p-8 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center">
              <MessageSquare size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-text">Send us a message</h3>
              <p className="text-xs text-text-muted">We'll get back to you within 24 hours.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1.5">
                  Full name <span className="text-error">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1.5">
                  Email address <span className="text-error">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                />
              </div>
            </div>

            {/* Phone + Type row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-text mb-1.5">
                  Phone number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+44 7XXX XXX XXX"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-type" className="block text-sm font-medium text-text mb-1.5">
                  What is this about?
                </label>
                <select
                  id="contact-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors appearance-none"
                >
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-1.5">
                Your message <span className="text-error">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help…"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto self-end inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-green text-white text-sm font-semibold hover:bg-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

/* ── Main Component ─────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="Contact Us"
        description="Get in touch with Marvza — London's premium agency for private nannies and mannies. Call, email, or send us a message and our team will respond within 24 hours."
        canonical="https://marvza.com/contact"
      />

      {/* ── PAGE HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <motion.p
              className="text-xs font-semibold text-accent uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Contact Us
            </motion.p>
            <motion.h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We'd love to{' '}
              <span className="text-accent">hear from you</span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Whether you're looking for a nanny, want to join our network, or simply have a question — our London-based team is here to help.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── CONTACT METHODS STRIP ────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_METHODS.map((method, i) => (
              <motion.div
                key={method.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shrink-0">
                  <method.icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text mb-0.5">{method.title}</p>
                  {method.href ? (
                    <a href={method.href} className="text-sm text-accent hover:text-accent-dark transition-colors font-medium">
                      {method.detail}
                    </a>
                  ) : (
                    <p className="text-sm text-text-muted font-medium">{method.detail}</p>
                  )}
                  <p className="text-xs text-text-subtle mt-0.5">{method.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ───────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form — takes 3 columns */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar — takes 2 columns */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Quick links */}
              <Section>
                <SectionLabel text="Quick Links" />
                <p className="text-sm text-text-muted mb-5">Looking for something specific? These might help:</p>
              </Section>

              {QUICK_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.to}
                    className="group block bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:border-green/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shrink-0">
                        <link.icon size={18} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-text mb-1">{link.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed mb-2">{link.description}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green group-hover:gap-2.5 transition-all">
                          {link.cta} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Location card */}
              <motion.div
                className="bg-green rounded-2xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-accent" />
                    <p className="text-xs font-semibold text-accent uppercase tracking-widest">Based in London</p>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed mb-4">
                    Our team is based in London and we place nannies across all London boroughs. We're happy to discuss your location during your enquiry.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Central', 'North', 'South', 'East', 'West', 'Greater London'].map((area) => (
                      <span key={area} className="text-[11px] font-medium text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SECTION ────────────────────────────────────── */}
      {/* <section className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="rounded-3xl overflow-hidden h-[400px] relative shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop" 
              alt="Friendly Marvza team member" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <h3 className="text-white font-serif text-2xl font-semibold mb-2">Based in the heart of London</h3>
               <p className="text-white/80 max-w-lg">Our dedicated team is ready to assist you with all your childcare needs, providing a personal touch to every match.</p>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* ── FAQ TEASER ───────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Section>
            <SectionLabel text="Have Questions?" />
            <SectionHeading centre>Check our FAQs first</SectionHeading>
            <motion.p variants={fadeUp} className="text-base text-text-muted leading-relaxed max-w-xl mx-auto mt-3 mb-8">
              Many common questions about our services, process, and pricing are already answered in our FAQ section.
            </motion.p>
            <motion.div variants={fadeUp}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  to="/faqs"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-green/25 text-green text-sm font-semibold hover:bg-green/5 transition-colors"
                >
                  View FAQs <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </Section>
        </div>
      </section>
    </PublicLayout>
  )
}
