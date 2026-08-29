import { useLocation, Link, Navigate } from 'react-router-dom'
import AppHeader from '../../components/layout/AppHeader'
import { CheckCircle2, Copy, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function RequestConfirmationPage() {
  const location = useLocation()
  const reference = location.state?.reference
  const [copied, setCopied] = useState(false)

  if (!reference) {
    return <Navigate to="/" replace />
  }

  function handleCopy() {
    navigator.clipboard.writeText(reference)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F8F3EA] flex flex-col">
      <AppHeader />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-2xl border border-[#E4D8C7] shadow-sm p-8 sm:p-12 text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-[#E8F3EE] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[#3F7656]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#3B2923] mb-3">
            Request successfully submitted
          </h1>
          <p className="text-[#7C6659] text-base leading-relaxed max-w-md mx-auto mb-8">
            Thank you for reaching out to Marvza. Our team will review your requirements and contact you shortly to discuss suitable candidates.
          </p>

          <div className="bg-[#F8F3EA] border border-[#E4D8C7] rounded-xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-xs font-semibold text-[#7C6659] uppercase tracking-wider mb-2">
              Your Reference Number
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-bold text-[#3B2923] tracking-wider">
                {reference}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg text-[#7C6659] hover:bg-[#E8F3EE] hover:text-[#3F7656] transition-colors"
                title="Copy reference"
              >
                <Copy size={16} />
              </button>
            </div>
            {copied && <p className="text-xs text-[#3F7656] mt-2 font-medium">Copied to clipboard!</p>}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E4D8C7] text-[#3B2923] font-semibold hover:bg-[#F8F3EA] transition-colors"
          >
            Return to Homepage
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  )
}
