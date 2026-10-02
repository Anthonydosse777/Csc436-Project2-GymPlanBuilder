const GROUPS = ['All', 'Push', 'Pull', 'Legs', 'Core']

function FilterBar({ activeGroup, onSelect }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter by muscle group">
      {GROUPS.map((group) => (
        <button
          key={group}
          type="button"
          className={group === activeGroup ? 'active' : ''}
          aria-pressed={group === activeGroup}
          onClick={() => onSelect(group)}
        >
          {group}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
