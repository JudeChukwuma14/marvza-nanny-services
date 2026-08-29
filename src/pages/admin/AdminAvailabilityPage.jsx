import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchNannies, updateNannyAvailabilityAdmin } from '../../api/nannies'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'

const QUICK_FILTERS = [
  { key: 'availableToday', label: 'Available Today' },
  { key: 'emergencyBookings', label: 'Emergency' },
  { key: 'availableEvenings', label: 'Evenings' },
  { key: 'availableWeekends', label: 'Weekends' },
]

function Toggle({ active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-11 h-6 rounded-full transition-colors relative disabled:opacity-50 ${active ? 'bg-[#3F7656]' : 'bg-[#E4D8C7]'}`}
      aria-pressed={active}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function AdminAvailabilityPage() {
  const [nannies, setNannies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilters, setActiveFilters] = useState([])
  const [updatingId, setUpdatingId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = { limit: 100, vettingStatus: 'Vetted' }
      activeFilters.forEach((f) => { params[f] = 'true' })
      const result = await fetchNannies(params)
      setNannies(result.data || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load nannies')
    } finally {
      setLoading(false)
    }
  }, [activeFilters])

  useEffect(() => { load() }, [load])

  function toggleFilter(key) {
    setActiveFilters((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]))
  }

  async function handleToggle(nanny, key) {
    setUpdatingId(nanny._id)
    const nextAvailability = { ...nanny.availability, [key]: !nanny.availability?.[key] }
    try {
      const updated = await updateNannyAvailabilityAdmin(nanny._id, nextAvailability)
      setNannies((prev) => prev.map((n) => (n._id === nanny._id ? { ...n, availability: updated.availability } : n)))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <AdminLayout title="Availability">
      <p className="text-sm text-[#7C6659] mb-4">
        Live availability for vetted nannies. Toggle a switch to override on a nanny's behalf (e.g. she calls in to say she's free today).
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {QUICK_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => toggleFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeFilters.includes(f.key)
                ? 'bg-[#3B2923] text-white border-[#3B2923]'
                : 'bg-white text-[#3B2923] border-[#E4D8C7] hover:bg-[#F8F3EA]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#FAEAEA] border border-[#B94A48]/30 text-sm text-[#B94A48]">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F3EA] border-b border-[#E4D8C7] text-xs font-semibold text-[#7C6659] uppercase tracking-wider">
                <th className="px-6 py-4">Name</th>
                {QUICK_FILTERS.map((f) => <th key={f.key} className="px-6 py-4">{f.label}</th>)}
                <th className="px-6 py-4">Max Travel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : nannies.length === 0 ? (
                <tr><td colSpan={6} className="p-0">
                  <EmptyState title="No vetted nannies found" message="Vetted nannies will appear here once applications are approved." />
                </td></tr>
              ) : (
                nannies.map((n) => (
                  <tr key={n._id} className="hover:bg-[#F8F3EA]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#3B2923]">
                      <Link to={`/admin/nannies/${n._id}`} className="hover:underline">
                        {[n.personalDetails?.firstName, n.personalDetails?.lastName].filter(Boolean).join(' ')}
                      </Link>
                    </td>
                    {QUICK_FILTERS.map((f) => (
                      <td key={f.key} className="px-6 py-4">
                        <Toggle
                          active={!!n.availability?.[f.key]}
                          disabled={updatingId === n._id}
                          onClick={() => handleToggle(n, f.key)}
                        />
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm text-[#7C6659]">
                      {n.availability?.maxTravelDistanceMiles != null ? `${n.availability.maxTravelDistanceMiles} mi` : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
