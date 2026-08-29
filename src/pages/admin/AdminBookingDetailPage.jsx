import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { fetchShift, cancelShiftAdmin, completeShiftAdmin } from '../../api/shifts'
import { LoadingPage } from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { ArrowLeft, Calendar, Users as UsersIcon, User, XCircle, CheckCircle } from 'lucide-react'

const STATUS_VARIANT = {
  Open: 'new',
  'Pending Confirmation': 'pending',
  Confirmed: 'success',
  Completed: 'approved',
  Cancelled: 'error',
  Expired: 'archived',
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

function DataItem({ label, value }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div>
      <p className="text-xs font-medium text-[#7C6659] mb-1">{label}</p>
      <p className="text-sm text-[#3B2923]">{value}</p>
    </div>
  )
}

export default function AdminBookingDetailPage() {
  const { id } = useParams()
  const [shift, setShift] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setShift(await fetchShift(id))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleComplete() {
    setBusy(true)
    try {
      setShift(await completeShiftAdmin(id))
    } catch (err) {
      console.error(err)
    } finally {
      setBusy(false)
    }
  }

  async function handleCancel() {
    setBusy(true)
    try {
      setShift(await cancelShiftAdmin(id, cancelReason))
      setShowCancelModal(false)
    } catch (err) {
      console.error(err)
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Booking Details">
        <LoadingPage message="Loading booking…" />
      </AdminLayout>
    )
  }

  if (!shift) {
    return (
      <AdminLayout title="Booking Details">
        <div className="p-8 text-center text-[#7C6659]">
          <p className="mb-4">Booking not found.</p>
          <Link to="/admin/bookings" className="text-[#3B2923] underline">Back to list</Link>
        </div>
      </AdminLayout>
    )
  }

  // Mirrors the backend's own guard conditions exactly, so the buttons never
  // offer an action the API would reject: shiftService.completeShift only
  // transitions from "Confirmed"; shiftService.cancelShift only transitions
  // from "Open" or "Pending Confirmation" (a Confirmed booking currently
  // cannot be cancelled through this endpoint).
  const canComplete = shift.status === 'Confirmed'
  const canCancel = ['Open', 'Pending Confirmation'].includes(shift.status)

  const family = shift.family
  const nanny = shift.assignedNanny

  return (
    <AdminLayout title={shift.shiftReference}>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <Link to="/admin/bookings" className="flex items-center gap-2 text-sm text-[#7C6659] hover:text-[#3B2923] transition-colors">
          <ArrowLeft size={16} /> Back to Bookings
        </Link>
        <div className="flex items-center gap-3">
          <Badge label={shift.status} variant={STATUS_VARIANT[shift.status]} />
          {canComplete && (
            <button
              onClick={handleComplete}
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3F7656] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <CheckCircle size={14} /> Mark Completed
            </button>
          )}
          {canCancel && (
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B94A48] text-[#B94A48] text-sm font-medium hover:bg-[#FAEAEA] disabled:opacity-50 transition-colors"
            >
              <XCircle size={14} /> Cancel Booking
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <DetailCard title="Schedule & Location" icon={Calendar}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DataItem label="Date" value={shift.schedule?.date} />
              <DataItem label="Time" value={`${shift.schedule?.startTime} – ${shift.schedule?.finishTime}`} />
              <DataItem label="Urgency" value={shift.urgency} />
              <DataItem label="Type" value={shift.type} />
              <DataItem label="Area" value={shift.location?.area} />
              <DataItem label="Postcode" value={shift.location?.postcode} />
              <DataItem label="Rate" value={shift.rate ? `£${shift.rate.amount} ${shift.rate.unit}` : undefined} />
            </div>
          </DetailCard>

          <DetailCard title="Children & Duties" icon={UsersIcon}>
            <p className="text-xs font-medium text-[#7C6659] mb-2">Children</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {(shift.children || []).map((c, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-[#F8F3EA] text-xs text-[#3B2923]">
                  Age {c.age}{c.notes ? ` — ${c.notes}` : ''}
                </span>
              ))}
            </div>
            <DataItem label="Duties" value={shift.duties?.join(', ')} />
            <DataItem label="Special requirements" value={shift.specialRequirements} />
            {shift.cancellation?.reason && (
              <div className="mt-4 pt-4 border-t border-[#E4D8C7]">
                <DataItem label={`Cancelled by ${shift.cancellation.cancelledBy}`} value={shift.cancellation.reason} />
              </div>
            )}
          </DetailCard>
        </div>

        <div className="flex flex-col gap-6">
          <DetailCard title="Family" icon={User}>
            {family ? (
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <DataItem label="Name" value={[family.firstName, family.lastName].filter(Boolean).join(' ')} />
                <DataItem label="Reference" value={family.familyReference} />
                <DataItem label="Email" value={family.email} />
                <DataItem label="Phone" value={family.phone} />
                <Link to={`/admin/families/${family._id}`} className="col-span-full text-sm text-[#3B2923] underline w-fit">
                  View family profile
                </Link>
              </div>
            ) : <p className="text-sm text-[#7C6659]">No family on record.</p>}
          </DetailCard>

          <DetailCard title="Assigned Nanny" icon={UsersIcon}>
            {nanny ? (
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <DataItem label="Name" value={[nanny.personalDetails?.firstName, nanny.personalDetails?.lastName].filter(Boolean).join(' ')} />
                <DataItem label="Email" value={nanny.email} />
                <DataItem label="Phone" value={nanny.personalDetails?.phone} />
              </div>
            ) : <p className="text-sm text-[#7C6659]">Unassigned — this shift is still Open.</p>}
          </DetailCard>
        </div>
      </div>

      <ConfirmModal
        isOpen={showCancelModal}
        onConfirm={handleCancel}
        onCancel={() => setShowCancelModal(false)}
        isSubmitting={busy}
        title="Cancel this booking?"
        description="This cannot be undone. Optionally record a reason below."
        confirmText="Cancel Booking"
      >
        <textarea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Reason (optional)"
          rows={3}
          className="w-full mt-3 px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20"
        />
      </ConfirmModal>
    </AdminLayout>
  )
}
