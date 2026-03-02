import { CheckCircle2, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import SeoMeta from '../components/seo/SeoMeta'
import {
  getLocationPagePath,
  getServiceLocationBySlug,
  SERVICE_LOCATIONS,
} from '../data/serviceLocations'
import gnpLogo from '../../assets/gnp_logo.png'

function LocationLandingPage({ onOpenCalculator }) {
  const { citySlug } = useParams()
  const city = getServiceLocationBySlug(citySlug)

  if (!city) {
    return (
      <div className="bg-bg-light py-12">
        <SeoMeta
          title="Solar Service Area Not Found | Green Nation Power"
          description="The requested service area page was not found. Explore all solar service areas in Pune district."
        />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="font-montserrat text-3xl font-extrabold text-brand-navy">
              Service Area Not Found
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Please choose one of our active Pune district service pages.
            </p>
            <Link
              to="/locations"
              className="mt-5 inline-flex h-12 items-center rounded-md bg-brand-green px-4 text-base font-semibold text-white shadow-md transition hover:scale-105"
            >
              View Service Areas
            </Link>
          </section>
        </div>
      </div>
    )
  }

  const seoTitle = `Best Solar Provider in ${city.name} | Green Nation Power`
  const seoDescription = `Looking for the best solar provider in ${city.name}? Green Nation Power delivers residential, commercial, and EPC solar projects with full Mahavitaran paperwork support.`
  const cityName = city.name

  const cityBenefits = [
    `100% Mahavitaran paperwork and net-metering support in ${cityName}`,
    `Heavy-duty galvanized structures designed for ${cityName} weather conditions`,
    `24-48 hour local service turnaround for homes and businesses in ${cityName}`,
  ]

  const citySegments = [
    {
      title: `Residential Solar in ${cityName}`,
      description: `Cut monthly power bills in ${cityName} with subsidy-backed rooftop systems and clean net-metering execution.`,
    },
    {
      title: `Commercial Solar in ${cityName}`,
      description: `Reduce operating costs for factories, schools, and societies in ${cityName} with long-life EPC-grade systems.`,
    },
    {
      title: `EPC Land Programs in ${cityName}`,
      description: `Evaluate land parcels in ${cityName} for distributed generation and recurring income opportunities.`,
    },
  ]

  return (
    <div className="bg-bg-light py-12">
      <SeoMeta title={seoTitle} description={seoDescription} />

      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <img src={gnpLogo} alt="Green Nation Power" className="mb-4 h-14 w-auto" />
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
            <MapPin className="h-4 w-4" />
            Pune District Service Hub - {cityName}
          </p>
          <h1 className="mt-2 font-montserrat text-3xl font-extrabold text-brand-navy sm:text-4xl md:text-5xl">
            Powering Pune District: From {cityName} Homes to MIDC Factories.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Best solar provider support for {cityName} with site assessment, system
            sizing, paperwork execution, and proposal support from GNP's local
            engineering team.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => onOpenCalculator('residential')}>
              Calculate Savings in {cityName}
            </Button>
            <Button to="/residential" variant="outline">
              Start {cityName} Residential Calculator
            </Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {cityBenefits.map((benefit) => (
            <article
              key={benefit}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 text-brand-green" />
              <p className="mt-2 text-base font-semibold text-brand-navy">{benefit}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {citySegments.map((segment) => (
            <article
              key={segment.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-montserrat text-xl font-bold text-brand-navy">
                {segment.title}
              </h2>
              <p className="mt-2 text-base text-slate-600">{segment.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-montserrat text-2xl font-bold text-brand-navy">
            Nearby City Service Pages for {cityName}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Browse city-specific pages using the same GNP service framework used in{' '}
            {cityName}.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_LOCATIONS.filter((item) => item.slug !== city.slug).map((item) => (
              <Link
                key={item.slug}
                to={getLocationPagePath(item.slug)}
                className="rounded-lg border border-slate-200 px-4 py-3 text-base font-semibold text-brand-navy transition hover:border-brand-green hover:text-brand-green"
              >
                Best Solar Provider in {item.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default LocationLandingPage
