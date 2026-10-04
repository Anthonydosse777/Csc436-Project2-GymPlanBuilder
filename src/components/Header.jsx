import ThemeToggle from './ThemeToggle'

function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <p className="brand">Gym Plan Builder</p>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

export default Header
