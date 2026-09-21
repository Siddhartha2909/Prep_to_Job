import React from 'react'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-ink-soft disabled:bg-ink-faint',
  secondary: 'bg-transparent text-ink border border-line hover:border-ink disabled:opacity-50',
  forest: 'bg-forest-500 text-white hover:bg-forest-600 disabled:bg-forest-300',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-paper-soft disabled:opacity-50',
  danger: 'bg-brick-500 text-white hover:bg-brick-600 disabled:bg-brick-300',
}

const SIZES = {
  sm: 'text-sm px-3.5 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
}

export default function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  children,
  ...rest
}) {
  const Component = as
  return (
    <Component
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && Icon && <Icon size={16} />}
      {children}
    </Component>
  )
}
