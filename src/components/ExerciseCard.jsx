import MuscleIcon from './MuscleIcon'
import useReveal from '../hooks/useReveal'

const MAX_TILT_DEG = 6
const tiltQuery = window.matchMedia(
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
)

function handleTilt(e) {
  if (!tiltQuery.matches) return
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  card.style.setProperty('--tilt-x', `${(-y * MAX_TILT_DEG).toFixed(2)}deg`)
  card.style.setProperty('--tilt-y', `${(x * MAX_TILT_DEG).toFixed(2)}deg`)
}

function resetTilt(e) {
  e.currentTarget.style.removeProperty('--tilt-x')
  e.currentTarget.style.removeProperty('--tilt-y')
}

function ExerciseCard({ exercise, isAdded, onAdd }) {
  const [revealRef, isVisible] = useReveal()

  return (
    <div
      ref={revealRef}
      className={`card exercise-card reveal${isVisible ? ' is-visible' : ''}`}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      <MuscleIcon muscleGroup={exercise.muscleGroup} />
      <h3 className="exercise-name">{exercise.name}</h3>
      <small className="exercise-meta">{exercise.muscleGroup} · {exercise.equipment} · {exercise.difficulty}</small>
      <p className="exercise-description">{exercise.description}</p>
      <button className="add-button" type="button" onClick={onAdd} disabled={isAdded}>
        {isAdded ? 'Added ✓' : 'Add to Plan'}
      </button>
    </div>
  )
}

export default ExerciseCard
