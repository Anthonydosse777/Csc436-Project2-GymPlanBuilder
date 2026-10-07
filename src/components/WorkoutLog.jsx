import LogForm from './LogForm'
import ProgressPanel from './ProgressPanel'
import LogHistory from './LogHistory'

function WorkoutLog({ workoutLog, plan, onAddEntry, onDeleteEntry }) {
  return (
    <div className="app-layout">
      <LogForm plan={plan} onAddEntry={onAddEntry} />
      <ProgressPanel workoutLog={workoutLog} />
      <LogHistory workoutLog={workoutLog} onDeleteEntry={onDeleteEntry} />
    </div>
  )
}

export default WorkoutLog
