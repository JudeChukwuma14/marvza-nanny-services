import { Baby } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Personal' },
  { number: 2, label: 'Experience' },
  { number: 3, label: 'Qualifications' },
  { number: 4, label: 'DBS' },
  { number: 5, label: 'Right to Work' },
  { number: 6, label: 'References' },
  { number: 7, label: 'Availability' },
  { number: 8, label: 'Skills' },
  { number: 9, label: 'About You' },
  { number: 10, label: 'Documents' },
  { number: 11, label: 'Declaration' },
  { number: 12, label: 'Review' },
]

const STEP_FULL_NAMES = [
  'Personal Details',
  'Nanny & Childcare Experience',
  'Qualifications & Training',
  'DBS / Background Checks',
  'Right to Work',
  'References',
  'Availability',
  'Skills',
  'About You',
  'Documents',
  'Declaration & Consent',
  'Review & Submit',
]

export default function StepProgress({ currentStep }) {
  const total = STEPS.length
  const pct = Math.round(((currentStep - 1) / (total - 1)) * 100)

  return (
    <div className="bg-white border-b border-[#E4E7EC]">
      {/* Desktop progress */}
      <div className="hidden lg:block max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-1">
          {STEPS.map((step, i) => {
            const isComplete = step.number < currentStep
            const isCurrent = step.number === currentStep
            return (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors flex-shrink-0 ${
                      isComplete
                        ? 'bg-[#0F4C5C] text-white'
                        : isCurrent
                        ? 'bg-[#D98B5F] text-white ring-2 ring-[#D98B5F] ring-offset-2'
                        : 'bg-[#E4E7EC] text-[#667085]'
                    }`}
                  >
                    {isComplete ? '✓' : step.number}
                  </div>
                  <span
                    className={`text-[10px] font-medium text-center leading-tight max-w-[56px] ${
                      isCurrent ? 'text-[#0F4C5C]' : isComplete ? 'text-[#0F4C5C]' : 'text-[#667085]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-1 mt-[-12px]">
                    <div
                      className={`h-full transition-all duration-300 ${
                        step.number < currentStep ? 'bg-[#0F4C5C]' : 'bg-[#E4E7EC]'
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile progress */}
      <div className="lg:hidden px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-[#667085] font-medium">Step {currentStep} of {total}</p>
            <p className="text-sm font-semibold text-[#17202A]">{STEP_FULL_NAMES[currentStep - 1]}</p>
          </div>
          <span className="text-sm font-semibold text-[#0F4C5C]">{pct}%</span>
        </div>
        <div className="h-1.5 bg-[#E4E7EC] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0F4C5C] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
