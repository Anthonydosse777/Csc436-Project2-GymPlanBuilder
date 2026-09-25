import PlanSummary from './PlanSummary'
import PlanItem from './PlanItem'

function PlanPanel({ plan, onRemoveFromPlan }) {
  return (
    <div>
      {plan.length === 0 ? (
        <p>Your plan is empty. Add exercises from the library.</p>
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
