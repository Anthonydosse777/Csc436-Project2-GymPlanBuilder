import MuscleIcon from './MuscleIcon'

function ExerciseCard({ exercise, isAdded, onAdd }) {
  return (
    <div className="exercise-card">
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
