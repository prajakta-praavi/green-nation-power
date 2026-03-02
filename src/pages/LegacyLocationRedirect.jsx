import { Navigate, useLocation } from 'react-router-dom'
import { getServiceLocationBySlug } from '../data/serviceLocations'

function LegacyLocationRedirect() {
  const { pathname } = useLocation()
  const match = pathname.match(/\/best-solar-provider-in-([^/]+)/)
  const citySlug = match?.[1] ?? ''

  if (getServiceLocationBySlug(citySlug)) {
    return <Navigate to={`/best-solar-provider-in/${citySlug}`} replace />
  }

  return <Navigate to="/locations" replace />
}

export default LegacyLocationRedirect
