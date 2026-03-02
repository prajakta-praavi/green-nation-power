import { Suspense, lazy, useMemo, useState } from 'react'
import {
  CO2_PER_UNIT,
  CONTACT_PHONE,
  HEAVY_DUTY_STRUCTURE_COST_PER_KW,
  HYBRID_ADDON_COST_PER_KW,
  INDUSTRIAL_ROOF_AREA_PER_KW,
  RESIDENTIAL_COST_PER_KW,
  RESIDENTIAL_ROOF_AREA_PER_KW,
  RESIDENTIAL_SUBSIDY_CAP,
  RURAL_KW_PER_ACRE,
  RURAL_SITE_DEVELOPMENT_PER_ACRE,
  TARGET_FAST_TRACK_PINCODES,
  TREES_PER_TON,
  WHATSAPP_NUMBER,
} from '../../constants'
import {
  buildFiveYearSchedule,
  clamp,
  formatCurrency,
  formatNumber,
  toSafeFileName,
  toWhatsAppHref,
} from '../../solar/helpers'
import Spinner from '../ui/Spinner'
import CalculatorTabs from './CalculatorTabs'
import CommercialForm from './CommercialForm'
import LeadCaptureModal from './LeadCaptureModal'
import ResidentialForm from './ResidentialForm'
import ResultsDisplay from './ResultsDisplay'
import RuralForm from './RuralForm'

const PdfAutoDownloader = lazy(() => import('./PdfAutoDownloader'))

const CALCULATOR_TABS = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'rural', label: 'EPC / Rural' },
]

