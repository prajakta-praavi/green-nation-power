function Card({ children, className = '' }) {
  return (
    <article
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()}
    >
      {children}
    </article>
  )
}

export default Card
