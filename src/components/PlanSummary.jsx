function PlanSummary({ plan }) {
  const muscleGroups = [...new Set(plan.map((exercise) => exercise.muscleGroup))]

  return (
    <div className="stat-card plan-summary">
      <p className="stat">
        <span className="stat-value">{plan.length}</span>
        <span className="stat-label">Total exercises</span>
      </p>
      <p className="stat">
        <span className="stat-label">Muscle groups</span>
        <span>{muscleGroups.length > 0 ? muscleGroups.join(', ') : 'None'}</span>
      </p>
      {muscleGroups.length < 4 && (
        <p className="summary-tip">Add exercises from other muscle groups for a balanced plan.</p>
      )}
    </div>
  )
}

export default PlanSummary
