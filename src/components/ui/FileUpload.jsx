import { useState, useRef } from 'react'
import { Upload, X, FileText, File, AlertCircle } from 'lucide-react'

const CV_ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const CV_ACCEPTED_EXTENSIONS = '.pdf,.doc,.docx'
const IMAGE_ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const IMAGE_ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png'
const MAX_SIZE_MB = 10

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getFileIcon(file) {
  if (file.type === 'application/pdf') return <FileText size={16} className="text-[#B94A48]" />
  return <File size={16} className="text-[#3B2923]" />
}

export default function FileUpload({
  label,
  id,
  hint,
  multiple = false,
  required = false,
  onChange,
  error,
  accept = 'images', // 'cv' | 'images'
}) {
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [sizeError, setSizeError] = useState('')
  const inputRef = useRef(null)

  const acceptedTypes = accept === 'cv' ? CV_ACCEPTED_TYPES : IMAGE_ACCEPTED_TYPES
  const acceptedExtensions = accept === 'cv' ? CV_ACCEPTED_EXTENSIONS : IMAGE_ACCEPTED_EXTENSIONS
  const acceptedLabel = accept === 'cv' ? 'PDF, DOC or DOCX' : 'PDF, JPG or PNG'

  function validateAndAdd(newFiles) {
    setSizeError('')
    const valid = []
    for (const f of newFiles) {
      if (!acceptedTypes.includes(f.type)) {
        setSizeError(`${f.name} is not a supported file type. Please upload ${acceptedLabel}.`)
        continue
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setSizeError(`${f.name} exceeds the ${MAX_SIZE_MB}MB limit.`)
        continue
      }
      valid.push(f)
    }
    const updated = multiple ? [...files, ...valid] : valid.slice(0, 1)
    setFiles(updated)
    onChange?.(updated)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    validateAndAdd(Array.from(e.dataTransfer.files))
  }

  function handleChange(e) {
    validateAndAdd(Array.from(e.target.files))
    e.target.value = ''
  }

  function removeFile(index) {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    onChange?.(updated)
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[#3B2923] flex items-center gap-1">
          {label}
          {required && <span className="text-[#B94A48]" aria-hidden="true">*</span>}
        </label>
      )}
      {hint && <p className="text-xs text-[#7C6659]">{hint}</p>}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label || 'file'}`}
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${dragOver
            ? 'border-[#3B2923] bg-[#3B2923]/5'
            : error
            ? 'border-[#B94A48] bg-[#B94A48]/5'
            : 'border-[#E4D8C7] hover:border-[#3B2923] hover:bg-[#3B2923]/3'
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={acceptedExtensions}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
        />
        <Upload size={24} className="mx-auto mb-2 text-[#7C6659]" />
        <p className="text-sm font-medium text-[#3B2923]">
          Drag & drop or <span className="text-[#3B2923] underline">browse files</span>
        </p>
        <p className="text-xs text-[#7C6659] mt-1">{acceptedLabel} — max {MAX_SIZE_MB}MB</p>
      </div>

      {/* Error messages */}
      {(error || sizeError) && (
        <p className="text-xs text-[#B94A48] flex items-center gap-1" role="alert">
          <AlertCircle size={12} />
          {sizeError || error}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2 mt-1">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-3 py-2.5 bg-[#F8F3EA] rounded-lg border border-[#E4D8C7]"
            >
              {getFileIcon(f)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3B2923] truncate">{f.name}</p>
                <p className="text-xs text-[#7C6659]">{formatBytes(f.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                className="p-1 rounded-md text-[#7C6659] hover:text-[#B94A48] hover:bg-red-50 transition-colors"
                aria-label={`Remove ${f.name}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
