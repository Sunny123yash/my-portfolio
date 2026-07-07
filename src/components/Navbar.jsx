const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-bg/60 border-b border-white/5">
      <span className="font-display text-lg tracking-wide text-text">
        yash<span className="text-cyan">.</span>
      </span>
      <ul className="hidden md:flex gap-8 font-mono text-sm text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-cyan transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar