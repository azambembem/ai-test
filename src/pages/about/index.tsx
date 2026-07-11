export default function About() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="text-3xl font-bold">About</h1>

      <p className="leading-relaxed text-slate-400">
        This project is a small demo built with Vite, React, and TypeScript.
        It uses React Router for client-side navigation, Zustand for
        lightweight global state, and TanStack Query for data fetching and
        caching.
      </p>

      <p className="leading-relaxed text-slate-400">
        The goal is to show a clean, scalable folder structure where every
        component and page lives in its own folder, keeping things easy to
        navigate as the app grows.
      </p>
    </div>
  )
}
