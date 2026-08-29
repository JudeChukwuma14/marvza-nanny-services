import { useFormContext, useFieldArray } from 'react-hook-form'
import FormField, { Input, SectionHeader, Select } from '../ui/FormField'
import { CHILD_GENDER_OPTIONS } from '../../constants/requestForm'
import { Plus, Trash2 } from 'lucide-react'

export default function ParentStep03Children() {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'children' })

  return (
    <div className="animate-fade-in-up">
      <SectionHeader title="Children Details" description="Tell us about your children." />

      <div className="space-y-5">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 sm:p-5 rounded-xl border border-[#E4D8C7] relative"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#3B2923]">Child {index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center gap-1 text-xs font-medium text-[#B94A48] hover:text-[#8f3735] transition-colors"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                label="Name"
                htmlFor={`children.${index}.name`}
                error={errors.children?.[index]?.name?.message}
              >
                <Input
                  id={`children.${index}.name`}
                  placeholder="e.g. Amelia"
                  hasError={!!errors.children?.[index]?.name}
                  {...register(`children.${index}.name`)}
                />
              </FormField>

              <FormField
                label="Age"
                htmlFor={`children.${index}.age`}
                required
                error={errors.children?.[index]?.age?.message}
              >
                <Input
                  id={`children.${index}.age`}
                  type="number"
                  min={0}
                  max={17}
                  placeholder="e.g. 4"
                  hasError={!!errors.children?.[index]?.age}
                  {...register(`children.${index}.age`, {
                    required: 'Age is required',
                    min: { value: 0, message: 'Enter a valid age' },
                    max: { value: 17, message: 'Enter a valid age' },
                  })}
                />
              </FormField>

              <FormField
                label="Gender"
                htmlFor={`children.${index}.gender`}
              >
                <Select
                  id={`children.${index}.gender`}
                  defaultValue=""
                  {...register(`children.${index}.gender`)}
                >
                  <option value="" disabled>Select</option>
                  {CHILD_GENDER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </FormField>
            </div>

            <FormField
              label="Allergies, special needs, or other notes"
              htmlFor={`children.${index}.notes`}
              className="mt-4"
            >
              <Input
                id={`children.${index}.notes`}
                placeholder="Optional"
                {...register(`children.${index}.notes`)}
              />
            </FormField>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: '', age: '', gender: '', notes: '' })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-[#E4D8C7] text-sm font-medium text-[#3B2923] hover:border-[#3B2923]/40 hover:bg-[#F8F3EA] transition-colors"
        >
          <Plus size={16} />
          Add another child
        </button>
      </div>
    </div>
  )
}
