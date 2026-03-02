import { DISTANCE_OPTIONS } from '../../constants'

function RuralForm({ acres, onAcresChange, distance, onDistanceChange }) {
  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-montserrat text-2xl font-bold text-brand-navy">
        Rural / EPC Calculator
      </h2>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-base font-medium text-slate-700">Land Available</label>
          <span className="rounded-md bg-slate-100 px-3 py-2 text-base font-semibold text-brand-navy">
            {acres} Acres
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={acres}
          onChange={(event) => onAcresChange(Number(event.target.value))}
          className="h-12 w-full"
        />
      </div>

      <div>
        <p className="mb-2 text-base font-medium text-slate-700">Distance to Substation</p>
        <div className="grid grid-cols-3 gap-2">
          {DISTANCE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onDistanceChange(option)}
              className={`h-12 rounded-md border text-base font-semibold ${
                option === distance
                  ? 'border-brand-green text-brand-green'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RuralForm
