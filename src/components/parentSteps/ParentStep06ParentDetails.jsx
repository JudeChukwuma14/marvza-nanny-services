import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, RadioOption } from '../ui/FormField'
import { CONTACT_METHOD_OPTIONS } from '../../constants/requestForm'

export default function ParentStep06ParentDetails() {
  const { register, formState: { errors }, control } = useFormContext()

  const contactMethod = useWatch({ control, name: 'contactMethod' })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Your Details" description="How can we contact you?" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="First Name"
            htmlFor="parentFirstName"
            required
            error={errors.parentFirstName?.message}
          >
            <Input
              id="parentFirstName"
              placeholder="e.g. Jane"
              hasError={!!errors.parentFirstName}
              {...register('parentFirstName', {
                required: 'First name is required',
                minLength: { value: 2, message: 'Please enter at least 2 characters' },
              })}
            />
          </FormField>

          <FormField
            label="Last Name"
            htmlFor="parentLastName"
            required
            error={errors.parentLastName?.message}
          >
            <Input
              id="parentLastName"
              placeholder="e.g. Smith"
              hasError={!!errors.parentLastName}
              {...register('parentLastName', {
                required: 'Last name is required',
                minLength: { value: 2, message: 'Please enter at least 2 characters' },
              })}
            />
          </FormField>

          <FormField
            label="Email address"
            htmlFor="email"
            required
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              hasError={!!errors.email}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
          </FormField>

          <FormField
            label="Phone number"
            htmlFor="phone"
            required
            error={errors.phone?.message}
          >
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. 07700 900000"
              hasError={!!errors.phone}
              {...register('phone', {
                required: 'Phone number is required',
                minLength: { value: 7, message: 'Please enter a valid phone number' },
              })}
            />
          </FormField>
        </div>

        <FormField
          label="Preferred contact method"
          required
          error={errors.contactMethod?.message}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {CONTACT_METHOD_OPTIONS.map((opt) => (
              <RadioOption
                key={opt.value}
                id={`contactMethod-${opt.value}`}
                label={opt.label}
                value={opt.value}
                isSelected={contactMethod === opt.value}
                {...register('contactMethod', { required: 'Please select a contact method' })}
              />
            ))}
          </div>
        </FormField>
      </div>
    </div>
  )
}
