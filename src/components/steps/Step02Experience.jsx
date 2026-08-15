import { useFormContext } from 'react-hook-form'
import FormField, { Select, Textarea, RadioOption, CheckboxOption, SectionHeader } from '../ui/FormField'

const YEARS_OPTIONS = [
  'Less than 1 year', '1–2 years', '2–3 years', '3–5 years',
  '5–7 years', '7–10 years', '10+ years',
]

const AGE_GROUPS = [
  { id: 'agesNewborn', label: 'Newborns (0–3 months)' },
  { id: 'agesInfant', label: 'Infants (3–12 months)' },
  { id: 'agesToddler', label: 'Toddlers (1–3 years)' },
  { id: 'agesPreschool', label: 'Pre-school (3–5 years)' },
  { id: 'agesSchool', label: 'School-age (5–12 years)' },
  { id: 'agesTeen', label: 'Teenagers (12+)' },
]

const RADIO_FIELDS = [
  { field: 'newbornExp', label: 'Experience with newborns' },
  { field: 'toddlerExp', label: 'Experience with toddlers' },
  { field: 'schoolAgeExp', label: 'Experience with school-age children' },
  { field: 'multipleChildrenExp', label: 'Experience caring for multiple children' },
]

export default function Step02Experience() {
  const { register, watch, formState: { errors } } = useFormContext()

  // watch() is only used for visual styling and conditional rendering — not to control inputs
  const additionalNeeds = watch('additionalNeedsExp')
  const watchedRadios = watch(['newbornExp', 'toddlerExp', 'schoolAgeExp', 'multipleChildrenExp', 'additionalNeedsExp'])
  const watchedAgeGroups = watch('ageGroups') ?? []

  return (
    <div>
      <SectionHeader
        title="Nanny & Childcare Experience"
        description="Tell us about your childcare background and the types of roles you have held."
      />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Years of childcare experience"
            htmlFor="yearsChildcareExp"
            required
            error={errors.yearsChildcareExp?.message}
          >
            <Select
              id="yearsChildcareExp"
              hasError={!!errors.yearsChildcareExp}
              {...register('yearsChildcareExp', { required: 'Please select your years of experience' })}
            >
              <option value="">Select...</option>
              {YEARS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </Select>
          </FormField>

          <FormField
            label="Years of professional nanny experience"
            htmlFor="yearsNannyExp"
            required
            error={errors.yearsNannyExp?.message}
          >
            <Select
              id="yearsNannyExp"
              hasError={!!errors.yearsNannyExp}
              {...register('yearsNannyExp', { required: 'Please select your professional nanny experience' })}
            >
              <option value="">Select...</option>
              <option value="None">None</option>
              {YEARS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </Select>
          </FormField>
        </div>

        {/* Ages cared for — native checkbox group via register() */}
        <FormField
          label="Ages of children you have cared for"
          required
          error={errors.ageGroups?.message}
          hint="Select all that apply"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {AGE_GROUPS.map(({ id, label }) => (
              <CheckboxOption
                key={id}
                id={id}
                label={label}
                value={id}
                isSelected={Array.isArray(watchedAgeGroups) && watchedAgeGroups.includes(id)}
                error={!!errors.ageGroups}
                {...register('ageGroups', {
                  validate: value =>
                    (Array.isArray(value) && value.length > 0) ||
                    'Please select at least one age group',
                })}
              />
            ))}
          </div>
        </FormField>

        {/* Previous roles */}
        <FormField
          label="Previous nanny / childcare roles"
          htmlFor="previousRoles"
          required
          error={errors.previousRoles?.message}
          hint="Please describe your most recent or relevant childcare roles"
        >
          <Textarea
            id="previousRoles"
            rows={4}
            placeholder="e.g. Nanny for the Johnson family (2 children, ages 2 and 5) — January 2022 to present. Sole charge nanny responsible for..."
            hasError={!!errors.previousRoles}
            {...register('previousRoles', { required: 'Please describe your previous childcare roles' })}
          />
        </FormField>

        {/* Yes/No radio questions — native radio group via register() */}
        {RADIO_FIELDS.map(({ field, label }, index) => {
          const currentValue = watchedRadios[index]
          return (
            <FormField
              key={field}
              label={label}
              required
              error={errors[field]?.message}
            >
              <div className="grid grid-cols-2 gap-3 mt-1">
                <RadioOption
                  id={`${field}-yes`}
                  label="Yes"
                  value="Yes"
                  isSelected={currentValue === 'Yes'}
                  {...register(field, { required: 'Please select an option' })}
                />
                <RadioOption
                  id={`${field}-no`}
                  label="No"
                  value="No"
                  isSelected={currentValue === 'No'}
                  {...register(field, { required: 'Please select an option' })}
                />
              </div>
            </FormField>
          )
        })}

        {/* Additional needs — conditional */}
        <FormField
          label="Experience with children with additional needs"
          required
          error={errors.additionalNeedsExp?.message}
        >
          <div className="grid grid-cols-2 gap-3 mt-1">
            <RadioOption
              id="additionalNeedsExp-yes"
              label="Yes"
              value="Yes"
              isSelected={additionalNeeds === 'Yes'}
              {...register('additionalNeedsExp', { required: 'Please select an option' })}
            />
            <RadioOption
              id="additionalNeedsExp-no"
              label="No"
              value="No"
              isSelected={additionalNeeds === 'No'}
              {...register('additionalNeedsExp', { required: 'Please select an option' })}
            />
          </div>
        </FormField>

        {additionalNeeds === 'Yes' && (
          <FormField
            label="Please describe your experience with children with additional needs"
            htmlFor="additionalNeedsDetail"
            required
            error={errors.additionalNeedsDetail?.message}
          >
            <Textarea
              id="additionalNeedsDetail"
              rows={3}
              placeholder="Please describe the type of additional needs and the support you provided..."
              hasError={!!errors.additionalNeedsDetail}
              {...register('additionalNeedsDetail', {
                required: additionalNeeds === 'Yes' ? 'Please describe your experience' : false,
              })}
            />
          </FormField>
        )}

        {/* Other experience */}
        <FormField
          label="Other relevant childcare experience"
          htmlFor="otherExp"
          error={errors.otherExp?.message}
          hint="Optional — include any additional relevant experience not covered above"
        >
          <Textarea
            id="otherExp"
            rows={3}
            placeholder="e.g. Nursery assistant, after-school club, au pair, playgroup leader..."
            hasError={!!errors.otherExp}
            {...register('otherExp')}
          />
        </FormField>
      </div>
    </div>
  )
}
