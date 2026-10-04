function PlanItem({ item, onUpdate, onRemove, onMove }) {
  return (
    <div className="card plan-item">
      <span className="plan-item-name">{item.name}</span>
      <button className="remove-button" type="button" onClick={onRemove} aria-label={`Remove ${item.name}`}>Remove</button>
    </div>
  )
}

export default PlanItem
