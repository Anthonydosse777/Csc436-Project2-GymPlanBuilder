import './App.css'
import Header from './components/Header'
import ExerciseLibrary from './components/ExerciseLibrary'
import PlanPanel from './components/PlanPanel'

function App() {
  return (
    <>
      <Header planName="My Workout Plan" />
      <main>
        <ExerciseLibrary />
        <PlanPanel />
      </main>
    </>
  )
}

export default App
