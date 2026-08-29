import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchAllDocuments, fetchDocumentUrl } from '../../api/documents'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import { Filter, ExternalLink } from 'lucide-react'

const DOC_TYPES = ['All Types', 'CV', 'ID', 'DBS', 'PAEDIATRIC_FIRST_AID', 'CHILDCARE_QUALIFICATION', 'RIGHT_TO_WORK', 'OTHER']

function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [openingId, setOpeningId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = typeFilter !== 'All Types' ? { type: typeFilter } : {}
      const result = await fetchAllDocuments(params)
      setDocuments(result || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load documents')
    } finally {
      setLoading(false)
    }
  }, [typeFilter])

  useEffect(() => { load() }, [load])

  async function handleView(doc) {
    setOpeningId(doc.documentId)
    try {
      const url = await fetchDocumentUrl(doc.applicationId, doc.documentId)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error(err)
    } finally {
      setOpeningId(null)
    }
  }

  return (
    <AdminLayout title="Documents">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C6659]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-lg border border-[#E4D8C7] text-sm bg-white text-[#3B2923] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 appearance-none cursor-pointer"
          >
            {DOC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
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
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">File</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Uploaded</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : documents.length === 0 ? (
                <tr><td colSpan={6} className="p-0">
                  <EmptyState title="No documents found" message="Documents uploaded with applications will appear here." />
                </td></tr>
              ) : (
                documents.map((d) => (
                  <tr key={`${d.applicationId}-${d.documentId}`} className="hover:bg-[#F8F3EA]/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#3B2923]">
                      <Link to={`/admin/applications/${d.applicationId}`} className="font-medium hover:underline">
                        {d.applicantName || d.applicationReference}
                      </Link>
                      <p className="text-xs text-[#7C6659]">{d.applicationReference}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{d.type}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{d.originalName}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{formatBytes(d.bytes)}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">
                      {new Date(d.uploadedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleView(d)}
                        disabled={openingId === d.documentId}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-xs font-medium text-[#3B2923] hover:bg-[#F8F3EA] transition-colors disabled:opacity-50"
                      >
                        <ExternalLink size={12} /> {openingId === d.documentId ? 'Opening…' : 'View'}
                      </button>
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
