import { motion } from 'framer-motion'
import YashAIChat from './YashAIChat'

function YashAISection() {
  return (
    <section id="yash-ai" className="relative py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-cyan text-sm tracking-widest uppercase mb-2"
        >
          🤖 Meet
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-text mb-4"
        >
          Yash AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-text/70 mb-10"
        >
          My personal AI assistant, trained on everything about me. Ask it anything. 🚀
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <YashAIChat />
        </motion.div>
      </div>
    </section>
  )
}

export default YashAISection