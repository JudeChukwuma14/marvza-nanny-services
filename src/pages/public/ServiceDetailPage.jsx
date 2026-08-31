import { useParams, Navigate, Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import SEOMeta from '../../components/ui/SEOMeta'
import FAQAccordion from '../../components/ui/FAQAccordion'
import { getServiceBySlug, SERVICES } from '../../constants/services'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Shield } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45, ease: 'easeOut' } }),
}
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <Navigate to="/services" replace />

  const relatedServices = SERVICES.filter(s => s.slug !== slug).slice(0, 3)

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.seoDescription || service.description,
    "provider": {
      "@type": "ChildCare",
      "name": "Marvza Private Nannies & Mannies",
      "url": "https://marvza.com"
    },
    "areaServed": "London",
    "url": `https://marvza.com/services/${slug}`
  }

  return (
    <PublicLayout>
      <SEOMeta 
        title={service.seoTitle || service.name} 
        description={service.seoDescription || service.description} 
        canonical={`https://marvza.com/services/${slug}`} 
        schema={serviceSchema}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-green min-h-[55vh] flex items-center">
        {service.image && (
          <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 hidden lg:block">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-green via-green/60 to-transparent" />
          </div>
        )}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-2xl">
            {/* Back breadcrumb */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white/80 uppercase tracking-widest mb-6 transition-colors">
                ← All Services
              </Link>
            </motion.div>
            <motion.h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] mb-5"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              {service.h1Title || service.name}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-accent font-medium mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            >
              {service.tagline}
            </motion.p>
            <motion.p
              className="text-white/65 text-base leading-relaxed max-w-xl mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              {service.heroParagraph || service.description}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
              <Link to="/request-nanny" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                {service.primaryCTA || 'Request this service'} <ArrowRight size={16} />
              </Link>
              <a href="tel:+447944219712" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
                Call Marvza
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE IMAGE ─────────────────────────────────────── */}
      {service.image && (
        <div className="lg:hidden w-full h-56 sm:h-72 overflow-hidden relative">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-white/90">
            <Shield size={14} className="text-accent" />
            <span className="font-medium drop-shadow-md">Rigorous Vetting Process</span>
          </div>
        </div>
      )}

      {/* ── CONTENT + SIDEBAR ────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            
            {/* Main content */}
            <motion.div
              className="lg:col-span-2 space-y-10"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              <div>
                <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-semibold text-text mb-5">
                  About this service
                </motion.h2>
                <motion.p variants={fadeUp} className="text-text-muted leading-relaxed whitespace-pre-line text-base">
                  {service.longDescription}
                </motion.p>
              </div>

              <div>
                <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl font-semibold text-text mb-5">
                  Who is this for?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-text-muted leading-relaxed text-base">
                  {service.whoFor}
                </motion.p>
              </div>
            </motion.div>

            {/* Sticky sidebar */}
            <div>
              <motion.div
                className="bg-bg rounded-3xl p-6 sm:p-8 border border-border sticky top-24"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              >
                <h3 className="font-serif text-lg font-semibold text-text mb-5">Key Benefits</h3>
                <ul className="flex flex-col gap-3.5 mb-8">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text">
                      <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/request-nanny"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-green text-white text-sm font-semibold hover:bg-green-dark transition-colors"
                >
                  {service.primaryCTA || 'Request this service'} <ArrowRight size={14} />
                </Link>
                <a
                  href="tel:+447944219712"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-green/25 text-green text-sm font-semibold hover:bg-green/5 transition-colors mt-3"
                >
                  Speak to Our Team
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────── */}
      {service.faqs?.length > 0 && (
        <section className="py-16 sm:py-20 bg-bg">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Questions</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-text">Frequently asked questions</h2>
            </div>
            <FAQAccordion items={service.faqs} />
            <div className="text-center mt-10">
              <Link to="/faqs" className="inline-flex items-center gap-2 text-sm font-semibold text-green hover:text-accent transition-colors">
                View all FAQs <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED SERVICES (Internal Linking) ──────────────── */}
      <section className="py-16 sm:py-20 bg-bg/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-text mb-8">Other services you might need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedServices.map(rs => (
              <Link key={rs.slug} to={`/services/${rs.slug}`} className="group block bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
                <h3 className="font-serif font-semibold text-lg text-text mb-2 group-hover:text-green transition-colors">{rs.name}</h3>
                <p className="text-sm text-text-muted line-clamp-2">{rs.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-green uppercase tracking-wide">
                  View Service <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED CTA ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-text mb-3">Ready to get started?</h2>
          <p className="text-text-muted mb-8 text-sm sm:text-base">Tell us about your family and we'll begin finding the perfect match right away.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-nanny" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-green text-white font-semibold hover:bg-green-dark transition-colors">
              Request a Nanny <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-green/25 text-green font-semibold hover:bg-green/5 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
