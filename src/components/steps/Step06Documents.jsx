import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { SectionHeader, RadioOption } from '../ui/FormField'
import FileUpload from '../ui/FileUpload'

export default function Step06Documents() {
  const { register, formState: { errors }, control, setValue } = useFormContext()

  const swimming = useWatch({ control, name: 'swimming' })
  const animalAllergy = useWatch({ control, name: 'animalAllergy' })

  return (
    <div>
      <SectionHeader
        title="Additional Information & Documents"
        description="A few final details and your CV/resume."
      />

      <div className="space-y-6">
        <FormField
          label="Swimming"
          error={errors.swimming?.message}
          hint="Are you a confident swimmer?"
        >
          <div className="space-y-2 mt-1">
            <RadioOption
              id="swim-yes"
              label="Yes"
              value="Yes"
              isSelected={swimming === 'Yes'}
              {...register('swimming')}
            />
            <RadioOption
              id="swim-no"
              label="No"
              value="No"
              isSelected={swimming === 'No'}
              {...register('swimming')}
            />
          </div>
        </FormField>

        <FormField
          label="Allergic to animals"
          error={errors.animalAllergy?.message}
          hint="Are you allergic to dogs, cats, or other common pets?"
        >
          <div className="space-y-2 mt-1">
            <RadioOption
              id="allergy-yes"
              label="Yes"
              value="Yes"
              isSelected={animalAllergy === 'Yes'}
              {...register('animalAllergy')}
            />
            <RadioOption
              id="allergy-no"
              label="No"
              value="No"
              isSelected={animalAllergy === 'No'}
              {...register('animalAllergy')}
            />
          </div>
        </FormField>

        <div className="pt-4 border-t border-gray-100">
          <FormField
            label="Resume / CV"
            required
            error={errors.cv?.message}
          >
            <div className="mt-2">
              <FileUpload
                id="cv"
                label="Please upload a resume/CV"
                hint="Accepted formats: PDF, DOC, DOCX. Max size 10MB."
                required={true}
                multiple={false}
                onChange={(files) => {
                  setValue('cv', files, { shouldValidate: true })
                }}
              />
              {/* Note: In a real implementation we might pass accept=".pdf,.doc,.docx" to FileUpload if supported */}
            </div>
          </FormField>
        </div>
      </div>
    </div>
  )
}
