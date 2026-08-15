import { useState, useRef } from 'react'
import { Upload, X, FileText, Image, AlertCircle } from 'lucide-react'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png'
const MAX_SIZE_MB = 10

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getFileIcon(file) {
  if (file.type === 'application/pdf') return <FileText size={16} className="text-[#C62828]" />
  return <Image size={16} className="text-[#0F4C5C]" />
}

export default function FileUpload({
  label,
  id,
  hint,
  multiple = false,
  required = false,
  onChange,
  error,
}) {
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [sizeError, setSizeError] = useState('')
  const inputRef = useRef(null)

  function validateAndAdd(newFiles) {
    setSizeError('')
    const valid = []
    for (const f of newFiles) {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        setSizeError(`${f.name} is not a supported file type.`)
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
        <label className="text-sm font-medium text-[#17202A] flex items-center gap-1">
          {label}
          {required && <span className="text-[#C62828]" aria-hidden="true">*</span>}
        </label>
      )}
      {hint && <p className="text-xs text-[#667085]">{hint}</p>}

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
            ? 'border-[#0F4C5C] bg-[#0F4C5C]/5'
            : error
            ? 'border-[#C62828] bg-red-50'
            : 'border-[#E4E7EC] hover:border-[#0F4C5C] hover:bg-[#0F4C5C]/5'
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={ACCEPTED_EXTENSIONS}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
        />
        <Upload size={24} className="mx-auto mb-2 text-[#667085]" />
        <p className="text-sm font-medium text-[#17202A]">
          Drag & drop or <span className="text-[#0F4C5C] underline">browse files</span>
        </p>
        <p className="text-xs text-[#667085] mt-1">PDF, JPG or PNG — max {MAX_SIZE_MB}MB</p>
      </div>

      {/* Error messages */}
      {(error || sizeError) && (
        <p className="text-xs text-[#C62828] flex items-center gap-1" role="alert">
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
              className="flex items-center gap-3 px-3 py-2.5 bg-[#F7F5F0] rounded-lg border border-[#E4E7EC]"
            >
              {getFileIcon(f)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#17202A] truncate">{f.name}</p>
                <p className="text-xs text-[#667085]">{formatBytes(f.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                className="p-1 rounded-md text-[#667085] hover:text-[#C62828] hover:bg-red-50 transition-colors"
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
