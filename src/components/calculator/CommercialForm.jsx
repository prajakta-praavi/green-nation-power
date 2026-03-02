import { clamp } from '../../solar/helpers'

function CommercialForm({ sanctionedLoad, onLoadChange, includeTaxBenefit, onTaxChange }) {
  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-montserrat text-2xl font-bold text-brand-navy">
        Commercial Calculator
      </h2>

      <div>
        <label className="mb-2 block text-base font-medium text-slate-700">
          Sanctioned Load (kVA)
        </label>
        <input
          type="number"
          min="10"
          max="2000"
          value={sanctionedLoad}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (!Number.isNaN(next)) {
              onLoadChange(clamp(next, 10, 2000))
            }
          }}
          className="h-12 w-full rounded-md border border-slate-200 bg-transparent px-3 text-base"
        />
      </div>

      <button
        type="button"
        onClick={() => onTaxChange(!includeTaxBenefit)}
        className="flex h-12 w-full items-center justify-between rounded-md border border-slate-200 px-3 text-base"
        role="switch"
        aria-checked={includeTaxBenefit}
      >
        Include Accelerated Depreciation (Tax Shield)
        <span
          className={`relative inline-flex h-7 w-12 items-center rounded-full ${
            includeTaxBenefit ? 'bg-brand-green' : 'bg-slate-300'
          }`}
        >
          <span
            className={`h-5 w-5 rounded-full bg-white transition ${
              includeTaxBenefit ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </span>
      </button>
    </div>
  )
}

export default CommercialForm
