import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Shield, Heart, UserCheck, CheckCircle,
  Clock, Sparkles, MessageSquare
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import TestimonialCard from '../../components/common/TestimonialCard'
import familyHeroImg from '../../assets/images/family_nanny_hero.jpg'
import nannyActivitiesImg from '../../assets/images/nanny_activities.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const BENEFITS = [
  { icon: Shield, title: 'Rigorous Vetting', description: 'We conduct enhanced DBS checks, personal interviews, and thorough reference verification. Only the top candidates make it into our network.' },
  { icon: Heart, title: 'Personalized Matching', description: 'We don\'t just look at schedules. We match based on parenting styles, personalities, and specific household needs to ensure a harmonious fit.' },
  { icon: Clock, title: 'Responsive & Fast', description: 'Need emergency cover? Or a long-term placement? Our dedicated London team works efficiently to meet your timeline without compromising quality.' },
  { icon: Sparkles, title: 'Ongoing Support', description: 'Our relationship doesn\'t end at placement. We provide ongoing support, check-ins, and mediation to ensure the arrangement thrives over time.' },
]

const TESTIMONIALS = [
  { quote: 'Marvza made finding a nanny completely stress-free. They listened to exactly what we needed and introduced us to incredible candidates.', name: 'The Thompson Family', location: 'West London', service: 'Full-Time Nanny', rating: 5 },
  { quote: 'The level of vetting gave us such peace of mind. Our nanny feels like a true extension of our family, and the kids adore her.', name: 'The Al-Fayed Family', location: 'Kensington', service: 'Live-In Nanny', rating: 5 },
  { quote: 'When our regular childcare fell through, Marvza provided an emergency nanny within hours. Absolute lifesavers.', name: 'The Davies Family', location: 'Clapham', service: 'Backup Nanny', rating: 5 },
]

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
function SectionSubheading({ children, centre = false }) {
  return <motion.p variants={fadeUp} className={`text-base text-text-muted leading-relaxed max-w-2xl mt-3 ${centre ? 'mx-auto text-center' : ''}`}>{children}</motion.p>
}

export default function ForFamiliesPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="For Families"
        description="Find trusted, vetted childcare professionals in London. Marvza provides personalized nanny and manny matching tailored to your family's unique needs."
        canonical="https://marvza.com/for-families"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green min-h-[60vh] flex items-center">
        {/* Right-side image panel (desktop only) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 hidden lg:block">
          <img src={familyHeroImg} alt="A happy London family with their nanny" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-green via-green/60 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              For Families
            </motion.p>
            <motion.h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.12] mb-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              Childcare you can <span className="text-accent">trust completely</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              We take the stress out of finding a nanny. With rigorous vetting, personalized matching, and ongoing support, we connect you with professionals who will enrich your children's lives.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Link to="/request-nanny" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                Request a Nanny <ArrowRight size={16} />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors">
                How it works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE IMAGE ─────────────────────────────────────── */}
      <div className="lg:hidden w-full h-56 sm:h-72 overflow-hidden">
        <img src={familyHeroImg} alt="A happy London family with their nanny" className="w-full h-full object-cover object-top" />
      </div>

      {/* ── BENEFITS GRID ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12 sm:mb-16">
            <SectionLabel text="The Marvza Difference" />
            <SectionHeading centre>Why London families choose us</SectionHeading>
            <SectionSubheading centre>We don't just place nannies; we build lasting relationships that give you peace of mind.</SectionSubheading>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-border flex gap-5 items-start hover:shadow-lg hover:border-green/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shrink-0">
                  <benefit.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-text mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE + PROCESS ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Image */}
            <motion.div className="relative order-2 lg:order-1" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                <img src={nannyActivitiesImg} alt="Nanny doing art activities with children" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-border">
                <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-0.5">Our Promise</p>
                <p className="text-sm font-semibold text-text">100% Vetted Nannies</p>
              </div>
            </motion.div>

            {/* Process steps */}
            <div className="order-1 lg:order-2">
              <Section>
                <SectionLabel text="Simple Steps" />
                <SectionHeading>How we find your perfect match</SectionHeading>
                <SectionSubheading>Our process is designed to be thorough yet effortless for you.</SectionSubheading>
                <ul className="mt-8 space-y-5">
                  {[
                    { n: '01', t: 'Consultation', d: 'Share your family\'s needs, schedule, and what you\'re looking for in a nanny.' },
                    { n: '02', t: 'Curated Shortlist', d: 'We identify pre-vetted candidates whose experience matches your requirements.' },
                    { n: '03', t: 'Interviews', d: 'Meet and interview your top choices at your own pace.' },
                    { n: '04', t: 'Placement & Support', d: 'We assist with offers, contracts, and ongoing placement support.' },
                  ].map((step, i) => (
                    <motion.li key={step.n} className="flex items-start gap-4" variants={fadeUp}>
                      <span className="font-serif text-2xl font-semibold text-accent/40 w-8 shrink-0 pt-0.5">{step.n}</span>
                      <div>
                        <h4 className="text-sm font-semibold text-text mb-0.5">{step.t}</h4>
                        <p className="text-sm text-text-muted leading-relaxed">{step.d}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={fadeUp} className="mt-8">
                  <Link to="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-green hover:text-accent transition-colors">
                    View full process <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </Section>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12">
            <SectionLabel text="Family Stories" />
            <SectionHeading centre>Hear from our clients</SectionHeading>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-green rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Get Started Today</p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
                Let's find your family's perfect nanny
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Submit your requirements online, and our team will be in touch shortly to start the matching process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/request-nanny" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors">
                    Request a Nanny <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors">
                    <MessageSquare size={16} /> Speak to Us
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
