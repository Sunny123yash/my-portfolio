export const KNOWLEDGE_BASE = [
  {
    keywords: ['who are you', 'introduce', 'about you', 'who is yash', 'yourself', 'who is yashwanth'],
    answer: "I'm Yash AI 🤖 — trained on everything about Yashwanth Kumar Thammishetti. I can tell you about his skills, projects, education, and achievements. What do you want to know?",
  },
  {
    keywords: ['education', 'college', 'university', 'studying', 'degree', 'branch'],
    answer: "🎓 Yashwanth is pursuing a B.Tech in Computer Science Engineering at VNR Vignana Jyothi Institute of Engineering and Technology, with a strong focus on AI & Machine Learning.",
  },
  {
    keywords: ['skill', 'tech stack', 'technologies', 'languages', 'programming', 'tools'],
    answer: "💻 Core skills: C, Python, SQL, and web fundamentals (HTML/CSS/PHP). On the ML side: NumPy, Pandas, OpenCV, and Scikit-learn, plus Flask for backend development.",
  },
  {
    keywords: ['project', 'built', 'work', 'portfolio', 'gigfinder', 'brain tumor'],
    answer: "🚀 Notable projects: GigFinder (a freelance/internship platform using Supabase + PostgreSQL, where he handled backend and database work), and a Brain Tumor Detection deep learning project where he led dataset collection and model training.",
  },
  {
    keywords: ['experience', 'internship', 'training', 'infogrow', 'traineeship'],
    answer: "🧠 He completed a 6-month Industrial Traineeship at Infogrow, working hands-on with real AI/ML workflows end-to-end.",
  },
  {
    keywords: ['achievement', 'rank', 'award', 'ecet', 'hackathon', 'nss'],
    answer: "🏅 Achievements: AP ECET 2026 – State Rank 10, TG ECET 2026 – Branch Rank 5, 3rd Place at a College Hackathon, and an NSS Certificate for Community Service.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone', 'hire', 'connect'],
    answer: "📬 You can reach Yashwanth at yashuthammishetti@gmail.com or through the Contact section below — there's a form right there too!",
  },
  {
    keywords: ['resume', 'cv'],
    answer: "📄 You can download his resume using the 'Download Resume' button on the home section!",
  },
  {
    keywords: ['github', 'linkedin', 'social', 'leetcode'],
    answer: "🔗 You can find him on GitHub (@Sunny123yash), LinkedIn, and LeetCode — links are in the social icons on the home page and Contact section.",
  },
]

const FALLBACK =
  "Hmm, I don't have an answer for that yet 🤔 — try asking about Yashwanth's skills, projects, education, achievements, or how to contact him!"

export function matchQuestion(input) {
  const q = input.toLowerCase()
  let best = null
  let bestScore = 0

  for (const entry of KNOWLEDGE_BASE) {
    for (const kw of entry.keywords) {
      if (q.includes(kw) && kw.length > bestScore) {
        bestScore = kw.length
        best = entry
      }
    }
  }

  return best ? best.answer : FALLBACK
}