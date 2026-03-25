import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './ProjectDetailsPage.css'
import api from '../utils/api'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => {
        const p = res.data.data
        if (p) {
          setProject({
            ...p,
            image: p.image ? (p.image.startsWith('http') ? p.image : getAssetPath(p.image)) : getAssetPath('/assets/images/project-ecommerce.jpg'),
            video: p.video ? (p.video.startsWith('http') ? p.video : getAssetPath(p.video)) : null
          })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load project details:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>
  }

  if (!project) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Projet non trouvé</div>
  }

  return (
    <div className="project-details-page">
      {/* Detail Hero */}
      <div className="project-detail-hero reveal reveal--up">
        <div className="container">
          <Link to="/realisations" className="back-link reveal reveal--left">
            <FiArrowLeft /> Retour aux réalisations
          </Link>
          <div className="project-detail-hero__content">
            <div className="project-detail-hero__text">
              <span className="project-badge">{project.category}</span>
              <h1 className="project-title">{project.title}</h1>
              <p className="project-overview">{project.excerpt}</p>

              <div className="project-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Client</span>
                  <span className="meta-value">{project.client}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Année</span>
                  <span className="meta-value">{project.year}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Expertise</span>
                  <span className="meta-value">{project.category}</span>
                </div>
              </div>
            </div>
            <div className="project-detail-hero__visual reveal reveal--right">
              {project.video ? (
                <video
                  src={project.video}
                  className="project-main-media"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={project.image}
                />
              ) : (
                <img src={project.image} alt={project.title} className="project-main-media" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="project-content-section py-100">
        <div className="container">
          <div className="project-content-grid">
            <div className="project-content-main reveal reveal--left">
              <div className="content-block">
                <h2>Le Défi</h2>
                <div dangerouslySetInnerHTML={{ __html: project.challenge || "Des défis complexes nécessitaient une approche sur-mesure combinant technologie de pointe et compréhension métier approfondie." }} />
              </div>
              <div className="content-block">
                <h2>Notre Solution</h2>
                <div dangerouslySetInnerHTML={{ __html: project.solution || "Déploiement d'une architecture résiliente et évolutive, couplée à une interface intuitive favorisant l'adoption rapide par les utilisateurs finaux." }} />
              </div>
            </div>

            <div className="project-content-sidebar reveal reveal--right">
              <div className="sidebar-box">
                <h3>Technologies Utilisées</h3>
                <ul className="tech-list">
                  {project.technologies ? project.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  )) : (
                    <>
                      <li>React / Node.js</li>
                      <li>Cloud AWS</li>
                      <li>Docker / Kubernetes</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Résultats Clés</h3>
                <ul className="results-list">
                  {project.results ? project.results.map((res, i) => (
                    <li key={i}><FiCheck className="check-icon" /> {res}</li>
                  )) : (
                    <>
                      <li><FiCheck className="check-icon" /> Performance optimisée</li>
                      <li><FiCheck className="check-icon" /> ROI de +40%</li>
                      <li><FiCheck className="check-icon" /> Expérience Utilisateur fluide</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta reveal reveal--up" style={{ margin: 0 }}>
        <div className="container cta-content">
          <h2 className="section-title" style={{ color: 'white' }}>Inspiré par <span className="gradient-text">ce projet ?</span></h2>
          <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 30px' }}>
            Discutons de la manière dont nous pouvons transformer vos défis techniques en succès durables.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Démarrer un projet <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}
