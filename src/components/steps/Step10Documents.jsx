import { useFormContext } from 'react-hook-form'
import { SectionHeader } from '../ui/FormField'
import FileUpload from '../ui/FileUpload'
import { Info } from 'lucide-react'

const DOCUMENT_SLOTS = [
  {
    id: 'docId',
    label: 'Proof of identity',
    hint: 'e.g. Passport, driving licence, birth certificate',
    required: false,
  },
  {
    id: 'docDBS',
    label: 'DBS certificate',
    hint: 'Your current Disclosure and Barring Service certificate',
    required: false,
  },
  {
    id: 'docPFA',
    label: 'Paediatric First Aid certificate',
    hint: 'Current certificate only — must not be expired',
    required: false,
  },
  {
    id: 'docQual',
    label: 'Childcare qualifications',
    hint: 'CACHE, NVQ, BTEC or equivalent certificates',
    required: false,
    multiple: true,
  },
  {
    id: 'docRTW',
    label: 'Right-to-work documentation',
    hint: 'Passport, visa, BRP or equivalent',
    required: false,
  },
  {
    id: 'docOther',
    label: 'Other relevant certificates',
    hint: 'e.g. Food hygiene, safeguarding, sleep training',
    required: false,
    multiple: true,
  },
]

export default function Step10Documents() {
  const { setValue } = useFormContext()

  return (
    <div>
      <SectionHeader
        title="Documents"
        description="Please upload copies of your relevant documents. All uploads are optional at this stage — you can provide them later in the process."
      />

      {/* Info notice */}
      <div className="mb-6 p-4 rounded-xl bg-[#0F4C5C]/5 border border-[#0F4C5C]/20 flex items-start gap-3">
        <Info size={16} className="text-[#0F4C5C] mt-0.5 flex-shrink-0" />
        <div className="text-xs text-[#0F4C5C] leading-relaxed">
          <strong>Secure uploads:</strong> Documents are uploaded securely and are only accessible to authorised recruitment staff. We do not share your documents with third parties without your consent.
          <br />Accepted formats: PDF, JPG, JPEG, PNG — maximum 10MB per file.
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {DOCUMENT_SLOTS.map(({ id, label, hint, required, multiple }) => (
          <div key={id} className="p-4 rounded-xl border border-[#E4E7EC] bg-white">
            <FileUpload
              id={id}
              label={label}
              hint={hint}
              required={required}
              multiple={multiple}
              onChange={(files) => setValue(id, files)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
