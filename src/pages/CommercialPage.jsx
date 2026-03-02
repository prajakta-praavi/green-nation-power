import { motion as Motion } from 'framer-motion'
import Card from '../components/ui/Card'
import ContactForm from '../components/forms/ContactForm'

function CommercialPage() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white py-12"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-bg-light p-8">
          <h1 className="font-montserrat text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Slashing OPEX for MIDC Factories and Cooperative Societies.
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Engineer your power costs down with grid-synchronized captive solar plants built for 25-year reliability.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-montserrat text-xl font-bold text-brand-navy">
              Accelerated Depreciation (40% Tax Shield)
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Improve year-one cashflow through depreciation-led tax reduction and lower effective project payback.
            </p>
          </Card>
          <Card>
            <h2 className="font-montserrat text-xl font-bold text-brand-navy">25-Year LCOE Advantage</h2>
            <p className="mt-2 text-base text-slate-600">
              Lock in predictable energy pricing and reduce exposure to annual grid tariff escalation.
            </p>
          </Card>
        </section>

        <section>
          <h2 className="mb-4 font-montserrat text-2xl font-bold text-brand-navy">
            Industrial Lead Form
          </h2>
          <ContactForm variant="industrial" />
        </section>
      </div>
    </Motion.div>
  )
}

export default CommercialPage
