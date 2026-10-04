import { useState } from 'react'
import FilterBar from './FilterBar'
import ExerciseCard from './ExerciseCard'
import AddExerciseForm from './AddExerciseForm'
import { EXERCISES } from '../data/exercises.js'

function ExerciseLibrary({ plan, onAddToPlan }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeGroup, setActiveGroup] = useState('All')
  const [customExercises, setCustomExercises] = useState([])

  function handleAddExercise(exercise) {
    setCustomExercises((prev) => [...prev, exercise])
  }

  const allExercises = [...EXERCISES, ...customExercises]
  const normalizedSearch = searchTerm.toLowerCase()
  const filteredExercises = allExercises.filter(
    (exercise) =>
      (activeGroup === 'All' || exercise.muscleGroup === activeGroup) &&
      exercise.name.toLowerCase().includes(normalizedSearch)
  )

  return (
    <div className="exercise-library">
      <h2 className="section-heading">Exercise Library</h2>
      <FilterBar activeGroup={activeGroup} onSelect={(group) => setActiveGroup(group)} />
      <label className="sr-only" htmlFor="exercise-search">Search exercises</label>
      <input
        id="exercise-search"
        className="search-input"
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AddExerciseForm onAddExercise={handleAddExercise} />
      {filteredExercises.length === 0 ? (
        <p className="empty-message">No exercises match your search.</p>
      ) : (
        filteredExercises.map((exercise) => {
          const isAdded = plan.some((item) => item.id === exercise.id)
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isAdded={isAdded}
              onAdd={() => onAddToPlan(exercise)}
            />
          )
        })
      )}
    </div>
  )
}

export default ExerciseLibrary
