import useReveal from '../hooks/useReveal'

function Hero({ planName, onPlanNameChange }) {
  const [revealRef, isVisible] = useReveal()

  return (
    <section ref={revealRef} className={`hero reveal${isVisible ? ' is-visible' : ''}`}>
      <div className="hero-content">
        <p className="eyebrow">Your personal program</p>
        {/* The visible headline is the input, so the h1 itself only carries the name for screen readers. */}
        <div className="hero-title">
          <h1 className="sr-only">{planName.trim() || 'Untitled Plan'}</h1>
          <label className="sr-only" htmlFor="plan-name">Plan name</label>
          <input
            id="plan-name"
            className="plan-name-input"
            type="text"
            value={planName}
            placeholder="Name your plan"
            onChange={(e) => onPlanNameChange(e.target.value)}
          />
        </div>
        <p className="hero-text">
          Browse the exercise library, filter by Push, Pull, Legs or Core, and add the movements
          that fit your goals. Every exercise lists its equipment and difficulty, so you can match
          the plan to your gym and your experience level.
        </p>
        <p className="hero-text">
          Click the headline to rename your plan. The plan panel keeps a running total and points
          out missing muscle groups, so you finish with a balanced session that trains your whole
          body.
        </p>
      </div>
    </section>
  )
}

export default Hero
