function PlanSummary({ plan }) {
  const muscleGroups = [...new Set(plan.map((exercise) => exercise.muscleGroup))]

  return (
    <div>
      <p>Total exercises: {plan.length}</p>
      <p>Muscle groups: {muscleGroups.length > 0 ? muscleGroups.join(', ') : 'None'}</p>
      {muscleGroups.length < 4 && (
        <p>Add exercises from other muscle groups for a balanced plan.</p>
      )}
    </div>
  )
}

export default PlanSummary
