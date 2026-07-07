import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiC, SiPython, SiJavascript, SiHtml5, SiCss, SiMysql,
  SiReact, SiNodedotjs, SiExpress, SiFlask, SiTailwindcss,
  SiMongodb, SiGit, SiGithub, SiVercel, SiPhp
} from 'react-icons/si'
import { FaFileExcel } from 'react-icons/fa'

const CATEGORIES = ['All', 'Languages', 'Frameworks', 'Databases', 'Tools', 'Learning']

const SKILLS = [
  { name: 'C', icon: SiC, category: 'Languages', color: '#A8B9CC' },
  { name: 'Python', icon: SiPython, category: 'Languages', color: '#3776AB' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Languages', color: '#F7DF1E' },
  { name: 'SQL', icon: SiMysql, category: 'Languages', color: '#4479A1' },
  { name: 'HTML', icon: SiHtml5, category: 'Languages', color: '#E34F26' },
  { name: 'CSS', icon: SiCss, category: 'Languages', color: '#1572B6' },

  { name: 'React', icon: SiReact, category: 'Frameworks', color: '#61DAFB', project: 'This portfolio' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Frameworks', color: '#339933', project: 'Gig Finder, This portfolio' },
  { name: 'Express', icon: SiExpress, category: 'Frameworks', color: '#ffffff' },
  { name: 'Flask', icon: SiFlask, category: 'Frameworks', color: '#ffffff', project: 'Gig Finder' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frameworks', color: '#06B6D4', project: 'This portfolio' },

  { name: 'MongoDB', icon: SiMongodb, category: 'Databases', color: '#47A248', project: 'Gig Finder, Brain Tumor Detection' },

  { name: 'Git', icon: SiGit, category: 'Tools', color: '#F05032', project: 'Gig Finder, This portfolio' },
  { name: 'GitHub', icon: SiGithub, category: 'Tools', color: '#ffffff', project: 'Gig Finder, This portfolio' },
  { name: 'Vercel', icon: SiVercel, category: 'Tools', color: '#ffffff', project: 'Gig Finder, This portfolio, Brain Tumor Detection' },
  { name: 'Excel', icon: FaFileExcel, category: 'Tools', color: '#217346', project: 'Dataset handling in Brain Tumor Detection' },

  { name: 'DSA', icon: SiC, category: 'Learning', color: '#A78BFA', note: 'In progress — GfG SkillUp' },
  { name: 'PHP', icon: SiPhp, category: 'Learning', color: '#777BB4', note: 'Basics' },
]

function SkillCard({ skill }) {
  const Icon = skill.icon
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden"
      style={{ minHeight: '120px' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
        style={{ background: skill.color }}
      />
      <Icon
        size={32}
        style={{ color: skill.color }}
        className="relative z-10 transition-transform duration-300 group-hover:scale-110"
      />
      <span className="relative z-10 font-mono text-sm text-text text-center">
        {skill.name}
      </span>

      {(skill.project || skill.note) && (
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-sm rounded-2xl flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <p className="font-mono text-xs text-cyan text-center leading-snug">
            {skill.project ? `Used in: ${skill.project}` : skill.note}
          </p>
        </div>
      )}
    </motion.div>
  )
}

function Skills() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === active)

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-cyan text-sm tracking-widest uppercase mb-2"
        >
          What I Work With
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-text mb-8"
        >
          Skills
        </motion.h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wide transition-colors ${
                active === cat
                  ? 'bg-cyan text-bg'
                  : 'bg-white/5 text-text/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills