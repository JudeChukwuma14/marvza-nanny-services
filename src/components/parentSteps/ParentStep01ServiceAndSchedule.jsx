import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, RadioOption, Textarea, CheckboxOption, Select } from '../ui/FormField'
import { SERVICES } from '../../constants/services'
import { FREQUENCY_OPTIONS, DAYS_OF_WEEK, HOURS_PER_WEEK_OPTIONS } from '../../constants/requestForm'

export default function ParentStep01ServiceAndSchedule() {
  const { register, formState: { errors }, control } = useFormContext()

  const serviceType = useWatch({ control, name: 'serviceType' })
  const frequency = useWatch({ control, name: 'frequency' })
  const isUrgent = useWatch({ control, name: 'isUrgent' })
  const daysNeeded = useWatch({ control, name: 'daysNeeded', defaultValue: [] })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Service & Schedule" description="Tell us about the childcare you need and when you need it." />

      <div className="space-y-8">
        {/* Service Requirements */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-[#3B2923] border-b border-[#E4D8C7] pb-2">Service Requirements</h3>
          
          <FormField
            label="What type of nanny service do you need?"
            required
            error={errors.serviceType?.message}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {SERVICES.map((service) => (
                <RadioOption
                  key={service.slug}
                  id={`serviceType-${service.slug}`}
                  label={`${service.name} — ${service.tagline}`}
                  value={service.slug}
                  isSelected={serviceType === service.slug}
                  {...register('serviceType', { required: 'Please select a service type' })}
                />
              ))}
            </div>
          </FormField>

          <FormField
            label="How often do you need this?"
            required
            error={errors.frequency?.message}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {FREQUENCY_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt.value}
                  id={`frequency-${opt.value}`}
                  label={opt.label}
                  value={opt.value}
                  isSelected={frequency === opt.value}
                  {...register('frequency', { required: 'Please select a frequency' })}
                />
              ))}
            </div>
          </FormField>

          <FormField
            label="Is this an urgent requirement?"
            required
            error={errors.isUrgent?.message}
          >
            <div className="grid grid-cols-2 gap-3 mt-2 max-w-xs">
              <RadioOption
                id="isUrgent-yes"
                label="Yes"
                value="yes"
                isSelected={isUrgent === 'yes'}
                {...register('isUrgent', { required: 'Please let us know if this is urgent' })}
              />
              <RadioOption
                id="isUrgent-no"
                label="No"
                value="no"
                isSelected={isUrgent === 'no'}
                {...register('isUrgent', { required: 'Please let us know if this is urgent' })}
              />
            </div>
          </FormField>

          <FormField
            label="Preferred start date"
            htmlFor="preferredStartDate"
            required
            error={errors.preferredStartDate?.message}
          >
            <Input
              id="preferredStartDate"
              type="date"
              hasError={!!errors.preferredStartDate}
              min={new Date().toISOString().split('T')[0]}
              {...register('preferredStartDate', {
                required: 'Preferred start date is required',
              })}
            />
          </FormField>
        </div>

        {/* Schedule Details */}
        <div className="space-y-6 pt-2">
          <h3 className="text-sm font-semibold text-[#3B2923] border-b border-[#E4D8C7] pb-2">Schedule Details</h3>

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
    </div>
  )
}
