import { useState, useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import { getStoragePath } from '../utils/storage'
import './Hero.css'

const stats = [
  { value: '2026', label: 'Fondée à Abidjan' },
  { value: '100%', label: 'Ivoirien' },
  { value: '∞', label: 'Ambition' },
]

export default function Hero({ data }) {
  const titlePart1   = data?.title_part1  || "architecte de la tech"
  const titlePart2   = data?.title_part2  || "L'avenir de la digitalisation commence ici"
  const subtitleText = data?.subtitle     || "Construisez votre transformation digitale afin de simplifier et optimiser vos opérations grâce à nos systèmes robustes scalabes en microservice."
  const statsToUse   = data?.stats?.length > 0 ? data.stats : stats

  const [displayText1,    setDisplayText1]    = useState("")
  const [displayText2,    setDisplayText2]    = useState("")
  const [displaySubtitle, setDisplaySubtitle] = useState("")
  const [activeStep,      setActiveStep]      = useState(0) // Used for cursor blinking

  const heroRef      = useRef(null)
  const bgRef        = useRef(null)
  const contentRef   = useRef(null)
  const orbsRef      = [useRef(null), useRef(null), useRef(null)]
  const rafRef       = useRef(null)
  const currentY     = useRef(0)
  const targetY      = useRef(0)

  // ── Parallax avec rAF + lerp sur plusieurs plans ────────────────
  useEffect(() => {
    const LERP_FACTOR = 0.1
    
    // Vitesses différentes pour créer de la profondeur
    const SPEEDS = {
      bg: 0.1,      // Fond presque fixe
      content: 0.15, // Le texte monte légèrement
      orb1: 0.3,    // Orbe 1 plus rapide
      orb2: 0.5,    // Orbe 2 très rapide (profondeur)
      orb3: 0.2     // Orbe 3 lente
    }

    const onScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      // On suit la position du Hero par rapport au haut du viewport
      targetY.current = rect.top 
    }

    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * LERP_FACTOR
      const y = -currentY.current // On inverse car react.top est négatif quand on scroll

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * SPEEDS.bg}px, 0)`
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${y * SPEEDS.content}px, 0)`
      }
      orbsRef.forEach((ref, i) => {
        if (ref.current) {
          const speedKey = `orb${i+1}`
          ref.current.style.transform = `translate3d(0, ${y * SPEEDS[speedKey]}px, 0)`
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Typing effect ─────────────────────────────────────────────
  useEffect(() => {
    if (!data) return
    
    const steps = [
      { text: data.title_part1 || "architecte de la tech", delay: 50, setter: setDisplayText1 },
      { text: data.title_part2 || "L'avenir de la digitalisation commence ici", delay: 30, setter: setDisplayText2 },
      { text: subtitleText, delay: 20, setter: setDisplaySubtitle }
    ]

    let currentStepIndex = 0
    let currentCharIndex = 0
    let timeout

    const type = () => {
      const step = steps[currentStepIndex]
      if (!step) return;

      step.setter(step.text.substring(0, currentCharIndex + 1))

      currentCharIndex++
      if (currentCharIndex < step.text.length) {
        timeout = setTimeout(type, step.delay)
      } else if (currentStepIndex < steps.length - 1) {
        currentStepIndex++
        currentCharIndex = 0
        setActiveStep(currentStepIndex);
        timeout = setTimeout(type, 500)
      } else {
        setActiveStep(steps.length);
      }
    }

    setActiveStep(0);
    timeout = setTimeout(type, 1000)
    return () => clearTimeout(timeout)
  }, [data, subtitleText])

  const bgImagePath = data?.hero_background 
    ? getStoragePath(data.hero_background) 
    : getAssetPath('/assets/images/hero-bg.png')

  return (
    <section className="hero" id="hero" ref={heroRef}>

      {/* ── Parallax Background (Quasi-fixe) ── */}
      <div
        ref={bgRef}
        className="hero__bg-parallax"
        style={{ backgroundImage: `url(${bgImagePath})` }}
      />
      <div className="hero__bg-overlay" />

      {/* ── Orbes avec Parallax indépendant ── */}
      <div ref={orbsRef[0]} className="hero__orb hero__orb--1" />
      <div ref={orbsRef[1]} className="hero__orb hero__orb--2" />
      <div ref={orbsRef[2]} className="hero__orb hero__orb--3" />

      {/* ── Ticker ── */}
      <div className="hero__ticker-row">
        <div className="container">
          <div className="hero__ticker">
            <span className="hero__ticker-badge">{data?.ticker_badge || "Logiciel de paie"}</span>
            <div className="hero__ticker-track">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="hero__ticker-text">
                  {data?.ticker_text || "Notre logiciel de paie s'impose comme une solution de référence qui défie toute concurrence, déjà adoptée avec succès par plus de 20 sociétés et 2 cabinets comptables, témoignant de sa fiabilité, de sa performance et de la confiance qu'il inspire au quotidien — contactez‑nous dès maintenant pour une séance de présentation.   ★   "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container hero__inner" ref={contentRef}>

        <div className="hero__content">
          <p className="hero__eyebrow">Abidjan, Côte d'Ivoire</p>

          <h1 className="hero__title">
            <span className="typing-text">
              {displayText1}
              {activeStep === 0 && <span className="typing-cursor">|</span>}
            </span>
            <br />
            <span className="gradient-text typing-text">
              {displayText2}
              {activeStep === 1 && <span className="typing-cursor">|</span>}
            </span>
          </h1>

          <p className="hero__sub">
            <span className="typing-text">
              {displaySubtitle}
              {activeStep === 2 && <span className="typing-cursor">|</span>}
            </span>
          </p>

          <div className="hero__actions">
            <a href="#services" className="btn btn--primary">
              Explorer nos services <FiArrowRight />
            </a>
            <a href="#about" className="btn btn--ghost">
              Notre histoire
            </a>
          </div>

          <div className="hero__stats">
            {statsToUse.map(s => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Right */}
        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <div className="hero__image-inner-glow" />
            <video
              src={data?.video_path ? getStoragePath(data.video_path) : getAssetPath('/assets/videos/hero-video.mp4')}
              className="hero__main-img"
              autoPlay loop muted playsInline
            />
            <div className="hero__image-overlay" />
            <div className="hero__visual-decoration hero__visual-decoration--1">
              <div className="hero__decoration-content">
                <span className="hero__card-badge">Actif</span>
                <span className="hero__decoration-detail">24H/24; 7J/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Particles */}
      <div className="hero__particles">
        <div className="hero__particle hero__particle--1">+</div>
        <div className="hero__particle hero__particle--2" />
        <div className="hero__particle hero__particle--3">+</div>
        <div className="hero__particle hero__particle--4" />
        <div className="hero__particle hero__particle--5">+</div>
      </div>

      <div className="hero__orbit">
        <div className="hero__orbit-ring" />
        <div className="hero__orbit-dot" />
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Défiler</span>
      </div>
    </section>
  )
}