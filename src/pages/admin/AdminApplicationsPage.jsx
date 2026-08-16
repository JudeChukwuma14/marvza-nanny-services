import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchApplications } from '../../api/applications'
import { Search, Filter, ChevronRight } from 'lucide-react'

const STATUSES = [
  'All Statuses',
  'New',
  'Under Review',
  'Documents Pending',
  'References',
  'Interview',
  'Vetting',
  'Approved',
  'Not Approved'
]

const STATUS_COLORS = {
  'New': 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-purple-100 text-purple-800',
  'Documents Pending': 'bg-amber-100 text-amber-800',
  'References': 'bg-indigo-100 text-indigo-800',
  'Interview': 'bg-pink-100 text-pink-800',
  'Vetting': 'bg-orange-100 text-orange-800',
  'Approved': 'bg-green-100 text-green-800',
  'Not Approved': 'bg-red-100 text-red-800',
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([])
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
      const result = await fetchApplications(params)
      // API returns { data: [], pagination: {} }
      setApplications(result.data || [])
      setPagination(result.pagination || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }, [page, search, statusFilter])

  useEffect(() => {
    load()
  }, [load])

  // Reset to page 1 when filters change
  function handleSearch(val) {
    setSearch(val)
    setPage(1)
  }
  function handleStatusFilter(val) {
    setStatusFilter(val)
    setPage(1)
  }

  return (
    <AdminLayout title="Applications">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input
            type="text"
            placeholder="Search by name, email or reference..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <select
            value={statusFilter}
            onChange={e => handleStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-lg border border-[#E4E7EC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] appearance-none cursor-pointer"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-[#C62828]">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E4E7EC] text-xs font-semibold text-[#667085] uppercase tracking-wider">
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Candidate Name</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-[#667085]">Loading applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-[#667085]">No applications found.</td>
                </tr>
              ) : (
                applications.map(app => (
                  <tr key={app._id} className="hover:bg-[#F7F5F0]/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#0F4C5C]">{app.applicationReference}</td>
                    <td className="px-6 py-4 text-sm text-[#17202A] font-medium">
                      {[app.personalDetails?.firstName, app.personalDetails?.lastName].filter(Boolean).join(' ') || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#667085]">
                      {app.experience?.professionalChildcareExperienceYears != null
                        ? `${app.experience.professionalChildcareExperienceYears} yr${app.experience.professionalChildcareExperienceYears !== 1 ? 's' : ''}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#667085]">{app.personalDetails?.area || app.personalDetails?.city || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-800'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#667085]">
                      {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/applications/${app._id}`}
                        className="inline-flex items-center justify-center p-2 rounded-md text-[#667085] opacity-0 group-hover:opacity-100 hover:bg-[#E4E7EC] hover:text-[#17202A] transition-all"
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

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#E4E7EC] flex items-center justify-between text-sm text-[#667085]">
            <span>
              Page {pagination.page} of {pagination.totalPages} — {pagination.total} total
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1.5 rounded-lg border border-[#E4E7EC] text-sm disabled:opacity-40 hover:bg-[#F7F5F0] transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1.5 rounded-lg border border-[#E4E7EC] text-sm disabled:opacity-40 hover:bg-[#F7F5F0] transition-colors"
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
