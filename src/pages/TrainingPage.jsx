import { Link } from 'react-router-dom'
import { FiCpu, FiShield, FiCheckCircle, FiArrowRight, FiPlayCircle, FiGlobe, FiServer, FiDatabase } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './TrainingPage.css'

import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function TrainingPage() {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/training')
      .then(res => {
        setTracks(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load training tracks:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="training-page">
      <div className="container">
        {/* Hero Section */}
        <header className="training-hero reveal reveal--up">
          <div className="training-hero__content reveal reveal--up delay-200">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Excellence & Transmission</p>
            <h1 className="section-title" style={{ color: 'white', marginBottom: '24px' }}>
              Maîtrisez les <span className="gradient-text">Technologies critiques</span>
            </h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto' }}>
              Nos experts partagent leur savoir-faire terrain à travers des cursus intensifs conçus pour répondre aux exigences réelles des infrastructures modernes.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="content-loader">
            <div className="loader-spinner"></div>
            <p>Chargement des formations...</p>
          </div>
        ) : (
          <>
            {tracks.map((track, i) => (
              <section key={track.id} className={`section track-detail ${i % 2 !== 0 ? 'track-detail--alt' : ''}`}>
                <div className={`track-grid reveal reveal--up`}>
                  <div className={`track-content reveal ${i % 2 !== 0 ? 'reveal--right' : 'reveal--left'}`}>
                    <span className="track-badge">{track.badge || "Cursus Avancé"}</span>
                    <h2 className="section-title">
                      {track.title.split(' ')[0]} <span className="gradient-text">{track.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <div className="description-text" dangerouslySetInnerHTML={{ __html: track.description }} />

                    <ul className="curriculum-list">
                      {track.modules && track.modules.map((module, mIdx) => (
                        <li key={mIdx}><FiCheckCircle /> <div><strong>{module.title}</strong> <span dangerouslySetInnerHTML={{ __html: module.detail }} /></div></li>
                      ))}
                    </ul>

                    <div className="track-info">
                      <span className="track-label">Public cible :</span>
                      <div dangerouslySetInnerHTML={{ __html: track.target_audience }} />
                    </div>

                    <Link to="/contact" className="btn btn--primary">S'inscrire à la session <FiArrowRight /></Link>
                  </div>
                  <div className={`track-visual reveal ${i % 2 !== 0 ? 'reveal--left' : 'reveal--right'}`}>
                    {track.video ? (
                      <video
                        src={track.video.startsWith('http') ? track.video : getAssetPath(track.video)}
                        autoPlay loop muted playsInline
                        poster={track.image ? (track.image.startsWith('http') ? track.image : getAssetPath(track.image)) : getAssetPath("/assets/images/blog-ia.jpg")}
                      />
                    ) : (
                      <img src={track.image ? (track.image.startsWith('http') ? track.image : getAssetPath(track.image)) : getAssetPath("/assets/images/services-dev.jpg")} alt={track.title} />
                    )}
                  </div>
                </div>
              </section>
            ))}
          </>
        )}

        {/* CTA Section */}
        <section className="section training-cta reveal reveal--scale">
          <div className="cta-box">
            <h2 className="section-title" style={{ color: 'white' }}>
              Propulsez votre <span className="gradient-text">Carrière technique</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              Nos sessions sont limitées en nombre de participants pour garantir un accompagnement personnalisé et de qualité.
            </p>
            <div className="flex justify-center gap-20">
              <Link to="/contact" className="btn btn--primary">
                Demander un devis personnalisé <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
