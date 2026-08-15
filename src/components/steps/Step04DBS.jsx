import { useFormContext } from 'react-hook-form'
import FormField, { Input, Select, Textarea, RadioOption, SectionHeader } from '../ui/FormField'
import FileUpload from '../ui/FileUpload'
import { ShieldCheck } from 'lucide-react'

const DBS_TYPES = [
  'Basic DBS',
  'Standard DBS',
  'Enhanced DBS',
  'Enhanced DBS with Barred Lists',
]

export default function Step04DBS() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  const hasCurrentDBS = watch('hasCurrentDBS')
  const dbsUpdateService = watch('dbsUpdateService')

  return (
    <div>
      <SectionHeader
        title="DBS / Background Checks"
        description="A Disclosure and Barring Service (DBS) check is a standard requirement for all childcare roles."
      />

      <div className="flex flex-col gap-6">
        <FormField
          label="Do you have a current DBS check?"
          required
          error={errors.hasCurrentDBS?.message}
        >
          <div className="grid grid-cols-2 gap-3 mt-1">
            <RadioOption
              id="dbsYes"
              name="hasCurrentDBS"
              value="Yes"
              label="Yes"
              checked={hasCurrentDBS === 'Yes'}
              onChange={() => {}}
              {...register('hasCurrentDBS', { required: 'Please select an option' })}
            />
            <RadioOption
              id="dbsNo"
              name="hasCurrentDBS"
              value="No"
              label="No"
              checked={hasCurrentDBS === 'No'}
              onChange={() => {}}
              {...register('hasCurrentDBS', { required: 'Please select an option' })}
            />
          </div>
        </FormField>

        {hasCurrentDBS === 'Yes' && (
          <div className="pl-4 border-l-2 border-[#0F4C5C]/20 flex flex-col gap-5">
            <FormField
              label="DBS check type"
              htmlFor="dbsType"
              required
              error={errors.dbsType?.message}
            >
              <Select
                id="dbsType"
                hasError={!!errors.dbsType}
                {...register('dbsType', {
                  required: hasCurrentDBS === 'Yes' ? 'Please select your DBS type' : false,
                })}
              >
                <option value="">Select DBS type</option>
                {DBS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>

            <FormField
              label="Date of DBS check"
              htmlFor="dbsDate"
              required
              error={errors.dbsDate?.message}
            >
              <Input
                id="dbsDate"
                type="date"
                hasError={!!errors.dbsDate}
                {...register('dbsDate', {
                  required: hasCurrentDBS === 'Yes' ? 'Date of DBS check is required' : false,
                })}
              />
            </FormField>

            <FormField
              label="Is your DBS registered with the DBS Update Service?"
              required
              error={errors.dbsUpdateService?.message}
              hint="The Update Service allows employers to check your DBS certificate online"
            >
              <div className="grid grid-cols-2 gap-3 mt-1">
                <RadioOption
                  id="dbsUpdateYes"
                  name="dbsUpdateService"
                  value="Yes"
                  label="Yes"
                  checked={dbsUpdateService === 'Yes'}
                  onChange={() => {}}
                  {...register('dbsUpdateService', {
                    required: hasCurrentDBS === 'Yes' ? 'Please select an option' : false,
                  })}
                />
                <RadioOption
                  id="dbsUpdateNo"
                  name="dbsUpdateService"
                  value="No"
                  label="No"
                  checked={dbsUpdateService === 'No'}
                  onChange={() => {}}
                  {...register('dbsUpdateService', {
                    required: hasCurrentDBS === 'Yes' ? 'Please select an option' : false,
                  })}
                />
              </div>
            </FormField>

            <FormField
              label="DBS certificate number"
              htmlFor="dbsCertNumber"
              error={errors.dbsCertNumber?.message}
              hint="12-digit number found on your DBS certificate"
            >
              <Input
                id="dbsCertNumber"
                placeholder="e.g. 001234567890"
                hasError={!!errors.dbsCertNumber}
                maxLength={12}
                {...register('dbsCertNumber', {
                  pattern: {
                    value: /^\d{0,12}$/,
                    message: 'Certificate number should be up to 12 digits',
                  },
                })}
              />
            </FormField>

            <FileUpload
              label="Upload DBS certificate"
              id="dbsCertUpload"
              hint="PDF, JPG or PNG — max 10MB"
              onChange={(files) => setValue('dbsCertFiles', files)}
            />
          </div>
        )}

        {hasCurrentDBS === 'No' && (
          <div className="p-4 rounded-xl bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 flex items-start gap-3">
            <ShieldCheck size={18} className="text-[#0F4C5C] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#0F4C5C]">
              That's fine — we can assist you in obtaining a DBS check during the recruitment process if you are successful.
            </p>
          </div>
        )}

        {/* Additional information */}
        <FormField
          label="Additional background / vetting information"
          htmlFor="dbsAdditionalInfo"
          error={errors.dbsAdditionalInfo?.message}
          hint="Please provide any additional relevant information regarding your background checks or vetting history"
        >
          <Textarea
            id="dbsAdditionalInfo"
            rows={3}
            placeholder="e.g. I have a spent conviction that I am required to disclose..."
            hasError={!!errors.dbsAdditionalInfo}
            {...register('dbsAdditionalInfo')}
          />
        </FormField>
      </div>
    </div>
  )
}
