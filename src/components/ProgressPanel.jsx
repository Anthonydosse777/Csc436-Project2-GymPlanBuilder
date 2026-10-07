import { useId, useState } from 'react'
import { formatDate, formatNumber } from '../utils/format.js'
import useReveal from '../hooks/useReveal'

const UNITS = ['lb', 'kg']
const MAX_CHART_SESSIONS = 6
const SHORT_DATE = { month: 'short', day: 'numeric' }

// Each exercise is tracked separately per unit so kg and lb are never mixed.
function getSeries(workoutLog) {
  const series = new Map()
  for (const entry of workoutLog) {
    const key = `${entry.unit}:${entry.exerciseName}`
    if (!series.has(key)) {
      series.set(key, { key, exerciseName: entry.exerciseName, unit: entry.unit, entries: [] })
    }
    series.get(key).entries.push(entry)
  }
  return [...series.values()].sort((a, b) => a.exerciseName.localeCompare(b.exerciseName))
}

function getPersonalBest(entries) {
  const oldestFirst = [...entries].sort((a, b) => a.date.localeCompare(b.date))
  return oldestFirst.reduce((best, entry) => (entry.weight > best.weight ? entry : best))
}

function getMaxWeightByDate(entries) {
  const maxByDate = {}
  for (const entry of entries) {
    maxByDate[entry.date] = Math.max(maxByDate[entry.date] ?? 0, entry.weight)
  }
  return Object.entries(maxByDate)
    .map(([date, weight]) => ({ date, weight }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function ProgressPanel({ workoutLog }) {
  const [chartKey, setChartKey] = useState('')
  const [revealRef, isVisible] = useReveal()
  const id = useId()

  const daysTrained = new Set(workoutLog.map((entry) => entry.date)).size
  const volumeStats = UNITS.filter((unit) => workoutLog.some((entry) => entry.unit === unit)).map(
    (unit) => ({
      unit,
      total: workoutLog
        .filter((entry) => entry.unit === unit)
        .reduce((sum, entry) => sum + entry.sets * entry.reps * entry.weight, 0),
    })
  )

  const series = getSeries(workoutLog)
  const selected = series.find((item) => item.key === chartKey) ?? series[0]
  const points = selected ? getMaxWeightByDate(selected.entries) : []
  const chartPoints = points.slice(-MAX_CHART_SESSIONS)
  const chartMax = Math.max(...chartPoints.map((point) => point.weight), 0)
  const chartTitle = selected && `${selected.exerciseName}: max weight per session (${selected.unit})`

  return (
    <section ref={revealRef} className={`card stack reveal${isVisible ? ' is-visible' : ''}`}>
      <h2 className="section-heading">Progress</h2>
      <div className="stat-grid">
        <p className="stat-card stat">
          <span className="stat-value">{workoutLog.length}</span>
          <span className="stat-label">Workouts logged</span>
        </p>
        <p className="stat-card stat">
          <span className="stat-value">{daysTrained}</span>
          <span className="stat-label">Days trained</span>
        </p>
        {volumeStats.length === 0 ? (
          <p className="stat-card stat">
            <span className="stat-value">0</span>
            <span className="stat-label">Total volume</span>
          </p>
        ) : (
          volumeStats.map((stat) => (
            <p key={stat.unit} className="stat-card stat">
              <span className="stat-value">{formatNumber(stat.total)}</span>
              <span className="stat-label">Total volume ({stat.unit})</span>
            </p>
          ))
        )}
      </div>

      {series.length === 0 ? (
        <p className="empty-message">Log a workout to see personal bests and a progress chart.</p>
      ) : (
        <>
          <h3 className="subheading">Personal Bests</h3>
          <ul className="plain-list">
            {series.map((item) => {
              const best = getPersonalBest(item.entries)
              return (
                <li key={item.key} className="card list-row">
                  <span className="list-row-title">{item.exerciseName}</span>
                  <span className="list-row-meta">
                    {formatNumber(best.weight)} {item.unit} · {formatDate(best.date)}
                  </span>
                </li>
              )
            })}
          </ul>

          <h3 className="subheading">Progress Chart</h3>
          <div className="field">
            <label className="field-label" htmlFor={`${id}-chart`}>Exercise</label>
            <select
              id={`${id}-chart`}
              className="input"
              value={selected.key}
              onChange={(e) => setChartKey(e.target.value)}
            >
              {series.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.exerciseName} ({item.unit})
                </option>
              ))}
            </select>
          </div>
          {points.length < 2 ? (
            <p className="empty-message">Log this exercise on more days to see a trend.</p>
          ) : (
            <figure className="chart">
              <figcaption className="list-row-meta">
                {chartTitle}
                {points.length > MAX_CHART_SESSIONS && `, last ${MAX_CHART_SESSIONS} sessions`}
              </figcaption>
              <div
                className="chart-bars"
                role="img"
                aria-label={`${chartTitle}. ${chartPoints
                  .map((point) => `${formatDate(point.date, SHORT_DATE)}: ${formatNumber(point.weight)}`)
                  .join(', ')}`}
              >
                {chartPoints.map((point) => (
                  <div key={`${selected.key}-${point.date}`} className="chart-column">
                    <span className="chart-value">{formatNumber(point.weight)}</span>
                    <span className="chart-track">
                      <span
                        className="chart-bar"
                        style={{ '--bar-height': `${chartMax > 0 ? (point.weight / chartMax) * 100 : 0}%` }}
                      />
                    </span>
                    <span className="chart-label">{formatDate(point.date, SHORT_DATE)}</span>
                  </div>
                ))}
              </div>
              {/* Tables ignore overflow clipping, so the visually hidden wrapper is a div. */}
              <div className="sr-only">
                <table>
                  <caption>{chartTitle}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Max weight ({selected.unit})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartPoints.map((point) => (
                      <tr key={point.date}>
                        <td>{formatDate(point.date)}</td>
                        <td>{formatNumber(point.weight)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </figure>
          )}
        </>
      )}
    </section>
  )
}

export default ProgressPanel
