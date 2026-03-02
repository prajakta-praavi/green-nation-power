import { motion as Motion } from 'framer-motion'
import gnpLogo from '../../assets/gnp_logo.png'

const projects = [
  {
    name: 'Uruli Kanchan Residential Cluster',
    type: 'Residential Rooftop Portfolio',
    impact: 'Reduced monthly bills by 70-95% across early adopters.',
  },
  {
    name: 'Ranjangaon MIDC Manufacturing Unit',
    type: 'Industrial Captive Solar',
    impact: 'Delivered strong year-one OPEX and tax optimization outcomes.',
  },
  {
    name: 'Baramati Land-Linked Solar Program',
    type: 'EPC / Land Leasing',
    impact: 'Enabled recurring land income under distributed generation model.',
  },
]

function ProjectsPage() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <img src={gnpLogo} alt="Green Nation Power" className="h-12 w-auto" />
          <div>
            <h1 className="font-montserrat text-3xl font-extrabold text-brand-navy">
              Signature Projects
            </h1>
            <p className="text-base text-slate-600">A sample of GNP deployment profiles across Pune district.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-xl border border-slate-200 bg-bg-light p-5"
            >
              <p className="text-sm font-semibold text-brand-green">{project.type}</p>
              <h2 className="mt-1 font-montserrat text-xl font-bold text-brand-navy">
                {project.name}
              </h2>
              <p className="mt-3 text-base text-slate-600">{project.impact}</p>
            </article>
          ))}
        </div>
      </div>
    </Motion.div>
  )
}

export default ProjectsPage
