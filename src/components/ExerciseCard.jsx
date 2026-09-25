function ExerciseCard({ exercise, isAdded, onAdd }) {
  return (
    <div>
      <h3>{exercise.name}</h3>
      <small>{exercise.muscleGroup} · {exercise.equipment} · {exercise.difficulty}</small>
      <p>{exercise.description}</p>
      <button onClick={onAdd} disabled={isAdded}>
        {isAdded ? 'Added ✓' : 'Add to Plan'}
      </button>
    </div>
  )
}

export default ExerciseCard
