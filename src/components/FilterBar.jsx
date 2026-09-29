const GROUPS = ['All', 'Push', 'Pull', 'Legs', 'Core']

function FilterBar({ activeGroup, onSelect }) {
  return (
    <div>
      {GROUPS.map((group) => (
        <button
          key={group}
          type="button"
          className={group === activeGroup ? 'active' : ''}
          onClick={() => onSelect(group)}
        >
          {group}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
