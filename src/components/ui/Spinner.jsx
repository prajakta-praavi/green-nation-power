function Spinner({ label = 'Loading...', compact = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-brand-navy ${
        compact ? 'text-sm' : 'text-base'
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
      <span>{label}</span>
    </div>
  )
}

export default Spinner
