import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { sendMessage, fetchMessages } from '../../api/communications'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import Badge from '../../components/ui/Badge'
import { Send } from 'lucide-react'

const inputClass = 'w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20'
const labelClass = 'text-xs font-medium text-[#7C6659] mb-1 block'

function ComposeForm({ onSent }) {
  const [toEmail, setToEmail] = useState('')
  const [toName, setToName] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const message = await sendMessage({ toEmail, toName, subject, body })
      onSent(message)
      if (message.status === 'sent') {
        setResult({ ok: true, text: 'Email sent successfully.' })
        setToEmail(''); setToName(''); setSubject(''); setBody('')
      } else {
        setResult({ ok: false, text: message.errorMessage || 'Email was not sent.' })
      }
    } catch (err) {
      setResult({ ok: false, text: err?.response?.data?.message || 'Failed to send message' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6 mb-6">
      <h2 className="font-serif text-lg font-semibold text-[#3B2923] mb-4">Compose Message</h2>

      {result && (
        <div className={`mb-4 p-3 rounded-lg border text-sm ${result.ok ? 'bg-[#EAF5EE] border-[#3F7656]/30 text-[#3F7656]' : 'bg-[#FAEAEA] border-[#B94A48]/30 text-[#B94A48]'}`}>
          {result.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Recipient Email</label>
          <input type="email" required value={toEmail} onChange={(e) => setToEmail(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Recipient Name</label>
          <input value={toName} onChange={(e) => setToName(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="mb-4">
        <label className={labelClass}>Subject</label>
        <input required value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} />
      </div>
      <div className="mb-4">
        <label className={labelClass}>Message</label>
        <textarea required rows={5} value={body} onChange={(e) => setBody(e.target.value)} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors disabled:opacity-50"
      >
        <Send size={16} /> {submitting ? 'Sending…' : 'Send Email'}
      </button>
    </form>
  )
}

export default function AdminCommunicationsPage() {
  const [messages, setMessages] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchMessages({ page, limit: 20 })
      setMessages(result.data || [])
      setPagination(result.pagination || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { load() }, [load])

  return (
    <AdminLayout title="Communications">
      <p className="text-sm text-[#7C6659] mb-6">
        Send an ad-hoc email and keep a log of everything sent, including failed attempts.
      </p>

      <ComposeForm onSent={(message) => { setMessages((prev) => [message, ...prev]); setPage(1) }} />

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#FAEAEA] border border-[#B94A48]/30 text-sm text-[#B94A48]">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F3EA] border-b border-[#E4D8C7] text-xs font-semibold text-[#7C6659] uppercase tracking-wider">
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sent By</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan={5} className="p-0">
                  <EmptyState title="No messages yet" message="Emails you send will be logged here." />
                </td></tr>
              ) : (
                messages.map((m) => (
                  <tr key={m._id} className="hover:bg-[#F8F3EA]/50 transition-colors align-top">
                    <td className="px-6 py-4 text-sm">
                      <p className="font-medium text-[#3B2923]">{m.to?.name || '—'}</p>
                      <p className="text-xs text-[#7C6659]">{m.to?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#3B2923]">{m.subject}</td>
                    <td className="px-6 py-4">
                      <Badge label={m.status === 'sent' ? 'Sent' : 'Failed'} variant={m.status === 'sent' ? 'success' : 'error'} />
                      {m.status === 'failed' && m.errorMessage && (
                        <p className="text-xs text-[#B94A48] mt-1 max-w-xs">{m.errorMessage}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{m.sentBy?.name || m.sentBy?.email || '—'}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659] whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
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
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!pagination.hasPrevPage} className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm disabled:opacity-40 hover:bg-[#F8F3EA] transition-colors">Previous</button>
              <button onClick={() => setPage((p) => p + 1)} disabled={!pagination.hasNextPage} className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm disabled:opacity-40 hover:bg-[#F8F3EA] transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
