import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import AppHeader from '../components/layout/AppHeader'

export default function ConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const reference = location.state?.reference

  // If no reference in state, they didn't just submit an application
  // Redirect them back to apply page
  useEffect(() => {
    if (!reference) {
      navigate('/apply', { replace: true })
    }
  }, [reference, navigate])

  if (!reference) return null

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <AppHeader currentStep={12} />

      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E4E7EC] p-8 sm:p-12 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#16803C]/10 flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-[#16803C]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#17202A] mb-4">
            Application Submitted
          </h1>

          <p className="text-base text-[#667085] mb-8 max-w-md">
            Thank you for submitting your application. Your details have been securely sent to our recruitment team.
          </p>

          <div className="w-full max-w-xs p-6 bg-[#F7F5F0] rounded-xl border border-[#E4E7EC] mb-8">
            <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-2">
              Your Reference Number
            </p>
            <p className="text-2xl font-bold text-[#0F4C5C] tracking-wide">
              {reference}
            </p>
          </div>

          <p className="text-sm text-[#667085] mb-8 max-w-md">
            Our recruitment team will review your application and contact you if additional information is required or to arrange an interview.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E4E7EC] text-sm font-medium text-[#17202A] hover:bg-[#F7F5F0] transition-colors"
          >
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
