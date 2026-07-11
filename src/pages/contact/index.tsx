import { useState, type FormEvent, type ReactNode } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppStore } from '../../store/use-app-store'
import {
  CONTACT_STAGES,
  submitContactForm,
  type ContactPayload,
  type ContactStage,
} from '../../api/contact'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  department: string
  subject: string
  budget: string
  preferredContact: string
  heardFrom: string
  message: string
  newsletter: boolean
  terms: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  department: '',
  subject: '',
  budget: '',
  preferredContact: '',
  heardFrom: '',
  message: '',
  newsletter: false,
  terms: false,
}

const departments = ['Sales', 'Support', 'Billing', 'Partnerships', 'Other']
const budgets = ['Under $1,000', '$1,000 - $5,000', '$5,000 - $20,000', '$20,000+']
const heardFromOptions = ['Search engine', 'Social media', 'Referral', 'Advertisement', 'Other']

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.firstName.trim()) errors.firstName = 'First name is required'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required'

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone)) {
    errors.phone = 'Enter a valid phone number'
  }

  if (!form.company.trim()) errors.company = 'Company is required'
  if (!form.department) errors.department = 'Select a department'
  if (!form.subject.trim()) errors.subject = 'Subject is required'
  if (!form.budget) errors.budget = 'Select a budget range'
  if (!form.preferredContact) errors.preferredContact = 'Select a contact method'
  if (!form.heardFrom) errors.heardFrom = 'Let us know how you heard about us'

  if (!form.message.trim()) {
    errors.message = 'Message is required'
  } else if (form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters'
  }

  if (!form.terms) errors.terms = 'You must accept the terms to continue'

  return errors
}

function toPayload(form: FormState): ContactPayload {
  const { terms: _terms, ...payload } = form
  return payload
}

