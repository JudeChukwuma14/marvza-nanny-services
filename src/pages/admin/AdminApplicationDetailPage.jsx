import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchApplication, updateApplicationStatus, addNote, getNotes, getDocuments } from '../../api/applications'
import { ArrowLeft, User, Briefcase, FileText, CheckCircle, Clock, MessageSquare, Paperclip } from 'lucide-react'

const STATUSES = [
  'New', 'Under Review', 'Documents Pending', 'References',
  'Interview', 'Vetting', 'Approved', 'Not Approved'
]

const STATUS_COLORS = {
  'New': 'border-blue-200 text-blue-800 bg-blue-50',
  'Under Review': 'border-purple-200 text-purple-800 bg-purple-50',
  'Documents Pending': 'border-amber-200 text-amber-800 bg-amber-50',
  'References': 'border-indigo-200 text-indigo-800 bg-indigo-50',
  'Interview': 'border-pink-200 text-pink-800 bg-pink-50',
  'Vetting': 'border-orange-200 text-orange-800 bg-orange-50',
  'Approved': 'border-green-200 text-green-800 bg-green-50',
  'Not Approved': 'border-red-200 text-red-800 bg-red-50',
}

function DetailCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 bg-[#F7F5F0] border-b border-[#E4E7EC] flex items-center gap-2">
        <Icon size={18} className="text-[#0F4C5C]" />
        <h2 className="text-base font-semibold text-[#17202A]">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function DataItem({ label, value, fullWidth = false }) {
  if (value === undefined || value === null || value === '' || value === false) return null
  const displayValue = Array.isArray(value) ? value.join(', ') : String(value)
  if (!displayValue || displayValue === 'undefined') return null
  return (
    <div className={fullWidth ? 'col-span-full' : ''}>
      <p className="text-xs font-medium text-[#667085] mb-1">{label}</p>
      <p className="text-sm text-[#17202A] break-words">{displayValue}</p>
    </div>
  )
}

export default function AdminApplicationDetailPage() {
  const { id } = useParams()
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [notes, setNotes] = useState([])
  const [documents, setDocuments] = useState([])
  const [noteText, setNoteText] = useState('')
  const [addingNote, setAddingNote] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const [data, notesData, docsData] = await Promise.all([
          fetchApplication(id),
          getNotes(id),
          getDocuments(id),
        ])
        setApp(data)
        setNotes(notesData || [])
        setDocuments(docsData || [])
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
      const updated = await updateApplicationStatus(id, newStatus)
      setApp(prev => ({ ...prev, status: updated.status }))
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
      const newNote = await addNote(id, noteText)
      setNotes(prev => [...prev, newNote])
      setNoteText('')
    } catch (err) {
      console.error(err)
    } finally {
      setAddingNote(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Application Details">
        <div className="p-8 text-center text-[#667085]">Loading application...</div>
      </AdminLayout>
    )
  }

  if (!app) {
    return (
      <AdminLayout title="Application Details">
        <div className="p-8 text-center text-[#667085]">
          <p className="mb-4">Application not found.</p>
          <Link to="/admin/applications" className="text-[#0F4C5C] underline">Back to list</Link>
        </div>
      </AdminLayout>
    )
  }

  // Destructure nested schema
  const { personalDetails: pd, experience: exp, qualifications: qual,
    dbs, rightToWork: rtw, availability: avail, skills, about, declaration, references } = app

  const availableDays = avail?.daysAvailable || []

  const skillsList = [
    skills?.skillDriving && 'Driving licence',
    skills?.skillCar && 'Own vehicle',
    skills?.skillNewborn && 'Newborn care',
    skills?.skillCooking && 'Cooking',
    skills?.skillHomework && 'Homework support',
    skills?.skillSwimming && 'Swimming',
    skills?.skillLanguages && 'Additional languages',
    skills?.skillSEN && 'SEN experience',
    skills?.skillSleep && 'Sleep training',
    skills?.skillSchoolRuns && 'School runs',
    skills?.skillOther && 'Other skills',
  ].filter(Boolean)

  const statusColorClass = STATUS_COLORS[app.status] || 'border-[#E4E7EC] text-[#17202A] bg-white'

  return (
    <AdminLayout title={pd?.fullName || 'Application'}>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <Link
          to="/admin/applications"
          className="flex items-center gap-2 text-sm text-[#667085] hover:text-[#17202A] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Applications
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#667085]">Status:</span>
          <select
            value={app.status}
            onChange={handleStatusChange}
            disabled={updatingStatus}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 outline-none appearance-none cursor-pointer pr-8 bg-no-repeat bg-right disabled:opacity-50 ${statusColorClass}`}
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23667085%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
              backgroundSize: '8px',
              backgroundPosition: 'calc(100% - 10px) center',
            }}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Meta header */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm p-6 mb-6 flex flex-wrap gap-x-12 gap-y-4">
        <div>
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-1">Reference</p>
          <p className="text-base font-bold text-[#0F4C5C]">{app.applicationReference}</p>
        </div>
        <div>
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-1">Date Applied</p>
          <p className="text-base font-medium text-[#17202A]">
            {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-1">Experience</p>
          <p className="text-base font-medium text-[#17202A]">{exp?.yearsChildcareExp || '—'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <DetailCard title="Personal Details" icon={User}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Full name" value={pd?.fullName} />
              <DataItem label="Preferred name" value={pd?.preferredName} />
              <DataItem label="Date of birth" value={pd?.dateOfBirth} />
              <DataItem label="Nationality" value={pd?.nationality} />
              <DataItem label="Email" value={pd?.email} />
              <DataItem label="Phone" value={pd?.phone} />
              <DataItem label="Address" value={pd?.address} fullWidth />
              <DataItem label="Town / City" value={pd?.city} />
              <DataItem label="Postcode" value={pd?.postcode} />
              <DataItem label="Languages" value={pd?.languages} fullWidth />
            </div>
          </DetailCard>

          <DetailCard title="Experience & Qualifications" icon={Briefcase}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 pb-6 border-b border-[#E4E7EC]">
              <DataItem label="Childcare experience" value={exp?.yearsChildcareExp} />
              <DataItem label="Nanny experience" value={exp?.yearsNannyExp} />
              <DataItem label="Newborn experience" value={exp?.newbornExp} />
              <DataItem label="Toddler experience" value={exp?.toddlerExp} />
              <DataItem label="School-age experience" value={exp?.schoolAgeExp} />
              <DataItem label="Multiple children" value={exp?.multipleChildrenExp} />
              <DataItem label="Additional needs" value={exp?.additionalNeedsExp} />
              <DataItem label="Additional needs detail" value={exp?.additionalNeedsDetail} fullWidth />
              <DataItem label="Previous roles" value={exp?.previousRoles} fullWidth />
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Childcare qualification" value={qual?.childcareQualifications} fullWidth />
              <DataItem label="Other qualifications" value={qual?.otherQualifications} fullWidth />
              <DataItem label="Paediatric First Aid" value={qual?.paediatricFirstAid} />
              <DataItem label="Other first aid" value={qual?.otherFirstAid} />
              <DataItem label="Other certificates" value={qual?.otherCertificates} fullWidth />
            </div>
          </DetailCard>

          <DetailCard title="About You" icon={FileText}>
            <div className="flex flex-col gap-5">
              <DataItem label="Tell us about yourself" value={about?.aboutYourself} fullWidth />
              <DataItem label="Why do you want to work as a nanny?" value={about?.whyNanny} fullWidth />
              <DataItem label="What do you enjoy most about childcare?" value={about?.enjoyAboutChildcare} fullWidth />
              <DataItem label="What type of family/role are you looking for?" value={about?.familyType} fullWidth />
            </div>
          </DetailCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <DetailCard title="Availability & Preferences" icon={Clock}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Start date" value={avail?.startDate} />
              <DataItem label="Work type" value={avail?.workType} />
              <DataItem label="Live-in / Live-out" value={avail?.liveInOut} />
              <DataItem label="Max distance" value={avail?.maxDistance} />
              <DataItem label="Hours available" value={avail?.hoursAvailable} />
              <DataItem label="Preferred hours" value={avail?.preferredHours} />
              <DataItem label="Weekend availability" value={avail?.weekendAvailability} />
              <DataItem label="Evening availability" value={avail?.eveningAvailability} />
              <DataItem label="Days available" value={availableDays.length ? availableDays.join(', ') : undefined} fullWidth />
              <DataItem label="Areas willing to work" value={avail?.areasWillingToWork} fullWidth />
            </div>
          </DetailCard>

          <DetailCard title="Skills" icon={CheckCircle}>
            {skillsList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skillsList.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-[#0F4C5C]/5 text-[#0F4C5C] text-sm font-medium border border-[#0F4C5C]/20">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#667085]">No specific skills selected.</p>
            )}
            {skills?.otherSkillsDetail && (
              <div className="mt-4 pt-4 border-t border-[#E4E7EC]">
                <DataItem label="Other skills detail" value={skills.otherSkillsDetail} fullWidth />
              </div>
            )}
          </DetailCard>

          <DetailCard title="Checks & References" icon={ShieldCheckIcon}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 pb-6 border-b border-[#E4E7EC]">
              <DataItem label="Right to work in UK" value={rtw?.rightToWork} />
              <DataItem label="Documentation type" value={rtw?.rightToWorkType} />
              <DataItem label="RTW Details" value={rtw?.rightToWorkDetails} fullWidth />
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 pb-6 border-b border-[#E4E7EC]">
              <DataItem label="Current DBS" value={dbs?.hasCurrentDBS} />
              <DataItem label="DBS type" value={dbs?.dbsType} />
              <DataItem label="DBS date" value={dbs?.dbsDate} />
              <DataItem label="Update Service" value={dbs?.dbsUpdateService} />
              <DataItem label="Additional DBS info" value={dbs?.dbsAdditionalInfo} fullWidth />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[#17202A]">References</h3>
              {(references || []).map((ref, i) =>
                ref?.employerName ? (
                  <div key={i} className="p-4 rounded-lg bg-[#F7F5F0] border border-[#E4E7EC]">
                    <p className="text-xs font-semibold text-[#0F4C5C] mb-3 uppercase tracking-wider">Reference {i + 1}</p>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                      <DataItem label="Employer" value={ref.employerName} />
                      <DataItem label="Role" value={ref.role} />
                      <DataItem label="Email" value={ref.email} />
                      <DataItem label="Phone" value={ref.phone} />
                      <DataItem label="Relationship" value={ref.relationship} />
                      <DataItem label="Dates" value={`${ref.startDate || '—'} to ${ref.endDate || 'Present'}`} />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </DetailCard>

          {/* Documents */}
          <DetailCard title={`Documents (${documents.length})`} icon={Paperclip}>
            {documents.length === 0 ? (
              <p className="text-sm text-[#667085]">No documents uploaded.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {documents.map((doc) => (
                  <a
                    key={doc._id}
                    href={doc.signedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#E4E7EC] hover:bg-[#F7F5F0] transition-colors group"
                  >
                    <Paperclip size={14} className="text-[#0F4C5C] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#17202A] truncate">{doc.originalName}</p>
                      <p className="text-xs text-[#667085]">{doc.type} · {doc.format?.toUpperCase() || 'FILE'}</p>
                    </div>
                    <span className="text-xs text-[#0F4C5C] group-hover:underline">Download</span>
                  </a>
                ))}
              </div>
            )}
          </DetailCard>

          {/* Internal notes */}
          <DetailCard title="Internal Notes" icon={MessageSquare}>
            <div className="flex flex-col gap-3 mb-4">
              {notes.length === 0 ? (
                <p className="text-sm text-[#667085]">No notes yet.</p>
              ) : (
                notes.map((note) => (
                  <div key={note._id} className="p-3 rounded-lg bg-[#F7F5F0] border border-[#E4E7EC]">
                    <p className="text-sm text-[#17202A]">{note.text}</p>
                    <p className="text-xs text-[#667085] mt-1">
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
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#E4E7EC] focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
              />
              <button
                type="submit"
                disabled={addingNote || !noteText.trim()}
                className="px-4 py-2 rounded-lg bg-[#0F4C5C] text-white text-sm font-medium hover:bg-[#0B3D4A] transition-colors disabled:opacity-50"
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

function ShieldCheckIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
