import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BadgePercent,
  Building2,
  Calculator,
  Factory,
  FileCheck2,
  Home,
  IndianRupee,
  Leaf,
  MapPin,
  Ruler,
  Sun,
  Wrench,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import {
  RESIDENTIAL_COST_PER_KW,
  RESIDENTIAL_ROOF_AREA_PER_KW,
  RESIDENTIAL_SUBSIDY_CAP,
} from '../constants'
import { getLocationPagePath, SERVICE_LOCATIONS } from '../data/serviceLocations'
import { formatCurrency, formatNumber } from '../solar/helpers'

const categoryCards = [
  {
    title: 'Residential Solar',
    description: 'Rooftop systems for homes with subsidy support and net metering.',
    to: '/residential',
    icon: Home,
  },
  {
    title: 'Commercial & Industrial',
    description: 'High-yield plants for offices, warehouses, and factory loads.',
    to: '/commercial',
    icon: Building2,
  },
  {
    title: 'Rural / EPC Projects',
    description: 'Land monetization and utility-scale EPC execution support.',
    to: '/epc',
    icon: Wrench,
  },
]

const heroBanners = [
  {
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80',
    title: 'Residential Solar Solutions',
    subtitle: 'Lower home electricity bills with subsidy-ready rooftop installations.',
    collageTop:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
    collageBottom:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80',
    title: 'Commercial Solar Systems',
    subtitle: 'High-performance solar plants for factories, offices, and industrial rooftops.',
    collageTop:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    collageBottom:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1920&q=80',
    title: 'Rural Solar & EPC Projects',
    subtitle: 'Scalable rural and utility solar execution with reliable generation planning.',
    collageTop:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
    collageBottom:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
]

const collageLayouts = [
  {
    iconWrap: 'left-2 top-16',
    topWrap: 'ml-20 rounded-[44px]',
    topImage: 'h-[360px]',
    bottomWrap: '-mt-14 mr-10 ml-2 max-w-[430px] rounded-[44px]',
    bottomImage: 'h-[280px]',
  },
  {
    iconWrap: 'right-8 top-10',
    topWrap: 'mr-8 rounded-[56px_24px_56px_24px]',
    topImage: 'h-[340px]',
    bottomWrap: '-mt-10 ml-16 max-w-[420px] rounded-[24px_56px_24px_56px]',
    bottomImage: 'h-[300px]',
  },
  {
    iconWrap: 'left-8 top-12',
    topWrap: 'ml-12 rounded-[72px]',
    topImage: 'h-[330px]',
    bottomWrap: '-mt-12 mr-6 ml-6 max-w-[440px] rounded-[999px]',
    bottomImage: 'h-[260px]',
  },
]

const FALLBACK_SOLAR_IMAGE =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80'

const solutionOfferings = [
  {
    title: 'On-Grid & Hybrid Rooftop',
    description: 'Design, engineering, supply, and commissioning for urban and rural rooftops.',
    icon: Sun,
  },
  {
    title: 'Industrial Energy Offset',
    description: 'Plant sizing and deployment to reduce daytime grid dependence and diesel usage.',
    icon: Factory,
  },
  {
    title: 'Solar Pumps & Utility Applications',
    description: 'Irrigation and decentralised power solutions with dependable generation plans.',
    icon: Leaf,
  },
  {
    title: 'O&M and Lifecycle Support',
    description: 'Performance checks, preventive maintenance, and uptime-focused service.',
    icon: BadgeCheck,
  },
]

const aboutHighlights = [
  {
    title: 'Easy Installation',
    icon: Sun,
  },
  {
    title: 'Quality Material',
    icon: BadgeCheck,
  },
]

const scopeOfWork = [
  'Site selection and generation feasibility',
  'Detailed engineering and single line diagrams',
  'Procurement support with component quality checks',
  'Project execution supervision and commissioning',
  'Approvals, paperwork, and subsidy coordination',
  'After-sales maintenance and optimization',
]

const processSteps = [
  'Energy audit and load profiling',
  'System design and proposal finalization',
  'Regulatory approvals and documentation',
  'Procurement and installation',
  'Testing, commissioning, and handover',
  'Performance tracking and maintenance',
]

const whyGnp = [
  {
    title: 'Complete Approval & Paperwork Support',
    icon: FileCheck2,
  },
  {
    title: 'Quality Components with Engineered Structures',
    icon: Building2,
  },
  {
    title: 'Fast Local Service and O&M Response',
    icon: Wrench,
  },
]

const professionalCounters = [
  { label: 'Projects Delivered', value: 250, suffix: '+' },
  { label: 'Installed Capacity', value: 12, suffix: ' MW+' },
  { label: 'Annual Client Savings', value: 8, prefix: 'Rs ', suffix: ' Cr+' },
  { label: 'Avg. Support Response', value: 24, suffix: ' Hrs' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const staggerIn = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const DEFAULT_HOME_BILL = '2500'
const DEFAULT_COMMERCIAL_BILL = '15000'

function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1200
    const startTime = performance.now()

    const updateValue = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setDisplayValue(Math.floor(value * easedProgress))

      if (progress < 1) {
        window.requestAnimationFrame(updateValue)
      }
    }

    const frameId = window.requestAnimationFrame(updateValue)
    return () => window.cancelAnimationFrame(frameId)
  }, [value])

  return (
    <p className="font-montserrat text-4xl font-extrabold text-brand-navy sm:text-5xl">
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </p>
  )
}

