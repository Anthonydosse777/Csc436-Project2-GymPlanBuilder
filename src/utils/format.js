// Log dates are stored as local "YYYY-MM-DD" strings, which also sort chronologically.

export function getTodayString() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

const LONG_DATE = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }

export function formatDate(dateString, options = LONG_DATE) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', options)
}

export function formatNumber(value) {
  return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}
