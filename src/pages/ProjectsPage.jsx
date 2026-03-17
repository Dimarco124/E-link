import { useState, useMemo } from 'react'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RecruitmentCTA from '../sections/RecruitmentCTA'
import { getAssetPath } from '../utils/assets'
import './ProjectsPage.css'

const allProjects = [
  {
    id: 1,
    title: "Migration Cloud Native - Banque Panafricaine",
    client: "Secteur Bancaire",
    category: "Cloud",
    excerpt: "Refonte complète de l'architecture Core Banking vers une solution microservices déployée sur AWS, garantissant une haute disponibilité et une scalabilité dynamique.",
    image: getAssetPath("/assets/images/blog-cloud.jpg"),
    video: getAssetPath("/assets/videos/project-demo.mp4"),
    year: "2025"
  },
  {
    id: 2,
    title: "Plateforme de Télémédecine Décentralisée",
    client: "Ministère de la Santé",
    category: "Web",
    excerpt: "Développement d'une application web progressive (PWA) sécurisée permettant des consultations vidéo en temps réel et le partage de dossiers médicaux chiffrés de bout en bout.",
    image: getAssetPath("/assets/images/project-telemed.jpg"),
    year: "2025"
  },
  {
    id: 3,
    title: "Application Mobile de Paiement B2B",
    client: "Fintech Leader UEMOA",
    category: "Mobile",
    excerpt: "Création d'une application iOS/Android fluide et intuitive avec intégration de multiples moyens de paiement locaux et d'un tableau de bord analytique en temps réel.",
    image: getAssetPath("/assets/images/project-fintech.jpg"),
    year: "2024"
  },
  {
    id: 4,
    title: "Analyse Prédictive pour la Supply Chain",
    client: "Logistique Internationale",
    category: "IA",
    excerpt: "Mise en place d'un modèle de Machine Learning pour optimiser les routes de livraison et anticiper les ruptures de stock avec une précision de 94%.",
    image: getAssetPath("/assets/images/project-supply.jpg"),
    year: "2024"
  },
  {
    id: 5,
    title: "Sécurisation d'Infrastructure Gouvernementale",
    client: "Secteur Public",
    category: "Sécurité",
    excerpt: "Audit complet, remédiation des vulnérabilités et déploiement d'un SOC (Security Operations Center) 24/7 pour contrer les menaces persistantes avancées.",
    image: getAssetPath("/assets/images/services-security.jpg"),
    year: "2023"
  },
  {
    id: 6,
    title: "Portail E-Commerce Haute Performance",
    client: "Retailer National",
    category: "Web",
    excerpt: "Conception d'une plateforme e-commerce headless capable de supporter des pics de trafic intenses lors des périodes de soldes sans dégradation des temps de réponse.",
    image: getAssetPath("/assets/images/project-ecommerce.jpg"),
    year: "2023"
  },
  {
    id: 7,
    title: "Système de Gestion de Flotte IoT",
    client: "Transport Logistique CI",
    category: "Cloud",
    excerpt: "Mise en place d'une solution IoT pour le suivi en temps réel de 500 véhicules, avec analyse de consommation de carburant et maintenance prédictive.",
    image: getAssetPath("/assets/images/project-iot.jpg"),
    year: "2023"
  },
  {
    id: 8,
    title: "Réseau Social d'Entreprise Sécurisé",
    client: "Groupe Industriel",
    category: "Web",
    excerpt: "Développement d'un intranet collaboratif avec messagerie instantanée, partage de documents et annuaire dynamique, le tout sous un environnement Zero Trust.",
    image: getAssetPath("/assets/images/project-intranet.jpg"),
    year: "2022"
  }
]

const CATEGORIES = ['Tous', 'Web', 'Mobile', 'Cloud', 'IA', 'Sécurité']

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      if (activeCategory === 'Tous') return true
      return project.category === activeCategory
    })
  }, [activeCategory])

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
                  <Link to={`/realisations/${project.id}`} className="project-btn-link">
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
            <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 30px' }}>
              Notre équipe d'experts est à votre disposition pour analyser vos besoins et vous proposer la meilleure approche technologique.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Parlons-en <FiArrowRight />
            </Link>
          </div>
        </section>
        <RecruitmentCTA />
      </div>
    </div>
  )
}
