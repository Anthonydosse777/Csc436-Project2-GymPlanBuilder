function PlanSummary({ plan }) {
  const muscleGroups = [...new Set(plan.map((exercise) => exercise.muscleGroup))]

  return (
    <div className="plan-summary">
      <p>Total exercises: {plan.length}</p>
      <p>Muscle groups: {muscleGroups.length > 0 ? muscleGroups.join(', ') : 'None'}</p>
      {muscleGroups.length < 4 && (
        <p className="summary-tip">Add exercises from other muscle groups for a balanced plan.</p>
      )}
    </div>
  )
}

export default PlanSummary
