function Header({ planName, onPlanNameChange }) {
  return (
    <header className="app-header">
      <h1>
        <label className="sr-only" htmlFor="plan-name">Plan name</label>
        <input
          id="plan-name"
          className="plan-name-input"
          type="text"
          value={planName}
          placeholder="Name your plan"
          onChange={(e) => onPlanNameChange(e.target.value)}
        />
      </h1>
    </header>
  )
}

export default Header
