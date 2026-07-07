import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_USERNAME = 'Sunny123yash'

function ProjectCard({ repo, index }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan/50 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-mono text-lg text-text font-semibold">{repo.name}</h3>
        <span className="text-cyan text-sm">★ {repo.stargazers_count}</span>
      </div>
      <p className="text-text/70 text-sm mb-4 line-clamp-2">
        {repo.description || 'No description provided.'}
      </p>
      <div className="flex gap-3 text-xs font-mono text-text/50">
        {repo.language && <span>{repo.language}</span>}
        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </motion.a>
  )
}

function SkeletonCard() {
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-5 w-2/3 bg-white/10 rounded" />
        <div className="h-4 w-10 bg-white/10 rounded" />
      </div>
      <div className="h-3 w-full bg-white/10 rounded mb-2" />
      <div className="h-3 w-4/5 bg-white/10 rounded mb-4" />
      <div className="flex gap-3">
        <div className="h-3 w-16 bg-white/10 rounded" />
        <div className="h-3 w-24 bg-white/10 rounded" />
      </div>
    </div>
  )
}

function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos')
        return res.json()
      })
      .then((data) => {
        const filtered = data.filter((r) => !r.fork)
        setRepos(filtered)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-cyan text-sm tracking-widest uppercase mb-2"
        >
          Straight From GitHub
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold text-text mb-12"
        >
          Projects
        </motion.h2>

        {error && <p className="text-red-400 font-mono text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo, i) => <ProjectCard key={repo.id} repo={repo} index={i} />)}
        </div>
      </div>
    </section>
  )
}

export default Projects