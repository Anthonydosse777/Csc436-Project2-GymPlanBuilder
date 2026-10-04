function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button className="theme-toggle" type="button" aria-pressed={isLight} onClick={onToggle}>
      {isLight ? 'Black background' : 'White background'}
    </button>
  )
}

export default ThemeToggle
