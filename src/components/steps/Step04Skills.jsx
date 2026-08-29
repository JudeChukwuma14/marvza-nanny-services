import { useFormContext, useWatch } from 'react-hook-form'
import FormField, { Textarea, Input, SectionHeader, CheckboxOption } from '../ui/FormField'

export default function Step04Skills() {
  const { register, formState: { errors }, control } = useFormContext()
  
  const skills = useWatch({
    control,
    name: 'skills',
    defaultValue: []
  })

  const drivingLicence = useWatch({ control, name: 'drivingLicence' })
  const carAccess = useWatch({ control, name: 'carAccess' })
  const swimming = useWatch({ control, name: 'swimming' })
  const animalAllergy = useWatch({ control, name: 'animalAllergy' })

  return (
    <div>
      <SectionHeader
        title="Skills & Interests"
        description="Select all the skills and attributes that apply to you."
      />

      <div className="space-y-6">
        <FormField
          label="Professional Skills"
          error={errors.skills?.message}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <CheckboxOption
              id="skill-newborn"
              label="Newborn care"
              value="Newborn care"
              isSelected={skills?.includes('Newborn care')}
              {...register('skills')}
            />
            <CheckboxOption
              id="skill-cooking"
              label="Cooking"
              value="Cooking"
              isSelected={skills?.includes('Cooking')}
              {...register('skills')}
            />
            <CheckboxOption
              id="skill-homework"
              label="Homework support"
              value="Homework support"
              isSelected={skills?.includes('Homework support')}
              {...register('skills')}
            />
            <CheckboxOption
              id="skill-sleep"
              label="Sleep training"
              value="Sleep training"
              isSelected={skills?.includes('Sleep training')}
              {...register('skills')}
            />
            <CheckboxOption
              id="skill-school"
              label="School runs"
              value="School runs"
              isSelected={skills?.includes('School runs')}
              {...register('skills')}
            />
            <CheckboxOption
              id="skill-special"
              label="Special needs experience"
              value="Special needs experience"
              isSelected={skills?.includes('Special needs experience')}
              {...register('skills')}
            />
          </div>
        </FormField>

        <FormField
          label="Driving"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <CheckboxOption
              id="skill-driving"
              label="Driving licence"
              value="true"
              isSelected={drivingLicence === "true" || drivingLicence === true}
              {...register('drivingLicence')}
            />
            <CheckboxOption
              id="skill-car"
              label="Access to a car"
              value="true"
              isSelected={carAccess === "true" || carAccess === true}
              {...register('carAccess')}
            />
          </div>
        </FormField>

        <div className="pt-4 border-t border-gray-100 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Swimming"
              error={errors.swimming?.message}
              hint="Are you a confident swimmer?"
            >
              <div className="space-y-2 mt-1">
                <RadioOption
                  id="swim-yes"
                  label="Yes"
                  value="Yes"
                  isSelected={swimming === 'Yes'}
                  {...register('swimming')}
                />
                <RadioOption
                  id="swim-no"
                  label="No"
                  value="No"
                  isSelected={swimming === 'No'}
                  {...register('swimming')}
                />
              </div>
            </FormField>

            <FormField
              label="Allergic to animals"
              error={errors.animalAllergy?.message}
              hint="Are you allergic to dogs, cats, or other common pets?"
            >
              <div className="space-y-2 mt-1">
                <RadioOption
                  id="allergy-yes"
                  label="Yes"
                  value="Yes"
                  isSelected={animalAllergy === 'Yes'}
                  {...register('animalAllergy')}
                />
                <RadioOption
                  id="allergy-no"
                  label="No"
                  value="No"
                  isSelected={animalAllergy === 'No'}
                  {...register('animalAllergy')}
                />
              </div>
            </FormField>
          </div>

          <FormField
            label="Languages spoken fluently"
            htmlFor="languages"
            error={errors.languages?.message}
          >
            <Input
              id="languages"
              placeholder="e.g. English, French, Spanish"
              hasError={!!errors.languages}
              {...register('languages')}
            />
          </FormField>

          <FormField
            label="Other Skills & Interests"
            htmlFor="otherSkillsInterests"
            error={errors.otherSkillsInterests?.message}
            hint="Tell us about your hobbies, interests, or any other relevant skills."
          >
            <Textarea
              id="otherSkillsInterests"
              rows={4}
              placeholder="I enjoy baking, painting, and going for long walks..."
              hasError={!!errors.otherSkillsInterests}
              {...register('otherSkillsInterests')}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
