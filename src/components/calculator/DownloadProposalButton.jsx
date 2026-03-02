import { Download } from 'lucide-react'

function DownloadProposalButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-green px-4 text-base font-semibold text-white shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Download className="h-4 w-4" />
      Download Detailed ROI Report
    </button>
  )
}

export default DownloadProposalButton
