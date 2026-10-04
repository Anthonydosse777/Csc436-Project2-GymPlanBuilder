import PlanSummary from './PlanSummary'
import PlanItem from './PlanItem'
import useReveal from '../hooks/useReveal'

function PlanPanel({ planName, plan, onRemoveFromPlan }) {
  const [revealRef, isVisible] = useReveal()

  return (
    <div ref={revealRef} className={`card plan-panel reveal${isVisible ? ' is-visible' : ''}`}>
      <p className="plan-panel-label">Current plan</p>
      <h2 className="section-heading plan-panel-title">{planName.trim() || 'Untitled Plan'}</h2>
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
