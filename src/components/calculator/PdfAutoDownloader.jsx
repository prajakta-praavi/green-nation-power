import { useEffect, useRef } from 'react'

function PdfAutoDownloader({ active, reportData, onSuccess, onFailure }) {
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (!active || !reportData) {
      triggeredRef.current = false
      return
    }

    if (triggeredRef.current) {
      return
    }

    triggeredRef.current = true
    let objectUrl = null

    const generateAndDownload = async () => {
      try {
        const [{ pdf }, { default: ReportDocument }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('../../ReportDocument'),
        ])

        const blob = await pdf(<ReportDocument report={reportData} />).toBlob()
        objectUrl = URL.createObjectURL(blob)

        const anchor = window.document.createElement('a')
        anchor.href = objectUrl
        anchor.download = reportData.fileName
        anchor.target = '_blank'
        anchor.rel = 'noopener'
        anchor.style.display = 'none'
        window.document.body.appendChild(anchor)
        anchor.click()
        window.document.body.removeChild(anchor)

        onSuccess()
      } catch (error) {
        triggeredRef.current = false
        onFailure(error)
      }
    }

    generateAndDownload()

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [active, onFailure, onSuccess, reportData])

  useEffect(() => {
    if (!active) {
      triggeredRef.current = false
    }
  }, [active])

  if (!active || !reportData) {
    return null
  }

  return null
}

export default PdfAutoDownloader
