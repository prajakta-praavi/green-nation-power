import { Factory, Home, Sprout } from 'lucide-react'

const iconMap = {
  residential: Home,
  commercial: Factory,
  rural: Sprout,
}

function CalculatorTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="grid gap-2 rounded-xl border border-slate-200 bg-white p-2 sm:grid-cols-3">
      {tabs.map((tab) => {
        const Icon = iconMap[tab.id]

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-md px-3 text-base font-semibold transition ${
              activeTab === tab.id
                ? 'border-b-2 border-brand-green text-brand-green'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default CalculatorTabs
