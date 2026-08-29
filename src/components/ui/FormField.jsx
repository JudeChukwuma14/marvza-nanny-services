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
          className="text-sm font-medium text-[#3B2923] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[#B94A48]" aria-hidden="true">*</span>}
        </label>
      )}
      {hint && (
        <p className="text-xs text-[#7C6659] -mt-0.5">{hint}</p>
      )}
      {children}
      {error && (
        <p className="text-xs text-[#B94A48] flex items-center gap-1" role="alert">
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
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#3B2923] placeholder-[#A8978A] bg-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 focus:border-[#3B2923]
        ${hasError
          ? 'border-[#B94A48] focus:ring-[#B94A48]/20'
          : 'border-[#E4D8C7] hover:border-[#D2C0A8]'
        } ${className}`}
      {...props}
    />
  )
})
Input.displayName = 'Input'

/**
 * Styled select
 */
export const Select = forwardRef(({ hasError, children, className = '', ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#3B2923] bg-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 focus:border-[#3B2923]
        ${hasError
          ? 'border-[#B94A48] focus:ring-[#B94A48]/20'
          : 'border-[#E4D8C7] hover:border-[#D2C0A8]'
        } ${className}`}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = 'Select'

/**
 * Styled textarea
 */
export const Textarea = forwardRef(({ hasError, className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#3B2923] placeholder-[#A8978A] bg-white transition-colors resize-none
        focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20 focus:border-[#3B2923]
        ${hasError
          ? 'border-[#B94A48] focus:ring-[#B94A48]/20'
          : 'border-[#E4D8C7] hover:border-[#D2C0A8]'
        } ${className}`}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

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
          ? 'border-[#3B2923] bg-[#3B2923]/5'
          : 'border-[#E4D8C7] hover:border-[#3B2923]/40 hover:bg-[#F8F3EA]'
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
        ${isSelected ? 'border-[#3B2923]' : 'border-[#E4D8C7]'}`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-[#3B2923]" />}
      </div>
      <span className="text-sm text-[#3B2923]">{label}</span>
    </label>
  )
})
RadioOption.displayName = 'RadioOption'

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
          ? 'border-[#3B2923] bg-[#3B2923]/5'
          : error
          ? 'border-[#B94A48]'
          : 'border-[#E4D8C7] hover:border-[#3B2923]/40 hover:bg-[#F8F3EA]'
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
        <p className="text-sm font-medium text-[#3B2923]">{label}</p>
        {description && <p className="text-xs text-[#7C6659] mt-0.5">{description}</p>}
      </div>
    </label>
  )
})
CheckboxOption.displayName = 'CheckboxOption'

/**
 * Section header inside a step
 */
export function SectionHeader({ title, description }) {
  return (
    <div className="mb-6 pb-4 border-b border-[#E4D8C7]">
      <h2 className="text-lg font-semibold text-[#3B2923]">{title}</h2>
      {description && <p className="text-sm text-[#7C6659] mt-1">{description}</p>}
    </div>
  )
}
