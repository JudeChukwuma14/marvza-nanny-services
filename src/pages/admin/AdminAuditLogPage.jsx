import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchAuditLog } from '../../api/auditLog'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'

export default function AdminAuditLogPage() {
  const [entries, setEntries] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchAuditLog({ page, limit: 30 })
      setEntries(result.data || [])
      setPagination(result.pagination || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load audit log')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { load() }, [load])

  return (
    <AdminLayout title="Audit Log">
      <p className="text-sm text-[#7C6659] mb-6">
        A record of key admin actions — status changes, cancellations, and user management. Not every request is logged, only actions that change data.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#FAEAEA] border border-[#B94A48]/30 text-sm text-[#B94A48]">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F3EA] border-b border-[#E4D8C7] text-xs font-semibold text-[#7C6659] uppercase tracking-wider">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={4} className="p-0">
                  <EmptyState title="No activity yet" message="Key admin actions will be recorded here." />
                </td></tr>
              ) : (
                entries.map((e) => (
                  <tr key={e._id} className="hover:bg-[#F8F3EA]/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#7C6659] whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#3B2923]">{e.actor?.email}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659] font-mono text-xs">{e.action}</td>
                    <td className="px-6 py-4 text-sm text-[#3B2923]">{e.summary}</td>
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
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!pagination.hasPrevPage} className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm disabled:opacity-40 hover:bg-[#F8F3EA] transition-colors">Previous</button>
              <button onClick={() => setPage((p) => p + 1)} disabled={!pagination.hasNextPage} className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm disabled:opacity-40 hover:bg-[#F8F3EA] transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