function HomePage({ onOpenCalculator }) {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const [solarNeed, setSolarNeed] = useState('Home')
  const [monthlyBillInput, setMonthlyBillInput] = useState(DEFAULT_HOME_BILL)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBannerIndex((current) => (current + 1) % heroBanners.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [])

  const parsedMonthlyBill = Number(monthlyBillInput)
  const fallbackBill = solarNeed === 'Home' ? Number(DEFAULT_HOME_BILL) : Number(DEFAULT_COMMERCIAL_BILL)
  const monthlyBill = Number.isFinite(parsedMonthlyBill) && parsedMonthlyBill > 0
    ? parsedMonthlyBill
    : fallbackBill
  const isHomeSolar = solarNeed === 'Home'
  const systemSizeKw = isHomeSolar
    ? Math.max(monthlyBill / 800, 0)
    : Math.max(monthlyBill / 1000, 0)
  const spaceRequired = systemSizeKw * RESIDENTIAL_ROOF_AREA_PER_KW
  const annualEnergy = systemSizeKw * 4 * 365
  const annualSavings = monthlyBill * 12
  const basePrice = systemSizeKw * RESIDENTIAL_COST_PER_KW
  const subsidy = isHomeSolar ? Math.min(systemSizeKw * 30000 + 10000, RESIDENTIAL_SUBSIDY_CAP) : 0

  const calculatorHighlights = [
    { label: 'System Size', value: `${formatNumber(systemSizeKw)} kW`, icon: Calculator },
    { label: 'Space Required', value: `${formatNumber(spaceRequired)} sqft`, icon: Ruler },
    { label: 'Annual Energy Generated', value: `${formatNumber(annualEnergy)} Units`, icon: Zap },
    { label: 'Annual Savings', value: formatCurrency(annualSavings), icon: IndianRupee },
    { label: 'Price (Excluding Subsidy)', value: formatCurrency(basePrice), icon: IndianRupee },
    { label: 'Subsidy', value: formatCurrency(subsidy), icon: BadgePercent },
  ]

  const activeCollageLayout = collageLayouts[activeBannerIndex % collageLayouts.length]

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white"
    >
      <section className="relative h-screen overflow-hidden">
        {heroBanners.map((banner, index) => (
          <div
            key={banner.title}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
              index === activeBannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${banner.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/65 to-brand-navy/35" />
        <div className="absolute -bottom-20 left-1/2 h-56 w-[115%] -translate-x-1/2 rounded-[100%] bg-white/10 blur-3xl" />
        <div className="relative mx-auto grid h-full w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Green Nation Power
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              {heroBanners[activeBannerIndex].title}
            </h2>
            <p className="mt-4 text-base text-slate-100 sm:text-lg">
              {heroBanners[activeBannerIndex].subtitle}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                Rooftop Solar
              </span>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                Commercial Plants
              </span>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                EPC Projects
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {heroBanners.map((banner, index) => (
                <button
                  key={banner.title}
                  type="button"
                  onClick={() => setActiveBannerIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeBannerIndex ? 'w-9 bg-brand-green' : 'w-2.5 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Show banner ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className={`absolute z-20 inline-flex h-24 w-24 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-100/90 text-brand-green shadow-lg transition-all duration-500 ${activeCollageLayout.iconWrap}`}>
              <Sun className="h-10 w-10" />
            </div>

            <div className={`overflow-hidden border border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm transition-all duration-500 ${activeCollageLayout.topWrap}`}>
              <img
                src={heroBanners[activeBannerIndex].collageTop}
                alt="Solar installation site"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = FALLBACK_SOLAR_IMAGE
                }}
                className={`w-full object-cover transition-all duration-500 ${activeCollageLayout.topImage}`}
              />
            </div>

            <div className={`overflow-hidden border border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm transition-all duration-500 ${activeCollageLayout.bottomWrap}`}>
              <img
                src={heroBanners[activeBannerIndex].collageBottom}
                alt="Solar panel technician working on rooftop"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = FALLBACK_SOLAR_IMAGE
                }}
                className={`w-full object-cover transition-all duration-500 ${activeCollageLayout.bottomImage}`}
              />
            </div>
          </div>
        </div>
      </section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative overflow-hidden bg-[#0b5561] py-14 text-white"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.14),transparent_40%)]" />
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div className="relative">
            <p className="inline-flex items-center rounded-xl bg-brand-green px-4 py-2 text-lg font-semibold text-brand-navy">
              Green Nation Power
            </p>
            <h2 className="mt-5 font-montserrat text-4xl font-extrabold leading-tight sm:text-5xl">
              Solar <span className="text-brand-green">RoofTop</span> Calculator
            </h2>
            <p className="mt-5 max-w-2xl text-xl text-slate-100">
              Use our solar calculator to estimate system size, roof space, annual generation,
              expected savings, and subsidy benefits.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex overflow-hidden rounded-md bg-white/95 text-brand-navy">
                <div className="flex w-16 items-center justify-center bg-amber-300">
                  <Home className="h-5 w-5" />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-slate-500">Do You Need Solar For</p>
                  <select
                    value={solarNeed}
                    onChange={(event) => {
                      const nextNeed = event.target.value
                      setSolarNeed(nextNeed)
                      setMonthlyBillInput(
                        nextNeed === 'Home' ? DEFAULT_HOME_BILL : DEFAULT_COMMERCIAL_BILL,
                      )
                    }}
                    className="mt-1 w-full bg-transparent text-2xl font-semibold outline-none"
                  >
                    <option value="Home">Home</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="flex overflow-hidden rounded-md bg-white/95 text-brand-navy">
                <div className="flex w-16 items-center justify-center bg-amber-300">
                  <IndianRupee className="h-5 w-5" />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-slate-500">Enter Monthly Electricity Bill</p>
                  <input
                    type="number"
                    min="500"
                    value={monthlyBillInput}
                    onChange={(event) => setMonthlyBillInput(event.target.value)}
                    className="mt-1 w-full bg-transparent text-2xl font-semibold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => onOpenCalculator('residential')}>Open Calculator</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSolarNeed('Home')
                  setMonthlyBillInput(DEFAULT_HOME_BILL)
                }}
                className="border-white bg-white/10 text-white hover:bg-white/20"
              >
                Reset Preview
              </Button>
            </div>
          </div>

          <Motion.div variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-3 sm:grid-cols-2">
            {calculatorHighlights.map((item) => {
              const Icon = item.icon

              return (
                <Motion.article
                  key={item.label}
                  variants={fadeUp}
                  className="rounded-xl bg-white p-5 text-brand-navy shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-xl text-slate-600">{item.label}</p>
                  </div>
                  <p className="mt-4 text-4xl font-bold text-brand-navy">{item.value}</p>
                </Motion.article>
              )
            })}
          </Motion.div>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        className="bg-white py-14"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-emerald-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-montserrat text-3xl font-bold text-brand-navy">
                Performance At A Glance
              </h2>
              <p className="max-w-xl text-slate-600">
                Real deployment outcomes across residential, commercial, and EPC solar projects.
              </p>
            </div>

            <Motion.div
              variants={staggerIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {professionalCounters.map((item) => (
                <Motion.article
                  key={item.label}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                  <p className="mt-2 text-base font-medium text-slate-600">{item.label}</p>
                </Motion.article>
              ))}
            </Motion.div>
          </div>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative overflow-hidden bg-white py-16"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
          <div className="relative">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              <MapPin className="h-3.5 w-3.5" />
              End-to-End Solar Partner
            </p>
            <h1 className="font-montserrat text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl md:text-5xl">
              Complete Solar Energy Solutions for Homes, Businesses, and EPC Projects.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              From design and approvals to installation and maintenance, we build reliable solar systems
              that lower electricity cost and improve long-term energy security.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => onOpenCalculator('residential')}>Calculate Savings</Button>
              <Button to="/projects" variant="outline" className="border-brand-navy text-brand-navy hover:bg-slate-100">
                View Projects
              </Button>
            </div>
          </div>

          <Motion.div variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="grid gap-4">
            {categoryCards.map((card) => {
              const Icon = card.icon

              return (
                <Motion.div key={card.title} variants={fadeUp}>
                  <Link
                    to={card.to}
                    className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                  >
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy text-white transition group-hover:bg-brand-green">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-montserrat text-xl font-bold text-brand-navy">{card.title}</h2>
                    <p className="mt-2 text-base text-slate-600">{card.description}</p>
                  </Link>
                </Motion.div>
              )
            })}
          </Motion.div>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-bg-light py-14"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm sm:p-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
              <article>
                <p className="inline-flex items-center rounded-full border border-brand-green/30 bg-white px-4 py-2 text-sm font-semibold text-brand-green">
                  About Us
                </p>
                <h2 className="mt-4 font-montserrat text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl">
                  Your Trusted Partner For <span className="text-brand-green">Rooftop Solar</span> Solutions
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-slate-600">
                  Green Nation Power delivers end-to-end solar services from design and installation to
                  support, using quality components and practical engineering standards.
                </p>

                <Motion.div variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-6 grid gap-4 sm:grid-cols-2">
                  {aboutHighlights.map((item) => {
                    const Icon = item.icon

                    return (
                      <Motion.div
                        key={item.title}
                        variants={fadeUp}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white">
                            <Icon className="h-5 w-5" />
                          </span>
                          <p className="text-lg font-semibold text-brand-navy">{item.title}</p>
                        </div>
                      </Motion.div>
                    )
                  })}
                </Motion.div>

                <Button to="/about" className="mt-7">Know More</Button>
              </article>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-72 overflow-hidden rounded-[42px] bg-gradient-to-b from-sky-300 via-emerald-200 to-sky-500 md:h-96" />
                  <div className="mt-10 h-72 overflow-hidden rounded-[42px] bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 md:h-96" />
                </div>

                <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-bg-light bg-brand-green text-center text-white shadow-lg">
                  <p className="font-montserrat text-3xl font-extrabold leading-none">
                    10+
                    <span className="mt-2 block text-base font-semibold">Years Of Experience</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-white py-14"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat text-3xl font-bold text-brand-navy">Our Scope of Work</h2>
          <Motion.ul variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-6 grid gap-3 md:grid-cols-2">
            {scopeOfWork.map((item) => (
              <Motion.li key={item} variants={fadeUp} className="flex items-start gap-2 rounded-xl border border-slate-200 p-4 text-slate-700 transition hover:border-emerald-300 hover:shadow-sm">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-green" />
                <span>{item}</span>
              </Motion.li>
            ))}
          </Motion.ul>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative overflow-hidden bg-white py-14"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),transparent_65%)]" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat text-3xl font-bold text-brand-navy">Solutions We Offer</h2>
          <p className="mt-2 max-w-3xl text-base text-slate-600">
            Structured offerings for every scale of deployment, from residential rooftops to industrial
            energy applications.
          </p>

          <Motion.div variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solutionOfferings.map((item) => {
              const Icon = item.icon

              return (
                <Motion.article key={item.title} variants={fadeUp} className="rounded-xl border border-slate-200 bg-white/95 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-brand-green">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-montserrat text-xl font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </Motion.article>
              )
            })}
          </Motion.div>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-bg-light py-14"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat text-3xl font-bold text-brand-navy">Our Work Process</h2>
          <Motion.div variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <Motion.article key={step} variants={fadeUp} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-brand-navy">{step}</h3>
              </Motion.article>
            ))}
          </Motion.div>
        </div>
      </Motion.section>

      <Motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-white py-14"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat text-3xl font-bold text-brand-navy">Why Green Nations Power</h2>
          <Motion.div variants={staggerIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-4 md:grid-cols-3">
            {whyGnp.map((item) => {
              const Icon = item.icon

              return (
                <Motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <Icon className="h-6 w-6 text-brand-green" />
                  <p className="mt-3 text-base font-semibold text-brand-navy">{item.title}</p>
                </Motion.article>
              )
            })}
          </Motion.div>
        </div>
      </Motion.section>

      <section className="bg-bg-light py-14 text-brand-navy">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat text-3xl font-bold">Best Solar Provider Pages by City</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Browse our city-focused pages to explore local service availability and project execution.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_LOCATIONS.map((city) => (
              <Link
                key={city.slug}
                to={getLocationPagePath(city.slug)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-brand-navy transition hover:border-brand-green hover:text-brand-green"
              >
                Best Solar Provider in {city.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => onOpenCalculator('commercial')}>Request Site Survey</Button>
            <Button to="/locations" variant="outline" className="border-brand-navy bg-transparent text-brand-navy hover:bg-slate-100">
              Explore Service Areas
            </Button>
          </div>
        </div>
      </section>
    </Motion.div>
  )
}

export default HomePage
