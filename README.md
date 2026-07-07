# Yashwanth Kumar — Developer Portfolio

A modern, interactive developer portfolio built with React, Tailwind CSS, and Framer Motion — featuring a 3D animated hero background, live GitHub project integration, and a custom AI assistant trained on my profile.

🔗 **Live Demo:** [yashwanth-thammishetti.vercel.app](https://yashwanth-thammishetti.vercel.app)

## ✨ Features

- **Animated Hero Section** — Typewriter role animation and a Three.js-powered neural network background (`@react-three/fiber`)
- **Yash AI Chatbot** — A personal AI assistant (floating bubble + dedicated section) that answers questions about my skills, projects, education, and achievements. Falls back to an offline keyword-matching engine if no API is configured
- **AI Terminal** — A fun, interactive command-line easter egg (`help`, `whoami`, `skills`, `social`, `matrix`, and more) for exploring the site
- **Live GitHub Projects** — Pulls and displays my latest repositories directly from the GitHub API, with skeleton loading states for a smooth experience
- **Skills Showcase** — Filterable, categorized skill cards with hover tooltips showing which projects each technology was used in
- **Fully Responsive** — Optimized for desktop and mobile

## 🛠️ Tech Stack

**Frontend**
- React
- Tailwind CSS
- Framer Motion (animations)
- @react-three/fiber (3D background)
- React Icons

**Chatbot Engine**
- Custom keyword-based query matcher (offline, zero dependencies)
- Optional API-powered mode via a `/api/chat` endpoint

**Data**
- Live GitHub REST API integration for project listings

**Deployment**
- Vercel (CI/CD via GitHub — every push to `main` auto-deploys)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── NeuralBackground.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── YashAISection.jsx
│   ├── YashAIChat.jsx
│   ├── ChatBubble.jsx
│   ├── AITerminal.jsx
│   └── Contact.jsx
├── data/
│   ├── knowledgeBase.js   # Structured profile data (skills, projects, education, etc.)
│   └── yashQuery.js       # Keyword-matching engine for Yash AI
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Sunny123yash/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (or the port shown in your terminal).

### Build for production

```bash
npm run build
```

## ☁️ Deployment

This project is deployed on **[Vercel](https://vercel.com)**, connected directly to this GitHub repository.

- **Live URL:** [yashwanth-thammishetti.vercel.app](https://yashwanth-thammishetti.vercel.app)
- **Framework Preset:** Vite (auto-detected)
- **Continuous Deployment:** Every push to the `main` branch automatically triggers a new production deployment
- **Environment Variables:** A `GROQ_API_KEY` is set in the Vercel project settings to power the "Power AI" mode of Yash AI (`/api/chat` endpoint). Without it, the chatbot automatically falls back to its offline knowledge base

To deploy your own copy:
1. Fork or clone this repo
2. Import it into [Vercel](https://vercel.com/new) via GitHub
3. Add your own `GROQ_API_KEY` (or equivalent) under **Environment Variables**
4. Click **Deploy**

## 🤖 Yash AI

Yash AI is a personal assistant baked into the portfolio, available both as a floating chat bubble (bottom-right) and as a dedicated section on the page. It answers questions like:

- "What are your skills?"
- "Tell me about your projects"
- "Why should I hire you?"
- "What are your career goals?"

It runs entirely offline by default using a structured knowledge base and keyword matcher, with an optional upgrade path to a real LLM-powered backend via a `/api/chat` endpoint.

## 💻 AI Terminal

Click the terminal icon (bottom-left) to open a retro command-line interface. Type `help` to see all available commands — including quick navigation, profile lookups, and a couple of hidden easter eggs.

## 📬 Contact

- **Email:** yashuthammishetti@gmail.com
- **GitHub:** [@Sunny123yash](https://github.com/Sunny123yash)
- **LinkedIn:** [yashwanthkumarthammishetti](https://www.linkedin.com/in/yashwanthkumarthammishetti)

---

Built with ❤️ by Thammishetti Yashwanth Kumar
