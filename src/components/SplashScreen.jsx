import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '../utils/assets'
import './SplashScreen.css'

const FULL_TEXT = 'e-link'
const TYPING_SPEED_MS = 130
const DISPLAY_DURATION_MS = 3400 // Total time before exit starts
const EXIT_DURATION_MS = 900     // Must match CSS transition duration

export default function SplashScreen({ onComplete }) {
  const [typedText, setTypedText] = useState('')
  const [isExiting, setIsExiting] = useState(false)
  const isDone = typedText.length === FULL_TEXT.length

  // Keep onComplete stable across renders
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    let i = 0
    const typingTimer = setInterval(() => {
      i++
      setTypedText(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) clearInterval(typingTimer)
    }, TYPING_SPEED_MS)

    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onCompleteRef.current?.(), EXIT_DURATION_MS)
    }, DISPLAY_DURATION_MS)

    return () => {
      clearInterval(typingTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  return (
    <div
      className={`splash-screen${isExiting ? ' splash-screen--exit' : ''}`}
      aria-label="Loading e-link"
      role="status"
    >
      <div className="splash-content">
        <div className="splash-logo-container">
          <img
            src={getAssetPath('/assets/images/logo.png')}
            alt=""
            className="splash-logo-img"
            draggable={false}
          />

          <div className="splash-text-container" aria-hidden="true">
            <span className="splash-logo-text">{typedText}</span>
            {!isDone && <span className="splash-cursor" />}
            {isDone  && <span className="splash-logo-dot" />}
          </div>
        </div>
      </div>

      {/* Progress bar anchored to viewport bottom */}
      <div className="splash-loader" aria-hidden="true">
        <div className="splash-loader-bar" />
      </div>
    </div>
  )
}