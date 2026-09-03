import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Input, { Field } from '../components/Input'
import Button from '../components/Button'
import { register } from '../services/authService'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      // Structured to later POST /api/auth/register
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/career-profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page flex min-h-[calc(100vh-73px)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-ink-muted">Start building your career readiness profile.</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Field label="Full Name" htmlFor="name" error={errors.name} required>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Siddhartha Rao"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              autoComplete="name"
            />
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email} required>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              autoComplete="email"
            />
          </Field>

          <Field label="Password" htmlFor="password" error={errors.password} hint={!errors.password ? 'At least 8 characters.' : undefined} required>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              autoComplete="new-password"
            />
          </Field>

          <Field label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword} required>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              autoComplete="new-password"
            />
          </Field>

          <Button type="submit" size="lg" loading={loading} className="mt-2 w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-forest-600 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}
