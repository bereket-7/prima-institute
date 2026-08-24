// ─── Format currency ────────────────────────────────────────────
export const formatPrice = (amount, currency = 'ETB') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)

// ─── Class name merge ─────────────────────────────────────────────
export const cn = (...classes) => classes.filter(Boolean).join(' ')

// ─── Category colour map ──────────────────────────────────────────
export const CATEGORY_COLORS = {
  culinary:      { bg: 'bg-amber-50',  text: 'text-amber-800',  dot: 'bg-amber-500'  },
  'food-drinks': { bg: 'bg-green-50',  text: 'text-green-800',  dot: 'bg-green-500'  },
  'beauty-makeup':{ bg: 'bg-pink-50',  text: 'text-pink-800',   dot: 'bg-pink-500'   },
  fashion:       { bg: 'bg-slate-50',  text: 'text-slate-800',  dot: 'bg-slate-500'  },
  computer:      { bg: 'bg-blue-50',   text: 'text-blue-800',   dot: 'bg-blue-500'   },
}

// ─── Category labels ──────────────────────────────────────────────
export const CATEGORY_LABELS = {
  culinary:       'Culinary Arts',
  'food-drinks':  'Bakery & Pastry',
  'beauty-makeup':'Beauty & Hair Dressing',
  fashion:        'Fashion Design',
  computer:       'Computer Training',
}

// ─── Truncate text ────────────────────────────────────────────────
export const truncate = (str, n) =>
  str.length > n ? str.slice(0, n - 1) + '…' : str

// ─── Scroll to top ────────────────────────────────────────────────
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

// ─── Get instructor by id from array ─────────────────────────────
export const getInstructor = (instructors, id) =>
  instructors.find((i) => i.id === id) || null

export const getCategoryLabel = (id) => CATEGORY_LABELS[id] ?? id

const CATEGORY_I18N_KEYS = {
  culinary: 'categories.culinary',
  'food-drinks': 'categories.foodDrinks',
  'beauty-makeup': 'categories.beauty',
  fashion: 'categories.fashion',
  computer: 'categories.computer',
}

export const getCategoryLabelT = (t, id) => t(CATEGORY_I18N_KEYS[id] || id)
