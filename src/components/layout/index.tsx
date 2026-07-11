import { Outlet } from 'react-router-dom'
import { useAppStore } from '../../store/use-app-store'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout() {
  const theme = useAppStore((state) => state.theme)

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors ${
        theme === 'dark'
          ? 'bg-slate-950 text-white'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
