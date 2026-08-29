import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchNanny, updateNannyVettingStatus, updateNannyAccountStatus } from '../../api/nannies'
import { LoadingPage } from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import { ArrowLeft, User, Briefcase, ShieldCheck, Clock2 } from 'lucide-react'

const VETTING_STATUSES = ['Pending', 'Vetted', 'Suspended', 'Revoked']
const ACCOUNT_STATUSES = ['Active', 'Inactive', 'Suspended']
const VETTING_VARIANT = { Pending: 'pending', Vetted: 'success', Suspended: 'error', Revoked: 'archived' }
const ACCOUNT_VARIANT = { Active: 'success', Inactive: 'archived', Suspended: 'error' }

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
  if (value === undefined || value === null || value === '') return null
  return (
    <div>
      <p className="text-xs font-medium text-[#7C6659] mb-1">{label}</p>
      <p className="text-sm text-[#3B2923]">{value}</p>
    </div>
  )
}

function AvailabilityChip({ label, active }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${active ? 'bg-[#E8F3EE] text-[#3F7656]' : 'bg-[#E4D8C7]/60 text-[#7C6659]'}`}>
      {label}: {active ? 'Yes' : 'No'}
    </span>
  )
}

export default function AdminNannyDetailPage() {
  const { id } = useParams()
  const [nanny, setNanny] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updatingVetting, setUpdatingVetting] = useState(false)
  const [updatingAccount, setUpdatingAccount] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        setNanny(await fetchNanny(id))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleVettingChange(e) {
    const value = e.target.value
    setUpdatingVetting(true)
    try {
      const updated = await updateNannyVettingStatus(id, value)
      setNanny((prev) => ({ ...prev, vettingStatus: updated.vettingStatus }))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingVetting(false)
    }
  }

  async function handleAccountChange(e) {
    const value = e.target.value
    setUpdatingAccount(true)
    try {
      const updated = await updateNannyAccountStatus(id, value)
      setNanny((prev) => ({ ...prev, accountStatus: updated.accountStatus }))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingAccount(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Nanny Details">
        <LoadingPage message="Loading nanny…" />
      </AdminLayout>
    )
  }

  if (!nanny) {
    return (
      <AdminLayout title="Nanny Details">
        <div className="p-8 text-center text-[#7C6659]">
          <p className="mb-4">Nanny not found.</p>
          <Link to="/admin/nannies" className="text-[#3B2923] underline">Back to list</Link>
        </div>
      </AdminLayout>
    )
  }

  const fullName = [nanny.personalDetails?.firstName, nanny.personalDetails?.lastName].filter(Boolean).join(' ') || '—'
  const exp = nanny.experience?.ageGroupExperience || {}
  const avail = nanny.availability || {}

  return (
    <AdminLayout title={fullName}>
      <Link to="/admin/nannies" className="mb-6 inline-flex items-center gap-2 text-sm text-[#7C6659] hover:text-[#3B2923] transition-colors">
        <ArrowLeft size={16} /> Back to Nannies
      </Link>

      <div className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6 mb-6 flex flex-wrap items-center gap-x-12 gap-y-4">
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-1">Name</p>
          <p className="text-base font-bold text-[#3B2923]">{fullName}</p>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-2">Vetting Status</p>
          <div className="flex items-center gap-2">
            <Badge label={nanny.vettingStatus} variant={VETTING_VARIANT[nanny.vettingStatus]} />
            <select
              value={nanny.vettingStatus}
              onChange={handleVettingChange}
              disabled={updatingVetting}
              className="px-2 py-1 rounded-lg border border-[#E4D8C7] text-xs text-[#3B2923] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 disabled:opacity-50 cursor-pointer"
            >
              {VETTING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#7C6659] uppercase tracking-wider mb-2">Account Status</p>
          <div className="flex items-center gap-2">
            <Badge label={nanny.accountStatus} variant={ACCOUNT_VARIANT[nanny.accountStatus]} />
            <select
              value={nanny.accountStatus}
              onChange={handleAccountChange}
              disabled={updatingAccount}
              className="px-2 py-1 rounded-lg border border-[#E4D8C7] text-xs text-[#3B2923] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 disabled:opacity-50 cursor-pointer"
            >
              {ACCOUNT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <DetailCard title="Contact Details" icon={User}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Email" value={nanny.email} />
              <DataItem label="Phone" value={nanny.personalDetails?.phone} />
              <DataItem label="Postcode" value={nanny.personalDetails?.postcode} />
              <DataItem label="Area" value={nanny.personalDetails?.area} />
              <DataItem label="Areas willing to work" value={nanny.workPreferences?.areasWillingToWork} />
              <DataItem label="Max travel distance" value={nanny.workPreferences?.maximumTravelDistance} />
            </div>
          </DetailCard>

          <DetailCard title="Experience" icon={Briefcase}>
            <DataItem label="Years of professional experience" value={nanny.experience?.professionalChildcareExperienceYears != null ? `${nanny.experience.professionalChildcareExperienceYears} years` : undefined} />
            <p className="text-xs font-semibold text-[#7C6659] uppercase tracking-wider mb-3 mt-4">Age Group Experience (years)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
              <DataItem label="Newborns" value={exp.newborns} />
              <DataItem label="Toddlers" value={exp.toddlers} />
              <DataItem label="Pre-school" value={exp.preschool} />
              <DataItem label="School age" value={exp.schoolAge} />
              <DataItem label="Teenagers" value={exp.teenagers} />
            </div>
          </DetailCard>
        </div>

        <div className="flex flex-col gap-6">
          <DetailCard title="Qualifications" icon={ShieldCheck}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Enhanced DBS" value={nanny.qualifications?.enhancedDBS} />
              <DataItem label="Paediatric First Aid" value={nanny.qualifications?.paediatricFirstAid} />
            </div>
          </DetailCard>

          <DetailCard title="Availability (self-reported)" icon={Clock2}>
            <div className="flex flex-wrap gap-2 mb-3">
              <AvailabilityChip label="Today" active={avail.availableToday} />
              <AvailabilityChip label="Emergency" active={avail.emergencyBookings} />
              <AvailabilityChip label="Evenings" active={avail.availableEvenings} />
              <AvailabilityChip label="Weekends" active={avail.availableWeekends} />
            </div>
            <DataItem label="Max travel distance (miles)" value={avail.maxTravelDistanceMiles} />
            <p className="text-xs text-[#7C6659] mt-3">
              To override this nanny's availability, use the <Link to="/admin/availability" className="underline text-[#3B2923]">Availability</Link> page.
            </p>
          </DetailCard>
        </div>
      </div>
    </AdminLayout>
  )
}
