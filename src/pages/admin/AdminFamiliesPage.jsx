import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchFamilies } from '../../api/families'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import { Search, ChevronRight } from 'lucide-react'

export default function AdminFamiliesPage() {
  const [families, setFamilies] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = { page, limit: 20, ...(search ? { search } : {}) }
      const result = await fetchFamilies(params)
      setFamilies(result.data || [])
      setPagination(result.pagination || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load families')
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => { load() }, [load])

  function handleSearch(val) {
    setSearch(val)
    setPage(1)
  }

  return (
    <AdminLayout title="Families">
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
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Area</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : families.length === 0 ? (
                <tr><td colSpan={7} className="p-0">
                  <EmptyState title="No families found" message="Families are created automatically when a parent submits an emergency booking." />
                </td></tr>
              ) : (
                families.map((f) => (
                  <tr key={f._id} className="hover:bg-[#F8F3EA]/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#3B2923]">{f.familyReference}</td>
                    <td className="px-6 py-4 text-sm text-[#3B2923] font-medium">{[f.firstName, f.lastName].filter(Boolean).join(' ')}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{f.email}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{f.phone}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{f.area || '—'}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">
                      {new Date(f.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/families/${f._id}`}
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
