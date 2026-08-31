import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Shield, Users, Heart } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
}
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

function Section({ children, className = '' }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
      {children}
    </motion.div>
  )
}
function SectionLabel({ text }) {
  return <motion.p variants={fadeUp} className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">{text}</motion.p>
}
function SectionHeading({ children, centre = false }) {
  return <motion.h2 variants={fadeUp} className={`font-serif text-3xl sm:text-4xl font-semibold text-text leading-tight ${centre ? 'text-center' : ''}`}>{children}</motion.h2>
}

const REASONS = [
  { icon: Users, title: 'Active & Energetic Care', body: 'Many families choose a manny for his active approach to childcare — outdoor adventures, sport, games, and physical play that keeps children engaged and moving.' },
  { icon: Heart, title: 'Positive Male Role Model', body: 'For families where a male role model is valued — whether single-parent households, families with sons, or simply families who appreciate diversity in childcare — a manny brings a different dynamic.' },
  { icon: Shield, title: 'Same Rigorous Vetting', body: 'Every manny in our network goes through the exact same screening process as our female nannies: enhanced DBS, verified references, paediatric first aid, and face-to-face interviews.' },
]

const FAQS = [
  { question: 'What is a manny?', answer: 'A manny is a male nanny — a professional childcare provider who happens to be male. Mannies hold the same qualifications, experience, and certifications as female nannies.' },
  { question: 'Why choose a manny?', answer: 'Families choose mannies for many reasons: active and energetic play, a positive male role model, diversity of care, or simply because the best-matched candidate for your family happens to be male.' },
  { question: 'Are mannies vetted differently?', answer: 'No. Every manny undergoes the identical rigorous screening process as every other nanny in our network, including enhanced DBS checks, verified professional and personal references, right-to-work checks, and paediatric first aid certification.' },
  { question: 'Can a manny do everything a female nanny does?', answer: 'Absolutely. Mannies manage the same responsibilities: school runs, meal preparation, homework support, bath and bedtime routines, activity coordination, and all aspects of daily childcare.' },
]

export default function ManniesPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="Mannies in London | Male Nannies"
        description="Discover Marvza's male nanny (manny) service. Professional, fully vetted male childcare professionals for London families."
        canonical="https://marvza.com/mannies"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              Mannies
            </motion.p>
            <motion.h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.12] mb-5"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              Professional <span className="text-accent">Male Nannies</span> for London Families
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              "Mannies" is in our name for a reason. We believe the best childcare professional for your family should be chosen on experience and fit — not gender.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
              <Link to="/request-nanny" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                Request a Manny <ArrowRight size={16} />
              </Link>
              <a href="tel:+447944219712" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
                Speak to Our Team
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE A MANNY ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12 sm:mb-14">
            <SectionLabel text="Why a Manny?" />
            <SectionHeading centre>What makes a manny a great choice</SectionHeading>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                className="bg-bg rounded-2xl border border-border p-7 hover:shadow-lg hover:border-green/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center mb-5">
                  <reason.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text mb-2">{reason.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{reason.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW MATCHING WORKS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="mb-10">
            <SectionLabel text="The Process" />
            <SectionHeading>How manny matching works</SectionHeading>
            <motion.p variants={fadeUp} className="text-base text-text-muted leading-relaxed mt-3">
              The process for finding a manny is identical to finding any nanny through Marvza. When you submit a request, simply let us know if you'd prefer a male childcare professional, and we'll ensure your shortlist includes suitable mannies from our vetted network.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base text-text-muted leading-relaxed mt-4">
              Our mannies are available for all 12 of our service categories — full-time, part-time, emergency, evening, hotel, event, travel, and more. There is no separate fee or process.
            </motion.p>
          </Section>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Questions</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-text">Frequently asked questions about mannies</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.question}
                className="bg-bg rounded-2xl border border-border p-6"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                <h3 className="font-semibold text-text mb-2">{faq.question}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Section className="mb-10">
            <SectionLabel text="Get Started" />
            <SectionHeading centre>Interested in a manny for your family?</SectionHeading>
            <motion.p variants={fadeUp} className="text-base text-text-muted leading-relaxed max-w-xl mx-auto mt-3">
              Tell us about your family and let us know you'd like to be matched with a manny. Our team will be in touch to discuss your options.
            </motion.p>
          </Section>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/request-nanny" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
              Request a Manny <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-green/25 text-green font-semibold hover:bg-green/5 transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
