import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, RadioOption } from '../ui/FormField'
import { SERVICES } from '../../constants/services'
import { FREQUENCY_OPTIONS } from '../../constants/requestForm'

export default function ParentStep01Service() {
  const { register, formState: { errors }, control } = useFormContext()

  const serviceType = useWatch({ control, name: 'serviceType' })
  const frequency = useWatch({ control, name: 'frequency' })
  const isUrgent = useWatch({ control, name: 'isUrgent' })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Service Requirements" description="Tell us about the type of childcare you need." />

      <div className="space-y-6">
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
    </div>
  )
}