export default function Contact() {
  const theme = useAppStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState(false)
  const [stage, setStage] = useState<ContactStage | null>(null)
  const [ticketId, setTicketId] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: (payload: ContactPayload) =>
      submitContactForm(payload, setStage),
    onSuccess: (data) => {
      setTicketId(data.ticketId)
      setForm(initialForm)
      setErrors({})
      setTouched(false)
    },
  })

  const inputClasses = `w-full rounded-lg border px-3 py-2 outline-none transition-colors focus:border-violet-400 disabled:opacity-50 ${
    isDark
      ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500'
      : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
  }`

  const labelClasses = 'text-sm font-medium'
  const errorClasses = 'text-xs text-red-400'

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    setTicketId(null)

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate(toPayload(form))
    }
  }

  const isSending = mutation.isPending
  const currentStageIndex = stage
    ? CONTACT_STAGES.findIndex((s) => s.key === stage)
    : -1

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Fill in every field below and we'll route your message to the right
          team.
        </p>
      </div>

      {ticketId && !isSending && (
        <div className="rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-400">
          <p className="font-medium">Thanks! Your message has been sent.</p>
          <p className="mt-1 text-emerald-400/80">
            Reference ID <span className="font-mono">{ticketId}</span> &middot;
            expect a reply within 1-2 business days.
          </p>
        </div>
      )}

      {mutation.isError && !isSending && (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
          <span>
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'Something went wrong. Please try again.'}
          </span>
          <button
            type="button"
            onClick={() => mutation.mutate(toPayload(form))}
            className="shrink-0 rounded-full border border-red-400/40 px-3 py-1 text-xs font-medium hover:bg-red-400/10"
          >
            Retry
          </button>
        </div>
      )}

      {isSending && (
        <div
          className={`flex flex-col gap-3 rounded-lg border p-4 ${
            isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
          }`}
        >
          {CONTACT_STAGES.map((s, i) => {
            const isDone = i < currentStageIndex || (i === currentStageIndex && stage === 'done')
            const isActive = i === currentStageIndex && stage !== 'done'
            return (
              <div key={s.key} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                    isDone
                      ? 'border-emerald-400 bg-emerald-400/20 text-emerald-400'
                      : isActive
                        ? 'border-violet-400 text-violet-400'
                        : isDark
                          ? 'border-white/10 text-slate-600'
                          : 'border-slate-300 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    '✓'
                  ) : isActive ? (
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={
                    isDone
                      ? 'text-emerald-400'
                      : isActive
                        ? 'font-medium'
                        : isDark
                          ? 'text-slate-600'
                          : 'text-slate-400'
                  }
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="firstName" label="First name" error={touched ? errors.firstName : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <input
              id="firstName"
              type="text"
              className={inputClasses}
              value={form.firstName}
              disabled={isSending}
              onChange={(e) => update('firstName', e.target.value)}
            />
          </Field>

          <Field id="lastName" label="Last name" error={touched ? errors.lastName : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <input
              id="lastName"
              type="text"
              className={inputClasses}
              value={form.lastName}
              disabled={isSending}
              onChange={(e) => update('lastName', e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="email" label="Email" error={touched ? errors.email : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <input
              id="email"
              type="email"
              className={inputClasses}
              value={form.email}
              disabled={isSending}
              onChange={(e) => update('email', e.target.value)}
            />
          </Field>

          <Field id="phone" label="Phone" error={touched ? errors.phone : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <input
              id="phone"
              type="tel"
              className={inputClasses}
              value={form.phone}
              disabled={isSending}
              onChange={(e) => update('phone', e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="company" label="Company" error={touched ? errors.company : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <input
              id="company"
              type="text"
              className={inputClasses}
              value={form.company}
              disabled={isSending}
              onChange={(e) => update('company', e.target.value)}
            />
          </Field>

          <Field id="jobTitle" label="Job title" labelClass={labelClasses} errorClass={errorClasses}>
            <input
              id="jobTitle"
              type="text"
              className={inputClasses}
              value={form.jobTitle}
              disabled={isSending}
              onChange={(e) => update('jobTitle', e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="department" label="Department" error={touched ? errors.department : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <select
              id="department"
              className={inputClasses}
              value={form.department}
              disabled={isSending}
              onChange={(e) => update('department', e.target.value)}
            >
              <option value="">Select a department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>

          <Field id="budget" label="Budget range" error={touched ? errors.budget : undefined} labelClass={labelClasses} errorClass={errorClasses}>
            <select
              id="budget"
              className={inputClasses}
              value={form.budget}
              disabled={isSending}
              onChange={(e) => update('budget', e.target.value)}
            >
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field id="subject" label="Subject" error={touched ? errors.subject : undefined} labelClass={labelClasses} errorClass={errorClasses}>
          <input
            id="subject"
            type="text"
            className={inputClasses}
            value={form.subject}
            disabled={isSending}
            onChange={(e) => update('subject', e.target.value)}
          />
        </Field>

        <div className="flex flex-col gap-2">
          <span className={labelClasses}>Preferred contact method</span>
          <div className="flex gap-4">
            {['Email', 'Phone'].map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="preferredContact"
                  value={option}
                  checked={form.preferredContact === option}
                  disabled={isSending}
                  onChange={(e) => update('preferredContact', e.target.value)}
                  className="accent-violet-500"
                />
                {option}
              </label>
            ))}
          </div>
          {touched && errors.preferredContact && (
            <span className={errorClasses}>{errors.preferredContact}</span>
          )}
        </div>

        <Field id="heardFrom" label="How did you hear about us?" error={touched ? errors.heardFrom : undefined} labelClass={labelClasses} errorClass={errorClasses}>
          <select
            id="heardFrom"
            className={inputClasses}
            value={form.heardFrom}
            disabled={isSending}
            onChange={(e) => update('heardFrom', e.target.value)}
          >
            <option value="">Select an option</option>
            {heardFromOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Message" error={touched ? errors.message : undefined} labelClass={labelClasses} errorClass={errorClasses}>
          <textarea
            id="message"
            rows={5}
            className={inputClasses}
            value={form.message}
            disabled={isSending}
            onChange={(e) => update('message', e.target.value)}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.newsletter}
            disabled={isSending}
            onChange={(e) => update('newsletter', e.target.checked)}
            className="accent-violet-500"
          />
          Send me occasional product updates
        </label>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.terms}
              disabled={isSending}
              onChange={(e) => update('terms', e.target.checked)}
              className="accent-violet-500"
            />
            I agree to the terms of service and privacy policy
          </label>
          {touched && errors.terms && (
            <span className={errorClasses}>{errors.terms}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-2 font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSending && (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isSending ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  )
}

function Field({
  id,
  label,
  error,
  children,
  labelClass,
  errorClass,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
  labelClass: string
  errorClass: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && <span className={errorClass}>{error}</span>}
    </div>
  )
}
