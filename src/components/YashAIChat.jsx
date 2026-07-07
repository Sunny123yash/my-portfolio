import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { matchQuestion } from '../data/yashQuery'
import knowledgeBase from '../data/knowledgeBase'

const SUGGESTIONS = knowledgeBase.sampleQuestions.slice(0, 5)

function YashAIChat({ compact = false }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: knowledgeBase.chatbotGreeting },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, typing])

  const send = async (text) => {
    const question = text ?? input
    if (!question.trim()) return

    setMessages((m) => [...m, { role: 'user', text: question }])
    setInput('')
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) throw new Error('API failed')

      const data = await res.json()
      setMessages((m) => [...m, { role: 'bot', text: data.answer }])
    } catch (err) {
      // Fallback to offline knowledge base if the API fails or isn't set up
      const fallback = matchQuestion(question)
      setMessages((m) => [...m, { role: 'bot', text: fallback }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className={`flex flex-col ${compact ? 'h-96' : 'h-[500px]'} bg-white/5 border border-white/10 rounded-2xl overflow-hidden`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-cyan to-violet text-bg font-medium'
                  : 'bg-white/10 text-text border border-white/10'
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="text-xs font-mono px-3 py-1 rounded-full border border-cyan/30 text-cyan/90 hover:bg-cyan/10 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-white/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask Yash AI something..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text focus:outline-none focus:border-cyan/50"
        />
        <button
          onClick={() => send()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan to-violet text-bg font-bold shrink-0"
        >
          →
        </button>
      </div>
    </div>
  )
}

export default YashAIChat