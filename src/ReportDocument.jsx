import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import gnpLogo from '../assets/gnp_logo.png'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
})

const formatCurrency = (value) =>
  currencyFormatter.format(Math.max(0, Math.round(Number(value) || 0)))

const formatNumber = (value, suffix = '') =>
  `${numberFormatter.format(Number(value) || 0)}${suffix}`

const styles = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingRight: 30,
    paddingBottom: 52,
    paddingLeft: 30,
    fontSize: 10,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d1fae5',
    paddingBottom: 14,
    marginBottom: 12,
  },
  logo: {
    width: 92,
    height: 34,
    objectFit: 'contain',
  },
  reportTitleWrap: {
    alignItems: 'flex-end',
    maxWidth: 350,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#065f46',
  },
  reportSubTitle: {
    marginTop: 2,
    fontSize: 9,
    color: '#64748b',
  },
  block: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  blockTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailsLabel: {
    color: '#475569',
  },
  detailsValue: {
    color: '#0f172a',
    fontWeight: 700,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryCol: {
    width: '48.6%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryItem: {
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 8.8,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 11,
    color: '#065f46',
    fontWeight: 700,
    marginTop: 1,
  },
  tableWrapper: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#ecfdf5',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  th: {
    fontSize: 8.8,
    fontWeight: 700,
    color: '#14532d',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  td: {
    fontSize: 8.6,
    color: '#1f2937',
  },
  yearCol: {
    width: '16%',
  },
  annualCol: {
    width: '28%',
  },
  cumulativeCol: {
    width: '28%',
  },
  outstandingCol: {
    width: '28%',
  },
  envBlock: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff7ed',
  },
  envTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#9a3412',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  envText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#7c2d12',
  },
  serviceBlock: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f0fdf4',
  },
  serviceTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#166534',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listItem: {
    fontSize: 8.8,
    color: '#166534',
    marginTop: 2,
    lineHeight: 1.45,
  },
  financingBlock: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fffbeb',
  },
  financingTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#92400e',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  financingItem: {
    fontSize: 8.8,
    color: '#92400e',
    marginTop: 2,
    lineHeight: 1.45,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    color: '#475569',
  },
  note: {
    marginTop: 6,
    fontSize: 8.2,
    color: '#64748b',
  },
})

function TableHeaderCell({ style, text }) {
  return (
    <View style={style}>
      <Text style={styles.th}>{text}</Text>
    </View>
  )
}

function TableCell({ style, text }) {
  return (
    <View style={style}>
      <Text style={styles.td}>{text}</Text>
    </View>
  )
}

function formatOutstanding(value) {
  if (value <= 0) {
    return 'Recovered'
  }

  return formatCurrency(value)
}

function SolarReportDocument({ report }) {
  const {
    reportType,
    clientName,
    whatsapp,
    companyName,
    calculationDate,
    summaryLeft,
    summaryRight,
    schedule,
    environmental,
    serviceHighlights = [],
    financingOptions = [],
    note,
    contactPhone,
  } = report

  const financingList =
    financingOptions.length > 0
      ? financingOptions
      : [
          'Eligible for PDCC / Cooperative Bank Farmer Solar Loans',
          'Flexible Post-Harvest Payment Options Available.',
        ]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={gnpLogo} />
          <View style={styles.reportTitleWrap}>
            <Text style={styles.reportTitle}>Solar ROI & Feasibility Report</Text>
            <Text style={styles.reportSubTitle}>{reportType}</Text>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Client Details</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Client Name</Text>
            <Text style={styles.detailsValue}>{clientName}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>WhatsApp Number</Text>
            <Text style={styles.detailsValue}>{whatsapp}</Text>
          </View>
          {!!companyName && (
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Company/Society</Text>
              <Text style={styles.detailsValue}>{companyName}</Text>
            </View>
          )}
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Date of Calculation</Text>
            <Text style={styles.detailsValue}>{calculationDate}</Text>
          </View>
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryTitle}>System Specs</Text>
            {summaryLeft.map((item) => (
              <View key={item.label} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{item.label}</Text>
                <Text style={styles.summaryValue}>{item.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryTitle}>Financials</Text>
            {summaryRight.map((item) => (
              <View key={item.label} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{item.label}</Text>
                <Text style={styles.summaryValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tableWrapper}>
          <View style={styles.tableHead}>
            <TableHeaderCell style={styles.yearCol} text="Year" />
            <TableHeaderCell style={styles.annualCol} text="Annual Benefit" />
            <TableHeaderCell
              style={styles.cumulativeCol}
              text="Cumulative Benefit"
            />
            <TableHeaderCell
              style={styles.outstandingCol}
              text="Outstanding CAPEX"
            />
          </View>

          {schedule.map((row, index) => (
            <View
              key={row.year}
              style={[
                styles.row,
                index === schedule.length - 1 ? styles.noBottomBorder : null,
              ]}
            >
              <TableCell style={styles.yearCol} text={`Year ${row.year}`} />
              <TableCell
                style={styles.annualCol}
                text={formatCurrency(row.annualBenefit)}
              />
              <TableCell
                style={styles.cumulativeCol}
                text={formatCurrency(row.cumulativeBenefit)}
              />
              <TableCell
                style={styles.outstandingCol}
                text={formatOutstanding(row.remainingCapex)}
              />
            </View>
          ))}
        </View>

        <View style={styles.envBlock}>
          <Text style={styles.envTitle}>Environmental Impact</Text>
          <Text style={styles.envText}>
            By installing this system, you will offset{' '}
            {formatNumber(environmental.co2Tons, ' tons')} of CO2, equivalent to
            planting {formatNumber(environmental.trees)} trees.
          </Text>
        </View>

        {serviceHighlights.length > 0 && (
          <View style={styles.serviceBlock}>
            <Text style={styles.serviceTitle}>Delivery Inclusions</Text>
            {serviceHighlights.map((item) => (
              <Text key={item} style={styles.listItem}>
                - {item}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.financingBlock}>
          <Text style={styles.financingTitle}>Financing Options</Text>
          {financingList.map((item) => (
            <Text key={item} style={styles.financingItem}>
              - {item}
            </Text>
          ))}
        </View>

        {!!note && <Text style={styles.note}>{note}</Text>}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Green Nation Power | Uruli Kanchan | Contact: {contactPhone} |
            {'  '}
            Generated specifically for {clientName}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default SolarReportDocument
