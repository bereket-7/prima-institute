# Prima Institute — Frontend

Premium training & education institute website for Culinary Arts, Food & Drinks, Beauty & Makeup, and Fashion Design.

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | SPA framework + fast builds |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Framer Motion | Animations (ready to integrate) |
| Zustand | Global UI state |
| React Hook Form + Zod | Form validation |
| Lucide React | Icons |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, Layout wrapper
│   ├── sections/       # Page-level sections (extendable)
│   └── ui/             # Reusable UI: CourseCard, SectionHeader...
├── pages/
│   ├── categories/     # CategoryPage.jsx (used for all 4 categories)
│   ├── HomePage.jsx
│   ├── CoursesPage.jsx
│   ├── CourseDetailPage.jsx
│   ├── InstructorsPage.jsx
│   ├── GalleryPage.jsx
│   ├── BlogPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── EnrollPage.jsx
│   └── NotFoundPage.jsx
├── data/               # Static JSON data (courses, instructors, etc.)
├── store/              # Zustand global store
├── styles/             # globals.css with design tokens
└── utils/              # helpers.js

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
| `/about` | About Us |
| `/contact` | Contact Form |
| `/enroll` | 3-Step Enrollment Form |

## Customization

### Add a new course
Edit `src/data/courses.json` and add a new entry following the same schema.

### Add an instructor
Edit `src/data/instructors.json`.

### Connect a contact form to a backend
The `ContactPage.jsx` and `EnrollPage.jsx` have simulated submission logic. Replace the `setTimeout` with a real API call to **EmailJS**, **Formspree**, or your backend.

### Enable real email sending (no backend needed)
Install EmailJS:
```bash
npm install @emailjs/browser
```
Then use `emailjs.sendForm()` in the contact/enroll form handlers.

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

### Netlify
```bash
npm run build
# Upload /dist folder to Netlify
```
