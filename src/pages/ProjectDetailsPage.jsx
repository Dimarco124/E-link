import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'
import './ProjectDetailsPage.css'

// Temporary mock data for frontend
const allProjects = [
  {
    id: 1,
    title: "Migration Cloud Native - Banque Panafricaine",
    client: "Secteur Bancaire",
    category: "Cloud",
    overview: "Refonte complète de l'architecture Core Banking vers une solution microservices déployée sur AWS, garantissant une haute disponibilité et une scalabilité dynamique.",
    image: "/assets/images/blog-cloud.jpg",
    video: "/assets/videos/project-demo.mp4",
    year: "2025",
    challenge: "L'infrastructure legacy de la banque souffrait de lenteurs, de coûts de maintenance élevés, et d'un manque d'agilité pour lancer de nouveaux produits financiers. Les temps d'arrêt non planifiés affectaient la satisfaction client.",
    solution: "Nous avons audité l'existant puis conçu une architecture cloud-native sur AWS. L'application monolithique a été découpée en microservices conteneurisés via Docker et orchestrés par Kubernetes (EKS). Une pipeline CI/CD automatisée a été mise en place avec GitLab.",
    results: [
      "Réduction des coûts d'infrastructure de 40%",
      "Temps de déploiement passé de 2 semaines à 4 heures",
      "Disponibilité du système portée à 99.99%",
      "Capacité à absorber des pics de transactions x10 pendant les périodes de salaires"
    ],
    technologies: ["AWS (EKS, RDS, S3)", "Docker", "Kubernetes", "Terraform", "GitLab CI/CD", "Spring Boot", "React"]
  },
  {
    id: 2,
    title: "Plateforme de Télémédecine Décentralisée",
    client: "Ministère de la Santé",
    category: "Web",
    overview: "Développement d'une application web progressive (PWA) sécurisée permettant des consultations vidéo en temps réel et le partage de dossiers médicaux chiffrés de bout en bout.",
    image: "/assets/images/project-telemed.jpg",
    year: "2025",
    challenge: "L'accès aux soins dans les zones reculées était limité. Il fallait une solution permettant des consultations fiables avec une faible bande passante, tout en respectant les normes de confidentialité médicale.",
    solution: "Conception d'une PWA avec support hors-ligne grâce aux Service Workers. L'intégration WebRTC avec compression vidéo adaptative garantit la fluidité des appels. Le backend utilise une base de données chiffrée avec un système de clés asymétriques pour les dossiers des patients.",
    results: [
      "+50 000 consultations réalisées en 6 mois",
      "Fonctionnement assuré même sur réseau 3G instable",
      "Conformité totale aux normes HDS (Hébergement de Données de Santé)"
    ],
    technologies: ["React", "Node.js", "WebRTC", "PostgreSQL", "Redis", "Docker"]
  },
  {
    id: 3,
    title: "Application Mobile de Paiement B2B",
    client: "Fintech Leader UEMOA",
    category: "Mobile",
    overview: "Création d'une application iOS/Android fluide et intuitive avec intégration de multiples moyens de paiement locaux et d'un tableau de bord analytique en temps réel.",
    image: "/assets/images/project-fintech.jpg",
    year: "2024",
    challenge: "Les entreprises perdaient énormément de temps dans le traitement manuel de leurs facturations et les réconciliations de paiement multi-pays dans la zone UEMOA étaient un cauchemar comptable.",
    solution: "Développement d'une application mobile cross-platform avec React Native, intégrant plus de 15 APIs de mobile money locaux et banques partenaires. Un moteur de réconciliation en temps réel a été développé côté backend.",
    results: [
      "Réduction des délais d'encaissement de 12 jours à 2 jours",
      "Adoption par +5 000 PME dans la sous-région",
      "Taux d'erreur de réconciliation réduit à 0.01%"
    ],
    technologies: ["React Native", "TypeScript", "Go", "GraphQL", "AWS"]
  },
  {
    id: 4,
    title: "Analyse Prédictive pour la Supply Chain",
    client: "Logistique Internationale",
    category: "IA",
    overview: "Mise en place d'un modèle de Machine Learning pour optimiser les routes de livraison et anticiper les ruptures de stock avec une précision de 94%.",
    image: "/assets/images/project-supply.jpg",
    year: "2024",
    challenge: "Les coûts opérationnels étaient alourdis par des itinéraires de livraison sous-optimaux et des stocks dormants ou en rupture soudaine, basés sur des historiques statiques.",
    solution: "Ingestion de 5 années de données couplées avec les flux météorologiques et de trafic en direct. Entrainement de modèles de Random Forest et de séries temporelles pour prédire la demande à la semaine près.",
    results: [
      "Précision de la demande améliorée à 94%",
      "Baisse de 15% des coûts de carburant",
      "Réduction de 30% des ruptures de stock critiques"
    ],
    technologies: ["Python", "TensorFlow", "Pandas", "Apache Kafka", "Snowflake", "PowerBI"]
  },
  {
    id: 5,
    title: "Sécurisation d'Infrastructure Gouvernementale",
    client: "Secteur Public",
    category: "Sécurité",
    overview: "Audit complet, remédiation des vulnérabilités et déploiement d'un SOC (Security Operations Center) 24/7 pour contrer les menaces persistantes avancées.",
    image: "/assets/images/services-security.jpg",
    year: "2023",
    challenge: "Les réseaux subissaient des tentatives d'intrusion de plus en plus sophistiquées. Manque de visibilité globale sur les actifs numériques et de processus de réponse à incident.",
    solution: "Pentesting intensif, segmentation réseau (Zero Trust), déploiement d'un SIEM (Splunk), et mise en conformité ISO 27001. Formation des équipes internes aux bonnes pratiques.",
    results: [
      "Visibilité totale sur 100% du parc informatique",
      "Temps moyen de détection (MTTD) passé de 14 jours à 4 heures",
      "Zéro incident majeur post-remaniement"
    ],
    technologies: ["Splunk", "Palo Alto", "CrowdStrike", "Nessus", "Ansible"]
  },
  {
    id: 6,
    title: "Portail E-Commerce Haute Performance",
    client: "Retailer National",
    category: "Web",
    overview: "Conception d'une plateforme e-commerce headless capable de supporter des pics de trafic intenses lors des périodes de soldes sans dégradation des temps de réponse.",
    image: "/assets/images/project-ecommerce.jpg",
    year: "2023",
    challenge: "L'ancien site s'effondrait sous la charge lors des Black Fridays. Le frontend était couplé au backend, rendant les mises à jour UX lourdes et risquées.",
    solution: "Migration vers une architecture Headless e-commerce (Next.js + Shopify Plus). Mise en cache agressive déployée via Vercel Edge Network. Intégration d'un moteur de recherche Algolia.",
    results: [
      "Temps de chargement des pages divisé par 3",
      "Taux de conversion augmenté de 25%",
      "Uptime de 100% lors du dernier Black Friday"
    ],
    technologies: ["Next.js", "Shopify Plus", "Algolia", "Vercel", "TailwindCSS"]
  }
]

export default function ProjectDetailsPage() {
  const { id } = useParams()
  
  // Dans le futur, ceci proviendra d'un appel API. Pour l'instant on simule :
  const project = allProjects.find(p => p.id === parseInt(id)) || allProjects[0]

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
              <p className="project-overview">{project.overview}</p>
              
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
                <p>{project.challenge || "Des défis complexes nécessitaient une approche sur-mesure combinant technologie de pointe et compréhension métier approfondie."}</p>
              </div>
              <div className="content-block">
                <h2>Notre Solution</h2>
                <p>{project.solution || "Déploiement d'une architecture résiliente et évolutive, couplée à une interface intuitive favorisant l'adoption rapide par les utilisateurs finaux."}</p>
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
