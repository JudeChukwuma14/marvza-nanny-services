import { useState, useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { getAdminMe } from '../../api/applications'
import { fetchAdmins, createAdminUser, updateAdminRole, updateAdminStatus } from '../../api/adminUsers'
import { LoadingPage } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import Badge from '../../components/ui/Badge'
import { Plus, X } from 'lucide-react'

function AddAdminForm({ onCancel, onCreated }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const admin = await createAdminUser({ email, name, password, role })
      onCreated(admin)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create admin')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#3B2923]">Add Admin</h3>
        <button type="button" onClick={onCancel} className="text-[#7C6659] hover:text-[#3B2923]"><X size={18} /></button>
      </div>
      {error && <p className="text-sm text-[#B94A48] mb-3">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Temporary Password</label>
          <input type="text" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#7C6659] mb-1 block">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20">
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
      </div>
      <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors disabled:opacity-50">
        {submitting ? 'Creating…' : 'Create Admin'}
      </button>
    </form>
  )
}

export default function AdminUsersPage() {
  const [me, setMe] = useState(null)
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const meData = await getAdminMe()
        setMe(meData)
        if (meData.role === 'superadmin') {
          const list = await fetchAdmins()
          setAdmins(list)
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleRoleChange(admin, role) {
    setUpdatingId(admin._id)
    try {
      const updated = await updateAdminRole(admin._id, role)
      setAdmins((prev) => prev.map((a) => (a._id === admin._id ? updated : a)))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleStatusToggle(admin) {
    setUpdatingId(admin._id)
    try {
      const updated = await updateAdminStatus(admin._id, admin.isActive === false)
      setAdmins((prev) => prev.map((a) => (a._id === admin._id ? updated : a)))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Users & Roles">
        <LoadingPage message="Loading…" />
      </AdminLayout>
    )
  }

  if (error || me?.role !== 'superadmin') {
    return (
      <AdminLayout title="Users & Roles">
        <EmptyState variant="error" title="Access restricted" message="This page is only available to Super Admins." />
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Users & Roles">
      {showAddForm ? (
        <AddAdminForm
          onCancel={() => setShowAddForm(false)}
          onCreated={(admin) => { setAdmins((prev) => [admin, ...prev]); setShowAddForm(false) }}
        />
      ) : (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors"
          >
            <Plus size={16} /> Add Admin
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F3EA] border-b border-[#E4D8C7] text-xs font-semibold text-[#7C6659] uppercase tracking-wider">
                <th className="px-6 py-4">Name / Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D8C7]">
              {admins.map((a) => (
                <tr key={a._id} className="hover:bg-[#F8F3EA]/50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <p className="font-medium text-[#3B2923]">{a.name || '—'}</p>
                    <p className="text-xs text-[#7C6659]">{a.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={a.role}
                      disabled={updatingId === a._id || a._id === me.id}
                      onChange={(e) => handleRoleChange(a, e.target.value)}
                      className="px-2 py-1 rounded-lg border border-[#E4D8C7] text-xs text-[#3B2923] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 disabled:opacity-50 cursor-pointer"
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <Badge label={a.isActive === false ? 'Inactive' : 'Active'} variant={a.isActive === false ? 'archived' : 'success'} />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7C6659]">
                    {new Date(a.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleStatusToggle(a)}
                      disabled={updatingId === a._id || a._id === me.id}
                      className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-xs font-medium text-[#3B2923] hover:bg-[#F8F3EA] transition-colors disabled:opacity-40"
                    >
                      {a.isActive === false ? 'Reactivate' : 'Deactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
