import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ExerciseLibrary from './components/ExerciseLibrary'
import PlanPanel from './components/PlanPanel'

function App() {
  const [plan, setPlan] = useState([])
  const [planName, setPlanName] = useState('My Workout Plan')

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
      <Header planName={planName} onPlanNameChange={setPlanName} />
      <main className="app-layout">
        <ExerciseLibrary plan={plan} onAddToPlan={handleAddToPlan} />
        <PlanPanel planName={planName} plan={plan} onRemoveFromPlan={handleRemoveFromPlan} />
      </main>
    </>
  )
}

export default App
