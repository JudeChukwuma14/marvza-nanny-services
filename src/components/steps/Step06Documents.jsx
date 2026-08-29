import { useFormContext } from 'react-hook-form'
import FormField, { SectionHeader } from '../ui/FormField'
import FileUpload from '../ui/FileUpload'

export default function Step06Documents() {
  const { formState: { errors }, setValue } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="Documents"
        description="Please upload your CV/resume."
      />

      <div className="space-y-6">
        <FormField
          label="Resume / CV"
          required
          error={errors.cv?.message}
        >
          <div className="mt-2">
            <FileUpload
              id="cv"
              label="Please upload a resume/CV"
              hint="Accepted formats: PDF, DOC, DOCX. Max size 10MB."
              required={true}
              multiple={false}
              accept="cv"
              onChange={(files) => {
                setValue('cv', files, { shouldValidate: true })
              }}
            />
          </div>
        </FormField>
      </div>
    </div>
  )
}
