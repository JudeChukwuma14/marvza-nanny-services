import { useFormContext } from 'react-hook-form'
import FormField, { Input, SectionHeader } from '../ui/FormField'

export default function Step01PersonalDetails() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="Personal Details"
        description="Please provide your personal information. All fields marked with * are required."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="First Name"
          htmlFor="firstName"
          required
          error={errors.firstName?.message}
        >
          <Input
            id="firstName"
            placeholder="e.g. Jane"
            hasError={!!errors.firstName}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Please enter at least 2 characters' },
            })}
          />
        </FormField>

        <FormField
          label="Last Name"
          htmlFor="lastName"
          required
          error={errors.lastName?.message}
        >
          <Input
            id="lastName"
            placeholder="e.g. Smith"
            hasError={!!errors.lastName}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Please enter at least 2 characters' },
            })}
          />
        </FormField>

        <FormField
          label="Date of birth"
          htmlFor="dateOfBirth"
          required
          error={errors.dateOfBirth?.message}
        >
          <Input
            id="dateOfBirth"
            type="date"
            hasError={!!errors.dateOfBirth}
            max={new Date(Date.now() - 16 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
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

        {/* Empty space filler for layout matching */}
        <div className="hidden sm:block"></div>

        <FormField
          label="Address Line 1"
          htmlFor="address1"
          required
          error={errors.address1?.message}
        >
          <Input
            id="address1"
            placeholder="House number and street name"
            hasError={!!errors.address1}
            {...register('address1', {
              required: 'Address Line 1 is required',
            })}
          />
        </FormField>

        <FormField
          label="Address Line 2"
          htmlFor="address2"
          error={errors.address2?.message}
        >
          <Input
            id="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            hasError={!!errors.address2}
            {...register('address2')}
          />
        </FormField>

        <FormField
          label="Town / City"
          htmlFor="city"
          required
          error={errors.city?.message}
        >
          <Input
            id="city"
            placeholder="e.g. London"
            hasError={!!errors.city}
            {...register('city', {
              required: 'Town or city is required',
            })}
          />
        </FormField>

        <FormField
          label="Postcode"
          htmlFor="postcode"
          required
          error={errors.postcode?.message}
        >
          <Input
            id="postcode"
            placeholder="e.g. SW1A 1AA"
            hasError={!!errors.postcode}
            {...register('postcode', {
              required: 'Postcode is required',
              minLength: { value: 5, message: 'Please enter a valid postcode' },
            })}
          />
        </FormField>

        <FormField
          label="Area / Location"
          htmlFor="area"
          required
          error={errors.area?.message}
          className="sm:col-span-2"
        >
          <Input
            id="area"
            placeholder="e.g. South West London"
            hasError={!!errors.area}
            {...register('area', {
              required: 'Area or location is required',
            })}
          />
        </FormField>
      </div>
    </div>
  )
}
