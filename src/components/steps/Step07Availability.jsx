import { useFormContext } from 'react-hook-form'
import FormField, { Input, Select, RadioOption, CheckboxOption, SectionHeader } from '../ui/FormField'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const HOURS_OPTIONS = [
  'Up to 20 hours/week',
  '20–30 hours/week',
  '30–40 hours/week',
  '40–50 hours/week',
  'Flexible',
]

const DISTANCE_OPTIONS = [
  'Within 5 miles',
  'Within 10 miles',
  'Within 15 miles',
  'Within 20 miles',
  'Within 30 miles',
  '30+ miles / nationwide',
]

export default function Step07Availability() {
  const { register, watch, formState: { errors } } = useFormContext()

  // watch() is used only for visual styling (isSelected) and conditional rendering
  const workType = watch('workType')
  const liveInOut = watch('liveInOut')
  const weekendAvailability = watch('weekendAvailability')
  const eveningAvailability = watch('eveningAvailability')

  return (
    <div>
      <SectionHeader
        title="Availability"
        description="Tell us about when you are available to start and what working arrangements suit you."
      />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="When can you start?"
            htmlFor="startDate"
            required
            error={errors.startDate?.message}
          >
            <Input
              id="startDate"
              type="date"
              hasError={!!errors.startDate}
              min={new Date().toISOString().split('T')[0]}
              {...register('startDate', { required: 'Please enter your available start date' })}
            />
          </FormField>

          <FormField
            label="Maximum distance willing to travel"
            htmlFor="maxDistance"
            required
            error={errors.maxDistance?.message}
          >
            <Select
              id="maxDistance"
              hasError={!!errors.maxDistance}
              {...register('maxDistance', { required: 'Please select maximum travel distance' })}
            >
              <option value="">Select distance</option>
              {DISTANCE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </Select>
          </FormField>
        </div>

        {/* Work type */}
        <FormField
          label="Work type preference"
          required
          error={errors.workType?.message}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {['Full-time', 'Part-time', 'Temporary'].map(type => (
              <RadioOption
                key={type}
                id={`workType-${type}`}
                label={type}
                value={type}
                isSelected={workType === type}
                {...register('workType', { required: 'Please select a work type' })}
              />
            ))}
          </div>
        </FormField>

        {/* Live in / out */}
        <FormField
          label="Live-in or live-out preference"
          required
          error={errors.liveInOut?.message}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {['Live-in', 'Live-out', 'Either'].map(opt => (
              <RadioOption
                key={opt}
                id={`liveInOut-${opt}`}
                label={opt}
                value={opt}
                isSelected={liveInOut === opt}
                {...register('liveInOut', { required: 'Please select a preference' })}
              />
            ))}
          </div>
        </FormField>

        {/* Days available */}
        <FormField
          label="Days available"
          required
          error={errors.daysAvailable?.message}
          hint="Select all that apply"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
            {DAYS.map(day => {
              const fieldName = `day_${day}`
              const isChecked = !!watch(fieldName)
              return (
                <CheckboxOption
                  key={day}
                  id={fieldName}
                  label={day}
                  isSelected={isChecked}
                  {...register(fieldName)}
                />
              )
            })}
          </div>
        </FormField>

        {/* Hours */}
        <FormField
          label="Hours available per week"
          htmlFor="hoursAvailable"
          required
          error={errors.hoursAvailable?.message}
        >
          <Select
            id="hoursAvailable"
            hasError={!!errors.hoursAvailable}
            {...register('hoursAvailable', { required: 'Please select your available hours' })}
          >
            <option value="">Select hours</option>
            {HOURS_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
          </Select>
        </FormField>

        {/* Weekend / evening */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Weekend availability"
            required
            error={errors.weekendAvailability?.message}
          >
            <div className="grid grid-cols-2 gap-3 mt-1">
              {['Yes', 'No'].map(v => (
                <RadioOption
                  key={v}
                  id={`weekend-${v}`}
                  label={v}
                  value={v}
                  isSelected={weekendAvailability === v}
                  {...register('weekendAvailability', { required: 'Please select an option' })}
                />
              ))}
            </div>
          </FormField>

          <FormField
            label="Evening availability"
            required
            error={errors.eveningAvailability?.message}
          >
            <div className="grid grid-cols-2 gap-3 mt-1">
              {['Yes', 'No'].map(v => (
                <RadioOption
                  key={v}
                  id={`evening-${v}`}
                  label={v}
                  value={v}
                  isSelected={eveningAvailability === v}
                  {...register('eveningAvailability', { required: 'Please select an option' })}
                />
              ))}
            </div>
          </FormField>
        </div>

        <FormField
          label="Preferred working hours"
          htmlFor="preferredHours"
          error={errors.preferredHours?.message}
          hint="e.g. 8am–6pm, school hours only, flexible"
        >
          <Input
            id="preferredHours"
            placeholder="e.g. 7:30am to 6:30pm"
            hasError={!!errors.preferredHours}
            {...register('preferredHours')}
          />
        </FormField>

        <FormField
          label="Areas willing to work"
          htmlFor="areasWillingToWork"
          required
          error={errors.areasWillingToWork?.message}
          hint="e.g. Central London, North London, Surrey, nationwide"
        >
          <Input
            id="areasWillingToWork"
            placeholder="e.g. London, Surrey, Kent"
            hasError={!!errors.areasWillingToWork}
            {...register('areasWillingToWork', { required: 'Please specify areas you are willing to work' })}
          />
        </FormField>
      </div>
    </div>
  )
}
