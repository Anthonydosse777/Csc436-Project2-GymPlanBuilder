import { useId, useState } from 'react'
import { EXERCISES } from '../data/exercises.js'
import { getTodayString } from '../utils/format.js'
import useReveal from '../hooks/useReveal'

function createEntryId() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `log-${Date.now()}`
}

function isWholeNumberAtLeastOne(value) {
  const number = Number(value)
  return value !== '' && Number.isInteger(number) && number >= 1
}

function validate({ date, exerciseName, sets, reps, weight }, today) {
  const errors = {}
  if (date === '') {
    errors.date = 'Choose a date.'
  } else if (date > today) {
    errors.date = "The date can't be in the future."
  }
  if (exerciseName.trim() === '') {
    errors.exerciseName = 'Enter an exercise name.'
  }
  if (!isWholeNumberAtLeastOne(sets)) {
    errors.sets = 'Sets must be a whole number of at least 1.'
  }
  if (!isWholeNumberAtLeastOne(reps)) {
    errors.reps = 'Reps must be a whole number of at least 1.'
  }
  if (weight === '' || !(Number(weight) >= 0)) {
    errors.weight = 'Weight must be 0 or more (use 0 for bodyweight).'
  }
  return errors
}

function LogForm({ plan, onAddEntry }) {
  const [date, setDate] = useState(getTodayString)
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('lb')
  const [errors, setErrors] = useState({})
  const [revealRef, isVisible] = useReveal()
  const id = useId()
  const today = getTodayString()

  const suggestions = [...new Set([...EXERCISES, ...plan].map((exercise) => exercise.name))]

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validate({ date, exerciseName, sets, reps, weight }, today)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return
    }

    onAddEntry({
      id: createEntryId(),
      date,
      exerciseName: exerciseName.trim(),
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      unit,
    })

    setExerciseName('')
    setSets('')
    setReps('')
    setWeight('')
  }

  // Shared props that link each input to its label and error message.
  function fieldProps(field) {
    return {
      id: `${id}-${field}`,
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined,
    }
  }

  function renderError(field) {
    return (
      errors[field] && (
        <p className="form-error" id={`${id}-${field}-error`} role="alert">
          {errors[field]}
        </p>
      )
    )
  }

  return (
    <section ref={revealRef} className={`card stack reveal${isVisible ? ' is-visible' : ''}`}>
      <h2 className="section-heading">Log a Workout</h2>
      <form className="form-grid" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor={`${id}-date`}>Date</label>
          <input
            {...fieldProps('date')}
            type="date"
            max={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {renderError('date')}
        </div>
        <div className="field">
          <label className="field-label" htmlFor={`${id}-exerciseName`}>Exercise</label>
          <input
            {...fieldProps('exerciseName')}
            type="text"
            list={`${id}-suggestions`}
            placeholder="e.g. Barbell Back Squat"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <datalist id={`${id}-suggestions`}>
            {suggestions.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          {renderError('exerciseName')}
        </div>
        <div className="field">
          <label className="field-label" htmlFor={`${id}-sets`}>Sets</label>
          <input
            {...fieldProps('sets')}
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          {renderError('sets')}
        </div>
        <div className="field">
          <label className="field-label" htmlFor={`${id}-reps`}>Reps</label>
          <input
            {...fieldProps('reps')}
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          {renderError('reps')}
        </div>
        <div className="field">
          <label className="field-label" htmlFor={`${id}-weight`}>Weight</label>
          <input
            {...fieldProps('weight')}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {renderError('weight')}
        </div>
        <div className="field">
          <label className="field-label" htmlFor={`${id}-unit`}>Unit</label>
          <select id={`${id}-unit`} value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
          </select>
        </div>
        <button className="form-submit" type="submit">Log Workout</button>
      </form>
    </section>
  )
}

export default LogForm
