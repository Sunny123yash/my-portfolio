import { useState, useEffect } from 'react'

export function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('light-theme')
  })

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-theme'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = !isLight
    document.documentElement.classList.toggle('light-theme', next)
    localStorage.setItem('yash-theme', next ? 'light' : 'dark')
    setIsLight(next)
  }

  return { isLight, toggleTheme }
}