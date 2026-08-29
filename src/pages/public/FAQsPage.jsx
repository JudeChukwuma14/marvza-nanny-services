import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import FAQAccordion from '../../components/ui/FAQAccordion'
import { fetchFaqs } from '../../api/content'

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

/* ── FAQ content now comes from the CMS (see fetch in FAQsPage()) ────── */

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

/* ── Main Component ─────────────────────────────────────────── */
export default function FAQsPage() {
  const [generalFaqs, setGeneralFaqs] = useState([])
  const [familiesFaqs, setFamiliesFaqs] = useState([])
  const [nanniesFaqs, setNanniesFaqs] = useState([])

  useEffect(() => {
    fetchFaqs('general').then(setGeneralFaqs).catch(() => {})
    fetchFaqs('families').then(setFamiliesFaqs).catch(() => {})
    fetchFaqs('nannies').then(setNanniesFaqs).catch(() => {})
  }, [])

  return (
    <PublicLayout>
      <SEOMeta
        title="FAQs"
        description="Frequently asked questions about finding a nanny or manny, or joining our agency in London. Learn about our vetting, fees, and process."
        canonical="https://marvza.com/faqs"
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <motion.p
              className="text-xs font-semibold text-accent uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Questions & Answers
            </motion.p>
            <motion.h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How can we <span className="text-accent">help?</span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Everything you need to know about our services, from vetting standards to placement timelines.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── FAQS ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16">
            <Section>
              <h3 className="font-serif text-2xl font-semibold text-text mb-8">General Questions</h3>
              <FAQAccordion items={generalFaqs} />
            </Section>

            <Section>
              <h3 className="font-serif text-2xl font-semibold text-text mb-8">For Families</h3>
              <FAQAccordion items={familiesFaqs} />
            </Section>

            <Section>
              <h3 className="font-serif text-2xl font-semibold text-text mb-8">For Nannies</h3>
              <FAQAccordion items={nanniesFaqs} />
            </Section>
          </div>

        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS? ────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <SectionLabel text="Still unsure?" />
            <SectionHeading centre>We're always here to help</SectionHeading>
            <p className="text-text-muted mt-4 mb-8">
              If you couldn't find the answer to your question, please don't hesitate to reach out to our team directly.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
              >
                Send us a message <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+447944219712"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-green/25 text-green font-semibold hover:bg-green/5 transition-colors"
              >
                <Phone size={16} /> Call Us
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

    </PublicLayout>
  )
}
