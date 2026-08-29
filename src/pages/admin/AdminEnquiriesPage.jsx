import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchEnquiries } from '../../api/enquiries'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import Badge from '../../components/ui/Badge'
import { Search, Filter, ChevronRight } from 'lucide-react'

const STATUSES = ['All Statuses', 'New', 'Under Review', 'Matching', 'Introduced', 'Placed', 'Closed']
const STATUS_VARIANT = {
  New: 'new',
  'Under Review': 'review',
  Matching: 'screening',
  Introduced: 'interview',
  Placed: 'success',
  Closed: 'archived',
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = {
        page,
        limit: 20,
        ...(search ? { search } : {}),
        ...(statusFilter !== 'All Statuses' ? { status: statusFilter } : {}),
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }
      const result = await fetchEnquiries(params)
      setEnquiries(result.data || [])
      setPagination(result.pagination || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load enquiries')
    } finally {
      setLoading(false)
    }
  }, [page, search, statusFilter])

  useEffect(() => { load() }, [load])

  function handleSearch(val) {
    setSearch(val)
    setPage(1)
  }

  function handleStatusFilter(val) {
    setStatusFilter(val)
    setPage(1)
  }

  return (
    <AdminLayout title="Enquiries">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C6659]" />
          <input
            type="text"
            placeholder="Search by name, email or reference..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E4D8C7] text-sm text-[#3B2923] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C6659]" />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-lg border border-[#E4D8C7] text-sm bg-white text-[#3B2923] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 appearance-none cursor-pointer"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#FAEAEA] border border-[#B94A48]/30 text-sm text-[#B94A48]">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F3EA] border-b border-[#E4D8C7] text-xs font-semibold text-[#7C6659] uppercase tracking-wider">
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Parent</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Area</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : enquiries.length === 0 ? (
                <tr><td colSpan={7} className="p-0">
                  <EmptyState title="No enquiries found" message="Requests submitted via 'Request a Nanny' will appear here." />
                </td></tr>
              ) : (
                enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-[#F8F3EA]/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#3B2923]">{e.enquiryReference}</td>
                    <td className="px-6 py-4 text-sm text-[#3B2923]">
                      {[e.parent?.firstName, e.parent?.lastName].filter(Boolean).join(' ') || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{e.serviceType || '—'}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{e.location?.area || '—'}</td>
                    <td className="px-6 py-4"><Badge label={e.status} variant={STATUS_VARIANT[e.status]} /></td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">
                      {new Date(e.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/enquiries/${e._id}`}
                        className="inline-flex items-center justify-center p-2 rounded-md text-[#7C6659] opacity-0 group-hover:opacity-100 hover:bg-[#F8F3EA] hover:text-[#3B2923] transition-all"
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#E4D8C7] flex items-center justify-between text-sm text-[#7C6659]">
            <span>Page {pagination.page} of {pagination.totalPages} — {pagination.total} total</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm disabled:opacity-40 hover:bg-[#F8F3EA] transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm disabled:opacity-40 hover:bg-[#F8F3EA] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
