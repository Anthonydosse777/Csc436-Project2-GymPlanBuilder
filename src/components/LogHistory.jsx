import { useId, useState } from 'react'
import { formatDate, formatNumber } from '../utils/format.js'
import useReveal from '../hooks/useReveal'

function groupByDate(entries) {
  const newestFirst = [...entries].sort((a, b) => b.date.localeCompare(a.date))
  return newestFirst.reduce((groups, entry) => {
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.date === entry.date) {
      return [...groups.slice(0, -1), { ...lastGroup, entries: [...lastGroup.entries, entry] }]
    }
    return [...groups, { date: entry.date, entries: [entry] }]
  }, [])
}

function LogHistory({ workoutLog, onDeleteEntry }) {
  const [exerciseFilter, setExerciseFilter] = useState('All')
  const [revealRef, isVisible] = useReveal()
  const id = useId()

  const exerciseNames = [...new Set(workoutLog.map((entry) => entry.exerciseName))].sort()
  // Fall back to All if the filtered exercise no longer has any entries.
  const activeFilter = exerciseNames.includes(exerciseFilter) ? exerciseFilter : 'All'
  const visibleEntries = workoutLog.filter(
    (entry) => activeFilter === 'All' || entry.exerciseName === activeFilter
  )
  const groups = groupByDate(visibleEntries)

  return (
    <section
      ref={revealRef}
      className={`card stack log-history reveal${isVisible ? ' is-visible' : ''}`}
    >
      <h2 className="section-heading">Workout History</h2>
      {workoutLog.length === 0 ? (
        <p className="empty-message">
          No workouts logged yet. Use the form above to record your first session.
        </p>
      ) : (
        <>
          <div className="field">
            <label className="field-label" htmlFor={`${id}-filter`}>Filter by exercise</label>
            <select
              id={`${id}-filter`}
              className="input"
              value={activeFilter}
              onChange={(e) => setExerciseFilter(e.target.value)}
            >
              <option value="All">All exercises</option>
              {exerciseNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          {groups.length === 0 ? (
            <p className="empty-message">No entries match this exercise.</p>
          ) : (
            groups.map((group) => (
              <section key={group.date} className="log-day">
                <h3 className="log-day-heading">{formatDate(group.date)}</h3>
                <ul className="plain-list">
                  {group.entries.map((entry) => (
                    <li key={entry.id} className="card list-row">
                      <div className="list-row-text">
                        <span className="list-row-title">{entry.exerciseName}</span>
                        <span className="list-row-meta">
                          {entry.sets} × {entry.reps} @ {formatNumber(entry.weight)} {entry.unit}
                          {' · '}Volume {formatNumber(entry.sets * entry.reps * entry.weight)} {entry.unit}
                        </span>
                      </div>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => onDeleteEntry(entry.id)}
                        aria-label={`Delete ${entry.exerciseName} from ${formatDate(entry.date)}`}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </>
      )}
    </section>
  )
}

export default LogHistory
