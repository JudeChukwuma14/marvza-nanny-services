import { useFormContext, useWatch } from 'react-hook-form'
import { SectionHeader, CheckboxOption } from '../ui/FormField'
import { SERVICES } from '../../constants/services'
import {
  FREQUENCY_OPTIONS,
  HOURS_PER_WEEK_OPTIONS,
  LOCATION_TYPE_OPTIONS,
  LIVING_ARRANGEMENT_OPTIONS,
  DUTIES_OPTIONS,
  EXPERIENCE_OPTIONS,
  QUALIFICATIONS_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  DAYS_OF_WEEK,
  CHILD_GENDER_OPTIONS,
} from '../../constants/requestForm'
import { Pencil } from 'lucide-react'

function labelFor(options, value) {
  return options.find((opt) => opt.value === value)?.label || '—'
}

function labelsFor(options, values) {
  if (!values || values.length === 0) return '—'
  return values.map((v) => labelFor(options, v)).join(', ')
}

function ReviewSection({ title, step, setCurrentStep, children }) {
  return (
    <div className="p-4 sm:p-5 rounded-xl border border-[#E4D8C7]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#3B2923]">{title}</h3>
        <button
          type="button"
          onClick={() => setCurrentStep(step)}
          className="flex items-center gap-1 text-xs font-medium text-[#3B2923] hover:text-[#2A1B17] transition-colors"
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {children}
      </dl>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-[#7C6659]">{label}</dt>
      <dd className="text-[#3B2923] font-medium">{value || '—'}</dd>
    </div>
  )
}

export default function ParentStep07Review({ setCurrentStep }) {
  const { register, control, formState: { errors } } = useFormContext()
  const values = useWatch({ control })

  const service = SERVICES.find((s) => s.slug === values.serviceType)

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Review Your Request" description="Please review your details before submitting." />

      <div className="space-y-4">
        <ReviewSection title="Service Requirements" step={1} setCurrentStep={setCurrentStep}>
          <Field label="Service type" value={service?.name} />
          <Field label="Frequency" value={labelFor(FREQUENCY_OPTIONS, values.frequency)} />
          <Field label="Urgent" value={values.isUrgent === 'yes' ? 'Yes' : values.isUrgent === 'no' ? 'No' : '—'} />
          <Field label="Preferred start date" value={values.preferredStartDate} />
        </ReviewSection>

        <ReviewSection title="Schedule Details" step={2} setCurrentStep={setCurrentStep}>
          <Field label="Days needed" value={labelsFor(DAYS_OF_WEEK, values.daysNeeded)} />
          <Field label="Hours per week" value={labelFor(HOURS_PER_WEEK_OPTIONS, values.hoursPerWeek)} />
          {values.scheduleNotes && (
            <div className="sm:col-span-2">
              <Field label="Notes" value={values.scheduleNotes} />
            </div>
          )}
        </ReviewSection>

        <ReviewSection title="Children" step={3} setCurrentStep={setCurrentStep}>
          {(values.children || []).map((child, i) => (
            <Field
              key={i}
              label={`Child ${i + 1}`}
              value={[
                child.name || `Child ${i + 1}`,
                child.age ? `${child.age} yrs` : null,
                labelFor(CHILD_GENDER_OPTIONS, child.gender) !== '—' ? labelFor(CHILD_GENDER_OPTIONS, child.gender) : null,
              ].filter(Boolean).join(', ')}
            />
          ))}
        </ReviewSection>

        <ReviewSection title="Location & Travel" step={4} setCurrentStep={setCurrentStep}>
          <Field label="Postcode" value={values.postcode} />
          <Field label="Area" value={values.area} />
          <Field label="Where care takes place" value={labelFor(LOCATION_TYPE_OPTIONS, values.locationType)} />
          <Field label="Living arrangement" value={labelFor(LIVING_ARRANGEMENT_OPTIONS, values.livingArrangement)} />
        </ReviewSection>

        <ReviewSection title="Family Needs & Duties" step={5} setCurrentStep={setCurrentStep}>
          <div className="sm:col-span-2">
            <Field label="Duties" value={labelsFor(DUTIES_OPTIONS, values.duties)} />
          </div>
          <Field label="Experience required" value={labelFor(EXPERIENCE_OPTIONS, values.experienceRequired)} />
          <Field label="Preferred qualifications" value={labelsFor(QUALIFICATIONS_OPTIONS, values.qualifications)} />
          {values.specialRequirements && (
            <div className="sm:col-span-2">
              <Field label="Special requirements" value={values.specialRequirements} />
            </div>
          )}
        </ReviewSection>

        <ReviewSection title="Your Details" step={6} setCurrentStep={setCurrentStep}>
          <Field label="Name" value={`${values.parentFirstName || ''} ${values.parentLastName || ''}`.trim()} />
          <Field label="Email" value={values.email} />
          <Field label="Phone" value={values.phone} />
          <Field label="Preferred contact method" value={labelFor(CONTACT_METHOD_OPTIONS, values.contactMethod)} />
        </ReviewSection>

        <div className="p-4 sm:p-5 rounded-xl border border-[#E4D8C7]">
          <CheckboxOption
            id="agreeToContact"
            label="I confirm this information is accurate and agree to be contacted about my request."
            isSelected={!!values.agreeToContact}
            error={!!errors.agreeToContact}
            {...register('agreeToContact', { required: 'You must agree to this to continue' })}
          />
          {errors.agreeToContact && (
            <p className="text-xs text-[#B94A48] mt-2" role="alert">{errors.agreeToContact.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
