import { useFormContext } from 'react-hook-form'
import FormField, { Select, Textarea, RadioOption, SectionHeader } from '../ui/FormField'
import FileUpload from '../ui/FileUpload'
import { Lock } from 'lucide-react'

const RTW_TYPES = [
  'British or Irish passport',
  'UK Biometric Residence Permit (BRP)',
  'UK Visa in a passport',
  'EU Settlement Scheme — Settled Status',
  'EU Settlement Scheme — Pre-Settled Status',
  'Certificate of Sponsorship',
  'Other',
]

export default function Step05RightToWork() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  const rightToWork = watch('rightToWork')

  return (
    <div>
      <SectionHeader
        title="Right to Work"
        description="We are required to verify that all candidates have the legal right to work in the United Kingdom."
      />

      {/* Privacy notice */}
      <div className="mb-6 p-4 rounded-xl bg-[#F7F5F0] border border-[#E4E7EC] flex items-start gap-3">
        <Lock size={16} className="text-[#667085] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#667085] leading-relaxed">
          <strong className="text-[#17202A]">Privacy notice:</strong> Right-to-work documentation is collected for legal compliance purposes only. Formal document verification will take place later in the recruitment process. Your documents are handled securely and in accordance with UK GDPR and our Privacy Policy.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <FormField
          label="Do you have the right to work in the UK?"
          required
          error={errors.rightToWork?.message}
        >
          <div className="grid grid-cols-2 gap-3 mt-1">
            <RadioOption
              id="rtwYes"
              label="Yes"
              value="Yes"
              isSelected={rightToWork === 'Yes'}
              {...register('rightToWork', { required: 'Please select an option' })}
            />
            <RadioOption
              id="rtwNo"
              label="No"
              value="No"
              isSelected={rightToWork === 'No'}
              {...register('rightToWork', { required: 'Please select an option' })}
            />
          </div>
        </FormField>

        {rightToWork === 'Yes' && (
          <div className="pl-4 border-l-2 border-[#0F4C5C]/20 flex flex-col gap-5">
            <FormField
              label="Type of right-to-work documentation"
              htmlFor="rightToWorkType"
              required
              error={errors.rightToWorkType?.message}
            >
              <Select
                id="rightToWorkType"
                hasError={!!errors.rightToWorkType}
                {...register('rightToWorkType', {
                  required: rightToWork === 'Yes' ? 'Please select your documentation type' : false,
                })}
              >
                <option value="">Select document type</option>
                {RTW_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>

            <FormField
              label="Relevant document details"
              htmlFor="rightToWorkDetails"
              error={errors.rightToWorkDetails?.message}
              hint="e.g. passport expiry date, visa expiry date, BRP reference number"
            >
              <Textarea
                id="rightToWorkDetails"
                rows={2}
                placeholder="Optional — add any relevant details about your documentation..."
                hasError={!!errors.rightToWorkDetails}
                {...register('rightToWorkDetails')}
              />
            </FormField>

            <div>
              <p className="text-sm font-medium text-[#17202A] mb-1">Upload documentation</p>
              <p className="text-xs text-[#667085] mb-3">
                You may upload a copy of your right-to-work documentation now, or provide it later in the process.
                Formal verification will be conducted by our team if your application is successful.
              </p>
              <FileUpload
                id="rtwUpload"
                hint="PDF, JPG or PNG — max 10MB"
                onChange={(files) => setValue('rtwFiles', files)}
              />
            </div>
          </div>
        )}

        {rightToWork === 'No' && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Please note:</strong> We are only able to employ candidates who have the legal right to work in the UK. Please contact us if you have any questions about your eligibility.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
