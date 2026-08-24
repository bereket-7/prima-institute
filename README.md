# Prima Institute — Frontend

Premium training & education institute website for Culinary Arts, Bakery & Pastry, Beauty & Hair Dressing, Fashion Design, and Computer Training.

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | SPA framework + fast builds |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Zustand | Global UI state |
| React Hook Form + Zod | Form validation |
| EmailJS | Contact & enrollment email delivery |
| i18next | English + Amharic UI translations |
| Lucide React | Icons |

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template and add EmailJS credentials
cp .env.example .env

# Validate JSON data integrity
npm run validate

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file from `.env.example`:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_CONTACT_TEMPLATE_ID=
VITE_EMAILJS_ENROLL_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

### EmailJS template fields

**Contact template:** `from_name`, `from_email`, `phone`, `subject`, `message`

**Enrollment template:** `first_name`, `last_name`, `email`, `phone`, `course_title`, `course_price`, `start_date`, `payment_plan`, `notes`

## Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, Layout wrapper
│   └── ui/             # Reusable UI: CourseCard, SectionHeader...
├── pages/
│   ├── categories/     # CategoryPage.jsx (used for all 5 categories)
│   ├── HomePage.jsx
│   ├── CoursesPage.jsx
│   ├── CourseDetailPage.jsx
│   ├── InstructorsPage.jsx
│   ├── GalleryPage.jsx
│   ├── BlogPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── EnrollPage.jsx
│   ├── TermsPage.jsx
│   ├── PrivacyPage.jsx
│   └── NotFoundPage.jsx
├── data/               # Static JSON data (courses, instructors, etc.)
├── store/              # Zustand global store
├── i18n/               # English + Amharic locale files
├── styles/             # globals.css with design tokens
└── utils/              # helpers, schemas, email utilities

scripts/
└── validate-data.js    # Data cross-reference integrity checks
```

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/courses` | All Courses (with filter) |
| `/courses/:slug` | Course Detail |
| `/categories/:slug` | Category Landing |
| `/instructors` | Faculty |
| `/gallery` | Photo Gallery |
| `/blog` | Blog / Tips |
| `/blog/:slug` | Blog Detail |
| `/about` | About Us |
| `/contact` | Contact Form |
| `/enroll` | 3-Step Enrollment Form |
| `/enroll?courseId=cul-001` | Enrollment with pre-selected course |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |

## Customization

### Add a new course
Edit `src/data/courses.json` and add a new entry following the same schema. Run `npm run validate` to check references.

### Add an instructor
Edit `src/data/instructors.json`.

### Add UI translations
Edit `src/i18n/locales/en.json` and `src/i18n/locales/am.json` with matching keys.

## Design Tokens

All brand colors are defined as CSS variables in `src/styles/globals.css` and as Tailwind theme extensions in `tailwind.config.js`:

- `prima-cream` — warm off-white background
- `prima-gold` / `prima-gold-light` — brand accent
- `prima-charcoal` — dark backgrounds
- `prima-muted` — secondary text

## Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

Set the EmailJS environment variables in your Vercel project settings.

### Netlify
```bash
npm run build
# Upload /dist folder to Netlify
```
