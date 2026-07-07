import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import YashAISection from './components/YashAISection'
import Contact from './components/Contact'
import ChatBubble from './components/ChatBubble'
import AITerminal from './components/AITerminal'

function App() {
  return (
    <div className="bg-bg text-text font-body min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <YashAISection />
        <Contact />
      </main>
      <ChatBubble />
      <AITerminal />
    </div>
  )
}

export default App