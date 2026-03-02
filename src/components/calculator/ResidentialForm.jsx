import { AlertTriangle, CheckCircle2, MapPin } from 'lucide-react'
import { formatCurrency } from '../../solar/helpers'

function ResidentialForm({
  monthlyBill,
  onMonthlyBillChange,
  hasLoadShedding,
  onLoadSheddingChange,
  needsHeavyDutyStructure,
  onHeavyDutyChange,
  includeMsebPaperwork,
  onMsebPaperworkChange,
  pinCode,
  onPinCodeChange,
  isFastTrackZone,
}) {
  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-montserrat text-2xl font-bold text-brand-navy">
        Residential Calculator
      </h2>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-base font-medium text-slate-700">
            Monthly Electricity Bill
          </label>
          <span className="rounded-md bg-slate-100 px-3 py-2 text-base font-semibold text-brand-navy">
            {formatCurrency(monthlyBill)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="30000"
          step="500"
          value={monthlyBill}
          onChange={(event) => onMonthlyBillChange(Number(event.target.value))}
          className="h-12 w-full"
        />
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <p className="text-base font-semibold text-brand-navy">
          Do you experience frequent load shedding?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onLoadSheddingChange(true)}
            className={`h-12 rounded-md border text-base font-semibold ${
              hasLoadShedding === true
                ? 'border-brand-green bg-brand-green text-white'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onLoadSheddingChange(false)}
            className={`h-12 rounded-md border text-base font-semibold ${
              hasLoadShedding === false
                ? 'border-brand-green bg-brand-green text-white'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            No
          </button>
        </div>

        {hasLoadShedding && (
          <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <p>
              Hybrid systems are recommended when grid power cuts are frequent.
            </p>
          </div>
        )}
      </div>

      <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-3 text-base text-slate-700">
        <input
          type="checkbox"
          checked={needsHeavyDutyStructure}
          onChange={(event) => onHeavyDutyChange(event.target.checked)}
          className="h-5 w-5 accent-brand-green"
        />
        Heavy-duty galvanized mounting structure required
      </label>

      <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-3 text-base text-slate-700">
        <input
          type="checkbox"
          checked={includeMsebPaperwork}
          onChange={(event) => onMsebPaperworkChange(event.target.checked)}
          className="h-5 w-5 accent-brand-green"
        />
        Include end-to-end Mahavitaran paperwork
      </label>

      {includeMsebPaperwork && (
        <p className="inline-flex items-center gap-2 rounded-md border border-brand-green/30 bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-navy">
          <CheckCircle2 className="h-4 w-4 text-brand-green" />
          100% Mahavitaran paperwork handled by GNP
        </p>
      )}

      <div>
        <label className="mb-2 block text-base font-medium text-slate-700">
          Pin Code
        </label>
        <input
          type="text"
          value={pinCode}
          inputMode="numeric"
          maxLength={6}
          onChange={(event) =>
            onPinCodeChange(event.target.value.replace(/\D/g, '').slice(0, 6))
          }
          placeholder="6-digit pin code"
          className="h-12 w-full rounded-md border border-slate-200 bg-transparent px-3 text-base"
        />
      </div>

      {isFastTrackZone && (
        <p className="inline-flex items-center gap-2 rounded-md border border-brand-green/30 bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-navy">
          <MapPin className="h-4 w-4 text-brand-green" />
          Fast-Track Zone: 24-48 hr local maintenance.
        </p>
      )}
    </div>
  )
}

export default ResidentialForm
