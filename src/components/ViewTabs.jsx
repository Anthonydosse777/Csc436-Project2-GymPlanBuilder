const VIEWS = [
  { id: 'builder', label: 'Plan Builder' },
  { id: 'log', label: 'Workout Log' },
]

function ViewTabs({ activeView, onSelect }) {
  return (
    <div className="pill-group view-tabs" role="group" aria-label="Choose a view">
      {VIEWS.map((view) => (
        <button
          key={view.id}
          type="button"
          aria-pressed={view.id === activeView}
          aria-controls={`${view.id}-view`}
          onClick={() => onSelect(view.id)}
        >
          {view.label}
        </button>
      ))}
    </div>
  )
}

export default ViewTabs
