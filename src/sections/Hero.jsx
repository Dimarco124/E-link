import { useState, useEffect } from 'react'
import { FiArrowRight, FiArrowUp } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './Hero.css'


const stats = [
  { value: '2026', label: 'Fondée à Abidjan' },
  { value: '100%', label: 'Ivoirien' },
  { value: '∞', label: 'Ambition' },
]


export default function Hero() {
  const titlePart1 = "architecte de la tech"
  const titlePart2 = "L'avenir de la digitalisation commence ici"
  const subtitleText = "Construisez votre transformation digitale afin de simplifier et optimiser vos opérations grâce à nos systèmes robustes scalabes en microservice."

  const [displayText1, setDisplayText1] = useState("")
  const [displayText2, setDisplayText2] = useState("")
  const [displaySubtitle, setDisplaySubtitle] = useState("")
  const [activeStep, setActiveStep] = useState(0) // 0: part1, 1: part2, 2: subtitle

  useEffect(() => {
    let timeoutId;

    if (activeStep === 0) {
      if (displayText1.length < titlePart1.length) {
        timeoutId = setTimeout(() => {
          setDisplayText1(titlePart1.slice(0, displayText1.length + 1));
        }, 150); // Significantly slower
      } else {
        timeoutId = setTimeout(() => setActiveStep(1), 1000); // 1s pause
      }
    } else if (activeStep === 1) {
      if (displayText2.length < titlePart2.length) {
        timeoutId = setTimeout(() => {
          setDisplayText2(titlePart2.slice(0, displayText2.length + 1));
        }, 150); // Significantly slower
      } else {
        timeoutId = setTimeout(() => setActiveStep(2), 1000); // 1s pause
      }
    } else if (activeStep === 2) {
      if (displaySubtitle.length < subtitleText.length) {
        timeoutId = setTimeout(() => {
          setDisplaySubtitle(subtitleText.slice(0, displaySubtitle.length + 1));
        }, 60); // Slower paragraph
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText1, displayText2, displaySubtitle, activeStep]);

  return (
    <section className="hero" id="hero">
      {/* Ambient orbs */}
      <div className="hero__orb hero__orb--1"></div>
      <div className="hero__orb hero__orb--2"></div>
      <div className="hero__orb hero__orb--3"></div>

      <div className="container hero__inner">


        <div className="hero__content">
          <p className="hero__eyebrow">e-link &middot; Abidjan, Côte d'Ivoire</p>

          <h1 className="hero__title">
            <span className="typing-text">{displayText1}{activeStep === 0 && <span className="typing-cursor">|</span>}</span>
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
              Explorer nos services
              <FiArrowRight />
            </a>
            <a href="#about" className="btn btn--ghost">
              Notre histoire
            </a>
          </div>

          <div className="hero__stats">
            {stats.map(s => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Right - Now with Custom Image */}
        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <div className="hero__image-inner-glow"></div>
            <video
              src={getAssetPath('/assets/videos/hero-video.mp4')}
              className="hero__main-img"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="hero__image-overlay"></div>

            {/* Floating UI Tags - Enhanced */}
            <div className="hero__visual-decoration hero__visual-decoration--1">
              <div className="hero__decoration-content">
                <span className="hero__card-badge">Actif</span>
                <span className="hero__decoration-detail">24H/24; 7J/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Particles */}
      <div className="hero__particles">
        <div className="hero__particle hero__particle--1">+</div>
        <div className="hero__particle hero__particle--2"></div>
        <div className="hero__particle hero__particle--3">+</div>
        <div className="hero__particle hero__particle--4"></div>
        <div className="hero__particle hero__particle--5">+</div>
      </div>

      {/* Orbit decoration */}
      <div className="hero__orbit">
        <div className="hero__orbit-ring"></div>
        <div className="hero__orbit-dot"></div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
        <span>Défiler</span>
      </div>
    </section>
  )
}
