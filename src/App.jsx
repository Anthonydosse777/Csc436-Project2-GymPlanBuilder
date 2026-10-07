import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ExerciseLibrary from './components/ExerciseLibrary'
import PlanPanel from './components/PlanPanel'
import ViewTabs from './components/ViewTabs'
import WorkoutLog from './components/WorkoutLog'

const THEME_STORAGE_KEY = 'gym-plan-builder-theme'
const LOG_STORAGE_KEY = 'gym-plan-builder-log'

function getInitialTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function getInitialLog() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function App() {
  const [plan, setPlan] = useState([])
  const [planName, setPlanName] = useState('My Workout Plan')
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeView, setActiveView] = useState('builder')
  const [workoutLog, setWorkoutLog] = useState(getInitialLog)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage unavailable (e.g. private mode); the theme still applies for this visit.
    }
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(workoutLog))
    } catch {
      // Storage unavailable; the log still works for this visit.
    }
  }, [workoutLog])

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

  function handleAddLogEntry(entry) {
    setWorkoutLog((prevLog) => [...prevLog, entry])
  }

  function handleDeleteLogEntry(entryId) {
    setWorkoutLog((prevLog) => prevLog.filter((entry) => entry.id !== entryId))
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="container">
        <Hero planName={planName} onPlanNameChange={setPlanName} />
        <ViewTabs activeView={activeView} onSelect={setActiveView} />
        {/* Both views stay mounted so their local state survives switching tabs. */}
        <div id="builder-view" className="app-layout" hidden={activeView !== 'builder'}>
          <ExerciseLibrary plan={plan} onAddToPlan={handleAddToPlan} />
          <PlanPanel planName={planName} plan={plan} onRemoveFromPlan={handleRemoveFromPlan} />
        </div>
        <div id="log-view" hidden={activeView !== 'log'}>
          <WorkoutLog
            workoutLog={workoutLog}
            plan={plan}
            onAddEntry={handleAddLogEntry}
            onDeleteEntry={handleDeleteLogEntry}
          />
        </div>
      </main>
    </>
  )
}

export default App
