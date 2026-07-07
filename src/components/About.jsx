import { motion } from 'framer-motion'

function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-cyan text-sm tracking-widest uppercase mb-2"
        >
          🙋 Who I Am
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-text mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Text - left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 space-y-5"
          >
            <p className="text-text/80 leading-relaxed">
              👋 Hey, I'm <span className="text-cyan font-semibold">Yashwanth</span> —
              a Computer Science undergrad at VNR Vignana Jyothi Institute of
              Engineering and Technology, with a strong foundation in AI &
              Machine Learning. I love turning ideas into working software
              through hands-on projects and problem-solving. 🚀
            </p>
            <p className="text-text/80 leading-relaxed">
              💻 My core is C, Python, SQL, and web fundamentals (HTML/CSS/PHP) —
              extended into ML tooling like NumPy, Pandas, OpenCV, and
              Scikit-learn, plus Flask for backend work. I trained during a
              6-month Industrial Traineeship at Infogrow, building real AI/ML
              workflows end-to-end. 🧠
            </p>
            <p className="text-text/80 leading-relaxed">
              🤝 I've contributed backend and database work to GigFinder (a
              freelance/internship platform using Supabase + PostgreSQL), and
              led dataset collection and model training for a Brain Tumor
              Detection deep learning project.
            </p>

            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {[
                '🏅 AP ECET 2026 – State Rank 10',
                '🏅 TG ECET 2026 – Branch Rank 5',
                '🥉 3rd Place – College Hackathon',
                '🎖️ NSS Certificate – Community Service',
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 text-cyan/90"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="border-l-2 border-cyan/50 pl-5 italic text-text/70 my-6"
            >
              "The expert in anything was once a beginner who refused to give up." ✨
              <footer className="text-sm text-text/50 not-italic mt-1">— Helen Hayes</footer>
            </motion.blockquote>

            <div className="pt-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-cyan border border-cyan/40 rounded-full px-5 py-2 hover:bg-cyan/10 transition-colors"
              >
                📄 View Resume →
              </a>
            </div>
          </motion.div>

          {/* Picture - right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 flex flex-col items-center justify-start gap-6"
          >
            {/* Intro card above the photo */}
            <div className="w-full text-center space-y-3">
              <div className="font-display text-xl font-semibold text-text">
                Yashwanth Kumar Thammishetti
              </div>
              <div className="font-mono text-sm text-cyan">
                CSE Undergrad · AI/ML Enthusiast
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-text/70">
                  📍 India
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-green-400/30 bg-green-400/5 text-green-400">
                  🟢 Open to Opportunities
                </span>
              </div>
            </div>

            {/* Photo with premium hover overlay */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan to-violet rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/profile.jpeg"
                  alt="Yashwanth Kumar Thammishetti"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-6 text-center">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-display text-lg font-semibold text-text mb-1">
                      Yashwanth Kumar 👋
                    </p>
                    <p className="font-mono text-xs text-cyan tracking-wide">
                      Building AI-powered ideas into reality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About