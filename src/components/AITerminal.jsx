import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import knowledgeBase from '../data/knowledgeBase'

const LINKS = {
  github: 'https://github.com/Sunny123yash',
  linkedin: 'https://www.linkedin.com/in/yashwanthkumarthammishetti',
  resume: '/resume.pdf',
  instagram: 'https://instagram.com/yashwanth_68',
  x: 'https://x.com/yashwanth143_68',
  leetcode: 'https://leetcode.com/yashwanth_122',
  email: 'yashuthammishetti@gmail.com',
  phone: '+91 6304147149',
}

const SECTION_IDS = {
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  contact: 'contact',
  bot: 'yash-ai',
}

function AITerminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([
    { type: 'system', text: 'Yash Terminal v1.0 — type "help" to see available commands.' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const print = (text, type = 'output') => {
    setLines((l) => [...l, { type, text }])
  }

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setLines((l) => [...l, { type: 'input', text: raw }])
    setHistory((h) => [...h, raw])
    setHistoryIndex(-1)

    switch (cmd) {
      case 'help':
        print(
          [
            'Available commands:',
            '  help         Show this list',
            '  about        Jump to About section',
            '  skills       Jump to Skills section',
            '  projects     Jump to Projects section',
            '  experience   Show experience summary',
            '  achievements Show achievements',
            '  education    Show education details',
            '  hobbies      Show hobbies',
            '  interests    Show areas of interest',
            '  goals        Show career goals',
            '  social       Show all social links',
            '  contact      Jump to Contact section',
            '  email        Show email address',
            '  phone        Show phone number',
            '  resume       Open resume PDF',
            '  github       Open GitHub profile',
            '  linkedin     Open LinkedIn profile',
            '  instagram    Open Instagram profile',
            '  x            Open X (Twitter) profile',
            '  leetcode     Open LeetCode profile',
            '  whoami       Who is this, again?',
            '  date         Show current date/time',
            '  theme        Toggle light/dark theme',
            '  bot          Jump to Yash AI chat',
            '  matrix       ...you\'ll see',
            '  clear        Clear the terminal',
          ].join('\n')
        )
        break

      case 'about':
        print('Navigating to About section...')
        scrollToSection(SECTION_IDS.about)
        break

      case 'skills': {
        const s = knowledgeBase.skills
        print(`Navigating to Skills section...\n💻 ${s.programming.join(', ')} | 🎨 ${s.frontend.join(', ')} | 🤖 ${s.ai.join(', ')}`)
        scrollToSection(SECTION_IDS.skills)
        break
      }

      case 'projects':
        print('Navigating to Projects section...')
        scrollToSection(SECTION_IDS.projects)
        break

      case 'experience':
        print(`🏢 ${knowledgeBase.experience.role} at ${knowledgeBase.experience.company}\n${knowledgeBase.experience.description}`)
        break

      case 'achievements':
        print(knowledgeBase.achievements.map((a) => `🏅 ${a}`).join('\n'))
        break

      case 'education': {
        const { diploma, btech } = knowledgeBase.education
        print(`🎓 ${diploma.degree} — ${diploma.college} (${diploma.status})\n🎓 ${btech.degree} via ${btech.mode} (${btech.status})`)
        break
      }

      case 'hobbies':
        print(knowledgeBase.hobbies.map((h) => `🎯 ${h}`).join('\n'))
        break

      case 'interests':
        print(knowledgeBase.interests.join(', '))
        break

      case 'goals':
        print(`📍 Short-term: ${knowledgeBase.goals.shortTerm}\n🎯 Long-term: ${knowledgeBase.goals.longTerm}`)
        break

      case 'social':
        print(
          [
            `GitHub:    ${LINKS.github}`,
            `LinkedIn:  ${LINKS.linkedin}`,
            `Instagram: ${LINKS.instagram}`,
            `X:         ${LINKS.x}`,
            `LeetCode:  ${LINKS.leetcode}`,
          ].join('\n')
        )
        break

      case 'email':
        print(`📧 ${LINKS.email}`)
        break

      case 'phone':
        print(`📱 ${LINKS.phone}`)
        break
    case 'theme':
        document.documentElement.classList.toggle('light-theme')
        print('Theme toggled. (Note: full light-mode styling may need setup.)')
        break

      case 'resume':
        print('Opening resume...')
        window.open(LINKS.resume, '_blank')
        break

      case 'contact':
        print('Navigating to Contact section...')
        scrollToSection(SECTION_IDS.contact)
        break

      case 'github':
        print(`Opening GitHub: ${LINKS.github}`)
        window.open(LINKS.github, '_blank')
        break

      case 'linkedin':
        print(`Opening LinkedIn: ${LINKS.linkedin}`)
        window.open(LINKS.linkedin, '_blank')
        break

      case 'instagram':
        print(`Opening Instagram: ${LINKS.instagram}`)
        window.open(LINKS.instagram, '_blank')
        break

      case 'x':
        print(`Opening X: ${LINKS.x}`)
        window.open(LINKS.x, '_blank')
        break

      case 'leetcode':
        print(`Opening LeetCode: ${LINKS.leetcode}`)
        window.open(LINKS.leetcode, '_blank')
        break

      case 'whoami':
        print(`${knowledgeBase.profile.name} — ${knowledgeBase.profile.title} 🚀`)
        break

      case 'sudo':
        print('Nice try 😏 — you don\'t have root access here. Check out "github" for the source instead.', 'error')
        break

      case 'date':
        print(new Date().toString())
        break

      case 'matrix':
        print('Wake up, recruiter... 💊\nThere is no spoon, only clean code.')
        break

      case 'bot':
        print('Navigating to Yash AI chat...')
        scrollToSection(SECTION_IDS.bot)
        break

      case 'clear':
        setLines([])
        return

      default:
        print(`Command not found: "${cmd}". Type "help" to see available commands.`, 'error')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      }
    }
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center shadow-lg shadow-violet/20 font-mono"
        aria-label="Open AI Terminal"
      >
        <span className="text-xl text-bg font-bold">{open ? '✕' : '>_'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-50 w-[360px] md:w-[420px] shadow-2xl"
          >
            <div className="flex flex-col h-[420px] bg-black/90 border border-white/10 rounded-2xl overflow-hidden font-mono text-sm">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-text/50 text-xs">yash@portfolio: ~</span>
              </div>

              {/* Output */}
              <div
                className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-line ${
                      line.type === 'input'
                        ? 'text-cyan'
                        : line.type === 'error'
                        ? 'text-red-400'
                        : line.type === 'system'
                        ? 'text-text/50'
                        : 'text-text/85'
                    }`}
                  >
                    {line.type === 'input' ? `$ ${line.text}` : line.text}
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              {/* Input line */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
                <span className="text-cyan">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command..."
                  className="flex-1 bg-transparent text-text focus:outline-none placeholder:text-text/30"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AITerminal