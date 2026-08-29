import AdminLayout from '../../components/layout/AdminLayout'
import EmptyState from '../../components/ui/EmptyState'

function AdminPlaceholderPage({ title, description }) {
  return (
    <AdminLayout title={title}>
      <div className="bg-white rounded-xl border border-[#E4D8C7] p-6 shadow-sm min-h-[500px] flex items-center justify-center">
        <EmptyState 
          title={`${title} Module`} 
          message={description || "This admin module is currently being developed."} 
        />
      </div>
    </AdminLayout>
  )
}

export function AdminDashboardPage() { return <AdminPlaceholderPage title="Dashboard" /> }
export function AdminEnquiriesPage() { return <AdminPlaceholderPage title="Enquiries" description="Manage parent childcare requests." /> }
export function AdminFamiliesPage() { return <AdminPlaceholderPage title="Families" description="Directory of registered families." /> }
export function AdminChildrenPage() { return <AdminPlaceholderPage title="Children" description="Manage child profiles and specific needs." /> }
export function AdminNanniesPage() { return <AdminPlaceholderPage title="Nannies" description="Directory of approved nannies." /> }
export function AdminBookingsPage() { return <AdminPlaceholderPage title="Bookings" description="Manage temporary and permanent placements." /> }
export function AdminCommunicationsPage() { return <AdminPlaceholderPage title="Communications" description="Message centre and automated emails." /> }
export function AdminContentPage() { return <AdminPlaceholderPage title="Content / CMS" description="Manage website content, FAQs, and testimonials." /> }
export function AdminUsersPage() { return <AdminPlaceholderPage title="Users & Roles" description="Manage admin users and access permissions." /> }
export function AdminAuditLogPage() { return <AdminPlaceholderPage title="Audit Log" description="System activity and change history." /> }
export function AdminDocumentsPage() { return <AdminPlaceholderPage title="Documents" description="Central repository for compliance documents and contracts." /> }
export function AdminAvailabilityPage() { return <AdminPlaceholderPage title="Availability" description="Manage nanny schedules and calendar." /> }
