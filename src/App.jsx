import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ExerciseLibrary from './components/ExerciseLibrary'
import PlanPanel from './components/PlanPanel'

function App() {
  const [plan, setPlan] = useState([])

  function handleAddToPlan(exercise) {
    setPlan((prevPlan) => {
      if (prevPlan.some((item) => item.id === exercise.id)) {
        return prevPlan
      }
      return [...prevPlan, exercise]
    })
  }

  function handleRemoveFromPlan(exerciseId) {
    setPlan((prevPlan) => prevPlan.filter((item) => item.id !== exerciseId))
  }

  return (
    <>
      <Header planName="My Workout Plan" />
      <main>
        <ExerciseLibrary plan={plan} onAddToPlan={handleAddToPlan} />
        <PlanPanel plan={plan} onRemoveFromPlan={handleRemoveFromPlan} />
      </main>
    </>
  )
}

export default App
