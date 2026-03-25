import { useState, useEffect, useRef } from 'react'
import { FiArrowRight, FiActivity, FiCpu, FiShield, FiCloud, FiDatabase } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import { getStoragePath } from '../utils/storage'
import './Hero.css'
import heroBg from '/assets/images/heromen.png'

const statsDefault = [
  { value: '2026', label: 'Fondée à Abidjan' },
  { value: '100%', label: 'Ivoirien' },
  { value: '∞', label: 'Ambition' },
]

export default function Hero({ data }) {
  // 1. Initialisation des textes
  const title1 = data?.title_part1 || "Architecte de la tech"
  const title2 = data?.title_part2 || "L'avenir de la digitalisation commence ici"
  const subText = data?.subtitle || "Construisez votre transformation digitale afin de simplifier et optimiser vos opérations grâce à nos systèmes robustes scalabes en microservice."
  const statsToUse = data?.stats?.length > 0 ? data.stats : statsDefault

  const [displayTitle1, setDisplayTitle1] = useState("")
  const [displayTitle2, setDisplayTitle2] = useState("")
  const [displaySub, setDisplaySub] = useState("")
  const [activeStep, setActiveStep] = useState(0)

  const heroRef = useRef(null)
  const orbsRef = [useRef(null), useRef(null), useRef(null)]

  // 2. Typing Effect
  useEffect(() => {
    let currentStep = 0
    let charIdx = 0
    let timeout

    const type = () => {
      if (currentStep === 0) {
        setDisplayTitle1(title1.substring(0, charIdx + 1))
        charIdx++
        if (charIdx < title1.length) {
          timeout = setTimeout(type, 50)
        } else {
          currentStep = 1
          charIdx = 0
          setActiveStep(1)
          timeout = setTimeout(type, 600)
        }
      } else if (currentStep === 1) {
        setDisplayTitle2(title2.substring(0, charIdx + 1))
        charIdx++
        if (charIdx < title2.length) {
          timeout = setTimeout(type, 40)
        } else {
          currentStep = 2
          charIdx = 0
          setActiveStep(2)
          timeout = setTimeout(type, 600)
        }
      } else if (currentStep === 2) {
        setDisplaySub(subText.substring(0, charIdx + 1))
        charIdx++
        if (charIdx < subText.length) {
          timeout = setTimeout(type, 20)
        } else {
          setActiveStep(3)
        }
      }
    }

    timeout = setTimeout(type, 500)
    return () => clearTimeout(timeout)
  }, [title1, title2, subText])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__bg-parallax" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="hero__bg-overlay" />

      <div ref={orbsRef[0]} className="hero__orb hero__orb--1" />
      <div ref={orbsRef[1]} className="hero__orb hero__orb--2" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Abidjan, Côte d'Ivoire</p>
          <h1 className="hero__title">
            <span className="typing-text">{displayTitle1}{activeStep === 0 && <span className="typing-cursor">|</span>}</span>
            <br />
            <span className="gradient-text typing-text">{displayTitle2}{activeStep === 1 && <span className="typing-cursor">|</span>}</span>
          </h1>

          <p className="hero__sub">
            <span className="typing-text">{displaySub}{activeStep === 2 && <span className="typing-cursor">|</span>}</span>
          </p>

          <div className="hero__actions">
            <a href="#services" className="btn btn--primary">Explorer nos services <FiArrowRight /></a>
            <a href="#about" className="btn btn--ghost"> Notre histoire </a>
          </div>

          <div className="hero__stats">
            {statsToUse.map((s, i) => (
              <div className="hero__stat" key={i}>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__neural-map">
            {/* SVG Connections with data pulses */}
            <svg className="neural-connections" viewBox="0 0 400 400">
              {/* Paths from center to satellites */}
              <path className="connection-path" d="M200,200 L100,100" />
              <path className="connection-path" d="M200,200 L300,100" />
              <path className="connection-path" d="M200,200 L100,300" />
              <path className="connection-path" d="M200,200 L300,300" />

              {/* Animated Data Pulses (Circles following paths) */}
              <circle className="data-pulse" r="3">
                <animateMotion dur="3s" repeatCount="indefinite" path="M200,200 L100,100" />
              </circle>
              <circle className="data-pulse" r="3">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,200 L300,100" />
              </circle>
              <circle className="data-pulse" r="3">
                <animateMotion dur="4s" repeatCount="indefinite" path="M200,200 L100,300" />
              </circle>
              <circle className="data-pulse" r="3">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M200,200 L300,300" />
              </circle>
            </svg>

            {/* Central Node: The Core (e-link) */}
            <div className="neural-node neural-node--core">
              <div className="node-icon"><FiActivity /></div>
              <span className="node-label">e-link Core</span>
              <div className="node-pulse" />
            </div>

            {/* Satellite Nodes: Services */}
            <div className="neural-node neural-node--s1">
              <div className="node-icon"><FiCpu /></div>
              <span className="node-label">Engineering</span>
            </div>
            <div className="neural-node neural-node--s2">
              <div className="node-icon"><FiCloud /></div>
              <span className="node-label">Cloud Native</span>
            </div>
            <div className="neural-node neural-node--s3">
              <div className="node-icon"><FiShield /></div>
              <span className="node-label">Security Ops</span>
            </div>
            <div className="neural-node neural-node--s4">
              <div className="node-icon"><FiDatabase /></div>
              <span className="node-label">IA & Data</span>
            </div>

            {/* Dynamic Background Rings */}
            <div className="neural-ring neural-ring--1" />
            <div className="neural-ring neural-ring--2" />
          </div>
        </div>
      </div>
    </section>
  )
}