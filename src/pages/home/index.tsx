import { useQuery } from '@tanstack/react-query'

interface Post {
  id: number
  title: string
  body: string
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <div className="flex flex-col gap-12">
      <section className="text-center">
        <h1 className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-4xl font-bold text-transparent">
          Welcome
        </h1>
        <p className="mt-3 text-slate-400">
          A Vite + React + TypeScript app wired up with routing, Zustand, and
          TanStack Query.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Latest posts</h2>

        {isLoading && (
          <ul className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="h-16 animate-pulse rounded-lg bg-white/5"
              />
            ))}
          </ul>
        )}

        {isError && (
          <p className="rounded-lg bg-red-500/10 p-4 text-red-400">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        )}

        {data && (
          <ul className="flex flex-col gap-3">
            {data.map((post) => (
              <li
                key={post.id}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <h3 className="font-medium capitalize">{post.title}</h3>
                <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                  {post.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
