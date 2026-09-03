import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Input, { Field } from '../components/Input'
import Button from '../components/Button'
import { login } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      // Structured to later POST /api/auth/login
      await login({ email: form.email, password: form.password })
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page flex min-h-[calc(100vh-73px)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-muted">Log in to continue your preparation.</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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

          <Field label="Password" htmlFor="password" error={errors.password} required>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              autoComplete="current-password"
            />
          </Field>

          <Button type="submit" size="lg" loading={loading} className="mt-2 w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-forest-600 hover:underline">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  )
}
