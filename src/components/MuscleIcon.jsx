const icons = {
  Push: (
    <>
      <path d="M4 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  Pull: (
    <>
      <path d="M20 12H6" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  Legs: (
    <>
      <path d="M5 8l7 7 7-7" />
      <path d="M5 4l7 7 7-7" />
    </>
  ),
  Core: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </>
  ),
}

function MuscleIcon({ muscleGroup }) {
  return (
    <svg
      className="muscle-icon"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={`${muscleGroup} icon`}
    >
      {icons[muscleGroup] ?? icons.Core}
    </svg>
  )
}

export default MuscleIcon
