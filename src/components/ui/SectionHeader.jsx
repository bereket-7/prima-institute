export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col ${alignClass} mb-12 lg:mb-16`}>
      {eyebrow && (
        <span className={`font-accent text-sm tracking-[0.25em] uppercase mb-3 ${light ? 'text-prima-gold-light' : 'text-prima-gold'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight max-w-2xl ${light ? 'text-white' : 'text-prima-charcoal'}`}>
        {title}
      </h2>
      {align === 'center'
        ? <span className="divider-gold my-5 mx-auto" />
        : <span className="divider-gold my-5" />
      }
      {subtitle && (
        <p className={`text-base lg:text-lg leading-relaxed max-w-xl font-body ${light ? 'text-white/70' : 'text-prima-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
