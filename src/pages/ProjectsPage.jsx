import { useState, useMemo, useEffect } from 'react'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RecruitmentCTA from '../sections/RecruitmentCTA'
import { getAssetPath } from '../utils/assets'
import './ProjectsPage.css'
import api from '../utils/api'


const CATEGORIES = ['Tous', 'Web', 'Mobile', 'Cloud', 'IA', 'Sécurité']

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const projectsPerPage = 3 // Ajusté à 3 pour vérification facile (vous avez ~9 projets)

  useEffect(() => {
    api.get('/projects')
      .then(res => {
        const formatted = res.data.data.map(p => ({
          ...p,
          image: p.image ? (p.image.startsWith('http') ? p.image : getAssetPath(p.image)) : getAssetPath('/assets/images/project-ecommerce.jpg'),
          video: p.video ? (p.video.startsWith('http') ? p.video : getAssetPath(p.video)) : null
        }))
        setAllProjects(formatted)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load projects:', err)
        setLoading(false)
      })
  }, [])

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const projCat = project.category ? project.category.toLowerCase().trim() : ''
      const activeCat = activeCategory.toLowerCase().trim()

      if (activeCategory === 'Tous') return true
      return projCat === activeCat
    })
  }, [activeCategory, allProjects])

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  return (
    <div className="projects-page">
      <div className="container">
        {/* Projects Hero */}
        <header 
          className="projects-hero reveal reveal--up"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getAssetPath('/assets/images/hero-projects.jpg')})` 
          }}
        >
          <div className="projects-hero__content reveal reveal--up delay-100">
            <p className="section-eyebrow" style={{color: "rgba(255,255,255,0.7)"}}>Excellence & Innovation</p>
            <h1 className="section-title" style={{color: "white"}}>Nos <span className="gradient-text">Réalisations</span></h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Découvrez comment nous avons accompagné nos clients dans leur transformation digitale avec des solutions sur mesure et performantes.
            </p>
          </div>

          <div className="projects-hero__filters">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`project-filter-pill ${activeCategory === cat ? 'project-filter-pill--active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Projects Grid */}
        {loading ? (
          <div className="content-loader">
            <div className="loader-spinner"></div>
            <p>Chargement des réalisations...</p>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {currentProjects.map((project, i) => (
                <article key={project.id} className={`project-card reveal reveal--up delay-${((i % 3) + 1) * 100}`}>
                  <div className="project-card__image-wrapper">
                    {project.video ? (
                      <video 
                        src={project.video} 
                        className="project-card__image" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        poster={project.image}
                      />
                    ) : (
                      <img src={project.image} alt={project.title} className="project-card__image" />
                    )}
                    <div className="project-card__overlay">
                      <span className="project-card__category">{project.category}</span>
                    </div>
                  </div>
                  <div className="project-card__content">
                    <div className="project-card__meta">
                      <span className="project-card__client">{project.client}</span>
                      <span className="project-card__year">{project.year}</span>
                    </div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__excerpt">{project.excerpt}</p>
                    <div className="project-card__footer">
                      <Link to={`/realisations/${project.slug}`} className="project-btn-link">
                        Voir les détails <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* No Results */}
            {currentProjects.length === 0 && (
              <div className="projects-empty">
                <p>Aucun projet ne correspond à cette catégorie pour le moment.</p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-arrow" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft /> Précédent
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1}
                className={`pagination-btn ${currentPage === i + 1 ? 'pagination-btn--active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="pagination-arrow" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Suivant <FiChevronRight />
            </button>
          </div>
        )}

        {/* CTA Section */}
        <section 
          className="projects-cta reveal reveal--up"
          style={{ 
            backgroundImage: `url(${getAssetPath('/assets/images/texture-cubes.png')})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto'
          }}
        >
          <div className="cta-content">
            <h2 className="section-title" style={{ color: 'white' }}>Prêt à démarrer <span className="gradient-text">votre projet ?</span></h2>
            <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 30px', color: 'white' }}>
              Notre équipe d'experts est à votre disposition pour analyser vos besoins et vous proposer la meilleure approche technologique.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Parlons-en <FiArrowRight />
            </Link>
          </div>
        </section>
      </div>
      <RecruitmentCTA />
    </div>
  )
}
