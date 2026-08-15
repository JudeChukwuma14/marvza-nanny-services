import { useFormContext } from 'react-hook-form'
import FormField, { Input, CheckboxOption, SectionHeader } from '../ui/FormField'
import { Shield } from 'lucide-react'

const DECLARATIONS = [
  {
    id: 'declarationAccurate',
    label: 'I confirm that all information I have provided in this application is accurate and truthful.',
    description: 'Providing false information may result in withdrawal of any offer of employment.',
    required: true,
  },
  {
    id: 'consentReview',
    label: 'I consent to my application being reviewed by NannyPro recruitment staff.',
    description: 'Your application will only be reviewed by authorised recruitment personnel.',
    required: true,
  },
  {
    id: 'consentReferences',
    label: 'I consent to my references being contacted during the recruitment process.',
    description: 'References will only be contacted at an appropriate stage of the process.',
    required: true,
  },
  {
    id: 'agreePrivacy',
    label: 'I have read and agree to the Privacy Policy.',
    description: 'Your personal data will be handled in accordance with UK GDPR.',
    required: true,
  },
  {
    id: 'agreeTerms',
    label: 'I have read and agree to the Terms and Conditions.',
    description: 'Including terms relating to the candidate application process.',
    required: true,
  },
]

export default function Step11Declaration() {
  const { register, watch, formState: { errors } } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="Declaration & Consent"
        description="Please read each statement carefully and confirm your agreement before proceeding."
      />

      {/* Shield notice */}
      <div className="mb-6 p-4 rounded-xl bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 flex items-start gap-3">
        <Shield size={18} className="text-[#0F4C5C] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#0F4C5C] leading-relaxed">
          All declarations below are required. You must tick every box before you can submit your application.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-7">
        {DECLARATIONS.map(({ id, label, description, required }) => {
          const checked = !!watch(id)
          const hasError = !!errors[id]
          return (
            <CheckboxOption
              key={id}
              id={id}
              label={label}
              description={description}
              checked={checked}
              error={hasError}
              onChange={() => {}}
              {...register(id, {
                required: required ? 'You must agree to this to continue' : false,
              })}
            />
          )
        })}
      </div>

      {/* Signature section */}
      <div className="border-t border-[#E4E7EC] pt-6">
        <p className="text-sm font-semibold text-[#17202A] mb-4">Applicant signature</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Full name"
            htmlFor="declarationName"
            required
            error={errors.declarationName?.message}
            hint="Enter your full legal name as your electronic signature"
          >
            <Input
              id="declarationName"
              placeholder="Your full name"
              hasError={!!errors.declarationName}
              {...register('declarationName', { required: 'Your full name is required as a signature' })}
            />
          </FormField>

          <FormField
            label="Today's date"
            htmlFor="declarationDate"
            required
            error={errors.declarationDate?.message}
          >
            <Input
              id="declarationDate"
              type="date"
              hasError={!!errors.declarationDate}
              defaultValue={new Date().toISOString().split('T')[0]}
              {...register('declarationDate', { required: 'Date is required' })}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
