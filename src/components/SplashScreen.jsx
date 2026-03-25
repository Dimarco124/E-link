import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '../utils/assets'
import './SplashScreen.css'

const FULL_TEXT = 'e-link'
const MESSAGES = [
  'Initialisation des systèmes...',
  'Chargement de l\'expertise...',
  'Déploiement de l\'innovation...',
  'Optimisation des performances...',
  'Connexion établie.'
]
const DISPLAY_DURATION_MS = 4000 
const EXIT_DURATION_MS = 1000

export default function SplashScreen({ onComplete }) {
  const [typedText, setTypedText] = useState('')
  const [progress, setProgress] = useState(0)
  const [messageIdx, setMessageIdx] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    // 1. Typing effect for "e-link"
    let charIdx = 0
    const typingTimer = setInterval(() => {
      charIdx++
      setTypedText(FULL_TEXT.slice(0, charIdx))
      if (charIdx >= FULL_TEXT.length) clearInterval(typingTimer)
    }, 150)

    // 2. Progress counter (0 to 100)
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 1
      })
    }, DISPLAY_DURATION_MS / 100)

    // 3. Rotating messages
    const messageTimer = setInterval(() => {
      setMessageIdx(prev => (prev + 1) % MESSAGES.length)
    }, 800)

    // 4. Exit sequence
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onCompleteRef.current?.(), EXIT_DURATION_MS)
    }, DISPLAY_DURATION_MS + 500)

    return () => {
      clearInterval(typingTimer)
      clearInterval(progressTimer)
      clearInterval(messageTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  return (
    <div className={`splash-screen${isExiting ? ' splash-screen--exit' : ''}`}>
      <div className="splash-background">
        <div className="splash-orb splash-orb--1" />
        <div className="splash-orb splash-orb--2" />
      </div>

      <div className="splash-content">
        <div className="splash-logo-box">
          <img
            src={getAssetPath('/assets/images/logo.png')}
            alt="Logo e-link"
            className="splash-logo-img"
          />
          <div className="splash-brand">
            <span className="brand-name">{typedText}</span>
            <span className="brand-dot" />
          </div>
        </div>

        <div className="splash-status">
          <div className="status-message">{MESSAGES[messageIdx]}</div>
          <div className="status-progress-container">
            <div className="status-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="status-percentage">{progress}%</div>
        </div>
      </div>

      <div className="splash-footer">
        <span className="footer-tag">Engineering the future</span>
      </div>
    </div>
  )
}