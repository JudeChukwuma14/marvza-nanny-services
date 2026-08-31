import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Phone, Users, UserCheck, Heart, Shield, Clock, Award, Zap, Hotel, Moon } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import ServiceCard from '../../components/common/ServiceCard'
import TestimonialCard from '../../components/common/TestimonialCard'
import NannyCard from '../../components/common/NannyCard'
import FAQAccordion from '../../components/ui/FAQAccordion'
import { SERVICES } from '../../constants/services'
import { FEATURED_NANNIES } from '../../constants/nannies'
import { fetchTestimonials, fetchFaqs } from '../../api/content'
import heroVideo from '../../assets/vid.mp4'


/* ── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
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

const VETTING_ITEMS = [
  'Enhanced DBS Checks',
  'Reference Checks (Professional & Personal)',
  'First Aid Trained (Paediatric)',
  'Right to Work in UK',
  'Verification of Qualifications',
]

const HOW_STEPS_FAMILIES = [
  { num: '01', title: 'Tell us what you need', body: 'Share your family\'s requirements and schedule.' },
  { num: '02', title: 'We identify suitable childcare', body: 'We match you with experienced, pre-vetted candidates.' },
  { num: '03', title: 'Review & confirm', body: 'Meet your top choices or confirm the booking.' },
  { num: '04', title: 'Your nanny arrives', body: 'Enjoy peace of mind with trusted, reliable childcare.' },
]

const HOW_STEPS_NANNIES = [
  { num: '01', title: 'Application', body: 'Submit your credentials.' },
  { num: '02', title: 'Interview', body: 'Discuss your experience and career goals.' },
  { num: '03', title: 'Vetting', body: 'Complete our rigorous screening process.' },
  { num: '04', title: 'Matching', body: 'Find families that align with your expertise.' },
]

const STATS = [
  { icon: Users, value: '500+', label: 'Families Matched' },
  { icon: Shield, value: '100%', label: 'DBS Checked' },
  { icon: Clock, value: '24h', label: 'Emergency Response' },
  { icon: Award, value: '10+', label: 'Years of Experience' },
]

/* ── Animated section wrapper ──────────────────────────────── */
function Section({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
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

function SectionSubheading({ children, centre = false }) {
  return (
    <motion.p
      variants={fadeUp}
      className={`text-base text-text-muted leading-relaxed max-w-2xl ${centre ? 'mx-auto text-center' : ''}`}
    >
      {children}
    </motion.p>
  )
}

/* ── Wave Divider ──────────────────────────────────────────── */
function WaveDivider({ fillColor = '#F8F3EA', className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 lg:h-20"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

/* ── Main Component ─────────────────────────────────────────── */
export default function HomePage() {
  const [testimonials, setTestimonials] = useState([])
  const [faqPreview, setFaqPreview] = useState([])

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(() => {})
    fetchFaqs('homepage').then(setFaqPreview).catch(() => {})
  }, [])

  return (
    <PublicLayout>
      <SEOMeta
        title="Private Nannies & Mannies in London"
        description="Marvza is a premium London agency for private nannies and mannies. We match families with trusted, experienced childcare professionals for full-time, live-in, live-out, backup, emergency and event childcare."
        canonical="https://marvza.com/"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-140 sm:min-h-[70vh] flex items-center">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          poster={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 md:w-3/5 lg:w-184 bg-gradient-to-r from-black from-0% via-black/80 via-70% to-transparent to-100%" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
          <div className="max-w-xl">

            <motion.h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.12] mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Private Nannies & Mannies for London Families
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-white/75 leading-relaxed mb-8 sm:mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Permanent, temporary, emergency, evening, weekend, hotel and event childcare. Providing premium childcare across all London boroughs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/request-nanny"
                  className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-black/30"
                >
                  Request a Nanny
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone size={16} />
                  Speak to Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="mt-8 sm:mt-10 flex flex-wrap gap-x-5 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/services/backup-emergency-nanny" className="flex items-center gap-2 text-sm text-white hover:text-accent font-medium transition-colors">
                <Zap size={16} className="text-accent shrink-0" />
                Emergency Nanny
              </Link>
              <Link to="/services/hotel-nanny" className="flex items-center gap-2 text-sm text-white hover:text-accent font-medium transition-colors">
                <Hotel size={16} className="text-accent shrink-0" />
                Hotel Nanny
              </Link>
              <Link to="/services/evening-babysitter" className="flex items-center gap-2 text-sm text-white hover:text-accent font-medium transition-colors">
                <Moon size={16} className="text-accent shrink-0" />
                Evening Babysitter
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WAVE DIVIDER ─────────────────────────────────────── */}
      <WaveDivider fillColor="#F8F3EA" className="bg-black/40 -mt-1" />

      {/* ── STATS / CREDIBILITY ──────────────────────────────── */}
      <section className="py-14 lg:py-18 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={22} className="text-accent" />
                </div>
                <p className="font-serif text-3xl sm:text-4xl font-semibold text-text mb-1">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="mb-12">
            <SectionLabel text="Our Services" />
            <SectionHeading>Childcare for every situation</SectionHeading>
            <SectionSubheading>
              From permanent live-in arrangements to same-day emergency cover — we have a service to match your family's needs.
            </SectionSubheading>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.filter(s => [
              'full-time-nanny',
              'backup-emergency-nanny',
              'evening-babysitter',
              'hotel-nanny',
              'event-nanny',
              'maternity-newborn-nanny',
            ].includes(s.slug)).map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12 p-8 rounded-2xl bg-bg border border-border flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-left">
              <h3 className="font-serif text-lg font-semibold text-text">Looking for Part-Time, Night Care, After-School or Travel Nannies?</h3>
              <p className="text-sm text-text-muted mt-1">We offer 12 specialized childcare services across London to match your family's exact needs.</p>
            </div>
            <Link
              to="/services"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green text-white text-sm font-semibold hover:bg-green-dark transition-colors shadow-sm"
            >
              Explore All 12 Services <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-16">
            <SectionLabel text="Simple Process" />
            <SectionHeading centre>How it works</SectionHeading>
            <SectionSubheading centre>
              From first contact to placement, we guide you every step of the way.
            </SectionSubheading>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { label: 'For Families', icon: Users, steps: HOW_STEPS_FAMILIES },
              { label: 'For Nannies', icon: UserCheck, steps: HOW_STEPS_NANNIES },
            ].map((col, colIndex) => (
              <div key={col.label}>
                <div className="flex items-center gap-2.5 mb-6">
                  <col.icon size={18} className="text-green" />
                  <h3 className="font-serif text-xl font-semibold text-text">{col.label}</h3>
                </div>
                <div className="flex flex-col divide-y divide-border">
                  {col.steps.map((step, i) => (
                    <motion.div
                      key={step.num}
                      className="flex items-start gap-4 py-4"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: colIndex * 0.1 + i * 0.08, duration: 0.4 }}
                    >
                      <span className="text-lg font-serif font-semibold text-accent w-8 shrink-0">{step.num}</span>
                      <div>
                        <h4 className="text-sm font-semibold text-text mb-1">{step.title}</h4>
                        <p className="text-sm text-text-muted leading-relaxed">{step.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green hover:text-accent transition-colors"
              >
                Learn more about our process <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Vetting process checklist */}
          <motion.div
            className="mt-16 bg-green rounded-3xl p-10 lg:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2">Our Vetting Process</h3>
              <p className="text-sm text-white/60 mb-8">We maintain the highest standards for your peace of mind.</p>
              <div className="flex flex-col gap-3 text-left max-w-md mx-auto">
                {VETTING_ITEMS.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                  >
                    <CheckCircle size={18} className="text-accent shrink-0" />
                    <span className="text-sm text-white/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED NANNIES ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12">
            <SectionLabel text="Meet the Team" />
            <SectionHeading centre>Featured nannies</SectionHeading>
            <SectionSubheading centre>
              Experienced, vetted professionals ready to join your family.
            </SectionSubheading>
          </Section>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
            {FEATURED_NANNIES.map((nanny, i) => (
              <div key={nanny.name} className="snap-start">
                <NannyCard nanny={nanny} index={i} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-6">
            {FEATURED_NANNIES.map((nanny, i) => (
              <span
                key={nanny.name}
                className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-green' : 'bg-border'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12">
            <SectionLabel text="What Families Say" />
            <SectionHeading centre>Stories from London families</SectionHeading>
            <SectionSubheading centre>
              Hear from families who found their perfect match through Marvza.
            </SectionSubheading>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Section className="text-center mb-10">
            <SectionLabel text="Questions" />
            <SectionHeading centre>Frequently asked questions</SectionHeading>
          </Section>

          <FAQAccordion items={faqPreview} />

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green hover:text-accent transition-colors"
            >
              View all FAQs <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-bg to-surface-raised">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-green rounded-3xl p-10 lg:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Get Started Today</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
                Ready to find your perfect nanny?
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto text-base">
                Tell us about your family and what you need. Our team will be in touch to discuss suitable nannies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/request-nanny"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/30"
                  >
                    Request a Nanny <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/25 text-white font-semibold hover:bg-white/8 transition-colors"
                  >
                    <Phone size={16} /> Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
