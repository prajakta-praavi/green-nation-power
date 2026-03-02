export const SERVICE_LOCATIONS = [
  {
    name: 'Indapur',
    slug: 'indapur',
    subtitle: 'Residential rooftops, farm loads, and small industrial feeders.',
  },
  {
    name: 'Bhigwan',
    slug: 'bhigwan',
    subtitle: 'Agri-heavy demand profile with hybrid and net-metering needs.',
  },
  {
    name: 'Yavat',
    slug: 'yavat',
    subtitle: 'Fast-growing peri-urban residential and commercial solar demand.',
  },
  {
    name: 'Kedgaon',
    slug: 'kedgaon',
    subtitle: 'Rooftop and small-scale commercial solar optimization projects.',
  },
  {
    name: 'Daund',
    slug: 'daund',
    subtitle: 'Industrial and cooperative segment focused OPEX reduction.',
  },
  {
    name: 'Loni Kalbhor',
    slug: 'loni-kalbhor',
    subtitle: 'Urban-edge domestic and society-level rooftop opportunities.',
  },
  {
    name: 'Theur',
    slug: 'theur',
    subtitle: 'Residential savings and compliant Mahavitaran execution.',
  },
  {
    name: 'Saswad',
    slug: 'saswad',
    subtitle: 'Mixed-use properties requiring robust long-life EPC systems.',
  },
  {
    name: 'Baramati',
    slug: 'baramati',
    subtitle: 'Large farm and industry-oriented solar ROI engineering.',
  },
  {
    name: 'Jejuri',
    slug: 'jejuri',
    subtitle: 'Residential and land-linked EPC consultation demand cluster.',
  },
]

export function getServiceLocationBySlug(citySlug) {
  return SERVICE_LOCATIONS.find((city) => city.slug === citySlug)
}

export function getLocationPagePath(citySlug) {
  return `/best-solar-provider-in/${citySlug}`
}
