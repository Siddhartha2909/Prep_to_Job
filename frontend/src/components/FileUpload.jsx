import React, { useRef, useState } from 'react'
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react'

export default function FileUpload({ accept = '.pdf,.docx', file, status, onSelect, onRemove }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) onSelect(dropped)
  }

  if (file) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-line bg-paper-soft/50 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-forest-50 p-2 text-forest-600">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">{file.name}</p>
            <p className="text-xs text-ink-faint">{file.size}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === 'uploaded' && (
            <span className="flex items-center gap-1 text-xs font-medium text-forest-600">
              <CheckCircle2 size={14} /> Uploaded
            </span>
          )}
          <button
            onClick={onRemove}
            aria-label="Remove file"
            className="rounded-full p-1 text-ink-muted hover:bg-white hover:text-brick-500"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Upload resume file"
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
        isDragging ? 'border-forest-500 bg-forest-50/40' : 'border-line hover:border-forest-300'
      }`}
    >
      <div className="rounded-full bg-paper-soft p-3">
        <UploadCloud size={22} className="text-ink-muted" />
      </div>
      <div>
        <p className="text-sm font-medium text-ink-soft">Drop your resume here or browse</p>
        <p className="mt-1 text-xs text-ink-faint">Accepted formats: PDF, DOCX</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onSelect(e.target.files[0])}
      />
    </div>
  )
}
