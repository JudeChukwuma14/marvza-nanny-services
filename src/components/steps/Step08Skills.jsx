import { useFormContext } from 'react-hook-form'
import FormField, { Textarea, CheckboxOption, SectionHeader } from '../ui/FormField'

const SKILLS = [
  { id: 'skillDriving', label: 'Full UK driving licence', description: 'Hold a current, valid driving licence' },
  { id: 'skillCar', label: 'Access to own vehicle', description: 'Have your own car for use in the role' },
  { id: 'skillNewborn', label: 'Newborn care', description: 'Experience caring for babies 0–3 months' },
  { id: 'skillCooking', label: 'Cooking', description: 'Able to prepare meals and snacks for children' },
  { id: 'skillHomework', label: 'Homework support', description: 'Able to assist with school-age homework' },
  { id: 'skillSwimming', label: 'Swimming', description: 'Able to take children swimming' },
  { id: 'skillLanguages', label: 'Additional languages', description: 'Able to speak/teach languages other than English' },
  { id: 'skillSEN', label: 'Special educational needs (SEN) experience', description: 'Experience supporting children with SEN' },
  { id: 'skillSleep', label: 'Sleep training', description: 'Experience with infant and toddler sleep routines' },
  { id: 'skillSchoolRuns', label: 'School runs', description: 'Available and able to do school pick-up and drop-off' },
  { id: 'skillOther', label: 'Other childcare skills', description: 'Any other relevant childcare skills not listed above' },
]

export default function Step08Skills() {
  const { register, watch, formState: { errors } } = useFormContext()
  const hasOtherSkills = watch('skillOther')

  return (
    <div>
      <SectionHeader
        title="Skills"
        description="Please select all the skills and capabilities that apply to you."
      />

      <div className="flex flex-col gap-3">
        {SKILLS.map(({ id, label, description }) => {
          const checked = !!watch(id)
          return (
            <CheckboxOption
              key={id}
              id={id}
              label={label}
              description={description}
              checked={checked}
              onChange={() => {}}
              {...register(id)}
            />
          )
        })}
      </div>

      {hasOtherSkills && (
        <div className="mt-5">
          <FormField
            label="Please describe your other childcare skills"
            htmlFor="otherSkillsDetail"
            required
            error={errors.otherSkillsDetail?.message}
          >
            <Textarea
              id="otherSkillsDetail"
              rows={3}
              placeholder="Please describe any additional childcare skills or experience you have..."
              hasError={!!errors.otherSkillsDetail}
              {...register('otherSkillsDetail', {
                required: hasOtherSkills ? 'Please describe your other skills' : false,
              })}
            />
          </FormField>
        </div>
      )}
    </div>
  )
}
