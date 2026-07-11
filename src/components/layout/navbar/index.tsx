import { NavLink } from 'react-router-dom'
import { useAppStore } from '../../../store/use-app-store'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  const isDark = theme === 'dark'

  return (
    <nav
      className={`sticky top-0 z-10 border-b backdrop-blur ${
        isDark
          ? 'border-white/10 bg-slate-950/80'
          : 'border-slate-200 bg-white/80'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold tracking-tight">My App</span>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-violet-400'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-full border px-3 py-1 text-xs font-medium hover:border-violet-400 ${
              isDark
                ? 'border-white/10 text-slate-300 hover:text-white'
                : 'border-slate-300 text-slate-600 hover:text-slate-950'
            }`}
          >
            {isDark ? 'Dark' : 'Light'} mode
          </button>
        </div>
      </div>
    </nav>
  )
}
