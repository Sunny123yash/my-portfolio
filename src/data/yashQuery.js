import knowledgeBase from './knowledgeBase'

// ---------- Length detection ----------
const ONE_LINE_PHRASES = ['in one line', 'one liner', 'one sentence', 'single line']
const SHORT_PHRASES = ['in short', 'briefly', 'brief', 'short answer', 'quickly', 'quick', 'tldr', 'tl;dr', 'summary', 'summarize', 'in a nutshell', 'give me short']
const LONG_PHRASES = ['in detail', 'in depth', 'elaborate', 'explain fully', 'more detail', 'tell me more', 'full detail', 'complete detail', 'everything about']

function detectLength(input) {
  const q = input.toLowerCase()
  if (ONE_LINE_PHRASES.some((p) => q.includes(p))) return 'one_line'
  if (SHORT_PHRASES.some((p) => q.includes(p))) return 'short'
  if (LONG_PHRASES.some((p) => q.includes(p))) return 'long'
  return 'default'
}

function stripModifiers(input) {
  let q = input.toLowerCase()
  ;[...ONE_LINE_PHRASES, ...SHORT_PHRASES, ...LONG_PHRASES].forEach((p) => {
    q = q.replace(p, '')
  })
  return q.trim()
}

// ---------- Intents with short / default / long variants ----------
const INTENTS = [
  {
    keywords: ['who are you', 'who is yash', 'introduce', 'tell me about yourself', 'about you', 'about yash'],
    one_line: () => `${knowledgeBase.profile.shortName} — an aspiring ${knowledgeBase.profile.title} from ${knowledgeBase.profile.location}.`,
    short: () => `I'm ${knowledgeBase.profile.name}, an aspiring ${knowledgeBase.profile.title}. ${knowledgeBase.profile.tagline}`,
    default: () => `I'm ${knowledgeBase.profile.name}, an aspiring ${knowledgeBase.profile.title} based in ${knowledgeBase.profile.location}. ${knowledgeBase.profile.tagline}`,
    long: () => knowledgeBase.about.trim(),
  },
  {
    keywords: ['education', 'diploma', 'btech', 'college', 'degree', 'study', 'ecet'],
    one_line: () => `Diploma in AI & ML from GIOE, now pursuing B.Tech via lateral entry (TG ECET 2026 Branch Rank 5).`,
    short: () => {
      const { diploma, btech } = knowledgeBase.education
      return `🎓 ${diploma.degree} (${diploma.status}) → now ${btech.status.toLowerCase()} ${btech.degree} via ${btech.mode}.`
    },
    default: () => {
      const { diploma, btech } = knowledgeBase.education
      return `🎓 ${diploma.degree} from ${diploma.college} (${diploma.status}).\nCurrently pursuing ${btech.degree} via ${btech.mode} (${btech.status}) — secured TG ECET 2026 Branch Rank 5 to get here.`
    },
    long: () => {
      const { diploma, btech } = knowledgeBase.education
      return `🎓 Diploma: ${diploma.degree} from ${diploma.college} — ${diploma.status}.\n\n🎓 B.Tech: ${btech.degree}, admitted via ${btech.mode} — ${btech.status}.\n\n🏆 Key milestone: TG ECET 2026 Branch Rank 5, which enabled the lateral entry into B.Tech.`
    },
  },
  {
    keywords: ['skill', 'tech stack', 'technologies', 'programming', 'language', 'know'],
    one_line: () => `Python, JavaScript, React, SQL, and hands-on AI/ML.`,
    short: () => `💻 ${knowledgeBase.skills.programming.join(', ')} | 🎨 ${knowledgeBase.skills.frontend.join(', ')} | 🤖 ${knowledgeBase.skills.ai.join(', ')}`,
    default: () => {
      const s = knowledgeBase.skills
      return `💻 Programming: ${s.programming.join(', ')}\n🎨 Frontend: ${s.frontend.join(', ')}\n⚙️ Backend: ${s.backend.join(', ')}\n🗄️ Database: ${s.database.join(', ')}\n🤖 AI/ML: ${s.ai.join(', ')}\n🛠️ Tools: ${s.tools.join(', ')}`
    },
    long: () => {
      const s = knowledgeBase.skills
      return `💻 Programming Languages: ${s.programming.join(', ')}\n\n🎨 Frontend: ${s.frontend.join(', ')}\n\n⚙️ Backend: ${s.backend.join(', ')}\n\n🗄️ Databases: ${s.database.join(', ')}\n\n🤖 AI & ML: ${s.ai.join(', ')}\n\n🛠️ Tools: ${s.tools.join(', ')}\n\nHe picks up new technologies quickly and prefers learning through building real projects.`
    },
  },
  {
    keywords: ['project', 'gig finder', 'gigfinder', 'exam integrity', 'yash ai os', 'built', 'portfolio project'],
    one_line: () => `Gig Finder, Smart Exam Integrity System, and this portfolio — YASH AI OS.`,
    short: () => knowledgeBase.projects.map((p) => `🚀 ${p.name}`).join(', '),
    default: () => knowledgeBase.projects.map((p) => `🚀 ${p.name}: ${p.description}`).join('\n\n'),
    long: () => knowledgeBase.projects
      .map((p) => `🚀 ${p.name}\n${p.description}\nTech: ${p.technologies.join(', ')}`)
      .join('\n\n'),
  },
  {
    keywords: ['experience', 'internship', 'training', 'infogrow', 'work history'],
    one_line: () => `AI & ML Trainee at INFOGROW.`,
    short: () => `🏢 ${knowledgeBase.experience.role} at ${knowledgeBase.experience.company}.`,
    default: () => `🏢 ${knowledgeBase.experience.role} at ${knowledgeBase.experience.company}.\n${knowledgeBase.experience.description}`,
    long: () => `🏢 ${knowledgeBase.experience.role} at ${knowledgeBase.experience.company}.\n\n${knowledgeBase.experience.description}`,
  },
  {
    keywords: ['achievement', 'rank', 'award'],
    one_line: () => `TG ECET 2026 Branch Rank 5.`,
    short: () => knowledgeBase.achievements.slice(0, 2).map((a) => `🏅 ${a}`).join(', '),
    default: () => knowledgeBase.achievements.map((a) => `🏅 ${a}`).join('\n'),
    long: () => knowledgeBase.achievements.map((a) => `🏅 ${a}`).join('\n'),
  },
  {
    keywords: ['hire', 'why should i hire', 'why hire'],
    one_line: () => `Fast learner who ships real projects — from AI systems to full-stack apps.`,
    short: () => `He combines AI/ML fundamentals with practical full-stack skills and has already shipped real projects like ${knowledgeBase.projects[0].name} and ${knowledgeBase.projects[2].name}.`,
    default: () => `Yashwanth combines strong AI/ML fundamentals with hands-on full-stack skills. His strengths include ${knowledgeBase.strengths.slice(0, 4).join(', ')}, and he's already shipped real projects like ${knowledgeBase.projects[0].name} and ${knowledgeBase.projects[2].name}. He's a fast learner who turns ideas into working software quickly.`,
    long: () => `Yashwanth combines strong AI/ML fundamentals with hands-on full-stack development skills. His core strengths — ${knowledgeBase.strengths.join(', ')} — show up in projects like ${knowledgeBase.projects.map((p) => p.name).join(', ')}.\n\nHe's early in his career but approaches every project with discipline and curiosity, learning by building rather than relying only on theory. He's eager to contribute to a collaborative engineering team while continuously leveling up his AI and web development skills.`,
  },
  {
    keywords: ['strength', 'good at'],
    one_line: () => `Problem-solving, fast learning, and clean code.`,
    short: () => knowledgeBase.strengths.slice(0, 4).join(', '),
    default: () => knowledgeBase.strengths.map((s) => `✅ ${s}`).join(', '),
    long: () => knowledgeBase.strengths.map((s) => `✅ ${s}`).join('\n'),
  },
  {
    keywords: ['hobby', 'hobbies', 'free time', 'do for fun'],
    one_line: () => `Coding side-projects, cricket, and crime shows.`,
    short: () => knowledgeBase.hobbies.slice(0, 3).join(', '),
    default: () => knowledgeBase.hobbies.map((h) => `🎯 ${h}`).join('\n'),
    long: () => knowledgeBase.hobbies.map((h) => `🎯 ${h}`).join('\n'),
  },
  {
    keywords: ['interest', 'interested in'],
    one_line: () => `AI, ML, and full-stack web development.`,
    short: () => knowledgeBase.interests.slice(0, 3).join(', '),
    default: () => knowledgeBase.interests.join(', '),
    long: () => knowledgeBase.interests.join(', '),
  },
  {
    keywords: ['goal', 'career goal', 'future plan', 'long term', 'short term'],
    one_line: () => `Become a Software Engineer building impactful AI-powered products.`,
    short: () => knowledgeBase.goals.longTerm,
    default: () => `📍 Short-term: ${knowledgeBase.goals.shortTerm}\n🎯 Long-term: ${knowledgeBase.goals.longTerm}`,
    long: () => `📍 Short-term: ${knowledgeBase.goals.shortTerm}\n\n🎯 Long-term: ${knowledgeBase.goals.longTerm}`,
  },
  {
    keywords: ['motivate', 'motivation', 'philosophy', 'believe'],
    one_line: () => `Curiosity, consistency, and solving real problems.`,
    short: () => knowledgeBase.philosophy.split('.')[0] + '.',
    default: () => knowledgeBase.philosophy,
    long: () => knowledgeBase.philosophy,
  },
  {
    keywords: ['currently learning', 'learning now', 'what are you learning'],
    one_line: () => `Node.js and Express.js.`,
    short: () => `Deepening skills in ${knowledgeBase.skills.backend.join(', ')}.`,
    default: () => `He's currently deepening his skills in ${knowledgeBase.skills.backend.join(', ')}, alongside continuously exploring new AI/ML techniques.`,
    long: () => `He's currently deepening his skills in ${knowledgeBase.skills.backend.join(', ')}, alongside continuously exploring new AI/ML techniques and staying updated with modern frontend patterns.`,
  },
  {
    keywords: ['location', 'where', 'based', 'live'],
    one_line: () => `${knowledgeBase.profile.location}.`,
    short: () => `📍 ${knowledgeBase.profile.location}.`,
    default: () => `📍 Based in ${knowledgeBase.profile.location}.`,
    long: () => `📍 Based in ${knowledgeBase.profile.location}.`,
  },
  {
    keywords: ['contact', 'email', 'reach', 'connect'],
    one_line: () => `Check the Contact section below.`,
    short: () => `📬 Reach him through the Contact section on this site.`,
    default: () => `📬 Best reached through the Contact section on this site — there's a form and direct links there!`,
    long: () => `📬 Best reached through the Contact section on this site — there's a form and direct links there!`,
  },
]

const FALLBACK = {
  one_line: "I don't have that yet 🤔 — ask about skills, projects, or education.",
  short: "I don't have that yet 🤔 — try asking about skills, projects, education, achievements, or why you should hire Yashwanth!",
  default: "Hmm, I don't have an answer for that yet 🤔 — try asking about skills, projects, education, achievements, goals, or why you should hire Yashwanth!",
  long: "Hmm, I don't have an answer for that yet 🤔 — try asking about skills, projects, education, achievements, goals, or why you should hire Yashwanth! Feel free to phrase it differently and I'll try again.",
}

export function matchQuestion(input) {
  const length = detectLength(input)
  const q = stripModifiers(input)

  let best = null
  let bestScore = 0

  for (const intent of INTENTS) {
    for (const kw of intent.keywords) {
      if (q.includes(kw) && kw.length > bestScore) {
        bestScore = kw.length
        best = intent
      }
    }
  }

  if (!best) return FALLBACK[length]
  return (best[length] || best.default)()
}