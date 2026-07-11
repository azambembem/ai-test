import { useAppStore } from '../../../store/use-app-store'

export default function Footer() {
  const theme = useAppStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <footer
      className={`border-t py-6 text-center text-sm ${
        isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
      }`}
    >
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  )
}
