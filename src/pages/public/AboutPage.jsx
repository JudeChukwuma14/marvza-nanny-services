import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Heart, Shield, Users, Award, CheckCircle, Sparkles, Phone, Clock, Baby,
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import londonAerialImg from '../../assets/images/london_aerial.jpg'
import familyHeroImg from '../../assets/images/family_nanny_hero.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
}
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const VALUES = [
  { icon: Heart, title: 'Family First', body: 'Every match starts with understanding your family — your routines, your values, and what your children need to thrive.' },
  { icon: Shield, title: 'Rigorous Standards', body: 'Every nanny in our network is thoroughly vetted: enhanced DBS, verified references, first aid certification, and face-to-face interviews.' },
  { icon: Sparkles, title: 'Personal Touch', body: 'We\'re not an algorithm. Our team personally reviews every match, because getting childcare right is too important to automate.' },
  { icon: Clock, title: 'Responsive Support', body: 'From your first enquiry to ongoing placement support, our London-based team is available and responsive — including for emergencies.' },
]

const STATS = [
  { value: '500+', label: 'Families Served' },
  { value: '100%', label: 'DBS Checked' },
  { value: '10+', label: 'Years Experience' },
  { value: '12', label: 'Service Categories' },
]

const TIMELINE = [
  { year: 'The Beginning', title: 'Founded by a Parent, for Parents', body: 'Marvza was born out of frustration. As a working London parent, our founder struggled to find childcare that was not only reliable but felt genuinely safe. The vision was simple: build a London agency that vets nannies as rigorously as a parent would, and treats families as partners, not just clients.' },
  { year: 'Our Approach', title: 'Quality over Volume', body: 'We purposefully remain a boutique London agency. We don’t just forward CVs; we personally interview every candidate, verify references, and check enhanced DBS statuses. If we wouldn’t leave our own children with them, we don’t recommend them.' },
  { year: 'Today', title: 'A Trusted London Partner', body: 'Today, Marvza offers 12 distinct childcare services and has placed hundreds of nannies with families from Hampstead to Greenwich. Our commitment remains unchanged: providing the highest standard of safe, experienced childcare in London.' },
]

const TEAM_VALUES = [
  'We listen before we recommend',
  'We vet every nanny as if our own children were in their care',
  'We never rush a placement',
  'We stay involved after the match is made',
  'We treat nannies as professionals, not commodities',
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

export default function AboutPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="About Us"
        description="Learn about Marvza — a premium London agency for private nannies and mannies, founded on trust, personal care, and rigorous standards."
        canonical="https://marvza.com/about"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green min-h-[55vh] flex items-center">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 hidden lg:block">
          <img src={londonAerialImg} alt="Aerial view of London representing Marvza's service across all boroughs" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-green via-green/60 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-2xl">
            <motion.p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              About Marvza
            </motion.p>
            <motion.h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.12] mb-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              Childcare you can <span className="text-accent">finally trust</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              We are a dedicated team of parents and childcare professionals based in London. We know first-hand how daunting it is to find the right nanny. That’s why we personally vet and match exceptional childcare professionals with London families—because getting childcare right is too important to automate.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MOBILE IMAGE ─────────────────────────────────────── */}
      <div className="lg:hidden w-full h-56 sm:h-72 overflow-hidden">
        <img src={londonAerialImg} alt="Aerial view of London representing Marvza's service across all boroughs" className="w-full h-full object-cover" />
      </div>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section className="bg-bg border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <p className="font-serif text-3xl sm:text-4xl font-semibold text-text mb-1">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Section>
              <SectionLabel text="Our Story" />
              <SectionHeading>Why Marvza exists</SectionHeading>
              <SectionSubheading>
                Marvza was born from a real need — a London parent who couldn't find childcare they truly trusted. We built the agency we wished existed: one that listens first, vets thoroughly, and matches personally.
              </SectionSubheading>
              <motion.p variants={fadeUp} className="text-base text-text-muted leading-relaxed mt-4">
                We believe every family deserves a nanny they can rely on completely. As parents ourselves, we understand that handing over the care of your children is the biggest leap of faith you can make. That belief shapes everything we do, from our face-to-face interviews with candidates to our strict requirement for paediatric first aid.
              </motion.p>
            </Section>

            <div className="flex flex-col gap-0">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative pl-8 pb-8 last:pb-0 border-l-2 border-accent/20 last:border-transparent"
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.4 }}
                >
                  <div className="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">{item.year}</p>
                  <h3 className="font-serif text-lg font-semibold text-text mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE BREAK ──────────────────────────────────────── */}
      <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden relative">
        <img src={familyHeroImg} alt="Professional London nanny caring for children in a family home" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-black/10 to-black/30" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white text-sm font-semibold bg-black/30 backdrop-blur-sm px-5 py-2 rounded-full">Serving all London boroughs</p>
        </div>
      </div>

      {/* ── OUR VALUES ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-12 sm:mb-14">
            <SectionLabel text="What Guides Us" />
            <SectionHeading centre>Our values</SectionHeading>
            <SectionSubheading centre>These aren't slogans on a wall — they're the principles behind every match we make.</SectionSubheading>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl border border-border p-6 sm:p-7 flex gap-4 sm:gap-5 items-start hover:shadow-lg hover:border-green/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shrink-0">
                  <value.icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text mb-1.5">{value.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{value.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMISES BANNER ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-green rounded-3xl p-8 sm:p-10 lg:p-14 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Our Commitments</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  What you can always expect from us
                </h3>
              </div>
              <div className="flex flex-col gap-3.5">
                {TEAM_VALUES.map((item, i) => (
                  <motion.div key={item} className="flex items-start gap-3" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.35 }}>
                    <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-white/85 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE SERVE ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-10 sm:mb-14">
            <SectionLabel text="Who We Help" />
            <SectionHeading centre>For families and nannies alike</SectionHeading>
          </Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                icon: Users,
                title: 'For Families',
                desc: 'Whether you need a full-time nanny, emergency cover, or childcare for a wedding, we\'ll find someone who fits your family.',
                items: ['Personalised matching based on your needs', 'Fully vetted, experienced candidates', 'Ongoing support after placement'],
                cta: { to: '/request-nanny', label: 'Request a Nanny', primary: true },
              },
              {
                icon: Baby,
                title: 'For Nannies',
                desc: 'We value our nannies as professionals. Join our network to be matched with families that respect your experience and career goals.',
                items: ['Matched with families that suit your expertise', 'Fair, transparent arrangements', 'Ongoing career and placement support'],
                cta: { to: '/apply', label: 'Join Our Network', primary: false },
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                className="bg-white rounded-2xl border border-border p-7 sm:p-8 lg:p-10"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center mb-5">
                  <col.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text mb-3">{col.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-5">{col.desc}</p>
                <ul className="flex flex-col gap-2 mb-6">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-text-muted">
                      <CheckCircle size={14} className="text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={col.cta.to}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${col.cta.primary ? 'bg-green text-white hover:bg-green-dark' : 'border border-green/25 text-green hover:bg-green/5'}`}
                >
                  {col.cta.label} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Section className="mb-10">
            <SectionLabel text="Get in Touch" />
            <SectionHeading centre>Let's talk about what your family needs</SectionHeading>
            <SectionSubheading centre>No pressure, no commitment. Just a conversation about how we can help.</SectionSubheading>
          </Section>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/request-nanny" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                Request a Nanny <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-green/25 text-green font-semibold hover:bg-green/5 transition-colors">
                <Phone size={16} /> Speak to Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
