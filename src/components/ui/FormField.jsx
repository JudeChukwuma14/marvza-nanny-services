import { forwardRef } from 'react'

/**
 * Reusable form field wrapper.
 * Renders a label, the input (via children), and an error message.
 */
export default function FormField({ label, htmlFor, required, error, hint, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-[#17202A] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[#C62828]" aria-hidden="true">*</span>}
        </label>
      )}
      {hint && (
        <p className="text-xs text-[#667085] -mt-0.5">{hint}</p>
      )}
      {children}
      {error && (
        <p className="text-xs text-[#C62828] flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Styled text input
 */
export const Input = forwardRef(({ hasError, className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#17202A] placeholder-[#667085] bg-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-[#0F4C5C]
        ${hasError
          ? 'border-[#C62828] focus:ring-[#C62828]'
          : 'border-[#E4E7EC] hover:border-[#0F4C5C]'
        } ${className}`}
      {...props}
    />
  )
})

/**
 * Styled select
 */
export const Select = forwardRef(({ hasError, children, className = '', ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#17202A] bg-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-[#0F4C5C]
        ${hasError
          ? 'border-[#C62828] focus:ring-[#C62828]'
          : 'border-[#E4E7EC] hover:border-[#0F4C5C]'
        } ${className}`}
      {...props}
    >
      {children}
    </select>
  )
})

/**
 * Styled textarea
 */
export const Textarea = forwardRef(({ hasError, className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#17202A] placeholder-[#667085] bg-white transition-colors resize-none
        focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-[#0F4C5C]
        ${hasError
          ? 'border-[#C62828] focus:ring-[#C62828]'
          : 'border-[#E4E7EC] hover:border-[#0F4C5C]'
        } ${className}`}
      {...props}
    />
  )
})

/**
 * Radio group option.
 *
 * Accepts props directly from React Hook Form's register():
 *   <RadioOption id="field-yes" label="Yes" value="Yes" isSelected={...} {...register("field")} />
 *
 * `isSelected` is passed by the parent (derived from watch()) purely for styling.
 * Do NOT pass `checked` — let register() control the native input.
 */
export const RadioOption = forwardRef(({ id, label, isSelected, className = '', ...props }, ref) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
        ${isSelected
          ? 'border-[#0F4C5C] bg-[#0F4C5C]/5'
          : 'border-[#E4E7EC] hover:border-[#0F4C5C]/50'
        } ${className}`}
    >
      <input
        type="radio"
        id={id}
        ref={ref}
        className="sr-only"
        {...props}
      />
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
        ${isSelected ? 'border-[#0F4C5C]' : 'border-[#E4E7EC]'}`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-[#0F4C5C]" />}
      </div>
      <span className="text-sm text-[#17202A]">{label}</span>
    </label>
  )
})

/**
 * Checkbox option.
 *
 * Accepts props directly from React Hook Form's register():
 *   <CheckboxOption id="agesNewborn" label="Newborns" value="agesNewborn" isSelected={...} {...register("ageGroups")} />
 *
 * `isSelected` is passed by the parent (derived from watch()) purely for styling.
 * Do NOT pass `checked` — let register() control the native input.
 */
export const CheckboxOption = forwardRef(({ id, label, description, isSelected, error, className = '', ...props }, ref) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
        ${isSelected
          ? 'border-[#0F4C5C] bg-[#0F4C5C]/5'
          : error
          ? 'border-[#C62828]'
          : 'border-[#E4E7EC] hover:border-[#0F4C5C]/50'
        } ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        ref={ref}
        className="mt-0.5"
        {...props}
      />
      <div>
        <p className="text-sm font-medium text-[#17202A]">{label}</p>
        {description && <p className="text-xs text-[#667085] mt-0.5">{description}</p>}
      </div>
    </label>
  )
})

/**
 * Section header inside a step
 */
export function SectionHeader({ title, description }) {
  return (
    <div className="mb-6 pb-4 border-b border-[#E4E7EC]">
      <h2 className="text-lg font-semibold text-[#17202A]">{title}</h2>
      {description && <p className="text-sm text-[#667085] mt-1">{description}</p>}
    </div>
  )
}
