import { useFormContext } from 'react-hook-form'
import FormField, { Textarea, SectionHeader } from '../ui/FormField'

const MAX_LENGTH = 1000

const QUESTIONS = [
  {
    field: 'aboutYourself',
    label: 'Tell us about yourself',
    placeholder: 'Share a little about who you are, your background, and what has shaped your career in childcare. Include any personal qualities you believe make you a great nanny...',
  },
  {
    field: 'whyNanny',
    label: 'Why do you want to work as a nanny?',
    placeholder: 'Tell us what motivates you to work in a private nanny role rather than a nursery or other childcare setting. What do you enjoy most about working one-to-one with families?',
  },
  {
    field: 'enjoyAboutChildcare',
    label: 'What do you enjoy most about childcare?',
    placeholder: 'Describe the aspects of caring for children that you find most fulfilling. What achievements or moments are you most proud of in your childcare career?',
  },
  {
    field: 'familyType',
    label: 'What type of family or role are you looking for?',
    placeholder: 'Describe your ideal role and family situation. Consider: age of children, family size, sole charge or shared care, location, hours, and any other preferences...',
  },
]

export default function Step09AboutYou() {
  const { register, watch, formState: { errors } } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="About You"
        description="These questions help families understand who you are as a person and as a childcare professional. Please take your time to answer thoughtfully."
      />

      <div className="flex flex-col gap-7">
        {QUESTIONS.map(({ field, label, placeholder }) => {
          const value = watch(field) || ''
          const remaining = MAX_LENGTH - value.length
          return (
            <FormField
              key={field}
              label={label}
              htmlFor={field}
              required
              error={errors[field]?.message}
            >
              <Textarea
                id={field}
                rows={5}
                placeholder={placeholder}
                hasError={!!errors[field]}
                maxLength={MAX_LENGTH}
                {...register(field, {
                  required: 'This field is required',
                  minLength: { value: 30, message: 'Please write at least 30 characters' },
                  maxLength: { value: MAX_LENGTH, message: `Maximum ${MAX_LENGTH} characters` },
                })}
              />
              <p className={`text-xs text-right mt-1 ${remaining < 50 ? 'text-[#C62828]' : 'text-[#667085]'}`}>
                {remaining} characters remaining
              </p>
            </FormField>
          )
        })}
      </div>
    </div>
  )
}
