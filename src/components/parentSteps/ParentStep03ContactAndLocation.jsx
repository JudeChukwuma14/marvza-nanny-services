import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, RadioOption } from '../ui/FormField'
import { LOCATION_TYPE_OPTIONS, LIVING_ARRANGEMENT_OPTIONS, CONTACT_METHOD_OPTIONS } from '../../constants/requestForm'

export default function ParentStep03ContactAndLocation() {
  const { register, formState: { errors }, control } = useFormContext()

  const locationType = useWatch({ control, name: 'locationType' })
  const livingArrangement = useWatch({ control, name: 'livingArrangement' })
  const contactMethod = useWatch({ control, name: 'contactMethod' })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Contact & Location" description="Tell us about yourself and where the care will take place." />

      <div className="space-y-8">
        {/* Contact Details */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-[#3B2923] border-b border-[#E4D8C7] pb-2">Your Details</h3>

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

        {/* Location Details */}
        <div className="space-y-6 pt-2">
          <h3 className="text-sm font-semibold text-[#3B2923] border-b border-[#E4D8C7] pb-2">Location & Travel</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          <FormField
            label="Where will care take place?"
            required
            error={errors.locationType?.message}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {LOCATION_TYPE_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt.value}
                  id={`locationType-${opt.value}`}
                  label={opt.label}
                  value={opt.value}
                  isSelected={locationType === opt.value}
                  {...register('locationType', { required: 'Please select a location type' })}
                />
              ))}
            </div>
          </FormField>

          {locationType === 'hotel' && (
            <FormField
              label="Hotel Name & Details"
              htmlFor="hotelName"
              required
              error={errors.hotelName?.message}
            >
              <Input
                id="hotelName"
                placeholder="e.g. The Ritz, Piccadilly"
                hasError={!!errors.hotelName}
                {...register('hotelName', {
                  required: 'Hotel name is required',
                })}
              />
            </FormField>
          )}

          <FormField
            label="Living arrangement"
            required
            error={errors.livingArrangement?.message}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {LIVING_ARRANGEMENT_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt.value}
                  id={`livingArrangement-${opt.value}`}
                  label={opt.label}
                  value={opt.value}
                  isSelected={livingArrangement === opt.value}
                  {...register('livingArrangement', { required: 'Please select a living arrangement' })}
                />
              ))}
            </div>
          </FormField>
        </div>
      </div>
    </div>
  )
}
