import { Link, useLocation } from 'react-router-dom'
import { Phone, CalendarPlus } from 'lucide-react'

export default function MobileStickyCTA() {
  const location = useLocation()

  // Hide on admin routes or when already on request-nanny page
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/request-nanny')) {
    return null
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4D8C7] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
      <a
        href="tel:+447944219712"
        className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-[#3B2923]/20 bg-[#F8F3EA] text-[#3B2923] text-sm font-semibold hover:bg-[#EFE6D8] transition-colors"
      >
        <Phone size={16} className="text-[#3B2923]" />
        Call Us
      </a>

      <Link
        to="/request-nanny"
        className="flex-[1.5] inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#3B2923] text-white text-sm font-semibold hover:bg-[#2A1B17] transition-colors shadow-md shadow-[#3B2923]/20"
      >
        <CalendarPlus size={16} className="text-[#B88A62]" />
        Request Childcare
      </Link>
    </div>
  )
}
