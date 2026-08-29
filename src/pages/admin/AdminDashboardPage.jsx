import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { getAdminStats } from '../../api/applications'
import { LoadingPage } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import {
  Users, UserCheck, FileText, MessageSquare, Calendar,
  CheckCircle, XCircle, Clock,
} from 'lucide-react'

function StatTile({ icon: Icon, value, label, to, large }) {
  const content = (
    <div className={`h-full bg-white rounded-xl border border-[#E4D8C7] shadow-sm ${large ? 'p-6' : 'p-4'} hover:border-[#D2C0A8] transition-colors`}>
      <div className={`${large ? 'w-12 h-12' : 'w-9 h-9'} rounded-2xl bg-gradient-to-br from-[#B88A62]/15 to-[#B88A62]/5 flex items-center justify-center mb-3`}>
        <Icon size={large ? 22 : 16} className="text-[#B88A62]" />
      </div>
      <p className={`font-serif ${large ? 'text-3xl' : 'text-xl'} font-semibold text-[#3B2923] mb-1`}>{value ?? 0}</p>
      <p className="text-sm text-[#7C6659]">{label}</p>
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        setStats(await getAdminStats())
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load dashboard stats')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <LoadingPage message="Loading dashboard…" />
      </AdminLayout>
    )
  }

  if (error || !stats) {
    return (
      <AdminLayout title="Dashboard">
        <EmptyState variant="error" title="Couldn't load stats" message={error || 'Something went wrong.'} />
      </AdminLayout>
    )
  }

  const primaryTiles = [
    { icon: Users, value: stats.families.total, label: 'Families', to: '/admin/families' },
    { icon: UserCheck, value: stats.nannies.vetted, label: 'Vetted Nannies', to: '/admin/nannies' },
    { icon: FileText, value: stats.applications.awaitingDecision, label: 'Applications Awaiting Decision', to: '/admin/applications' },
    { icon: CheckCircle, value: stats.shifts.Completed, label: 'Completed Shifts', to: '/admin/bookings?status=Completed' },
  ]

  const secondaryTiles = [
    { icon: MessageSquare, value: stats.enquiries.new, label: 'New Enquiries', to: '/admin/enquiries' },
    { icon: Calendar, value: stats.shifts.Open, label: 'Open Shifts', to: '/admin/bookings?status=Open' },
    { icon: Clock, value: stats.shifts['Pending Confirmation'], label: 'Pending Confirmation', to: `/admin/bookings?status=${encodeURIComponent('Pending Confirmation')}` },
    { icon: XCircle, value: stats.shifts.Cancelled, label: 'Cancelled Shifts', to: '/admin/bookings?status=Cancelled' },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {primaryTiles.map((t) => <StatTile key={t.label} {...t} large />)}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryTiles.map((t) => <StatTile key={t.label} {...t} />)}
      </div>
    </AdminLayout>
  )
}
