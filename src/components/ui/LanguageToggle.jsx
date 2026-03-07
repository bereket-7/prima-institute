import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('prima-language', code)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-prima-gold/10 dark:bg-prima-gold/20 text-prima-charcoal dark:text-prima-gold hover:bg-prima-gold/20 dark:hover:bg-prima-gold/30 transition-all"
        aria-label="Change language"
      >
        <Languages size={18} />
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-prima-charcoal border border-prima-blush dark:border-prima-blush shadow-lg rounded-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                i18n.language === lang.code
                  ? 'bg-prima-gold/10 text-prima-gold font-semibold'
                  : 'text-prima-charcoal dark:text-prima-cream hover:bg-prima-cream dark:hover:bg-prima-charcoal-soft'
              }`}
            >
              <div className="font-medium">{lang.nativeName}</div>
              <div className="text-xs text-prima-muted">{lang.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
