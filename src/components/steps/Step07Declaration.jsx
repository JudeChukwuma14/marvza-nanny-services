import { useFormContext } from 'react-hook-form'
import { CheckboxOption, SectionHeader } from '../ui/FormField'
import { Shield } from 'lucide-react'

const DECLARATIONS = [
  {
    id: 'informationAccurate',
    label: 'I confirm that the information I have provided is accurate.',
    required: true,
  },
  {
    id: 'applicationReviewConsent',
    label: 'I consent to my application being reviewed.',
    required: true,
  },
  {
    id: 'referenceConsent',
    label: 'I consent to my references being contacted if I progress in the application process.',
    required: true,
  },
  {
    id: 'privacyPolicyConsent',
    label: 'I agree to the Privacy Policy.',
    required: true,
  },
  {
    id: 'termsConsent',
    label: 'I agree to the Terms and Conditions.',
    required: true,
  },
]

export default function Step07Declaration() {
  const { register, watch, formState: { errors } } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="Declaration & Consent"
        description="Please read each statement carefully and confirm your agreement before submitting."
      />

      {/* Shield notice */}
      <div className="mb-6 p-4 rounded-xl bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 flex items-start gap-3">
        <Shield size={18} className="text-[#0F4C5C] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#0F4C5C] leading-relaxed">
          All declarations below are required. You must tick every box before you can submit your application.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-7">
        {DECLARATIONS.map(({ id, label, required }) => {
          const checked = !!watch(id)
          const hasError = !!errors[id]
          return (
            <CheckboxOption
              key={id}
              id={id}
              label={label}
              isSelected={checked}
              error={hasError}
              {...register(id, {
                required: required ? 'You must agree to this to continue' : false,
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
