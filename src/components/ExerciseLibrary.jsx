import FilterBar from './FilterBar'
import ExerciseCard from './ExerciseCard'
import { EXERCISES } from '../data/exercises.js'

function ExerciseLibrary({ plan, onAddToPlan }) {
  return (
    <div>
      <FilterBar />
      {EXERCISES.map((exercise) => {
        const isAdded = plan.some((item) => item.id === exercise.id)
        return (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isAdded={isAdded}
            onAdd={() => onAddToPlan(exercise)}
          />
        )
      })}
    </div>
  )
}

export default ExerciseLibrary
