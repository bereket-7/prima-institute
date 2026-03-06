import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-prima-ivory flex items-center justify-center">
      <div className="text-center px-6">
        <span className="font-accent text-prima-gold text-8xl lg:text-[200px] leading-none block opacity-20">404</span>
        <h1 className="font-display text-4xl font-semibold text-prima-charcoal -mt-8 mb-4">Page Not Found</h1>
        <p className="text-prima-muted font-body max-w-sm mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    </div>
  )
}
