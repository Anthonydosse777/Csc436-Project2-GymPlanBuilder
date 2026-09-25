function PlanItem({ item, onUpdate, onRemove, onMove }) {
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

export default PlanItem
