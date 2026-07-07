import knowledgeBase from '../src/data/knowledgeBase.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question } = req.body

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing question' })
  }

  const systemPrompt = `
You are "Yash AI" — a personal AI assistant representing Thammishetti Yashwanth Kumar (Yash) on his portfolio website.
Speak about him in third person, in a friendly, confident, professional tone. Never invent facts not in the data below.
Match your answer length to how the question is asked: if asked "in short" or "in one line", answer briefly. If asked "in detail", elaborate.
If a question is unrelated to Yash (general knowledge, coding help, etc.), politely redirect: say you're only trained to talk about Yash.

DATA ABOUT YASH:
${JSON.stringify(knowledgeBase, null, 2)}
`.trim()

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        temperature: 0.6,
        max_tokens: 400,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Groq API error:', errText)
      return res.status(502).json({ error: 'AI service error' })
    }

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content?.trim()

    if (!answer) {
      return res.status(502).json({ error: 'Empty response from AI' })
    }

    return res.status(200).json({ answer })
  } catch (err) {
    console.error('Chat handler error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}