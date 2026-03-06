import { create } from 'zustand'

export const useStore = create((set) => ({
  // ─── UI State ─────────────────────────────────────────────────
  mobileMenuOpen: false,
  setMobileMenuOpen: (val) => set({ mobileMenuOpen: val }),

  // ─── Course Filters ───────────────────────────────────────────
  activeCategory: 'all',
  activeLevel: 'all',
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setActiveLevel: (level) => set({ activeLevel: level }),

  // ─── Enrollment Modal ─────────────────────────────────────────
  enrollModalOpen: false,
  selectedCourse: null,
  openEnrollModal: (course) => set({ enrollModalOpen: true, selectedCourse: course }),
  closeEnrollModal: () => set({ enrollModalOpen: false, selectedCourse: null }),

  // ─── Notification ─────────────────────────────────────────────
  notification: null,
  showNotification: (msg, type = 'success') => {
    set({ notification: { msg, type } })
    setTimeout(() => set({ notification: null }), 4000)
  },
}))
