import React from 'react'

export function Field({ label, htmlFor, error, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-ink-soft">
          {label} {required && <span className="text-brick-500">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-brick-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-faint">{hint}</p>
      ) : null}
    </div>
  )
}

export default function Input({ id, error, className = '', ...rest }) {
  return (
    <input
      id={id}
      className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/30 ${
        error ? 'border-brick-500' : 'border-line focus:border-forest-500'
      } ${className}`}
      {...rest}
    />
  )
}

export function Textarea({ id, error, className = '', ...rest }) {
  return (
    <textarea
      id={id}
      className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/30 ${
        error ? 'border-brick-500' : 'border-line focus:border-forest-500'
      } ${className}`}
      {...rest}
    />
  )
}
