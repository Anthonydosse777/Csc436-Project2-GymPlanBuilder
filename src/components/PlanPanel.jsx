import PlanSummary from './PlanSummary'
import PlanItem from './PlanItem'

function PlanPanel({ planName, plan, onRemoveFromPlan }) {
  return (
    <div className="plan-panel">
      <p className="plan-panel-label">Current plan</p>
      <h2 className="plan-panel-title">{planName.trim() || 'Untitled Plan'}</h2>
      {plan.length === 0 ? (
        <p className="empty-message">Your plan is empty. Add exercises from the library.</p>
      ) : (
        plan.map((exercise) => (
          <PlanItem
            key={exercise.id}
            item={exercise}
            onRemove={() => onRemoveFromPlan(exercise.id)}
          />
        ))
      )}
      <PlanSummary plan={plan} />
    </div>
  )
}

export default PlanPanel
