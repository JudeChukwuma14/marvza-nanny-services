import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Heart, ShieldCheck, CheckCircle, Briefcase, Users } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import nannyPortraitImg from '../../assets/images/nanny_portrait.jpg'
import childcareTrustImg from '../../assets/images/childcare_trust.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
}
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const BENEFITS = [
  { icon: Award, title: 'Professional Respect', description: 'We treat our nannies as the skilled professionals they are. We advocate for fair pay, proper contracts, and respectful working environments.' },
  { icon: Users, title: 'Excellent Families', description: 'We work with some of London\'s loveliest families. We vet our clients just as carefully as we vet our nannies to ensure great matches.' },
  { icon: Heart, title: 'Ongoing Support', description: 'Our team is here for you throughout your placement. Whether you need advice, mediation, or just a chat, you\'re never on your own.' },
  { icon: Briefcase, title: 'Career Growth', description: 'From permanent roles to high-profile temporary assignments, we offer opportunities that align with your experience and career goals.' },
]

const REQUIREMENTS = [
  'Minimum 2 years of professional childcare experience',
  'Enhanced DBS check (or willing to obtain one)',
  'Valid Paediatric First Aid certificate',
  'Right to work in the UK',
  'Excellent verifiable references',
  'A genuine passion for childcare and development',
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

export default function ForNanniesPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="For Nannies & Mannies"
        description="Join Marvza, London's premier agency for private nannies and mannies. We offer exceptional childcare roles, fair pay advocacy, and ongoing professional support."
        canonical="https://marvza.com/for-nannies"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green min-h-[60vh] flex items-center">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 hidden lg:block">
          <img src={nannyPortraitImg} alt="A professional Marvza nanny" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-green via-green/50 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              For Nannies
            </motion.p>
            <motion.h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.12] mb-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              Elevate your <span className="text-accent">childcare career</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              We believe great nannies deserve great families. Join our network for access to premium roles across London, competitive pay, and an agency that truly has your back.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Link to="/apply" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                Apply to Join <ArrowRight size={16} />
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
        <img src={nannyPortraitImg} alt="A professional Marvza nanny" className="w-full h-full object-cover object-top" />
      </div>

      {/* ── BENEFITS GRID ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12 sm:mb-16">
            <SectionLabel text="Why Join Us" />
            <SectionHeading centre>An agency that works for you</SectionHeading>
            <SectionSubheading centre>We don't charge registration fees. Our goal is simply to place brilliant nannies in brilliant roles.</SectionSubheading>
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

      {/* ── REQUIREMENTS + IMAGE ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <Section>
                <SectionLabel text="What We Look For" />
                <SectionHeading>Our registration criteria</SectionHeading>
                <SectionSubheading>Because we promise our families the very best, we have strict but fair standards.</SectionSubheading>
                <ul className="mt-8 space-y-4">
                  {REQUIREMENTS.map((req, i) => (
                    <motion.li key={i} className="flex items-center gap-3 text-sm text-text-muted" variants={fadeUp}>
                      <CheckCircle size={18} className="text-accent shrink-0" />
                      {req}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={fadeUp} className="mt-10 p-5 bg-bg rounded-2xl border border-border">
                  <p className="text-sm text-text-muted italic">"Marvza is the first agency I've worked with that truly treats nannies as professionals. The families they placed me with have been fantastic."</p>
                  <p className="text-xs font-semibold text-text mt-3">— Sarah J., Full-Time Nanny</p>
                </motion.div>
              </Section>
            </div>

            <motion.div className="relative" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                <img src={childcareTrustImg} alt="Nanny reading with a child" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-accent rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-0.5">No Fees</p>
                <p className="text-sm font-semibold text-white">Free to Register</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-green rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <ShieldCheck size={40} className="text-accent mx-auto mb-5" />
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Ready to find your next role?</h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm sm:text-base">Submit your application online. Our team will review your credentials and invite you for an interview.</p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link to="/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors">
                  Start Application <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
