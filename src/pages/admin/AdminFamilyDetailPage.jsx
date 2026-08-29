import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchFamily, addFamilyNote, getFamilyNotes } from '../../api/families'
import { fetchChildren, createChild, deleteChild } from '../../api/children'
import { LoadingPage } from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import { ArrowLeft, User, MessageSquare, CalendarClock, Baby, Plus, Trash2, X } from 'lucide-react'

function DetailCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 bg-[#F8F3EA] border-b border-[#E4D8C7] flex items-center gap-2">
        <Icon size={18} className="text-[#B88A62]" />
        <h2 className="text-base font-semibold text-[#3B2923]">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function DataItem({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs font-medium text-[#7C6659] mb-1">{label}</p>
      <p className="text-sm text-[#3B2923]">{value}</p>
    </div>
  )
}

const SHIFT_STATUS_VARIANT = {
  Open: 'new',
  'Pending Confirmation': 'pending',
  Confirmed: 'success',
  Completed: 'approved',
  Cancelled: 'error',
  Expired: 'archived',
}

export default function AdminFamilyDetailPage() {
  const { id } = useParams()
  const [family, setFamily] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [noteText, setNoteText] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [children, setChildren] = useState([])
  const [showAddChild, setShowAddChild] = useState(false)
  const [childForm, setChildForm] = useState({ firstName: '', lastName: '', age: '', gender: '', allergiesOrNotes: '' })
  const [addingChild, setAddingChild] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [data, notesData, childrenData] = await Promise.all([
          fetchFamily(id),
          getFamilyNotes(id),
          fetchChildren({ family: id, limit: 50 }),
        ])
        setFamily(data)
        setNotes(notesData || [])
        setChildren(childrenData.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleAddChild(e) {
    e.preventDefault()
    if (!childForm.firstName.trim()) return
    setAddingChild(true)
    try {
      const child = await createChild({
        family: id,
        ...childForm,
        age: childForm.age === '' ? undefined : Number(childForm.age),
      })
      setChildren((prev) => [child, ...prev])
      setChildForm({ firstName: '', lastName: '', age: '', gender: '', allergiesOrNotes: '' })
      setShowAddChild(false)
    } catch (err) {
      console.error(err)
    } finally {
      setAddingChild(false)
    }
  }

  async function handleDeleteChild(childId) {
    if (!window.confirm('Remove this child profile?')) return
    try {
      await deleteChild(childId)
      setChildren((prev) => prev.filter((c) => c._id !== childId))
    } catch (err) {
      console.error(err)
    }
  }

  async function handleAddNote(e) {
    e.preventDefault()
    if (!noteText.trim()) return
    setAddingNote(true)
    try {
      const newNote = await addFamilyNote(id, noteText)
      setNotes((prev) => [...prev, newNote])
      setNoteText('')
    } catch (err) {
      console.error(err)
    } finally {
      setAddingNote(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Family Details">
        <LoadingPage message="Loading family…" />
      </AdminLayout>
    )
  }

  if (!family) {
    return (
      <AdminLayout title="Family Details">
        <div className="p-8 text-center text-[#7C6659]">
          <p className="mb-4">Family not found.</p>
          <Link to="/admin/families" className="text-[#3B2923] underline">Back to list</Link>
        </div>
      </AdminLayout>
    )
  }

  const fullName = [family.firstName, family.lastName].filter(Boolean).join(' ') || '—'

  return (
    <AdminLayout title={fullName}>
      <Link to="/admin/families" className="mb-6 inline-flex items-center gap-2 text-sm text-[#7C6659] hover:text-[#3B2923] transition-colors">
        <ArrowLeft size={16} /> Back to Families
      </Link>

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6 mb-6 flex flex-wrap gap-x-12 gap-y-4">
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Reference</p>
          <p className="text-base font-bold text-[#3B2923]">{family.familyReference}</p>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Name</p>
          <p className="text-base font-medium text-[#3B2923]">{fullName}</p>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Date Added</p>
          <p className="text-base font-medium text-[#3B2923]">
            {new Date(family.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <DetailCard title="Contact Details" icon={User}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Email" value={family.email} />
              <DataItem label="Phone" value={family.phone} />
              <DataItem label="Postcode" value={family.postcode} />
              <DataItem label="Area" value={family.area} />
            </div>
          </DetailCard>

          <DetailCard title="Internal Notes" icon={MessageSquare}>
            <div className="flex flex-col gap-3 mb-4">
              {notes.length === 0 ? (
                <p className="text-sm text-[#7C6659]">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div key={note._id} className="p-3 rounded-lg bg-[#F8F3EA] border border-[#E4D8C7]">
                    <p className="text-sm text-[#3B2923]">{note.text}</p>
                    <p className="text-xs text-[#7C6659] mt-1">
                      {note.createdBy} · {new Date(note.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20"
              />
              <button
                type="submit"
                disabled={addingNote || !noteText.trim()}
                className="px-4 py-2 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors disabled:opacity-50"
              >
                {addingNote ? '…' : 'Add'}
              </button>
            </form>
          </DetailCard>
        </div>

        <div className="flex flex-col gap-6">
          <DetailCard title={`Children (${children.length})`} icon={Baby}>
            <div className="flex flex-col gap-3 mb-4">
              {children.length === 0 ? (
                <p className="text-sm text-[#7C6659]">No children on record.</p>
              ) : (
                children.map((c) => (
                  <div key={c._id} className="flex items-start justify-between p-3 rounded-lg bg-[#F8F3EA] border border-[#E4D8C7]">
                    <div>
                      <p className="text-sm font-medium text-[#3B2923]">
                        {[c.firstName, c.lastName].filter(Boolean).join(' ')}
                        {c.age != null && <span className="text-[#7C6659] font-normal"> · Age {c.age}</span>}
                        {c.gender && <span className="text-[#7C6659] font-normal"> · {c.gender}</span>}
                      </p>
                      {c.allergiesOrNotes && <p className="text-xs text-[#7C6659] mt-1">{c.allergiesOrNotes}</p>}
                    </div>
                    <button onClick={() => handleDeleteChild(c._id)} className="text-[#7C6659] hover:text-[#B94A48] transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {showAddChild ? (
              <form onSubmit={handleAddChild} className="border-t border-[#E4D8C7] pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-[#7C6659] uppercase tracking-wider">New Child</p>
                  <button type="button" onClick={() => setShowAddChild(false)} className="text-[#7C6659] hover:text-[#3B2923]"><X size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input placeholder="First name" value={childForm.firstName} onChange={(e) => setChildForm((f) => ({ ...f, firstName: e.target.value }))} className="px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
                  <input placeholder="Last name" value={childForm.lastName} onChange={(e) => setChildForm((f) => ({ ...f, lastName: e.target.value }))} className="px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
                  <input type="number" min="0" max="17" placeholder="Age" value={childForm.age} onChange={(e) => setChildForm((f) => ({ ...f, age: e.target.value }))} className="px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
                  <input placeholder="Gender" value={childForm.gender} onChange={(e) => setChildForm((f) => ({ ...f, gender: e.target.value }))} className="px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
                  <input placeholder="Allergies / notes" value={childForm.allergiesOrNotes} onChange={(e) => setChildForm((f) => ({ ...f, allergiesOrNotes: e.target.value }))} className="col-span-2 px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20" />
                </div>
                <button type="submit" disabled={addingChild} className="px-4 py-2 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors disabled:opacity-50">
                  {addingChild ? 'Adding…' : 'Add Child'}
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddChild(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3B2923] hover:text-[#2A1B17] transition-colors"
              >
                <Plus size={14} /> Add Child
              </button>
            )}
          </DetailCard>

          <DetailCard title={`Booking History (${family.shifts?.length || 0})`} icon={CalendarClock}>
            {!family.shifts?.length ? (
              <p className="text-sm text-[#7C6659]">No bookings yet.</p>
            ) : (
              <div className="flex flex-col divide-y divide-[#E4D8C7]">
                {family.shifts.map((shift) => (
                  <Link
                    key={shift._id}
                    to={`/admin/bookings/${shift._id}`}
                    className="flex items-center justify-between py-3 hover:bg-[#F8F3EA]/50 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#3B2923]">{shift.shiftReference}</p>
                      <p className="text-xs text-[#7C6659]">{shift.schedule?.date} · {shift.schedule?.startTime}–{shift.schedule?.finishTime}</p>
                    </div>
                    <Badge label={shift.status} variant={SHIFT_STATUS_VARIANT[shift.status]} />
                  </Link>
                ))}
              </div>
            )}
          </DetailCard>
        </div>
      </div>
    </AdminLayout>
  )
}
