import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Input, SectionHeader, RadioOption } from '../ui/FormField'
import { LOCATION_TYPE_OPTIONS, LIVING_ARRANGEMENT_OPTIONS } from '../../constants/requestForm'

export default function ParentStep04Location() {
  const { register, formState: { errors }, control } = useFormContext()

  const locationType = useWatch({ control, name: 'locationType' })
  const livingArrangement = useWatch({ control, name: 'livingArrangement' })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Location & Travel" description="Where will the nanny be based?" />

      <div className="space-y-6">
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
  )
}
