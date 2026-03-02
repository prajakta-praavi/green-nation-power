import { lazy, Suspense } from 'react'
import { CheckCircle2, LoaderCircle, MessageCircle } from 'lucide-react'
import { formatCurrency, formatNumber } from '../../solar/helpers'
import Spinner from '../ui/Spinner'

const DownloadProposalButton = lazy(() => import('./DownloadProposalButton'))

function MetricCard({ label, value }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 font-montserrat text-2xl font-bold text-brand-navy">{value}</p>
    </article>
  )
}

function DownloadButtonGate({ onClick, disabled }) {
  return (
    <Suspense fallback={<Spinner label="Loading download action..." compact />}>
      <DownloadProposalButton onClick={onClick} disabled={disabled} />
    </Suspense>
  )
}

function ResultsDisplay({ activeTab, residential, commercial, rural, reportStatus, onDownloadClick }) {
  const isGenerating = reportStatus === 'generating'

  return (
    <aside className="space-y-3">
      {activeTab === 'residential' && (
        <>
          {!residential.canShowFinalResult && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Complete load-shedding response and 6-digit pin code to unlock final estimate.
            </div>
          )}

          <>
            <MetricCard
              label="Recommended System"
              value={`${formatNumber(residential.recommendedKw)} kW (${residential.systemType})`}
            />
            <MetricCard label="Govt Subsidy" value={formatCurrency(residential.subsidy)} />
            <MetricCard
              label="Estimated Payback"
              value={`${formatNumber(residential.paybackYears)} years`}
            />
            <MetricCard
              label="Annual Savings"
              value={formatCurrency(residential.annualSavings)}
            />
            <DownloadButtonGate
              onClick={onDownloadClick}
              disabled={isGenerating || !residential.canShowFinalResult}
            />
            <a
              href={residential.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-brand-green px-4 text-base font-semibold text-brand-green transition hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Get Quote on WhatsApp
            </a>
          </>
        </>
      )}

      {activeTab === 'commercial' && (
        <>
          <MetricCard
            label="ROI Period"
            value={`${formatNumber(commercial.paybackYears)} years`}
          />
          <MetricCard
            label="Year 1 Savings"
            value={formatCurrency(commercial.yearOneSavings)}
          />
          <MetricCard
            label="25-Year Savings"
            value={formatCurrency(commercial.lifetimeSavings)}
          />
          <DownloadButtonGate onClick={onDownloadClick} disabled={isGenerating} />
        </>
      )}

      {activeTab === 'rural' && (
        <>
          <MetricCard label="Potential Yearly Income" value={formatCurrency(rural.yearlyRent)} />
          <MetricCard label="Feasibility" value={rural.feasibility} />
          <MetricCard
            label="Estimated Payback"
            value={`${formatNumber(rural.paybackYears)} years`}
          />
          <DownloadButtonGate onClick={onDownloadClick} disabled={isGenerating} />
          <a
            href={rural.inspectionLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-brand-green px-4 text-base font-semibold text-brand-green transition hover:scale-105"
          >
            Submit Land for Inspection
          </a>
        </>
      )}

      {reportStatus === 'generating' && (
        <p className="inline-flex items-center gap-2 rounded-md border border-brand-green/30 bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-navy">
          <LoaderCircle className="h-4 w-4 animate-spin text-brand-green" />
          Generating your custom proposal...
        </p>
      )}

      {reportStatus === 'success' && (
        <p className="inline-flex items-center gap-2 rounded-md border border-brand-green/30 bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-navy">
          <CheckCircle2 className="h-4 w-4 text-brand-green" />
          Report Downloaded! Our Uruli Kanchan team will message you shortly.
        </p>
      )}

      {reportStatus === 'error' && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          Report generation failed. Please retry.
        </p>
      )}
    </aside>
  )
}

export default ResultsDisplay
