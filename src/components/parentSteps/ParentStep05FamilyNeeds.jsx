import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Textarea, SectionHeader, CheckboxOption, Select } from '../ui/FormField'
import { DUTIES_OPTIONS, EXPERIENCE_OPTIONS, QUALIFICATIONS_OPTIONS } from '../../constants/requestForm'

export default function ParentStep05FamilyNeeds() {
  const { register, formState: { errors }, control } = useFormContext()

  const duties = useWatch({ control, name: 'duties', defaultValue: [] })
  const qualifications = useWatch({ control, name: 'qualifications', defaultValue: [] })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Family Needs & Duties" description="What would you like the nanny to help with?" />

      <div className="space-y-6">
        <FormField
          label="Duties required"
          required
          error={errors.duties?.message}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {DUTIES_OPTIONS.map((opt) => (
              <CheckboxOption
                key={opt.value}
                id={`duties-${opt.value}`}
                label={opt.label}
                value={opt.value}
                isSelected={duties?.includes(opt.value)}
                {...register('duties', { required: 'Please select at least one duty' })}
              />
            ))}
          </div>
        </FormField>

        <FormField
          label="Experience required"
          htmlFor="experienceRequired"
          required
          error={errors.experienceRequired?.message}
        >
          <Select
            id="experienceRequired"
            hasError={!!errors.experienceRequired}
            defaultValue=""
            {...register('experienceRequired', { required: 'Please select an option' })}
          >
            <option value="" disabled>Select an option</option>
            {EXPERIENCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Preferred qualifications"
          hint="Optional — select any that matter to you"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {QUALIFICATIONS_OPTIONS.map((opt) => (
              <CheckboxOption
                key={opt.value}
                id={`qualifications-${opt.value}`}
                label={opt.label}
                value={opt.value}
                isSelected={qualifications?.includes(opt.value)}
                {...register('qualifications')}
              />
            ))}
          </div>
        </FormField>

        <FormField
          label="Special requirements"
          htmlFor="specialRequirements"
          hint="Allergies, pets, special needs, or anything else the nanny should know"
          error={errors.specialRequirements?.message}
        >
          <Textarea
            id="specialRequirements"
            rows={4}
            placeholder="Optional"
            hasError={!!errors.specialRequirements}
            {...register('specialRequirements')}
          />
        </FormField>
      </div>
    </div>
  )
}
