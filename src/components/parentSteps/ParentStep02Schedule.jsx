import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Textarea, SectionHeader, CheckboxOption, Select } from '../ui/FormField'
import { DAYS_OF_WEEK, HOURS_PER_WEEK_OPTIONS } from '../../constants/requestForm'

export default function ParentStep02Schedule() {
  const { register, formState: { errors }, control } = useFormContext()

  const daysNeeded = useWatch({ control, name: 'daysNeeded', defaultValue: [] })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Schedule Details" description="When do you need childcare?" />

      <div className="space-y-6">
        <FormField
          label="Which days do you need care?"
          required
          error={errors.daysNeeded?.message}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {DAYS_OF_WEEK.map((day) => (
              <CheckboxOption
                key={day.value}
                id={`day-${day.value}`}
                label={day.label}
                value={day.value}
                isSelected={daysNeeded?.includes(day.value)}
                {...register('daysNeeded', { required: 'Please select at least one day' })}
              />
            ))}
          </div>
        </FormField>

        <FormField
          label="How many hours per week?"
          htmlFor="hoursPerWeek"
          required
          error={errors.hoursPerWeek?.message}
        >
          <Select
            id="hoursPerWeek"
            hasError={!!errors.hoursPerWeek}
            defaultValue=""
            {...register('hoursPerWeek', { required: 'Please select an option' })}
          >
            <option value="" disabled>Select an option</option>
            {HOURS_PER_WEEK_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Anything else about the schedule?"
          htmlFor="scheduleNotes"
          hint="e.g. specific start/finish times, school run windows, overnight cover"
          error={errors.scheduleNotes?.message}
        >
          <Textarea
            id="scheduleNotes"
            rows={4}
            placeholder="Tell us more about the hours you need..."
            hasError={!!errors.scheduleNotes}
            {...register('scheduleNotes')}
          />
        </FormField>
      </div>
    </div>
  )
}
