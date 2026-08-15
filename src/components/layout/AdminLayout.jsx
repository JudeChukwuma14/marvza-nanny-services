import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut, Baby } from 'lucide-react'

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('nanny_admin_auth')
    navigate('/admin/login')
  }

  const navItems = [
    { to: '/admin/applications', icon: Users, label: 'Applications' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F4C5C] text-white flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
          <Baby size={24} className="text-[#D98B5F]" />
          <span className="text-lg font-bold">NannyPro Admin</span>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 px-2">Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-[#E4E7EC] flex items-center px-8 shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-[#17202A]">{title}</h1>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
