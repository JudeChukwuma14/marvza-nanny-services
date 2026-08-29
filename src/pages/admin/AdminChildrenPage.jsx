import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchChildren, createChild, deleteChild } from '../../api/children'
import { fetchFamilies } from '../../api/families'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import { Search, Plus, Trash2, X } from 'lucide-react'

function AddChildForm({ onCancel, onCreated }) {
  const [familySearch, setFamilySearch] = useState('')
  const [familyResults, setFamilyResults] = useState([])
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [allergiesOrNotes, setAllergiesOrNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!familySearch.trim() || selectedFamily) { setFamilyResults([]); return }
    const timer = setTimeout(async () => {
      try {
        const result = await fetchFamilies({ search: familySearch, limit: 5 })
        setFamilyResults(result.data || [])
      } catch { /* ignore */ }
    }, 300)
    return () => clearTimeout(timer)
  }, [familySearch, selectedFamily])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedFamily) { setError('Please select a family'); return }
    if (!firstName.trim()) { setError('First name is required'); return }
    setSubmitting(true)
    setError('')
    try {
      const child = await createChild({
        family: selectedFamily._id,
        firstName,
        lastName,
        age: age === '' ? undefined : Number(age),
        gender,
        allergiesOrNotes,
      })
      onCreated({ ...child, family: selectedFamily })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add child')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#3B2923]">Add Child</h3>
        <button type="button" onClick={onCancel} className="text-[#7C6659] hover:text-[#3B2923]"><X size={18} /></button>
      </div>

      {error && <p className="text-sm text-[#B94A48] mb-3">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="relative sm:col-span-2">
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Family</label>
          {selectedFamily ? (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#E4D8C7] bg-[#F8F3EA] text-sm text-[#3B2923]">
              {selectedFamily.firstName} {selectedFamily.lastName} ({selectedFamily.familyReference})
              <button type="button" onClick={() => { setSelectedFamily(null); setFamilySearch('') }} className="text-[#7C6659] hover:text-[#3B2923]">
                <X size={14} />
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={familySearch}
                onChange={(e) => setFamilySearch(e.target.value)}
                placeholder="Search by family name, email or reference..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20"
              />
              {familyResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-[#E4D8C7] shadow-lg max-h-48 overflow-y-auto">
                  {familyResults.map((f) => (
                    <button
                      key={f._id}
                      type="button"
                      onClick={() => { setSelectedFamily(f); setFamilyResults([]) }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#F8F3EA] transition-colors"
                    >
                      {f.firstName} {f.lastName} · {f.email}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Age</label>
          <input type="number" min="0" max="17" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Gender</label>
          <input value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Allergies / Notes</label>
          <textarea value={allergiesOrNotes} onChange={(e) => setAllergiesOrNotes(e.target.value)} rows={2} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors disabled:opacity-50"
      >
        {submitting ? 'Adding…' : 'Add Child'}
      </button>
    </form>
  )
}

export default function AdminChildrenPage() {
  const [children, setChildren] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = { page, limit: 20, ...(search ? { search } : {}) }
      const result = await fetchChildren(params)
      setChildren(result.data || [])
      setPagination(result.pagination || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load children')
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => { load() }, [load])

  function handleSearch(val) { setSearch(val); setPage(1) }

  async function handleDelete(id) {
    if (!window.confirm('Remove this child profile?')) return
    try {
      await deleteChild(id)
      setChildren((prev) => prev.filter((c) => c._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AdminLayout title="Children">
      {showAddForm && (
        <AddChildForm
          onCancel={() => setShowAddForm(false)}
          onCreated={(child) => { setChildren((prev) => [child, ...prev]); setShowAddForm(false) }}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C6659]" />
          <input
            type="text"
            placeholder="Search by first or last name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E4D8C7] text-sm text-[#3B2923] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20"
          />
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors"
          >
            <Plus size={16} /> Add Child
          </button>
        )}
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
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Family</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center"><LoadingSpinner className="mx-auto" /></td></tr>
              ) : children.length === 0 ? (
                <tr><td colSpan={6} className="p-0">
                  <EmptyState title="No children found" message="Add a child profile to a family to get started." />
                </td></tr>
              ) : (
                children.map((c) => (
                  <tr key={c._id} className="hover:bg-[#F8F3EA]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#3B2923]">{[c.firstName, c.lastName].filter(Boolean).join(' ')}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{c.age ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{c.gender || '—'}</td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">
                      {c.family ? (
                        <Link to={`/admin/families/${c.family._id}`} className="hover:underline text-[#3B2923]">
                          {[c.family.firstName, c.family.lastName].filter(Boolean).join(' ')}
                        </Link>
                      ) : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#7C6659]">{c.allergiesOrNotes || '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(c._id)} className="p-2 rounded-md text-[#7C6659] hover:bg-[#FAEAEA] hover:text-[#B94A48] transition-colors">
                        <Trash2 size={16} />
                      </button>
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
