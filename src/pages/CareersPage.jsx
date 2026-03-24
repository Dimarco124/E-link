import { useState, useEffect } from 'react'
import api from '../utils/api'
import { FiCheckCircle, FiBriefcase, FiAward, FiTarget, FiCoffee, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/assets'
import './CareersPage.css'

export default function CareersPage() {
  const [jobOffers, setJobOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/jobs')
      .then(res => {
        setJobOffers(res.data.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load job offers:', err)
        setLoading(false)
      })
  }, [])

  const perks = [
    { icon: <FiAward />, title: "Excellence", desc: "Travaillez sur des projets critiques avec les meilleures technos." },
    { icon: <FiTarget />, title: "Impact", desc: "Contribuez directement à la souveraineté numérique locale." },
    { icon: <FiCoffee />, title: "Culture", desc: "Un environnement agile, transparent et bienveillant." },
    { icon: <FiBriefcase />, title: "Évolution", desc: "Plan de carrière personnalisé et certifications offertes." }
  ]

  return (
    <div className="careers-page">
      <div className="container">
        <header 
          className="careers-hero reveal reveal--up"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getAssetPath('/assets/images/hero-careers.jpg')})` 
          }}
        >
          <div className="careers-hero__content reveal reveal--up delay-200">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Rejoignez l'Exploration</p>
            <h1 className="section-title" style={{ color: 'white', marginBottom: '24px' }}>
              Bâtissons Ensemble <span className="gradient-text">le Futur</span>
            </h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Nous recherchons des esprits brillants et passionnés pour relever les défis technologiques les plus complexes de notre région.
            </p>
          </div>
        </header>

        <section className="careers-perks section">
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <div key={i} className={`perk-card reveal reveal--up delay-${(i + 1) * 100}`}>
                <div className="perk-icon">{perk.icon}</div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Nos offres d'emploi */}
        <section className="jobs-section section reveal reveal--up">
          <div className="section-header">
            <h2 className="section-title">Nos <span className="gradient-text">offres d'emploi</span></h2>
          </div>

          {loading ? (
            <div className="jobs-loading">Chargement des offres...</div>
          ) : jobOffers.length > 0 ? (
            <div className="jobs-list">
              {jobOffers.map((job) => (
                <div key={job.id} className="job-item">
                  <div className="job-item__main">
                    <h3 className="job-item__title">[{job.title}]</h3>
                    <div className="job-item__meta">
                      <span className="job-meta-location"><FiMapPin /> {job.location || 'Abidjan'}</span>
                      {job.department && <span className="job-meta-dept"> - {job.department}</span>}
                    </div>
                  </div>
                  <Link to={`/carrieres/${job.id}`} className="job-item__link">
                    → Voir détails
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="jobs-empty">
              <p>“Aucune offre disponible pour le moment.”</p>
            </div>
          )}
        </section>

        {/* Section 2: Candidature spontanée */}
        <section className="careers-form-section section reveal reveal--up">
          <div className="spontaneous-box">
             <div className="spontaneous-content">
                <h2 className="section-title">Candidature <span className="gradient-text">Spontanée</span></h2>
                <p className="spontaneous-text">
                  Vous souhaitez rejoindre notre équipe ? Envoyez-nous votre candidature spontanée.
                </p>
             </div>
             <Link to="/apply" className="btn btn--primary">
                Postuler <FiArrowRight />
             </Link>
          </div>
        </section>

        <section className="careers-values section reveal reveal--up">
            <div className="careers-grid">
                <div className="careers-info">
                    <h3>Ce que nous recherchons :</h3>
                    <div className="careers-requirements">
                        <ul>
                            <li><FiCheckCircle /> Maîtrise des environnements Cloud (AWS/GCP/Azure)</li>
                            <li><FiCheckCircle /> Expertise en développement (Go, Rust, Node.js, React)</li>
                            <li><FiCheckCircle /> Fortes compétences en Cybersécurité</li>
                            <li><FiCheckCircle /> Mindset Agile et soif d'apprendre</li>
                        </ul>
                    </div>
                </div>
                <div className="careers-image">
                    <img src={getAssetPath('/assets/images/about-it.jpg')} alt="Work at e-link" />
                </div>
            </div>
        </section>
      </div>
    </div>
  )
}
