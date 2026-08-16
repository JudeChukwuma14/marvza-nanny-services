import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchApplication, updateApplicationStatus, addNote, getNotes, getDocuments } from '../../api/applications'
import { ArrowLeft, User, Briefcase, FileText, CheckCircle, Clock, MessageSquare, Paperclip, Shield } from 'lucide-react'

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

function Badge({ label, positive = true }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
      positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {label}
    </span>
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

  // Destructure new nested schema
  const {
    personalDetails: pd,
    workPreferences: wp,
    experience: exp,
    skills: sk,
    qualifications: qual,
    additionalInfo: addInfo,
    declaration: decl,
  } = app

  const fullName = [pd?.firstName, pd?.lastName].filter(Boolean).join(' ') || '—'
  const statusColorClass = STATUS_COLORS[app.status] || 'border-[#E4E7EC] text-[#17202A] bg-white'

  return (
    <AdminLayout title={fullName}>
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
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-1">Candidate</p>
          <p className="text-base font-medium text-[#17202A]">{fullName}</p>
        </div>
        <div>
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-1">Experience</p>
          <p className="text-base font-medium text-[#17202A]">
            {exp?.professionalChildcareExperienceYears != null
              ? `${exp.professionalChildcareExperienceYears} yr${exp.professionalChildcareExperienceYears !== 1 ? 's' : ''}`
              : '—'}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-1">Date Applied</p>
          <p className="text-base font-medium text-[#17202A]">
            {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Personal Details */}
          <DetailCard title="Personal Details" icon={User}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="First name" value={pd?.firstName} />
              <DataItem label="Last name" value={pd?.lastName} />
              <DataItem label="Date of birth" value={pd?.dateOfBirth} />
              <DataItem label="Email" value={pd?.email} />
              <DataItem label="Phone" value={pd?.phone} />
              <DataItem label="Area" value={pd?.area} />
              <DataItem label="Address Line 1" value={pd?.address1} fullWidth />
              <DataItem label="Address Line 2" value={pd?.address2} fullWidth />
              <DataItem label="Town / City" value={pd?.city} />
              <DataItem label="Postcode" value={pd?.postcode} />
            </div>
          </DetailCard>

          {/* Experience */}
          <DetailCard title="Childcare Experience" icon={Briefcase}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 pb-6 border-b border-[#E4E7EC]">
              <DataItem label="Years of professional experience" value={exp?.professionalChildcareExperienceYears != null ? `${exp.professionalChildcareExperienceYears} years` : undefined} />
              <DataItem label="Previous childcare experience" value={exp?.previousChildcareExperience} fullWidth />
              <DataItem label="Multiple children experience" value={exp?.multipleChildrenExperience} fullWidth />
              <DataItem label="Additional needs experience" value={exp?.additionalNeedsExperience} fullWidth />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-3">Age Group Experience (years)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                <DataItem label="Newborns" value={exp?.ageGroupExperience?.newborns != null ? `${exp.ageGroupExperience.newborns} yrs` : undefined} />
                <DataItem label="Toddlers" value={exp?.ageGroupExperience?.toddlers != null ? `${exp.ageGroupExperience.toddlers} yrs` : undefined} />
                <DataItem label="Pre-school" value={exp?.ageGroupExperience?.preschool != null ? `${exp.ageGroupExperience.preschool} yrs` : undefined} />
                <DataItem label="School age" value={exp?.ageGroupExperience?.schoolAge != null ? `${exp.ageGroupExperience.schoolAge} yrs` : undefined} />
                <DataItem label="Teenagers" value={exp?.ageGroupExperience?.teenagers != null ? `${exp.ageGroupExperience.teenagers} yrs` : undefined} />
              </div>
            </div>
          </DetailCard>

          {/* Qualifications */}
          <DetailCard title="Qualifications" icon={FileText}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Enhanced DBS" value={qual?.enhancedDBS} />
              <DataItem label="Paediatric First Aid" value={qual?.paediatricFirstAid} />
              <DataItem label="Childcare qualifications" value={qual?.childcareQualifications} fullWidth />
              <DataItem label="Other qualifications" value={qual?.otherQualifications} fullWidth />
            </div>
          </DetailCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Work Preferences */}
          <DetailCard title="Work Preferences" icon={Clock}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Work types" value={wp?.workTypes} fullWidth />
              <DataItem label="Working arrangement" value={wp?.workingArrangement} />
              <DataItem label="Preferred working hours" value={wp?.preferredWorkingHours} />
              <DataItem label="Areas willing to work" value={wp?.areasWillingToWork} fullWidth />
              <DataItem label="Maximum travel distance" value={wp?.maximumTravelDistance} />
              <DataItem label="Start date" value={wp?.startDate} />
            </div>
          </DetailCard>

          {/* Skills */}
          <DetailCard title="Skills & Interests" icon={CheckCircle}>
            {sk?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {sk.skills.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-[#0F4C5C]/5 text-[#0F4C5C] text-sm font-medium border border-[#0F4C5C]/20">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#667085] mb-4">No specific skills selected.</p>
            )}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-[#E4E7EC]">
              <div>
                <p className="text-xs font-medium text-[#667085] mb-1.5">Driving licence</p>
                <Badge label={sk?.drivingLicence ? 'Yes' : 'No'} positive={!!sk?.drivingLicence} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#667085] mb-1.5">Car access</p>
                <Badge label={sk?.carAccess ? 'Yes' : 'No'} positive={!!sk?.carAccess} />
              </div>
              <DataItem label="Languages" value={sk?.languages} fullWidth />
              <DataItem label="Other skills & interests" value={sk?.otherSkillsInterests} fullWidth />
            </div>
          </DetailCard>

          {/* Additional Info */}
          <DetailCard title="Additional Information" icon={Shield}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-medium text-[#667085] mb-1.5">Swimming</p>
                <Badge label={addInfo?.swimming || '—'} positive={addInfo?.swimming === 'Yes'} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#667085] mb-1.5">Animal allergy</p>
                <Badge label={addInfo?.animalAllergy || '—'} positive={addInfo?.animalAllergy === 'No'} />
              </div>
            </div>
          </DetailCard>

          {/* Declaration */}
          <DetailCard title="Declaration & Consent" icon={Shield}>
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: 'informationAccurate', label: 'Information accurate' },
                { key: 'applicationReviewConsent', label: 'Application review consent' },
                { key: 'referenceConsent', label: 'Reference consent' },
                { key: 'privacyPolicyConsent', label: 'Privacy policy' },
                { key: 'termsConsent', label: 'Terms & Conditions' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-[#667085]">{label}</span>
                  <Badge label={decl?.[key] ? '✓ Agreed' : '✗ Not agreed'} positive={!!decl?.[key]} />
                </div>
              ))}
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
