import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import { SERVICES } from '../../constants/services'
import ServiceCard from '../../components/common/ServiceCard'
import familyHeroImg from '../../assets/images/family_nanny_hero.jpg'

export default function ServicesPage() {
  return (
    <PublicLayout>
      <SEOMeta
        title="Our Services"
        description="Explore our premium childcare services in London, including full-time, live-in, backup, and emergency nannies and mannies."
        canonical="https://marvza.com/services"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green min-h-[50vh] flex items-center">
        <div className="absolute inset-y-0 right-0 w-full lg:w-2/5 hidden lg:block">
          <img src={familyHeroImg} alt="A London family" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-green via-green/60 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
          <div className="max-w-2xl">
            <motion.p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              Our Services
            </motion.p>
            <motion.h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              Childcare for <span className="text-accent">every situation</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              From permanent live-in arrangements to same-day emergency cover — Marvza offers tailored childcare solutions to meet the unique needs of your family.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Link to="/request-nanny" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                Request a Nanny <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">All Services</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-text mb-3">Find the right fit for your family</h2>
            <p className="text-base text-text-muted max-w-xl mx-auto">Every service is supported by our rigorous vetting process and personal matching approach.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VETTING STRIP ────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-green">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
            <div className="flex-1">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Every Placement</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-tight">Fully vetted, every time</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center md:justify-end">
              {['Enhanced DBS', 'Paediatric First Aid', 'Verified References', 'Face-to-Face Interview'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle size={14} className="text-accent shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-text mb-4">Not sure which service is right?</h2>
          <p className="text-text-muted mb-8">Speak to our team and we'll help you find the perfect childcare solution for your family.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-green text-white font-semibold hover:bg-green-dark transition-colors">
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link to="/request-nanny" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-green/25 text-green font-semibold hover:bg-green/5 transition-colors">
              Request a Nanny
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
