function PlanItem({ item, onUpdate, onRemove, onMove }) {
  return (
    <div className="plan-item">
      <span className="plan-item-name">{item.name}</span>
      <button className="remove-button" onClick={onRemove}>Remove</button>
    </div>
  )
}

export default PlanItem
