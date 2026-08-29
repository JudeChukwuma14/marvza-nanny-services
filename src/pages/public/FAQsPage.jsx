import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import FAQAccordion from '../../components/ui/FAQAccordion'

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
const FAQS_GENERAL = [
  {
    question: 'What areas of London do you cover?',
    answer: 'We cover all London boroughs, including Central, North, South, East, and West London. We can also accommodate requests just outside Greater London on a case-by-case basis.',
  },
  {
    question: 'How does the vetting process work?',
    answer: 'Our vetting is rigorous. Every nanny must have an enhanced DBS check, Paediatric First Aid, right to work in the UK, and at least two verified professional references. We also conduct thorough in-person or video interviews.',
  },
  {
    question: 'What are your office hours?',
    answer: 'Our standard office hours are Monday to Friday, 8am to 6pm. However, we monitor emergency requests outside of these hours to provide support when you need it most.',
  },
]

const FAQS_FAMILIES = [
  {
    question: 'How quickly can you find a nanny for us?',
    answer: 'For emergency cover, we can often place a nanny within hours. For permanent roles, the process typically takes 2-4 weeks to ensure we find the perfect match through careful curation and interviews.',
  },
  {
    question: 'Do we have to pay a registration fee?',
    answer: 'No, we do not charge an upfront registration fee to begin the search. You only pay our placement fee once you have successfully hired a nanny through us.',
  },
  {
    question: 'What happens if the nanny isn\'t the right fit?',
    answer: 'We offer a replacement guarantee period (typically 4 to 8 weeks, depending on the contract). If the placement does not work out during this time, we will find a suitable replacement free of charge.',
  },
  {
    question: 'Do you help with contracts and payroll?',
    answer: 'Yes. We provide standard employment contract templates and can recommend trusted specialist payroll providers to ensure you are fully compliant with UK employment law.',
  },
]

const FAQS_NANNIES = [
  {
    question: 'Do I have to pay to register with Marvza?',
    answer: 'Absolutely not. We never charge nannies a fee to register, interview, or be placed with a family.',
  },
  {
    question: 'Do I need formal childcare qualifications?',
    answer: 'While formal qualifications (like CACHE or Norland) are highly valued, they are not strictly required if you have significant, verifiable professional experience (usually 2+ years) working as a nanny.',
  },
  {
    question: 'Will I be employed by Marvza or the family?',
    answer: 'For permanent and most temporary roles, you will be directly employed by the family. For certain ad-hoc or event roles, different arrangements may apply, which will always be discussed upfront.',
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

/* ── Main Component ─────────────────────────────────────────── */
export default function FAQsPage() {
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
              <FAQAccordion items={FAQS_GENERAL} />
            </Section>

            <Section>
              <h3 className="font-serif text-2xl font-semibold text-text mb-8">For Families</h3>
              <FAQAccordion items={FAQS_FAMILIES} />
            </Section>

            <Section>
              <h3 className="font-serif text-2xl font-semibold text-text mb-8">For Nannies</h3>
              <FAQAccordion items={FAQS_NANNIES} />
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
