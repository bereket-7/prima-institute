import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      // ─── Theme ────────────────────────────────────────────────────
      theme: 'light',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        // Update document class for Tailwind dark mode
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { theme: newTheme }
      }),
      setTheme: (theme) => set(() => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { theme }
      }),

      // ─── UI State ─────────────────────────────────────────────────
      mobileMenuOpen: false,
      setMobileMenuOpen: (val) => set({ mobileMenuOpen: val }),

      // ─── Notification ─────────────────────────────────────────────
      notification: null,
      showNotification: (msg, type = 'success') => {
        set({ notification: { msg, type } })
        setTimeout(() => set({ notification: null }), 4000)
      },
    }),
    {
      name: 'prima-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
