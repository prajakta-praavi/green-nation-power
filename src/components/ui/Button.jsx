import { Link } from 'react-router-dom'

function Button({
  children,
  className = '',
  variant = 'solid',
  href,
  to,
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses =
    'h-12 rounded-md px-4 text-base font-semibold transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

  const variantClasses =
    variant === 'outline'
      ? 'border border-brand-green text-brand-green bg-white shadow-sm'
      : 'bg-brand-green text-white shadow-md'

  const classes = `${baseClasses} ${variantClasses} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
