const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
})

export const formatCurrency = (value) =>
  currencyFormatter.format(Math.max(0, Math.round(Number(value) || 0)))

export const formatNumber = (value, suffix = '') =>
  `${numberFormatter.format(Number(value) || 0)}${suffix}`

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function buildFiveYearSchedule({
  initialCapex,
  annualBenefit,
  firstYearBonus = 0,
}) {
  const capex = Math.max(0, Number(initialCapex) || 0)
  const yearly = Math.max(0, Number(annualBenefit) || 0)
  const bonus = Math.max(0, Number(firstYearBonus) || 0)

  let cumulative = 0

  return Array.from({ length: 5 }, (_, index) => {
    const year = index + 1
    const annualCashflow = yearly + (year === 1 ? bonus : 0)
    cumulative += annualCashflow

    return {
      year,
      annualBenefit: annualCashflow,
      cumulativeBenefit: cumulative,
      remainingCapex: Math.max(capex - cumulative, 0),
    }
  })
}

export function toSafeFileName(text, fallback = 'client') {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || fallback
  )
}

export function toTelHref(phone) {
  return `tel:${String(phone).replace(/\s+/g, '')}`
}

export function toWhatsAppHref(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
