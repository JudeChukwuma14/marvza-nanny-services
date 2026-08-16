import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, CheckboxOption, RadioOption } from '../ui/FormField'

export default function Step02WorkPreferences() {
  const { register, formState: { errors }, setValue, control } = useFormContext()
  
  const workTypes = useWatch({
    control,
    name: 'workTypes',
    defaultValue: []
  })

  // Watch individual radio fields for styling
  const employmentType = useWatch({ control, name: 'employmentType' })
  const workingArrangement = useWatch({ control, name: 'workingArrangement' })

  useEffect(() => {
    // Logic to prevent contradictory selections
    if (workTypes && workTypes.includes('all')) {
      if (workTypes.length > 1) {
        // If "all" is selected alongside others, just keep "all"
        setValue('workTypes', ['all'])
      }
    }
  }, [workTypes, setValue])

  return (
    <div>
      <SectionHeader
        title="Work Preferences"
        description="Tell us about the kind of work you are looking for."
      />

      <div className="space-y-6">
        <FormField
          label="What kind of work are you looking for?"
          required
          error={errors.workTypes?.message}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <CheckboxOption
              id="wt-permanent"
              label="Permanent Work"
              description="Full-time and/or part-time"
              value="permanent"
              isSelected={workTypes?.includes('permanent')}
              {...register('workTypes', { required: 'Please select at least one work type' })}
            />
            <CheckboxOption
              id="wt-backup"
              label="Backup Care"
              description="Ad-hoc daily shifts"
              value="backupCare"
              isSelected={workTypes?.includes('backupCare')}
              {...register('workTypes')}
            />
            <CheckboxOption
              id="wt-holiday"
              label="Holiday Work"
              description="School holiday cover"
              value="holidayWork"
              isSelected={workTypes?.includes('holidayWork')}
              {...register('workTypes')}
            />
            <CheckboxOption
              id="wt-all"
              label="All of the above"
              value="all"
              isSelected={workTypes?.includes('all')}
              {...register('workTypes')}
            />
          </div>
        </FormField>

        {/* Conditional rendering for permanent work fields, or 'all' */}
        {(workTypes?.includes('permanent') || workTypes?.includes('all')) && (
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg space-y-5 mt-4">
            <h3 className="text-sm font-semibold text-gray-700">Permanent Work Preferences</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="Full-time / Part-time"
                error={errors.employmentType?.message}
              >
                <div className="space-y-2 mt-1">
                  <RadioOption
                    id="emp-full"
                    label="Full-time"
                    value="Full-time"
                    isSelected={employmentType === 'Full-time'}
                    {...register('employmentType')}
                  />
                  <RadioOption
                    id="emp-part"
                    label="Part-time"
                    value="Part-time"
                    isSelected={employmentType === 'Part-time'}
                    {...register('employmentType')}
                  />
                  <RadioOption
                    id="emp-either"
                    label="Either"
                    value="Either"
                    isSelected={employmentType === 'Either'}
                    {...register('employmentType')}
                  />
                </div>
              </FormField>

              <FormField
                label="Live-in / Live-out"
                error={errors.workingArrangement?.message}
              >
                <div className="space-y-2 mt-1">
                  <RadioOption
                    id="arr-livein"
                    label="Live-in"
                    value="Live-in"
                    isSelected={workingArrangement === 'Live-in'}
                    {...register('workingArrangement')}
                  />
                  <RadioOption
                    id="arr-liveout"
                    label="Live-out"
                    value="Live-out"
                    isSelected={workingArrangement === 'Live-out'}
                    {...register('workingArrangement')}
                  />
                  <RadioOption
                    id="arr-either"
                    label="Either"
                    value="Either"
                    isSelected={workingArrangement === 'Either'}
                    {...register('workingArrangement')}
                  />
                </div>
              </FormField>
            </div>
            
            <FormField
              label="Preferred working hours"
              htmlFor="preferredWorkingHours"
              error={errors.preferredWorkingHours?.message}
            >
              <Input
                id="preferredWorkingHours"
                placeholder="e.g. 40 hours/week, 8am - 6pm"
                hasError={!!errors.preferredWorkingHours}
                {...register('preferredWorkingHours')}
              />
            </FormField>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Areas willing to work"
            htmlFor="areasWillingToWork"
            error={errors.areasWillingToWork?.message}
          >
            <Input
              id="areasWillingToWork"
              placeholder="e.g. South West London, Surrey"
              hasError={!!errors.areasWillingToWork}
              {...register('areasWillingToWork')}
            />
          </FormField>

          <FormField
            label="Maximum distance willing to travel"
            htmlFor="maximumTravelDistance"
            error={errors.maximumTravelDistance?.message}
          >
            <Input
              id="maximumTravelDistance"
              placeholder="e.g. 10 miles, 45 mins commute"
              hasError={!!errors.maximumTravelDistance}
              {...register('maximumTravelDistance')}
            />
          </FormField>

          <FormField
            label="Earliest start date"
            htmlFor="startDate"
            error={errors.startDate?.message}
          >
            <Input
              id="startDate"
              type="date"
              hasError={!!errors.startDate}
              {...register('startDate')}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
