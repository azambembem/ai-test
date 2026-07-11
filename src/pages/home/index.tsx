import { useAppStore } from '../../store/use-app-store'
import Quiz from '../../components/quiz'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '\u{1F9F1}',
    title: 'Scaffolding, not boilerplate',
    description:
      'Harnesses give you the structure to start fast — routing, state, and data-fetching wired up so you focus on the idea, not the plumbing.',
  },
  {
    icon: '\u{1F6E1}️',
    title: 'Guardrails built in',
    description:
      'Types, linting, and predictable patterns catch mistakes early, so your code stays reliable as the project grows.',
  },
  {
    icon: '\u{26A1}',
    title: 'Ship with confidence',
    description:
      'Reproducible builds and a clean, folder-per-feature layout keep teams (and future you) moving quickly and safely.',
  },
  {
    icon: '\u{1F9E9}',
    title: 'Learn by doing',
    description:
      'A harness is the perfect sandbox — experiment, break things safely, and understand how real applications fit together.',
  },
]

const steps: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Set up the harness',
    body: 'Start from a solid base with the tooling, structure, and conventions already in place.',
  },
  {
    step: '02',
    title: 'Build a feature',
    body: 'Add pages and components in their own folders — each piece stays isolated and easy to reason about.',
  },
  {
    step: '03',
    title: 'Test the quiz below',
    body: 'Warm up your fundamentals with a quick programming quiz, then keep building.',
  },
]

export default function Home() {
  const isDark = useAppStore((state) => state.theme === 'dark')
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600'
  const cardBase = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200 bg-white'

  return (
    <div className="flex flex-col gap-24">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pt-8 text-center">
        {/* Decorative floating gradient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex justify-center"
        >
          <div className="animate-float absolute -top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <div
            className="animate-float absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="animate-float absolute -top-16 right-1/4 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl"
            style={{ animationDelay: '4s' }}
          />
        </div>

        <span
          className={`animate-fade-in-up inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${cardBase} ${mutedText}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-violet-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          Welcome to Harness Engineering
        </span>

        <h1
          className="animate-fade-in-up animate-gradient-pan mx-auto mt-6 max-w-3xl bg-gradient-to-r from-violet-400 via-sky-400 to-fuchsia-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-6xl"
          style={{ animationDelay: '0.1s' }}
        >
          Build better software, faster
        </h1>

        <p
          className={`animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${mutedText}`}
          style={{ animationDelay: '0.2s' }}
        >
          Harness Engineering is the craft of building the scaffolding around
          your code — the structure, tooling, and guardrails that let you and
          your team move from idea to shipped feature with confidence.
        </p>

        <div
          className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#quiz"
            className="rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-105"
          >
            Take the quiz
          </a>
          <a
            href="#what"
            className={`rounded-full border px-7 py-3 text-sm font-semibold transition-colors ${
              isDark
                ? 'border-white/15 text-slate-200 hover:border-violet-400 hover:text-white'
                : 'border-slate-300 text-slate-700 hover:border-violet-400 hover:text-slate-950'
            }`}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* -------------------------------------------------- What is it */}
      <section id="what" className="scroll-mt-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            What is Harness Engineering?
          </h2>
          <p className={`mt-4 text-lg leading-relaxed ${mutedText}`}>
            A <strong className={isDark ? 'text-white' : 'text-slate-900'}>harness</strong>{' '}
            is the reliable frame that holds a project together. In software, it’s
            the combination of project structure, build tooling, state management,
            and data-fetching that turns a blank folder into a place where real
            work can happen.
          </p>
          <p className={`mt-4 text-lg leading-relaxed ${mutedText}`}>
            Instead of reinventing the same setup for every project, harness
            engineering gives you a dependable starting point — so you spend your
            energy on the features that matter, not the wiring underneath.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- How it helps */}
      <section>
        <h2 className="text-3xl font-bold sm:text-4xl">How it helps you</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`animate-fade-in-up group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 ${cardBase}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- How to get started */}
      <section>
        <h2 className="text-3xl font-bold sm:text-4xl">Get started in 3 steps</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className={`rounded-2xl border p-6 ${cardBase}`}>
              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-4xl font-extrabold text-transparent">
                {s.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- Quiz */}
      <section id="quiz" className="scroll-mt-24">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Quick programming quiz
          </h2>
          <p className={`mx-auto mt-3 max-w-xl ${mutedText}`}>
            Test your fundamentals with five quick questions. No sign-up, no
            pressure — just a fun way to get started with programming.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <Quiz />
        </div>
      </section>
    </div>
  )
}
