import { AnimatePresence, motion as Motion } from 'framer-motion'
import { X } from 'lucide-react'
import SolarCalculator from './SolarCalculator'

function CalculatorOverlay({ isOpen, initialTab = 'residential', onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-brand-navy/70 px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.div
            className="mx-auto w-full max-w-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-slate-200 bg-white text-brand-navy"
                aria-label="Close calculator"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <SolarCalculator initialTab={initialTab} />
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default CalculatorOverlay
