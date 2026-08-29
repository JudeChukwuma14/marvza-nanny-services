import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, UserCheck, Baby, Briefcase,
  FileText, Calendar, MessageSquare, Globe, ShieldCheck,
  BookOpen, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/enquiries',      label: 'Enquiries',      icon: MessageSquare },
      { to: '/admin/bookings',       label: 'Bookings',       icon: Calendar },
      { to: '/admin/availability',   label: 'Availability',   icon: Clock2 },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/admin/families',       label: 'Families',       icon: Users },
      { to: '/admin/children',       label: 'Children',       icon: Baby },
      { to: '/admin/nannies',        label: 'Nannies',        icon: UserCheck },
      { to: '/admin/applications',   label: 'Applications',   icon: FileText },
    ],
  },
  {
    label: 'Content & Admin',
    items: [
      { to: '/admin/documents',      label: 'Documents',      icon: Briefcase },
      { to: '/admin/communications', label: 'Communications', icon: MessageSquare },
      { to: '/admin/content',        label: 'Content / CMS',  icon: Globe },
      { to: '/admin/users',          label: 'Users & Roles',  icon: ShieldCheck },
      { to: '/admin/audit-log',      label: 'Audit Log',      icon: BookOpen },
    ],
  },
]

// Workaround: Clock2 not destructured above
function Clock2(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function SidebarContent({ onNav }) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('nanny_admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-[#B88A62] flex items-center justify-center">
          <Baby size={18} className="text-white" />
        </div>
        <div>
          <span className="text-base font-bold text-white block leading-tight">Marvza</span>
          <span className="text-[10px] text-white/40 block">Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest px-3 mb-2">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={onNav}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:bg-white/8 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={16} className="shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="admin-nav-pill"
                          className="w-1.5 h-1.5 rounded-full bg-[#B88A62]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F3EA] flex">
      {/* Desktop sidebar */}
      <aside className="w-60 bg-[#3B2923] hidden lg:flex flex-col fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 z-50 w-60 h-full bg-[#3B2923] lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            >
              <SidebarContent onNav={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E4D8C7] flex items-center justify-between px-5 lg:px-8 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg text-[#7C6659] hover:bg-[#F8F3EA] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-[#3B2923]">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-[#7C6659] hover:bg-[#F8F3EA] transition-colors relative" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B88A62]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#3B2923] flex items-center justify-center">
              <span className="text-xs font-semibold text-white">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          className="flex-1 p-5 lg:p-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
