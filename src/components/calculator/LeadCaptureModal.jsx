import { AnimatePresence, motion as Motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Download, X } from 'lucide-react'

const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full Name is required.'),
  whatsapp: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit WhatsApp number.'),
})

function LeadCaptureModal({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: '',
      whatsapp: '',
    },
  })

  const submitForm = async (values) => {
    await onSubmit(values)
    reset()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-brand-navy/50 px-4 py-6 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-montserrat text-xl font-bold text-brand-navy">
                  Download Detailed ROI Report
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Share details to generate your custom proposal.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-slate-200"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
              <div>
                <label className="mb-1 block text-base font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="h-12 w-full rounded-md border border-slate-200 bg-transparent px-3 text-base"
                  placeholder="Enter your full name"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm font-medium text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-base font-medium text-slate-700">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  className="h-12 w-full rounded-md border border-slate-200 bg-transparent px-3 text-base"
                  placeholder="10-digit WhatsApp number"
                  {...register('whatsapp')}
                  onInput={(event) => {
                    event.target.value = event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 10)
                  }}
                />
                {errors.whatsapp && (
                  <p className="mt-1 text-sm font-medium text-red-600">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-green px-4 text-base font-semibold text-white shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                {isSubmitting ? 'Generating your custom proposal...' : 'Get ROI PDF'}
              </button>
            </form>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default LeadCaptureModal
