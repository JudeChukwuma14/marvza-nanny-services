import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, CheckboxOption } from '../ui/FormField'

export default function Step04Skills() {
  const { register, formState: { errors }, control } = useFormContext()

  const drivingLicence = useWatch({ control, name: 'drivingLicence' })
  const carAccess = useWatch({ control, name: 'carAccess' })

  return (
    <div>
      <SectionHeader
        title="Driving & Languages"
        description="A couple of quick details that help us match you to the right families."
      />

      <div className="space-y-6">
        <FormField
          label="Driving"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <CheckboxOption
              id="skill-driving"
              label="Driving licence"
              value="true"
              isSelected={drivingLicence === "true" || drivingLicence === true}
              {...register('drivingLicence')}
            />
            <CheckboxOption
              id="skill-car"
              label="Access to a car"
              value="true"
              isSelected={carAccess === "true" || carAccess === true}
              {...register('carAccess')}
            />
          </div>
        </FormField>

        <FormField
          label="Languages spoken fluently"
          htmlFor="languages"
          error={errors.languages?.message}
        >
          <Input
            id="languages"
            placeholder="e.g. English, French, Spanish"
            hasError={!!errors.languages}
            {...register('languages')}
          />
        </FormField>
      </div>
    </div>
  )
}
