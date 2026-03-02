import { motion as Motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import SolarCalculator from '../components/calculator/SolarCalculator'

const faqs = [
  {
    question: 'What happens during load shedding?',
    answer:
      'Standard on-grid systems shut down for safety during utility outages. In villages with frequent power cuts, we recommend hybrid systems with battery backup so critical loads continue running.',
  },
  {
    question: 'How long does MSEB net-metering take?',
    answer:
      'Timelines vary by subdivision and document readiness. Most cases in Pune district move through approval, inspection, and commissioning in a few weeks when paperwork is complete.',
  },
]

function ResidentialPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-bg-light py-12"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="font-montserrat text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Claim up to Rs 1.3 Lakh Subsidy under PM Surya Ghar.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Enter your monthly bill and get an instant savings estimate tailored for Pune district homes.
          </p>
        </section>

        <section>
          <SolarCalculator lockedTab="residential" />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-montserrat text-2xl font-bold text-brand-navy">
            Residential FAQs
          </h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div key={faq.question} className="rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex h-12 w-full items-center justify-between px-4 text-left text-base font-semibold text-brand-navy"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-200 px-4 py-3 text-base text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </Motion.div>
  )
}

export default ResidentialPage
