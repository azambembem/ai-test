import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface AppStore {
  theme: Theme
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))
