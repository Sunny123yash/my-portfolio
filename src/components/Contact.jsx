import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTACT_LINKS = [
  { label: 'Email', value: 'yashuthammishetti@gmail.com', href: 'mailto:yashuthammishetti@gmail.com', icon: '📧' },
  { label: 'Phone', value: '+91 6304147149', href: 'tel:+916304147149', icon: '📱' },
  { label: 'GitHub', value: '@Sunny123yash', href: 'https://github.com/Sunny123yash', icon: '💻' },
  { label: 'LinkedIn', value: 'Connect with me', href: 'https://www.linkedin.com/in/yashwanthkumarthammishetti', icon: '🔗' },
  { label: 'LeetCode', value: 'View my profile', href: 'https://leetcode.com/yashwanth_122', icon: '🧩' },
]

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xqevoawy', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-cyan text-sm tracking-widest uppercase mb-2"
        >
          📬 Get In Touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-text mb-4"
        >
          Contact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-text/70 mb-12 max-w-xl"
        >
          Have an opportunity, a project idea, or just want to connect? My inbox is always open. 🚀
        </motion.p>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact links - left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-3"
          >
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-cyan/40 transition-colors"
              >
                <span className="text-2xl">{link.icon}</span>
                <div>
                  <div className="font-mono text-xs text-text/50 uppercase tracking-wide">
                    {link.label}
                  </div>
                  <div className="text-text font-medium text-sm">{link.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form - right */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-4"
          >
            <div>
              <label className="block font-mono text-xs text-text/60 uppercase tracking-wide mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text focus:border-cyan/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-text/60 uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text focus:border-cyan/50 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-text/60 uppercase tracking-wide mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text focus:border-cyan/50 focus:outline-none transition-colors resize-none"
                placeholder="What would you like to talk about?"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan to-violet text-bg font-semibold disabled:opacity-60 transition-opacity"
            >
              {status === 'sending' ? 'Sending... ⏳' : 'Send Message 🚀'}
            </motion.button>

            {status === 'sent' && (
              <p className="text-green-400 text-sm font-mono text-center">
                ✅ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm font-mono text-center">
                ❌ Something went wrong — try emailing me directly instead.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact