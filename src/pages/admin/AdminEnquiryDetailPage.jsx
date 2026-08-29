import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchEnquiry, updateEnquiryStatus, addEnquiryNote, getEnquiryNotes } from '../../api/enquiries'
import { LoadingPage } from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import { ArrowLeft, Calendar, Users as UsersIcon, MapPin, ClipboardList, User, MessageSquare } from 'lucide-react'

const STATUSES = ['New', 'Under Review', 'Matching', 'Introduced', 'Placed', 'Closed']
const STATUS_VARIANT = {
  New: 'new',
  'Under Review': 'review',
  Matching: 'screening',
  Introduced: 'interview',
  Placed: 'success',
  Closed: 'archived',
}

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

function DataItem({ label, value, fullWidth = false }) {
  if (value === undefined || value === null || value === '') return null
  const displayValue = Array.isArray(value) ? value.join(', ') : String(value)
  if (!displayValue) return null
  return (
    <div className={fullWidth ? 'col-span-full' : ''}>
      <p className="text-xs font-medium text-[#7C6659] mb-1">{label}</p>
      <p className="text-sm text-[#3B2923] break-words">{displayValue}</p>
    </div>
  )
}

export default function AdminEnquiryDetailPage() {
  const { id } = useParams()
  const [enquiry, setEnquiry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [notes, setNotes] = useState([])
  const [noteText, setNoteText] = useState('')
  const [addingNote, setAddingNote] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [data, notesData] = await Promise.all([fetchEnquiry(id), getEnquiryNotes(id)])
        setEnquiry(data)
        setNotes(notesData || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleStatusChange(e) {
    const newStatus = e.target.value
    setUpdatingStatus(true)
    try {
      const updated = await updateEnquiryStatus(id, newStatus)
      setEnquiry((prev) => ({ ...prev, status: updated.status }))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function handleAddNote(e) {
    e.preventDefault()
    if (!noteText.trim()) return
    setAddingNote(true)
    try {
      const newNote = await addEnquiryNote(id, noteText)
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
      <AdminLayout title="Enquiry Details">
        <LoadingPage message="Loading enquiry…" />
      </AdminLayout>
    )
  }

  if (!enquiry) {
    return (
      <AdminLayout title="Enquiry Details">
        <div className="p-8 text-center text-[#7C6659]">
          <p className="mb-4">Enquiry not found.</p>
          <Link to="/admin/enquiries" className="text-[#3B2923] underline">Back to list</Link>
        </div>
      </AdminLayout>
    )
  }

  const fullName = [enquiry.parent?.firstName, enquiry.parent?.lastName].filter(Boolean).join(' ') || '—'

  return (
    <AdminLayout title={enquiry.enquiryReference}>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <Link to="/admin/enquiries" className="flex items-center gap-2 text-sm text-[#7C6659] hover:text-[#3B2923] transition-colors">
          <ArrowLeft size={16} /> Back to Enquiries
        </Link>
        <div className="flex items-center gap-3">
          <Badge label={enquiry.status} variant={STATUS_VARIANT[enquiry.status]} />
          <select
            value={enquiry.status}
            onChange={handleStatusChange}
            disabled={updatingStatus}
            className="px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-sm text-[#3B2923] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 disabled:opacity-50 cursor-pointer"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6 mb-6 flex flex-wrap gap-x-12 gap-y-4">
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Reference</p>
          <p className="text-base font-bold text-[#3B2923]">{enquiry.enquiryReference}</p>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Parent</p>
          <p className="text-base font-medium text-[#3B2923]">{fullName}</p>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Service</p>
          <p className="text-base font-medium text-[#3B2923]">{enquiry.serviceType || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Date Submitted</p>
          <p className="text-base font-medium text-[#3B2923]">
            {new Date(enquiry.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <DetailCard title="Service Requirements" icon={Calendar}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Frequency" value={enquiry.frequency} />
              <DataItem label="Urgent" value={enquiry.isUrgent ? 'Yes' : 'No'} />
              <DataItem label="Preferred start date" value={enquiry.preferredStartDate} />
              <DataItem label="Days needed" value={enquiry.schedule?.daysNeeded} fullWidth />
              <DataItem label="Hours per week" value={enquiry.schedule?.hoursPerWeek} />
              <DataItem label="Schedule notes" value={enquiry.schedule?.scheduleNotes} fullWidth />
            </div>
          </DetailCard>

          <DetailCard title="Children" icon={UsersIcon}>
            {(enquiry.children || []).length === 0 ? (
              <p className="text-sm text-[#7C6659]">No children listed.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {enquiry.children.map((c, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#F8F3EA] border border-[#E4D8C7]">
                    <p className="text-sm font-medium text-[#3B2923]">{c.name || `Child ${i + 1}`} · Age {c.age}{c.gender ? ` · ${c.gender}` : ''}</p>
                    {c.notes && <p className="text-xs text-[#7C6659] mt-1">{c.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </DetailCard>

          <DetailCard title="Location & Travel" icon={MapPin}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Postcode" value={enquiry.location?.postcode} />
              <DataItem label="Area" value={enquiry.location?.area} />
              <DataItem label="Where care takes place" value={enquiry.location?.locationType} />
              <DataItem label="Living arrangement" value={enquiry.location?.livingArrangement} />
            </div>
          </DetailCard>
        </div>

        <div className="flex flex-col gap-6">
          <DetailCard title="Family Needs & Duties" icon={ClipboardList}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Duties" value={enquiry.needs?.duties} fullWidth />
              <DataItem label="Experience required" value={enquiry.needs?.experienceRequired} />
              <DataItem label="Preferred qualifications" value={enquiry.needs?.qualifications} fullWidth />
              <DataItem label="Special requirements" value={enquiry.needs?.specialRequirements} fullWidth />
            </div>
          </DetailCard>

          <DetailCard title="Parent Details" icon={User}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Name" value={fullName} />
              <DataItem label="Email" value={enquiry.parent?.email} />
              <DataItem label="Phone" value={enquiry.parent?.phone} />
              <DataItem label="Preferred contact method" value={enquiry.parent?.contactMethod} />
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
      </div>
    </AdminLayout>
  )
}
