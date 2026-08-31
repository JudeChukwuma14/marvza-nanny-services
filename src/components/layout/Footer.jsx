import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import logo from "../../assets/images/baby.png"
/* Lucide intentionally omits trademarked brand logos, so these are hand-rolled. */
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/>
    </svg>
  )
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}
function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM21 21h-3.38v-6.44c0-1.54-.03-3.51-2.14-3.51-2.15 0-2.48 1.68-2.48 3.4V21H9.62V8.5H12.9v1.71h.05c.46-.87 1.58-1.78 3.25-1.78 3.48 0 4.12 2.29 4.12 5.27V21Z"/>
    </svg>
  )
}

const SERVICES = [
  { label: 'Hotel Nannies', to: '/services/hotel-nanny' },
  { label: 'Backup & Emergency Nannies', to: '/services/backup-emergency-nanny' },
  { label: 'Event Nannies', to: '/services/event-nanny' },
  { label: 'Wedding Nannies', to: '/services/wedding-nanny' },
  { label: 'Travel & Vacation Nannies', to: '/services/travel-vacation-nanny' },
  { label: 'Night Nannies', to: '/services/night-nanny' },
  { label: 'Full-Time Nannies', to: '/services/full-time-nanny' },
  { label: 'Part-Time Nannies', to: '/services/part-time-nanny' },
  { label: 'After-School Nannies', to: '/services/after-school-nanny' },
  { label: 'Temporary & Ad-Hoc Nannies', to: '/services/temporary-adhoc-nanny' },
  { label: 'Maternity/Newborn Nannies', to: '/services/maternity-newborn-nanny' },
  { label: 'Evening Babysitters', to: '/services/evening-babysitter' },
]

const AGENCY = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'For Families', to: '/for-families' },
  { label: 'For Nannies', to: '/for-nannies' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Safeguarding Policy', to: '/safeguarding' },
  { label: 'Complaints Procedure', to: '/complaints' },
]

const SOCIALS = [
  { icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/share/19WphTo14D/?mibextid=wwXIfr' },
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/marvzanannies?utm_source=qr' },
  // { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    // TODO: wire up to a real newsletter endpoint once one exists
    setSubscribed(true)
  }

  return (
    <footer className="bg-green text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-15 h-15 rounded-xl flex items-center justify-center">
              <img src={logo} alt="logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <span className="text-[16px] font-bold font-serif text-white leading-tight block">Marvza</span>
                <span className="text-[11px] text-white/50 leading-tight block">Private Nannies & Mannies</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              A premium London agency for private nannies and mannies, connecting trusted, experienced childcare professionals with families across the city.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-6">
              <a href="mailto:Hello@marvza.com" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-accent transition-colors group">
                <Mail size={14} className="shrink-0 group-hover:scale-110 transition-transform" />
                Hello@marvza.com
              </a>
              <a href="tel:+447944219712" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-accent transition-colors group">
                <Phone size={14} className="shrink-0 group-hover:scale-110 transition-transform" />
                +44 7944 219712
              </a>
              <span className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPin size={14} className="shrink-0" />
                London, United Kingdom
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Our Services</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/65 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency column */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Agency</h3>
            <ul className="flex flex-col gap-2.5">
              {AGENCY.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/65 hover:text-white transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Get Started</h3>

            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Sign up for occasional updates from our agency team.
            </p>

            {subscribed ? (
              <p className="text-sm text-accent font-medium mb-8">Thanks — you're on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-stretch gap-2 mb-8">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                />
                <motion.button
                  type="submit"
                  aria-label="Subscribe"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition-colors"
                >
                  <ArrowRight size={16} />
                </motion.button>
              </form>
            )}

            <div className="flex flex-col gap-2 mb-6">
              <Link to="/request-nanny" className="text-sm font-semibold text-white hover:text-accent transition-colors">
                Request a Nanny →
              </Link>
              <Link to="/become-a-nanny" className="text-sm font-semibold text-white/80 hover:text-accent transition-colors">
                Become a Nanny →
              </Link>
            </div>

            {/* Legal links */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Legal</h4>
              <ul className="flex flex-col gap-2">
                {LEGAL.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-xs text-white/45 hover:text-white/70 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year} Marvza Ltd. All rights reserved. Registered in England & Wales.
          </p>
          <p className="text-xs text-white/30">
            Premium childcare placement across London
          </p>
        </div>
      </div>
    </footer>
  )
}
