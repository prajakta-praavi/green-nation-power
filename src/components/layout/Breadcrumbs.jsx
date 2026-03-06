import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const segmentLabels = {
  about: 'About',
  residential: 'Residential',
  commercial: 'Commercial',
  epc: 'EPC',
  locations: 'Locations',
  projects: 'Projects',
}

function formatSegment(segment) {
  if (segmentLabels[segment]) {
    return segmentLabels[segment]
  }

  if (segment === 'best-solar-provider-in') {
    return 'Locations'
  }

  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function Breadcrumbs() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return null
  }

  const segments = pathname.split('/').filter(Boolean)
  const pageTitle = formatSegment(segments[segments.length - 1] ?? '')
  const breadcrumbBg =
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=80'

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${breadcrumbBg})` }}
      />
      <div className="absolute inset-0 bg-brand-navy/45" />

      <div className="relative mx-auto flex h-[240px] w-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:h-[280px] sm:px-6 lg:px-8">
        <h1 className="font-montserrat text-4xl font-extrabold text-white sm:text-5xl">{pageTitle}</h1>
        <ol className="mt-4 flex flex-wrap items-center justify-center gap-2 text-lg text-slate-100">
          <li>
            <Link to="/" className="font-semibold text-white hover:text-emerald-300">
              Home
            </Link>
          </li>

          {segments.map((segment, index) => {
            const to = segment === 'best-solar-provider-in'
              ? '/locations'
              : `/${segments.slice(0, index + 1).join('/')}`
            const isLast = index === segments.length - 1
            const label = formatSegment(segment)

            return (
              <li key={to} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-slate-300" />
                {isLast ? (
                  <span className="font-semibold text-brand-green">{label}</span>
                ) : (
                  <Link to={to} className="font-medium text-slate-100 hover:text-emerald-300">
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default Breadcrumbs
