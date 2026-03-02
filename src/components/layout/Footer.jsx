import { Link } from 'react-router-dom'
import gnpLogo from '../../../assets/gnp_logo.png'
import { CONTACT_EMAIL, CONTACT_PHONE } from '../../constants'
import { getLocationPagePath, SERVICE_LOCATIONS } from '../../data/serviceLocations'

function Footer() {
  return (
    <footer className="bg-brand-navy pb-28 pt-12 text-slate-200 md:pb-12">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <img src={gnpLogo} alt="Green Nation Power logo" className="h-12 w-auto" />
          <p className="text-sm leading-relaxed text-slate-300">
            Uruli Kanchan HQ, Pune District, Maharashtra
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            Phone: {CONTACT_PHONE}
            <br />
            Email: {CONTACT_EMAIL}
          </p>
        </div>

        <div>
          <h3 className="font-montserrat text-lg font-semibold text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-brand-green">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-green">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/residential" className="hover:text-brand-green">
                Residential Solar
              </Link>
            </li>
            <li>
              <Link to="/commercial" className="hover:text-brand-green">
                Commercial Solar
              </Link>
            </li>
            <li>
              <Link to="/epc" className="hover:text-brand-green">
                EPC Land Programs
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-brand-green">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/locations" className="hover:text-brand-green">
                Service Areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-montserrat text-lg font-semibold text-white">
            Trust Badges
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>ISO-Compliant Engineering Processes</li>
            <li>MSME Registered Vendor Network</li>
            <li>Mahavitaran Paperwork Specialist Team</li>
            <li>MNRE-Aligned Solar Deployment Standards</li>
          </ul>

          <h3 className="mt-6 font-montserrat text-lg font-semibold text-white">
            Top Location Pages
          </h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            {SERVICE_LOCATIONS.slice(0, 4).map((city) => (
              <li key={city.slug}>
                <Link
                  to={getLocationPagePath(city.slug)}
                  className="hover:text-brand-green"
                >
                  Best Solar Provider in {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
