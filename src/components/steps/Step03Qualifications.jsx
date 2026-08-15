import { useFormContext } from 'react-hook-form'
import FormField, { Input, Select, Textarea, RadioOption, SectionHeader } from '../ui/FormField'
import FileUpload from '../ui/FileUpload'

const CHILDCARE_QUALS = [
  'CACHE Level 2 Certificate in Child Development & Care',
  'CACHE Level 3 Diploma in Child Care & Education',
  'NVQ Level 2 / 3 in Children\'s Care, Learning & Development',
  'BTEC National Diploma in Children\'s Care',
  'Foundation Degree in Early Childhood Studies',
  'BA (Hons) in Early Childhood Studies',
  'NNEB National Diploma',
  'Other childcare qualification',
  'No formal childcare qualification',
]

export default function Step03Qualifications() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  const paediatricFirstAid = watch('paediatricFirstAid')

  return (
    <div>
      <SectionHeader
        title="Qualifications & Training"
        description="Please provide details of your childcare qualifications and training. Upload certificates where available."
      />

      <div className="flex flex-col gap-6">
        <FormField
          label="Childcare qualifications"
          htmlFor="childcareQualifications"
          required
          error={errors.childcareQualifications?.message}
        >
          <Select
            id="childcareQualifications"
            hasError={!!errors.childcareQualifications}
            {...register('childcareQualifications', { required: 'Please select your highest childcare qualification' })}
          >
            <option value="">Select qualification</option>
            {CHILDCARE_QUALS.map(q => <option key={q} value={q}>{q}</option>)}
          </Select>
        </FormField>

        <FormField
          label="Other relevant qualifications"
          htmlFor="otherQualifications"
          error={errors.otherQualifications?.message}
          hint="e.g. Teaching qualification, nursing, social work, psychology"
        >
          <Textarea
            id="otherQualifications"
            rows={2}
            placeholder="List any other relevant qualifications..."
            hasError={!!errors.otherQualifications}
            {...register('otherQualifications')}
          />
        </FormField>

        {/* Paediatric First Aid */}
        <FormField
          label="Do you hold a current Paediatric First Aid certificate?"
          required
          error={errors.paediatricFirstAid?.message}
        >
          <div className="grid grid-cols-2 gap-3 mt-1">
            <RadioOption
              id="pfaYes"
              name="paediatricFirstAid"
              value="Yes"
              label="Yes"
              checked={paediatricFirstAid === 'Yes'}
              onChange={() => {}}
              {...register('paediatricFirstAid', { required: 'Please select an option' })}
            />
            <RadioOption
              id="pfaNo"
              name="paediatricFirstAid"
              value="No"
              label="No"
              checked={paediatricFirstAid === 'No'}
              onChange={() => {}}
              {...register('paediatricFirstAid', { required: 'Please select an option' })}
            />
          </div>
        </FormField>

        {paediatricFirstAid === 'Yes' && (
          <div className="pl-4 border-l-2 border-[#0F4C5C]/20 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Certificate issue date"
                htmlFor="pfaCertDate"
                required
                error={errors.pfaCertDate?.message}
              >
                <Input
                  id="pfaCertDate"
                  type="date"
                  hasError={!!errors.pfaCertDate}
                  {...register('pfaCertDate', {
                    required: paediatricFirstAid === 'Yes' ? 'Certificate date is required' : false,
                  })}
                />
              </FormField>
              <FormField
                label="Certificate expiry date"
                htmlFor="pfaExpiryDate"
                required
                error={errors.pfaExpiryDate?.message}
              >
                <Input
                  id="pfaExpiryDate"
                  type="date"
                  hasError={!!errors.pfaExpiryDate}
                  {...register('pfaExpiryDate', {
                    required: paediatricFirstAid === 'Yes' ? 'Expiry date is required' : false,
                  })}
                />
              </FormField>
            </div>
            <FileUpload
              label="Upload Paediatric First Aid certificate"
              id="pfaCertUpload"
              hint="PDF, JPG or PNG — max 10MB"
              onChange={(files) => setValue('pfaCertFiles', files)}
            />
          </div>
        )}

        {/* Other first aid */}
        <FormField
          label="Other first aid training"
          htmlFor="otherFirstAid"
          error={errors.otherFirstAid?.message}
          hint="e.g. Adult First Aid, Emergency First Aid at Work"
        >
          <Input
            id="otherFirstAid"
            placeholder="Describe any other first aid training..."
            hasError={!!errors.otherFirstAid}
            {...register('otherFirstAid')}
          />
        </FormField>

        {/* Other certificates */}
        <FormField
          label="Other training & certificates"
          htmlFor="otherCertificates"
          error={errors.otherCertificates?.message}
          hint="e.g. Safeguarding, food hygiene, manual handling, sleep training"
        >
          <Textarea
            id="otherCertificates"
            rows={3}
            placeholder="List any other relevant certificates or training courses..."
            hasError={!!errors.otherCertificates}
            {...register('otherCertificates')}
          />
        </FormField>

        {/* Upload qualification certificates */}
        <FileUpload
          label="Upload qualification certificates"
          id="qualCertUpload"
          hint="Upload copies of your childcare qualifications — PDF, JPG or PNG, max 10MB each"
          multiple
          onChange={(files) => setValue('qualCertFiles', files)}
        />
      </div>
    </div>
  )
}
