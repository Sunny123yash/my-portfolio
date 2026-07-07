import { useState, useEffect } from 'react'
import NeuralBackground from './NeuralBackground'
import { useTheme } from '../hooks/useTheme'

const ROLES = ['AI & ML Engineer', 'Data Analyst', 'Full-Stack Developer']

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/yashwanth_68',
    gradient: 'from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="white" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/yashwanth143_68',
    gradient: 'from-black to-neutral-800',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-4.5 h-4.5">
        <path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.94l-5.43-7.11L4.14 22H.87l8.02-9.17L1.5 2h7.1l4.9 6.5L18.244 2Zm-1.22 18h1.93L7.06 4h-1.98l11.94 16Z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Sunny123yash',
    gradient: 'from-[#333] to-[#111]',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yashwanthkumarthammishetti',
    gradient: 'from-[#0077B5] to-[#00A0DC]',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.83v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.8c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.77-2.6 3.58V23h-4V8Z" />
      </svg>
    ),
  },
]

function useTypewriter(words, speed = 80, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

function Hero() {
  const typed = useTypewriter(ROLES)
  const { isLight, toggleTheme } = useTheme()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralBackground />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-24 right-6 z-40 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan/40 hover:scale-110 transition-all duration-300"
      >
        <span className="text-lg">{isLight ? '🌙' : '☀️'}</span>
      </button>

      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-cyan text-sm tracking-widest uppercase mb-4">
          Computer Science Undergrad
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-text mb-4">
          Yashwanth Kumar
        </h1>
        <div className="font-mono text-xl md:text-2xl text-violet h-8 mb-8">
          {typed}
          <span className="animate-pulse">|</span>
        </div>
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 bg-cyan text-bg font-mono text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            Download Resume
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-white/20 text-text font-mono text-sm rounded-full hover:border-cyan transition-colors"
          >
            View Projects
          </a>
        </div>

        {/* Social icons */}
        <div className="flex gap-4 justify-center">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${social.gradient} flex items-center justify-center border border-white/10 hover:scale-110 hover:shadow-lg transition-transform duration-300`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero