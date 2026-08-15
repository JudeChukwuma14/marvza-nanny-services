import { useFormContext, useFieldArray } from 'react-hook-form'
import FormField, { Input, Select, SectionHeader } from '../ui/FormField'
import { Plus, Trash2, User } from 'lucide-react'

const RELATIONSHIPS = [
  'Direct line manager',
  'Employer',
  'Colleague',
  'Head teacher',
  'Nursery manager',
  'Family member employed me',
  'Other',
]

function ReferenceCard({ index, onRemove, canRemove }) {
  const { register, formState: { errors } } = useFormContext()
  const refErrors = errors?.references?.[index]

  return (
    <div className="rounded-xl border border-[#E4E7EC] overflow-hidden">
      <div className="px-4 py-3 bg-[#F7F5F0] border-b border-[#E4E7EC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#0F4C5C] flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[#17202A]">
            Reference {index + 1}
          </span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 text-xs text-[#C62828] hover:text-[#C62828]/80 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
            aria-label={`Remove reference ${index + 1}`}
          >
            <Trash2 size={13} />
            Remove
          </button>
        )}
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Previous employer's name"
          htmlFor={`references.${index}.employerName`}
          required
          error={refErrors?.employerName?.message}
          className="sm:col-span-2"
        >
          <Input
            id={`references.${index}.employerName`}
            placeholder="e.g. The Johnson Family"
            hasError={!!refErrors?.employerName}
            {...register(`references.${index}.employerName`, {
              required: 'Employer name is required',
            })}
          />
        </FormField>

        <FormField
          label="Employer's email"
          htmlFor={`references.${index}.email`}
          required
          error={refErrors?.email?.message}
        >
          <Input
            id={`references.${index}.email`}
            type="email"
            placeholder="employer@example.com"
            hasError={!!refErrors?.email}
            {...register(`references.${index}.email`, {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
            })}
          />
        </FormField>

        <FormField
          label="Employer's phone number"
          htmlFor={`references.${index}.phone`}
          required
          error={refErrors?.phone?.message}
        >
          <Input
            id={`references.${index}.phone`}
            type="tel"
            placeholder="e.g. 07700 900000"
            hasError={!!refErrors?.phone}
            {...register(`references.${index}.phone`, {
              required: 'Phone number is required',
            })}
          />
        </FormField>

        <FormField
          label="Your job title / role"
          htmlFor={`references.${index}.role`}
          required
          error={refErrors?.role?.message}
        >
          <Input
            id={`references.${index}.role`}
            placeholder="e.g. Nanny, Nursery Assistant"
            hasError={!!refErrors?.role}
            {...register(`references.${index}.role`, { required: 'Job title is required' })}
          />
        </FormField>

        <FormField
          label="Relationship to referee"
          htmlFor={`references.${index}.relationship`}
          required
          error={refErrors?.relationship?.message}
        >
          <Select
            id={`references.${index}.relationship`}
            hasError={!!refErrors?.relationship}
            {...register(`references.${index}.relationship`, {
              required: 'Please select the relationship',
            })}
          >
            <option value="">Select relationship</option>
            {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
          </Select>
        </FormField>

        <FormField
          label="Start date"
          htmlFor={`references.${index}.startDate`}
          required
          error={refErrors?.startDate?.message}
        >
          <Input
            id={`references.${index}.startDate`}
            type="date"
            hasError={!!refErrors?.startDate}
            {...register(`references.${index}.startDate`, { required: 'Start date is required' })}
          />
        </FormField>

        <FormField
          label="End date"
          htmlFor={`references.${index}.endDate`}
          required
          error={refErrors?.endDate?.message}
          hint="Leave blank if this is your current role"
        >
          <Input
            id={`references.${index}.endDate`}
            type="date"
            hasError={!!refErrors?.endDate}
            {...register(`references.${index}.endDate`)}
          />
        </FormField>
      </div>
    </div>
  )
}

export default function Step06References() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  })

  return (
    <div>
      <SectionHeader
        title="References"
        description="Please provide details of at least one professional reference from a previous employer in a childcare or related role."
      />

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <ReferenceCard
            key={field.id}
            index={index}
            canRemove={fields.length > 1}
            onRemove={() => remove(index)}
          />
        ))}

        {fields.length < 2 && (
          <button
            type="button"
            onClick={() => append({
              employerName: '', email: '', phone: '', role: '',
              relationship: '', startDate: '', endDate: '',
            })}
            className="flex items-center gap-2 text-sm font-medium text-[#0F4C5C] hover:text-[#0B3D4A]
              px-4 py-3 rounded-lg border-2 border-dashed border-[#0F4C5C]/30 hover:border-[#0F4C5C]
              transition-colors w-full justify-center"
          >
            <Plus size={16} />
            Add another reference
          </button>
        )}

        <p className="text-xs text-[#667085]">
          References will only be contacted with your consent and at an appropriate stage of the recruitment process.
        </p>
      </div>
    </div>
  )
}
