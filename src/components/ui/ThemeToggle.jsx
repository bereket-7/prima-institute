import { Moon, Sun } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore()

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-prima-gold/10 dark:bg-prima-gold/20 text-prima-charcoal dark:text-prima-gold hover:bg-prima-gold/20 dark:hover:bg-prima-gold/30 transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  )
}
