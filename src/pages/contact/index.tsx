import { useState, type FormEvent } from 'react'
import { useAppStore } from '../../store/use-app-store'

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const initialForm: FormState = { name: '', email: '', message: '' }

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email'
  }
  if (!form.message.trim()) errors.message = 'Message is required'

  return errors
}

export default function Contact() {
  const theme = useAppStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const inputClasses = `w-full rounded-lg border px-3 py-2 outline-none transition-colors focus:border-violet-400 ${
    isDark
      ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500'
      : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
  }`

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      setForm(initialForm)
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-6">
      <h1 className="text-3xl font-bold">Contact</h1>

      {submitted && (
        <p className="rounded-lg bg-emerald-500/10 p-4 text-emerald-400">
          Thanks! Your message has been sent.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && (
            <span className="text-xs text-red-400">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className={inputClasses}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && (
            <span className="text-xs text-red-400">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-2 font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Send message
        </button>
      </form>
    </div>
  )
}
