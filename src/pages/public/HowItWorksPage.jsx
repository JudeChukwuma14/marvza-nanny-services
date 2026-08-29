import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ClipboardCheck, Users, Search, CalendarCheck,
  CheckCircle, Briefcase, FileText
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
const FAMILY_STEPS = [
  {
    icon: Search,
    title: '1. Share Your Needs',
    desc: 'Submit a detailed request online or speak with our team. Tell us about your family, schedule, and specific childcare requirements.',
  },
  {
    icon: Users,
    title: '2. We Curate Candidates',
    desc: 'We search our network of pre-vetted nannies to find candidates whose experience and personality match your family perfectly.',
  },
  {
    icon: CalendarCheck,
    title: '3. Interviews & Trials',
    desc: 'Review profiles and interview your favorite candidates. For permanent roles, we recommend a short paid trial to ensure a great fit.',
  },
  {
    icon: CheckCircle,
    title: '4. Placement & Support',
    desc: 'Once you\'ve chosen your nanny, we assist with the offer, contract templates, and provide ongoing support throughout the placement.',
  },
]

const NANNY_STEPS = [
  {
    icon: FileText,
    title: '1. Apply Online',
    desc: 'Submit your CV and details through our online application portal. We\'ll review your experience against our registration criteria.',
  },
  {
    icon: ClipboardCheck,
    title: '2. Interview & Vetting',
    desc: 'If successful, we\'ll invite you for a thorough interview. We then verify your ID, DBS, First Aid, and contact your references directly.',
  },
  {
    icon: Users,
    title: '3. Meet Families',
    desc: 'Once fully registered, we present you with roles that match your career goals and arrange interviews with prospective families.',
  },
  {
    icon: Briefcase,
    title: '4. Start Your Role',
    desc: 'We support you through the offer process, ensure a fair contract is in place, and check in regularly once you\'ve started.',
  },
]

const VETTING_ITEMS = [
  'Identity and Right to Work verification',
  'Enhanced DBS check (Disclosure and Barring Service)',
  'Paediatric First Aid certificate verification',
  'In-depth, face-to-face or video interview',
  'Minimum of two verbal reference checks from recent employers',
  'Verification of formal childcare qualifications (if applicable)',
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

function SectionSubheading({ children, centre = false }) {
  return (
    <motion.p
      variants={fadeUp}
      className={`text-base text-text-muted leading-relaxed max-w-2xl mt-3 ${centre ? 'mx-auto text-center' : ''}`}
    >
      {children}
    </motion.p>
  )
}

/* ── Main Component ─────────────────────────────────────────── */
export default function HowItWorksPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="How It Works"
        description="Learn how Marvza matches London families with premium nannies and mannies. Discover our rigorous vetting process and simple step-by-step approach."
        canonical="https://marvza.com/how-it-works"
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
              How It Works
            </motion.p>
            <motion.h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A seamless process from <span className="text-accent">start to finish</span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Whether you are a family seeking childcare or a nanny looking for your next role, our process is designed to be thorough, transparent, and completely stress-free.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINES ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* For Families Timeline */}
            <div>
              <Section className="mb-10">
                <SectionLabel text="The Family Journey" />
                <h3 className="font-serif text-2xl font-semibold text-text">Finding your nanny</h3>
              </Section>
              
              <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-6 before:w-0.5 before:bg-border">
                {FAMILY_STEPS.map((step, i) => (
                  <motion.div 
                    key={step.title}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border border-border flex items-center justify-center z-10 shadow-sm">
                      <step.icon size={20} className="text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-text mb-2 pt-1.5">{step.title}</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* For Nannies Timeline */}
            <div>
              <Section className="mb-10">
                <SectionLabel text="The Nanny Journey" />
                <h3 className="font-serif text-2xl font-semibold text-text">Finding your role</h3>
              </Section>
              
              <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-6 before:w-0.5 before:bg-border">
                {NANNY_STEPS.map((step, i) => (
                  <motion.div 
                    key={step.title}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border border-border flex items-center justify-center z-10 shadow-sm">
                      <step.icon size={20} className="text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-text mb-2 pt-1.5">{step.title}</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── VETTING STANDARDS ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12">
            <SectionLabel text="Uncompromising Safety" />
            <SectionHeading centre>Our Vetting Standards</SectionHeading>
            <SectionSubheading centre>
              We handle the rigorous background checks so you don't have to. Every nanny we introduce has successfully completed these steps.
            </SectionSubheading>
          </Section>

          <div className="bg-bg rounded-3xl p-8 sm:p-12 border border-border">
            <div className="flex flex-col gap-4">
              {VETTING_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-border/50"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <div className="w-8 h-8 rounded-full bg-success-bg flex items-center justify-center shrink-0">
                    <CheckCircle size={16} className="text-success" />
                  </div>
                  <span className="text-sm font-medium text-text">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTAs ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-green rounded-3xl p-10 text-white flex flex-col items-center text-center relative overflow-hidden"
              whileHover={{ y: -4 }}
            >
               <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-semibold mb-3">I'm looking for a nanny</h3>
                <p className="text-white/70 text-sm mb-8">Tell us what your family needs and start the matching process today.</p>
                <Link
                  to="/request-nanny"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors"
                >
                  Request a Nanny <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white border border-border rounded-3xl p-10 flex flex-col items-center text-center"
              whileHover={{ y: -4, borderColor: '#3B2923' }}
            >
              <h3 className="font-serif text-2xl font-semibold text-text mb-3">I want to become a nanny</h3>
              <p className="text-text-muted text-sm mb-8">Join our network to find rewarding roles with excellent London families.</p>
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-green/25 text-green text-sm font-semibold hover:bg-green/5 transition-colors"
              >
                Start Application <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </PublicLayout>
  )
}
