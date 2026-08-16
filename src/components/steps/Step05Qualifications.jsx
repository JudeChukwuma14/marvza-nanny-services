import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Textarea, SectionHeader, RadioOption } from '../ui/FormField'

export default function Step05Qualifications() {
  const { register, formState: { errors }, control } = useFormContext()

  const enhancedDBS = useWatch({ control, name: 'enhancedDBS' })
  const paediatricFirstAid = useWatch({ control, name: 'paediatricFirstAid' })

  return (
    <div>
      <SectionHeader
        title="Qualifications & Checks"
        description="Please provide details about your background checks and qualifications."
      />

      <div className="space-y-6">
        <FormField
          label="Enhanced DBS Checked?"
          required
          error={errors.enhancedDBS?.message}
        >
          <div className="space-y-2 mt-1">
            <RadioOption
              id="dbs-yes"
              label="Yes"
              value="Yes"
              isSelected={enhancedDBS === 'Yes'}
              {...register('enhancedDBS', { required: 'Please select an option' })}
            />
            <RadioOption
              id="dbs-no"
              label="No"
              value="No"
              isSelected={enhancedDBS === 'No'}
              {...register('enhancedDBS')}
            />
            <RadioOption
              id="dbs-progress"
              label="In progress"
              value="In progress"
              isSelected={enhancedDBS === 'In progress'}
              {...register('enhancedDBS')}
            />
          </div>
        </FormField>

        <FormField
          label="Paediatric First Aid?"
          required
          error={errors.paediatricFirstAid?.message}
        >
          <div className="space-y-2 mt-1">
            <RadioOption
              id="pfa-yes"
              label="Yes"
              value="Yes"
              isSelected={paediatricFirstAid === 'Yes'}
              {...register('paediatricFirstAid', { required: 'Please select an option' })}
            />
            <RadioOption
              id="pfa-no"
              label="No"
              value="No"
              isSelected={paediatricFirstAid === 'No'}
              {...register('paediatricFirstAid')}
            />
          </div>
        </FormField>

        <div className="pt-4 border-t border-gray-100 space-y-5">
          <FormField
            label="Childcare qualifications"
            htmlFor="childcareQualifications"
            error={errors.childcareQualifications?.message}
            hint="List any relevant childcare qualifications (e.g. CACHE Level 3, Norland Diploma)"
          >
            <Textarea
              id="childcareQualifications"
              rows={3}
              placeholder="I have a CACHE Level 3 Diploma in Childcare and Education..."
              hasError={!!errors.childcareQualifications}
              {...register('childcareQualifications')}
            />
          </FormField>

          <FormField
            label="Other relevant qualifications"
            htmlFor="otherQualifications"
            error={errors.otherQualifications?.message}
            hint="List any other qualifications that might be relevant (e.g. Maternity Nurse Training, Sleep Consultant)"
          >
            <Textarea
              id="otherQualifications"
              rows={3}
              placeholder="Additional courses or certifications..."
              hasError={!!errors.otherQualifications}
              {...register('otherQualifications')}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