function SolarCalculator({ initialTab = 'residential', lockedTab = null, className = '' }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  const [monthlyBill, setMonthlyBill] = useState(6000)
  const [sanctionedLoad, setSanctionedLoad] = useState(200)
  const [includeTaxBenefit, setIncludeTaxBenefit] = useState(true)
  const [acres, setAcres] = useState(8)
  const [distance, setDistance] = useState('< 2km')
  const [hasLoadShedding, setHasLoadShedding] = useState(null)
  const [needsHeavyDutyStructure, setNeedsHeavyDutyStructure] = useState(false)
  const [includeMsebPaperwork, setIncludeMsebPaperwork] = useState(true)
  const [pinCode, setPinCode] = useState('')

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [reportStatus, setReportStatus] = useState('idle')
  const [reportData, setReportData] = useState(null)
  const [downloadJob, setDownloadJob] = useState(0)

  const resolvedActiveTab = lockedTab || activeTab

  const tabs = useMemo(() => {
    if (lockedTab) {
      return CALCULATOR_TABS.filter((tab) => tab.id === lockedTab)
    }

    return CALCULATOR_TABS
  }, [lockedTab])

  const residential = useMemo(() => {
    const recommendedKw = Math.max(monthlyBill / 800, 0)
    let subsidy = recommendedKw * 30000 + 10000
    subsidy = Math.min(subsidy, RESIDENTIAL_SUBSIDY_CAP)

    const systemType = hasLoadShedding ? 'Hybrid + Battery' : 'On-Grid'

    // Bug fix: all residential pricing is now based on RESIDENTIAL_COST_PER_KW.
    const baseCostPerKw = RESIDENTIAL_COST_PER_KW
    const hybridAddon = hasLoadShedding
      ? recommendedKw * HYBRID_ADDON_COST_PER_KW
      : 0
    const heavyDutyCost = needsHeavyDutyStructure
      ? recommendedKw * HEAVY_DUTY_STRUCTURE_COST_PER_KW
      : 0

    const annualSavings = monthlyBill * 12
    const estimatedInvestment =
      recommendedKw * baseCostPerKw + hybridAddon + heavyDutyCost
    const netCapex = Math.max(estimatedInvestment - subsidy, 0)
    const roofAreaSqft = recommendedKw * RESIDENTIAL_ROOF_AREA_PER_KW
    const annualGeneration = recommendedKw * 4 * 365
    const paybackYears = annualSavings > 0 ? netCapex / annualSavings : 0

    const schedule = buildFiveYearSchedule({
      initialCapex: netCapex,
      annualBenefit: annualSavings,
    })

    const co2Tons = annualGeneration * CO2_PER_UNIT
    const trees = co2Tons * TREES_PER_TON
    const isFastTrackZone = TARGET_FAST_TRACK_PINCODES.includes(pinCode)
    const canShowFinalResult = hasLoadShedding !== null && pinCode.length === 6

    const message = `Hi GNP, I need consultation for ${formatNumber(
      recommendedKw,
    )} kW ${systemType} system.`

    return {
      recommendedKw,
      subsidy,
      systemType,
      baseCostPerKw,
      annualSavings,
      estimatedInvestment,
      paybackYears,
      roofAreaSqft,
      schedule,
      co2Tons,
      trees,
      isFastTrackZone,
      canShowFinalResult,
      whatsappLink: toWhatsAppHref(WHATSAPP_NUMBER, message),
    }
  }, [
    hasLoadShedding,
    monthlyBill,
    needsHeavyDutyStructure,
    pinCode,
  ])

  const commercial = useMemo(() => {
    const load = clamp(Number(sanctionedLoad) || 10, 10, 2000)
    const systemCost = load * 35000
    const annualGeneration = load * 4 * 365
    const annualBillSaving = annualGeneration * 12
    const taxBenefit = includeTaxBenefit ? systemCost * 0.4 * 0.25 : 0
    const paybackYears =
      annualBillSaving > 0 ? (systemCost - taxBenefit) / annualBillSaving : 0
    const yearOneSavings = annualBillSaving + taxBenefit
    const lifetimeSavings = annualBillSaving * 25 + taxBenefit
    const roofAreaSqft = load * INDUSTRIAL_ROOF_AREA_PER_KW
    const schedule = buildFiveYearSchedule({
      initialCapex: systemCost,
      annualBenefit: annualBillSaving,
      firstYearBonus: taxBenefit,
    })
    const co2Tons = annualGeneration * CO2_PER_UNIT
    const trees = co2Tons * TREES_PER_TON

    return {
      load,
      systemCost,
      annualBillSaving,
      taxBenefit,
      paybackYears,
      yearOneSavings,
      lifetimeSavings,
      roofAreaSqft,
      schedule,
      co2Tons,
      trees,
    }
  }, [includeTaxBenefit, sanctionedLoad])

  const rural = useMemo(() => {
    const landAcres = clamp(Number(acres) || 1, 1, 50)
    const yearlyRent = landAcres * 50000
    const feasibility = distance === '> 5km' ? 'Low' : 'High'
    const siteDevelopmentCost = landAcres * RURAL_SITE_DEVELOPMENT_PER_ACRE
    const potentialCapacityKw = landAcres * RURAL_KW_PER_ACRE
    const landAreaSqft = landAcres * 43560
    const annualGeneration = potentialCapacityKw * 4.5 * 365
    const paybackYears = yearlyRent > 0 ? siteDevelopmentCost / yearlyRent : 0
    const schedule = buildFiveYearSchedule({
      initialCapex: siteDevelopmentCost,
      annualBenefit: yearlyRent,
    })
    const co2Tons = annualGeneration * CO2_PER_UNIT
    const trees = co2Tons * TREES_PER_TON
    const message = `Hi GNP, I want land feasibility for ${landAcres} acres (${distance} from substation).`

    return {
      landAcres,
      yearlyRent,
      feasibility,
      siteDevelopmentCost,
      potentialCapacityKw,
      landAreaSqft,
      paybackYears,
      schedule,
      co2Tons,
      trees,
      inspectionLink: toWhatsAppHref(WHATSAPP_NUMBER, message),
    }
  }, [acres, distance])

  const buildReportPayload = ({ fullName, whatsapp }) => {
    const calculationDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

    const safeName = toSafeFileName(fullName)

    if (resolvedActiveTab === 'residential') {
      return {
        fileName: `gnp-residential-${safeName}.pdf`,
        reportType: 'Residential Solar Proposal',
        clientName: fullName,
        whatsapp,
        calculationDate,
        summaryLeft: [
          {
            label: 'Bill Amount (Monthly)',
            value: formatCurrency(monthlyBill),
          },
          {
            label: 'Recommended System Size',
            value: `${formatNumber(residential.recommendedKw)} kW (${residential.systemType})`,
          },
          {
            label: 'Estimated Total Investment',
            value: formatCurrency(residential.estimatedInvestment),
          },
        ],
        summaryRight: [
          {
            label: 'Annual Savings',
            value: formatCurrency(residential.annualSavings),
          },
          {
            label: 'Government Subsidy',
            value: formatCurrency(residential.subsidy),
          },
          {
            label: 'Estimated Payback',
            value: `${formatNumber(residential.paybackYears)} years`,
          },
        ],
        schedule: residential.schedule,
        environmental: {
          co2Tons: residential.co2Tons,
          trees: residential.trees,
        },
        serviceHighlights: [
          includeMsebPaperwork
            ? '100% Mahavitaran paperwork handled by GNP'
            : 'Mahavitaran paperwork excluded in this estimate',
          needsHeavyDutyStructure
            ? 'Heavy-duty galvanized structure included.'
            : 'Standard rooftop structure included.',
          residential.isFastTrackZone
            ? 'Fast-track zone: 24-48 hr local maintenance.'
            : 'Standard service timeline applies.',
        ],
        note: `Base residential rate used: ${formatCurrency(RESIDENTIAL_COST_PER_KW)} per kW.`,
        contactPhone: CONTACT_PHONE,
      }
    }

    if (resolvedActiveTab === 'commercial') {
      return {
        fileName: `gnp-commercial-${safeName}.pdf`,
        reportType: 'Commercial Solar Proposal',
        clientName: fullName,
        whatsapp,
        calculationDate,
        summaryLeft: [
          {
            label: 'Sanctioned Load',
            value: `${formatNumber(commercial.load)} kVA`,
          },
          {
            label: 'Recommended System Size',
            value: `${formatNumber(commercial.load)} kW`,
          },
          {
            label: 'Estimated Total Investment',
            value: formatCurrency(commercial.systemCost),
          },
        ],
        summaryRight: [
          {
            label: 'Annual Savings',
            value: formatCurrency(commercial.annualBillSaving),
          },
          {
            label: 'Tax Shield',
            value: formatCurrency(commercial.taxBenefit),
          },
          {
            label: 'Payback',
            value: `${formatNumber(commercial.paybackYears)} years`,
          },
        ],
        schedule: commercial.schedule,
        environmental: {
          co2Tons: commercial.co2Tons,
          trees: commercial.trees,
        },
        note: includeTaxBenefit
          ? 'Tax shield is calculated at CAPEX x 40% depreciation x 25% tax rate.'
          : 'Tax shield is disabled for this estimate.',
        contactPhone: CONTACT_PHONE,
      }
    }

    return {
      fileName: `gnp-epc-${safeName}.pdf`,
      reportType: 'Rural / EPC Land Proposal',
      clientName: fullName,
      whatsapp,
      calculationDate,
      summaryLeft: [
        {
          label: 'Land Parcel',
          value: `${formatNumber(rural.landAcres)} acres`,
        },
        {
          label: 'Potential System Size',
          value: `${formatNumber(rural.potentialCapacityKw)} kW`,
        },
        {
          label: 'Estimated Development Cost',
          value: formatCurrency(rural.siteDevelopmentCost),
        },
      ],
      summaryRight: [
        {
          label: 'Estimated Yearly Income',
          value: formatCurrency(rural.yearlyRent),
        },
        {
          label: 'Grid Feasibility',
          value: rural.feasibility,
        },
        {
          label: 'Estimated Payback',
          value: `${formatNumber(rural.paybackYears)} years`,
        },
      ],
      schedule: rural.schedule,
      environmental: {
        co2Tons: rural.co2Tons,
        trees: rural.trees,
      },
      note: 'Land rent modeled at INR 50,000 per acre annually.',
      contactPhone: CONTACT_PHONE,
    }
  }

  const openLeadGate = () => {
    if (reportStatus === 'generating') {
      return
    }

    setReportStatus('idle')
    setIsLeadModalOpen(true)
  }

  const handleLeadSubmit = async (leadValues) => {
    const payload = buildReportPayload(leadValues)
    setReportData(payload)
    setReportStatus('generating')
    setDownloadJob((previous) => previous + 1)
    setIsLeadModalOpen(false)

    // Optional CRM webhook trigger placeholder.
    // await fetch('https://hooks.zapier.com/...', { method: 'POST', body: JSON.stringify({ leadValues, payload }) })
  }

  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 ${className}`}>
      {!lockedTab && (
        <CalculatorTabs
          tabs={tabs}
          activeTab={resolvedActiveTab}
          onChange={(nextTab) => {
            if (!lockedTab) {
              setActiveTab(nextTab)
            }
          }}
        />
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          {resolvedActiveTab === 'residential' && (
            <ResidentialForm
              monthlyBill={monthlyBill}
              onMonthlyBillChange={setMonthlyBill}
              hasLoadShedding={hasLoadShedding}
              onLoadSheddingChange={setHasLoadShedding}
              needsHeavyDutyStructure={needsHeavyDutyStructure}
              onHeavyDutyChange={setNeedsHeavyDutyStructure}
              includeMsebPaperwork={includeMsebPaperwork}
              onMsebPaperworkChange={setIncludeMsebPaperwork}
              pinCode={pinCode}
              onPinCodeChange={setPinCode}
              isFastTrackZone={residential.isFastTrackZone}
            />
          )}

          {resolvedActiveTab === 'commercial' && (
            <CommercialForm
              sanctionedLoad={sanctionedLoad}
              onLoadChange={setSanctionedLoad}
              includeTaxBenefit={includeTaxBenefit}
              onTaxChange={setIncludeTaxBenefit}
            />
          )}

          {resolvedActiveTab === 'rural' && (
            <RuralForm
              acres={acres}
              onAcresChange={setAcres}
              distance={distance}
              onDistanceChange={setDistance}
            />
          )}
        </div>

        <ResultsDisplay
          activeTab={resolvedActiveTab}
          residential={residential}
          commercial={commercial}
          rural={rural}
          reportStatus={reportStatus}
          onDownloadClick={openLeadGate}
        />
      </div>

      <Suspense fallback={<Spinner label="Loading proposal engine..." />}>
        {reportStatus === 'generating' && reportData && (
          <PdfAutoDownloader
            key={downloadJob}
            active
            reportData={reportData}
            onSuccess={() => setReportStatus('success')}
            onFailure={() => setReportStatus('error')}
          />
        )}
      </Suspense>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleLeadSubmit}
      />
    </section>
  )
}

export default SolarCalculator
