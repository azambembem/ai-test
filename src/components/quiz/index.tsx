import { useMemo, useState } from 'react'
import { useAppStore } from '../../store/use-app-store'

interface Question {
  id: number
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    prompt: 'Which keyword declares a variable that cannot be reassigned in JavaScript?',
    options: ['var', 'let', 'const', 'static'],
    answer: 2,
    explanation:
      '`const` creates a binding that can’t be reassigned. `let` and `var` can be reassigned.',
  },
  {
    id: 2,
    prompt: 'What does an "index" of 0 refer to in most programming languages?',
    options: ['The last item', 'The first item', 'An error', 'A random item'],
    answer: 1,
    explanation:
      'Most languages are zero-indexed, so the first element of an array lives at index 0.',
  },
  {
    id: 3,
    prompt: 'Which of these is a boolean value?',
    options: ['"true"', '42', 'false', 'null'],
    answer: 2,
    explanation:
      '`false` (and `true`) are the two boolean literals. "true" in quotes is a string.',
  },
  {
    id: 4,
    prompt: 'What is the primary purpose of a function?',
    options: [
      'To style a web page',
      'To store data permanently',
      'To group reusable, named blocks of logic',
      'To connect to the internet',
    ],
    answer: 2,
    explanation:
      'Functions let you name a block of logic and reuse it, keeping code DRY and readable.',
  },
  {
    id: 5,
    prompt: 'Which loop is best when you know exactly how many times to repeat?',
    options: ['while', 'for', 'do...while', 'forever'],
    answer: 1,
    explanation:
      'A `for` loop is ideal for a known number of iterations thanks to its built-in counter.',
  },
]

export default function Quiz() {
  const isDark = useAppStore((state) => state.theme === 'dark')

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]
  const isLast = current === questions.length - 1
  const progress = useMemo(
    () => Math.round(((current + (finished ? 1 : 0)) / questions.length) * 100),
    [current, finished],
  )

  function handleSelect(index: number) {
    if (locked) return
    setSelected(index)
    setLocked(true)
    if (index === question.answer) setScore((s) => s + 1)
  }

  function handleNext() {
    if (isLast) {
      setFinished(true)
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setLocked(false)
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setLocked(false)
    setScore(0)
    setFinished(false)
  }

  const cardBase = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200 bg-white'
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500'

  function optionClasses(index: number) {
    const base =
      'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200'
    if (!locked) {
      return `${base} cursor-pointer ${
        isDark
          ? 'border-white/10 bg-white/5 hover:border-violet-400/60 hover:bg-white/10'
          : 'border-slate-200 bg-slate-50 hover:border-violet-400 hover:bg-violet-50'
      }`
    }
    const isCorrect = index === question.answer
    const isChosen = index === selected
    if (isCorrect) {
      return `${base} border-emerald-400/60 bg-emerald-400/10 text-emerald-300`
    }
    if (isChosen) {
      return `${base} border-red-400/60 bg-red-400/10 text-red-300`
    }
    return `${base} opacity-50 ${
      isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
    }`
  }

  if (finished) {
    const perfect = score === questions.length
    return (
      <div
        className={`animate-fade-in-up rounded-2xl border p-8 text-center ${cardBase}`}
      >
        <p className="text-5xl">{perfect ? '\u{1F3C6}' : '\u{1F389}'}</p>
        <h3 className="mt-4 text-2xl font-bold">
          You scored {score} / {questions.length}
        </h3>
        <p className={`mt-2 ${mutedText}`}>
          {perfect
            ? 'Flawless! You’re ready to dive deeper into code.'
            : score >= questions.length / 2
              ? 'Nice work — a solid foundation to build on.'
              : 'Great start! Every expert was once a beginner.'}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border p-6 sm:p-8 ${cardBase}`}>
      {/* Progress bar */}
      <div className="mb-6">
        <div className={`mb-2 flex items-center justify-between text-xs ${mutedText}`}>
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>Score: {score}</span>
        </div>
        <div
          className={`h-2 w-full overflow-hidden rounded-full ${
            isDark ? 'bg-white/10' : 'bg-slate-200'
          }`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500 transition-all duration-500"
            style={{ width: `${Math.max(progress, 8)}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold sm:text-xl">{question.prompt}</h3>

      <div className="mt-5 flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
            disabled={locked}
            className={optionClasses(index)}
          >
            <span
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border text-xs font-bold ${
                isDark ? 'border-white/20' : 'border-slate-300'
              }`}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {locked && (
        <div className="animate-fade-in-up mt-5">
          <p
            className={`rounded-xl border px-4 py-3 text-sm ${
              isDark
                ? 'border-white/10 bg-white/5 text-slate-300'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            {selected === question.answer ? '✅ Correct! ' : '❌ Not quite. '}
            {question.explanation}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:w-auto"
          >
            {isLast ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
