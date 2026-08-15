import { useFormContext } from 'react-hook-form'
import FormField, { Input, Select, SectionHeader } from '../ui/FormField'

const NATIONALITIES = [
  'British', 'Irish', 'American', 'Australian', 'Canadian', 'South African',
  'French', 'German', 'Italian', 'Spanish', 'Polish', 'Portuguese',
  'Romanian', 'Bulgarian', 'Croatian', 'Czech', 'Slovak', 'Hungarian',
  'Philippine', 'Indian', 'Sri Lankan', 'Nepalese', 'Nigerian', 'Ghanaian',
  'Zimbabwean', 'Other'
]

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
          label="Full name"
          htmlFor="fullName"
          required
          error={errors.fullName?.message}
          className="sm:col-span-2"
        >
          <Input
            id="fullName"
            placeholder="e.g. Jane Elizabeth Smith"
            hasError={!!errors.fullName}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Please enter at least 2 characters' },
            })}
          />
        </FormField>

        <FormField
          label="Preferred name"
          htmlFor="preferredName"
          error={errors.preferredName?.message}
          hint="The name you like to go by (optional)"
        >
          <Input
            id="preferredName"
            placeholder="e.g. Jane"
            hasError={!!errors.preferredName}
            {...register('preferredName')}
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

        <FormField
          label="Address"
          htmlFor="address"
          required
          error={errors.address?.message}
          className="sm:col-span-2"
        >
          <Input
            id="address"
            placeholder="House number and street name"
            hasError={!!errors.address}
            {...register('address', {
              required: 'Address is required',
            })}
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
          label="Nationality"
          htmlFor="nationality"
          required
          error={errors.nationality?.message}
        >
          <Select
            id="nationality"
            hasError={!!errors.nationality}
            {...register('nationality', {
              required: 'Nationality is required',
            })}
          >
            <option value="">Select nationality</option>
            {NATIONALITIES.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Languages spoken"
          htmlFor="languages"
          required
          error={errors.languages?.message}
          hint="List all languages you speak, including English"
        >
          <Input
            id="languages"
            placeholder="e.g. English, French, Spanish"
            hasError={!!errors.languages}
            {...register('languages', {
              required: 'Please list the languages you speak',
            })}
          />
        </FormField>
      </div>
    </div>
  )
}
