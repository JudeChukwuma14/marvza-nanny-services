import { useFormContext } from 'react-hook-form'
import FormField, { Input, SectionHeader } from '../ui/FormField'

export default function Step03ChildcareExperience() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="Professional Childcare Experience"
        description="Tell us about your professional background in childcare."
      />

      <div className="space-y-6">
        <FormField
          label="Please give the total number of years"
          htmlFor="professionalChildcareExperienceYears"
          required
          error={errors.professionalChildcareExperienceYears?.message}
          className="sm:w-1/2"
        >
          <Input
            id="professionalChildcareExperienceYears"
            type="number"
            min="0"
            step="0.5"
            placeholder="e.g. 5"
            hasError={!!errors.professionalChildcareExperienceYears}
            {...register('professionalChildcareExperienceYears', {
              required: 'Total years of experience is required',
              min: { value: 0, message: 'Experience cannot be negative' }
            })}
          />
        </FormField>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Experience by Age Group (in years)</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <FormField
              label="Newborns (0-1)"
              htmlFor="newborns"
              error={errors.newborns?.message}
            >
              <Input
                id="newborns"
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                hasError={!!errors.newborns}
                {...register('newborns', { min: { value: 0, message: 'Cannot be negative' } })}
              />
            </FormField>

            <FormField
              label="Toddlers (1-3)"
              htmlFor="toddlers"
              error={errors.toddlers?.message}
            >
              <Input
                id="toddlers"
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                hasError={!!errors.toddlers}
                {...register('toddlers', { min: { value: 0, message: 'Cannot be negative' } })}
              />
            </FormField>

            <FormField
              label="Pre-school (3-5)"
              htmlFor="preschool"
              error={errors.preschool?.message}
            >
              <Input
                id="preschool"
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                hasError={!!errors.preschool}
                {...register('preschool', { min: { value: 0, message: 'Cannot be negative' } })}
              />
            </FormField>

            <FormField
              label="School-age (5-12)"
              htmlFor="schoolAge"
              error={errors.schoolAge?.message}
            >
              <Input
                id="schoolAge"
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                hasError={!!errors.schoolAge}
                {...register('schoolAge', { min: { value: 0, message: 'Cannot be negative' } })}
              />
            </FormField>

            <FormField
              label="Teenagers (13+)"
              htmlFor="teenagers"
              error={errors.teenagers?.message}
            >
              <Input
                id="teenagers"
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                hasError={!!errors.teenagers}
                {...register('teenagers', { min: { value: 0, message: 'Cannot be negative' } })}
              />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  )
}
