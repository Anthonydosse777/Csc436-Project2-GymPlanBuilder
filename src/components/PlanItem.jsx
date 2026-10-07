function PlanItem({ item, onRemove }) {
  return (
    <div className="card list-row">
      <span className="list-row-title">{item.name}</span>
      <button className="remove-button" type="button" onClick={onRemove} aria-label={`Remove ${item.name}`}>Remove</button>
    </div>
  )
}

export default PlanItem
