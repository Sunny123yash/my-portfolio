import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import YashAIChat from './YashAIChat'

function ChatBubble() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center shadow-lg shadow-cyan/20"
        aria-label="Open Yash AI"
      >
        <span className="text-2xl">{open ? '✕' : '🤖'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] shadow-2xl"
          >
            <YashAIChat compact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBubble