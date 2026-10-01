import { useState } from 'react'

function AddExerciseForm({ onAddExercise }) {
  const [name, setName] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('Push')
  const [equipment, setEquipment] = useState('')
  const [difficulty, setDifficulty] = useState('Beginner')
  const [description, setDescription] = useState('')
  const [showError, setShowError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (name.trim() === '' || description.trim() === '') {
      setShowError(true)
      return
    }

    onAddExercise({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      muscleGroup,
      equipment: equipment.trim(),
      difficulty,
      description: description.trim(),
    })

    setName('')
    setMuscleGroup('Push')
    setEquipment('')
    setDifficulty('Beginner')
    setDescription('')
    setShowError(false)
  }

  return (
    <form className="add-exercise-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
        <option value="Push">Push</option>
        <option value="Pull">Pull</option>
        <option value="Legs">Legs</option>
        <option value="Core">Core</option>
      </select>
      <input
        type="text"
        placeholder="Equipment (e.g. Barbell, Dumbbell, Bodyweight)"
        value={equipment}
        onChange={(e) => setEquipment(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {showError && <p className="form-error">Name and description are required.</p>}
      <button className="form-submit" type="submit">Add Exercise</button>
    </form>
  )
}

export default AddExerciseForm
