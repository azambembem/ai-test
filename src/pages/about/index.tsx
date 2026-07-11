import { useAppStore } from '../../store/use-app-store'

interface Value {
  title: string
  description: string
}

interface Stat {
  label: string
  value: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
  avatar: string
}

interface Milestone {
  year: string
  title: string
  description: string
}

const values: Value[] = [
  {
    title: 'Simplicity first',
    description:
      'We favor clear, boring solutions over clever ones. Every abstraction has to earn its place, and code should be easy to delete as it is to write.',
  },
  {
    title: 'Fast feedback',
    description:
      'Short build times, instant hot reload, and tight iteration loops mean ideas turn into working software in minutes, not days.',
  },
  {
    title: 'Type safety',
    description:
      'TypeScript across the stack catches mistakes before they ship, so we can refactor with confidence instead of fear.',
  },
  {
    title: 'Own the folder',
    description:
      'Every page and component lives in its own directory with everything it needs, so the codebase stays easy to navigate as it grows.',
  },
]

const stats: Stat[] = [
  { label: 'Founded', value: '2024' },
  { label: 'Components shipped', value: '120+' },
  { label: 'Team members', value: '6' },
  { label: 'Coffee consumed', value: '∞' },
]

const techStack = [
  'Vite',
  'React',
  'TypeScript',
  'React Router',
  'Zustand',
  'TanStack Query',
  'Tailwind CSS',
]

const milestones: Milestone[] = [
  {
    year: '2024',
    title: 'Project kickoff',
    description:
      'Started as a small internal demo to explore a clean, scalable folder structure for React apps.',
  },
  {
    year: '2024',
    title: 'Routing & state',
    description:
      'Added React Router for navigation and Zustand for lightweight, dependency-free global state.',
  },
  {
    year: '2025',
    title: 'Data layer',
    description:
      'Wired up TanStack Query for caching, background refetching, and resilient data fetching.',
  },
  {
    year: '2025',
    title: 'Design system',
    description:
      'Introduced a consistent light/dark theme across every page, component, and form control.',
  },
]

const team: TeamMember[] = [
  {
    name: 'Amara Chen',
    role: 'Founder & Product Lead',
    bio: 'Sets the product vision and keeps the team focused on what actually matters to users.',
    avatar: 'https://i.pravatar.cc/300?img=47',
  },
  {
    name: 'Diego Ramirez',
    role: 'Lead Frontend Engineer',
    bio: 'Owns the component architecture and obsesses over performance and accessibility.',
    avatar: 'https://i.pravatar.cc/300?img=12',
  },
  {
    name: 'Priya Natarajan',
    role: 'Backend Engineer',
    bio: 'Builds and maintains the APIs and data pipelines that power the app.',
    avatar: 'https://i.pravatar.cc/300?img=32',
  },
  {
    name: 'Jonas Weber',
    role: 'UI/UX Designer',
    bio: 'Designs the interfaces and interactions, and champions consistency across the design system.',
    avatar: 'https://i.pravatar.cc/300?img=68',
  },
  {
    name: 'Sofia Moretti',
    role: 'QA & DevOps',
    bio: 'Keeps the pipelines green and makes sure every release ships without surprises.',
    avatar: 'https://i.pravatar.cc/300?img=45',
  },
  {
    name: 'Liam O’Connor',
    role: 'Community & Docs',
    bio: 'Writes the docs, triages issues, and makes sure new contributors feel at home.',
    avatar: 'https://i.pravatar.cc/300?img=33',
  },
]

export default function About() {
  const theme = useAppStore((state) => state.theme)
  const isDark = theme === 'dark'

  const cardClasses = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200 bg-white'

  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600'

  return (
    <div className="flex flex-col gap-20">
      {/* Hero */}
      <section className="flex flex-col gap-6 text-center">
        <h1 className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          About us
        </h1>
        <p className={`mx-auto max-w-2xl leading-relaxed ${mutedText}`}>
          We're a small team building a demo application with Vite, React,
          and TypeScript &mdash; a reference for what a clean, scalable
          frontend codebase can look like when every page and component has a
          clear home.
        </p>
      </section>

      {/* Story */}
      <section className="mx-auto flex max-w-3xl flex-col gap-4">
        <h2 className="text-2xl font-semibold">Our story</h2>
        <p className={`leading-relaxed ${mutedText}`}>
          This project started as a small internal demo: a single page,
          hardcoded content, no routing. As the idea grew, so did the app.
          Client-side routing arrived with React Router, global state moved
          into a lightweight Zustand store, and data fetching was rebuilt on
          top of TanStack Query for caching and background refetching.
        </p>
        <p className={`leading-relaxed ${mutedText}`}>
          Along the way, the goal never changed: keep the codebase easy to
          navigate as it grows. Every page and component lives in its own
          folder with everything it needs close by, so new contributors can
          find their footing in minutes rather than hours.
        </p>
        <p className={`leading-relaxed ${mutedText}`}>
          Today the app is maintained by a small, cross-functional team that
          cares as much about developer experience as it does about the
          people using the product.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-1 rounded-xl border p-6 text-center ${cardClasses}`}
          >
            <span className="text-2xl font-bold sm:text-3xl">
              {stat.value}
            </span>
            <span className={`text-sm ${mutedText}`}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">What we value</h2>
          <p className={`mt-2 ${mutedText}`}>
            The principles that guide every decision we make.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className={`rounded-xl border p-6 ${cardClasses}`}
            >
              <h3 className="font-semibold">{value.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Built with</h2>
          <p className={`mt-2 ${mutedText}`}>
            The tools and libraries powering this app.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${cardClasses}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Milestones</h2>
          <p className={`mt-2 ${mutedText}`}>How the project has evolved.</p>
        </div>
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {milestones.map((milestone) => (
            <div key={milestone.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 text-xs font-semibold text-white">
                  {milestone.year}
                </span>
                <span
                  className={`mt-1 w-px flex-1 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}
                />
              </div>
              <div className="pb-6">
                <h3 className="font-semibold">{milestone.title}</h3>
                <p className={`mt-1 text-sm leading-relaxed ${mutedText}`}>
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Meet the team</h2>
          <p className={`mt-2 ${mutedText}`}>
            The people designing, building, and shipping this app.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className={`flex flex-col items-center gap-3 rounded-xl border p-6 text-center ${cardClasses}`}
            >
              <img
                src={member.avatar}
                alt={member.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-violet-400/50"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-violet-400">{member.role}</p>
              </div>
              <p className={`text-sm leading-relaxed ${mutedText}`}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
