import { useFormContext } from 'react-hook-form'
import { Pencil, CheckCircle } from 'lucide-react'
import { SectionHeader } from '../ui/FormField'

function ReviewSection({ title, step, onEdit, children }) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] overflow-hidden">
      <div className="px-4 py-3 bg-[#F7F5F0] border-b border-[#E4E7EC] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#17202A]">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#0F4C5C] hover:text-[#0B3D4A]
            px-2.5 py-1.5 rounded-md hover:bg-[#0F4C5C]/10 transition-colors"
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  )
}

function ReviewField({ label, value }) {
  if (!value && value !== 0) return null
  const displayValue = Array.isArray(value) ? value.join(', ') : String(value)
  if (!displayValue || displayValue === 'undefined') return null
  return (
    <div>
      <p className="text-xs text-[#667085] font-medium mb-0.5">{label}</p>
      <p className="text-sm text-[#17202A] break-words">{displayValue}</p>
    </div>
  )
}

export default function Step12Review({ onEditStep }) {
  const { getValues } = useFormContext()
  const data = getValues()

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    .filter(d => data[`day_${d}`])

  const skills = [
    data.skillDriving && 'Driving licence',
    data.skillCar && 'Own vehicle',
    data.skillNewborn && 'Newborn care',
    data.skillCooking && 'Cooking',
    data.skillHomework && 'Homework support',
    data.skillSwimming && 'Swimming',
    data.skillLanguages && 'Additional languages',
    data.skillSEN && 'SEN experience',
    data.skillSleep && 'Sleep training',
    data.skillSchoolRuns && 'School runs',
    data.skillOther && 'Other skills',
  ].filter(Boolean)

  return (
    <div>
      <SectionHeader
        title="Review & Submit"
        description="Please review your application carefully before submitting. Click Edit on any section to make changes."
      />

      <div className="flex flex-col gap-4 mb-8">
        {/* Personal */}
        <ReviewSection title="Personal Details" step={1} onEdit={onEditStep}>
          <ReviewField label="Full name" value={data.fullName} />
          <ReviewField label="Preferred name" value={data.preferredName} />
          <ReviewField label="Date of birth" value={data.dateOfBirth} />
          <ReviewField label="Email" value={data.email} />
          <ReviewField label="Phone" value={data.phone} />
          <ReviewField label="Address" value={data.address} />
          <ReviewField label="Town / City" value={data.city} />
          <ReviewField label="Postcode" value={data.postcode} />
          <ReviewField label="Nationality" value={data.nationality} />
          <ReviewField label="Languages" value={data.languages} />
        </ReviewSection>

        {/* Experience */}
        <ReviewSection title="Nanny & Childcare Experience" step={2} onEdit={onEditStep}>
          <ReviewField label="Childcare experience" value={data.yearsChildcareExp} />
          <ReviewField label="Nanny experience" value={data.yearsNannyExp} />
          <ReviewField label="Newborn experience" value={data.newbornExp} />
          <ReviewField label="Toddler experience" value={data.toddlerExp} />
          <ReviewField label="School-age experience" value={data.schoolAgeExp} />
          <ReviewField label="Multiple children" value={data.multipleChildrenExp} />
          <ReviewField label="Additional needs" value={data.additionalNeedsExp} />
          <ReviewField label="Previous roles" value={data.previousRoles} />
        </ReviewSection>

        {/* Qualifications */}
        <ReviewSection title="Qualifications & Training" step={3} onEdit={onEditStep}>
          <ReviewField label="Childcare qualification" value={data.childcareQualifications} />
          <ReviewField label="Other qualifications" value={data.otherQualifications} />
          <ReviewField label="Paediatric First Aid" value={data.paediatricFirstAid} />
          <ReviewField label="Other first aid" value={data.otherFirstAid} />
          <ReviewField label="Other certificates" value={data.otherCertificates} />
        </ReviewSection>

        {/* DBS */}
        <ReviewSection title="DBS / Background Checks" step={4} onEdit={onEditStep}>
          <ReviewField label="Current DBS" value={data.hasCurrentDBS} />
          <ReviewField label="DBS type" value={data.dbsType} />
          <ReviewField label="DBS date" value={data.dbsDate} />
          <ReviewField label="Update Service" value={data.dbsUpdateService} />
          <ReviewField label="Certificate number" value={data.dbsCertNumber} />
        </ReviewSection>

        {/* Right to Work */}
        <ReviewSection title="Right to Work" step={5} onEdit={onEditStep}>
          <ReviewField label="Right to work in UK" value={data.rightToWork} />
          <ReviewField label="Documentation type" value={data.rightToWorkType} />
          <ReviewField label="Details" value={data.rightToWorkDetails} />
        </ReviewSection>

        {/* References */}
        <ReviewSection title="References" step={6} onEdit={onEditStep}>
          {(data.references || []).map((ref, i) => (
            ref?.employerName ? (
              <div key={i} className="sm:col-span-2 pb-3 border-b border-[#E4E7EC] last:border-0 last:pb-0">
                <p className="text-xs font-semibold text-[#0F4C5C] mb-2">Reference {i + 1}</p>
                <div className="grid grid-cols-2 gap-2">
                  <ReviewField label="Employer" value={ref.employerName} />
                  <ReviewField label="Email" value={ref.email} />
                  <ReviewField label="Phone" value={ref.phone} />
                  <ReviewField label="Role" value={ref.role} />
                  <ReviewField label="Relationship" value={ref.relationship} />
                </div>
              </div>
            ) : null
          ))}
        </ReviewSection>

        {/* Availability */}
        <ReviewSection title="Availability" step={7} onEdit={onEditStep}>
          <ReviewField label="Start date" value={data.startDate} />
          <ReviewField label="Work type" value={data.workType} />
          <ReviewField label="Live-in/out" value={data.liveInOut} />
          <ReviewField label="Days available" value={days.length ? days : undefined} />
          <ReviewField label="Hours" value={data.hoursAvailable} />
          <ReviewField label="Weekend" value={data.weekendAvailability} />
          <ReviewField label="Evenings" value={data.eveningAvailability} />
          <ReviewField label="Areas" value={data.areasWillingToWork} />
          <ReviewField label="Max distance" value={data.maxDistance} />
        </ReviewSection>

        {/* Skills */}
        <ReviewSection title="Skills" step={8} onEdit={onEditStep}>
          <div className="sm:col-span-2">
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-[#0F4C5C]/10 text-[#0F4C5C] text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#667085]">No skills selected</p>
            )}
          </div>
        </ReviewSection>

        {/* About You */}
        <ReviewSection title="About You" step={9} onEdit={onEditStep}>
          <div className="sm:col-span-2 flex flex-col gap-3">
            {data.aboutYourself && (
              <div>
                <p className="text-xs text-[#667085] font-medium mb-0.5">About yourself</p>
                <p className="text-sm text-[#17202A] line-clamp-3">{data.aboutYourself}</p>
              </div>
            )}
            {data.whyNanny && (
              <div>
                <p className="text-xs text-[#667085] font-medium mb-0.5">Why nanny?</p>
                <p className="text-sm text-[#17202A] line-clamp-2">{data.whyNanny}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Declaration */}
        <ReviewSection title="Declaration & Consent" step={11} onEdit={onEditStep}>
          <div className="sm:col-span-2 flex items-center gap-2">
            <CheckCircle size={16} className="text-[#16803C]" />
            <span className="text-sm text-[#17202A]">
              Signed by <strong>{data.declarationName}</strong> on {data.declarationDate}
            </span>
          </div>
        </ReviewSection>
      </div>

      {/* Submit prompt */}
      <div className="p-5 rounded-xl border-2 border-[#0F4C5C]/20 bg-[#0F4C5C]/5 text-center">
        <h3 className="text-base font-semibold text-[#17202A] mb-1">Ready to submit?</h3>
        <p className="text-sm text-[#667085]">
          Please review your information above before submitting your application.
          Click the <strong>Submit Application</strong> button below when you are ready.
        </p>
      </div>
    </div>
  )
}
