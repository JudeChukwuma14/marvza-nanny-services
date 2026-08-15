import { Baby } from 'lucide-react'
import StepProgress from '../ui/StepProgress'

export default function AppHeader({ currentStep }) {
  return (
    <header className="sticky top-0 z-50">
      {/* Main header bar */}
      <div className="bg-white border-b border-[#E4E7EC] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C5C] flex items-center justify-center shrink-0">
              <Baby size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-[#0F4C5C] leading-tight">Marvza </span>
              <span className="text-[10px] text-[#667085] leading-tight 
            sm:block">Nanny Services</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-right">
            <p className="text-sm font-semibold text-[#17202A] hidden sm:block">Nanny Application</p>
            <p className="text-sm font-semibold text-[#17202A] sm:hidden">Application</p>
            <p className="text-xs text-[#667085] hidden sm:block">Candidate Application Form</p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <StepProgress currentStep={currentStep} />
    </header>
  )
}
