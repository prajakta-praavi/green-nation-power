import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import SeoMeta from '../components/seo/SeoMeta'
import {
  getLocationPagePath,
  SERVICE_LOCATIONS,
} from '../data/serviceLocations'

function LocationsPage() {
  return (
    <div className="bg-bg-light py-12">
      <SeoMeta
        title="Solar Installation Areas in Pune District | Green Nations Power"
        description="Explore Green Nations Power city service pages across Pune district including Indapur, Bhigwan, Yavat, Daund, and nearby areas."
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="font-montserrat text-4xl font-extrabold text-brand-navy">
            Solar Service Areas Around Uruli Kanchan, Pune
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Select your city to view a dedicated GNP page tailored to local residential,
            commercial, and EPC needs.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_LOCATIONS.map((city) => (
              <Link
                key={city.slug}
                to={getLocationPagePath(city.slug)}
                className="rounded-xl border border-slate-200 bg-bg-light p-4 transition hover:scale-[1.01]"
              >
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
                  <MapPin className="h-4 w-4" />
                  Pune District
                </p>
                <h2 className="mt-1 font-montserrat text-xl font-bold text-brand-navy">
                  Best Solar Provider in {city.name}
                </h2>
                <p className="mt-2 text-base text-slate-600">{city.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default LocationsPage
