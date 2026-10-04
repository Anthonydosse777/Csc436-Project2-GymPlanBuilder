import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ExerciseLibrary from './components/ExerciseLibrary'
import PlanPanel from './components/PlanPanel'

const THEME_STORAGE_KEY = 'gym-plan-builder-theme'

function getInitialTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function App() {
  const [plan, setPlan] = useState([])
  const [planName, setPlanName] = useState('My Workout Plan')
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage unavailable (e.g. private mode); the theme still applies for this visit.
    }
  }, [theme])

  function handleToggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

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
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="container">
        <Hero planName={planName} onPlanNameChange={setPlanName} />
        <div className="app-layout">
          <ExerciseLibrary plan={plan} onAddToPlan={handleAddToPlan} />
          <PlanPanel planName={planName} plan={plan} onRemoveFromPlan={handleRemoveFromPlan} />
        </div>
      </main>
    </>
  )
}

export default App
