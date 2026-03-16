import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiArrowRight } from 'react-icons/fi'
import './BlogDetailsPage.css'

// Temporary mock data for frontend
const allPosts = [
  {
    id: 1,
    title: "L'avenir du Cloud Native en Afrique de l'Ouest",
    excerpt: "Découvrez comment les architectures distribuées révolutionnent la scalabilité des entreprises ivoiriennes dans un marché en pleine mutation.",
    content: `
      <h2>Le changement de paradigme</h2>
      <p>L'adoption du cloud public et hybride n'est plus une option pour les entreprises cherchant à se développer rapidement sur le continent africain. L'approche "Cloud Native" permet de construire et d'exécuter des applications scalables dans des environnements modernes et dynamiques.</p>
      
      <blockquote>
        "Le Cloud Native n'est pas seulement un choix technologique, c'est une transformation organisationnelle qui place l'agilité au centre du processus de développement."
      </blockquote>

      <h3>Les avantages immédiats</h3>
      <ul>
        <li><strong>Scalabilité et flexibilité :</strong> Les microservices permettent de faire évoluer uniquement les composants nécessaires.</li>
        <li><strong>Résilience :</strong> En cas de panne d'un composant, l'architecture globale continue de fonctionner.</li>
        <li><strong>Vitesse de déploiement :</strong> Les pipelines CI/CD permettent plusieurs mises en production par jour de manière sécurisée.</li>
      </ul>

      <h2>Les défis de l'adoption locale</h2>
      <p>Bien que les avantages soient évidents, les entreprises ouest-africaines font face à des défis spécifiques tels que la souveraineté des données, les coûts de bande passante, et le besoin de former les talents locaux aux technologies comme Kubernetes, Docker et Terraform.</p>
      
      <p>C'est ici que l'accompagnement par des experts prend tout son sens. Chez <span class="e-logo">e</span>-link, nous concevons des architectures sur mesure qui tiennent compte de la réalité du terrain tout en exploitant la puissance du cloud mondial.</p>
    `,
    image: '/assets/images/blog-cloud.jpg',
    category: 'Cloud',
    date: '12 Mars 2026',
    readTime: '5 min',
    author: {
      name: "Jean-Marc Sery",
      role: "Architecte Cloud Solutions",
      avatar: "/assets/images/avatar-1.jpg"
    }
  },
  {
    id: 2,
    title: "Cybersécurité : Les 5 menaces à surveiller en 2026",
    excerpt: "Anticipez les risques liés à l'IA générative et protégez vos actifs numériques avec nos stratégies de défense multicouches.",
    content: "Contenu à venir...",
    image: '/assets/images/services-security.jpg',
    category: 'Sécurité',
    date: '08 Mars 2026',
    readTime: '8 min',
    author: {
      name: "Fatoumata Diabaté",
      role: "Lead SecOps",
      avatar: "/assets/images/avatar-2.jpg"
    }
  }
]

export default function BlogDetailsPage() {
  const { id } = useParams()
  
  // Dans le futur, ceci proviendra d'un appel API
  const post = allPosts.find(p => p.id === parseInt(id)) || allPosts[0]

  return (
    <div className="blog-details-page">
      <div className="container">
        <Link to="/blog" className="back-link reveal reveal--left">
          <FiArrowLeft /> Retour aux articles
        </Link>
        
        {/* Detail Hero */}
        <header className="blog-detail-hero reveal reveal--up">
          <div className="blog-detail-hero__meta">
            <span className="blog-badge">{post.category}</span>
            <div className="blog-meta-info">
              <span><FiCalendar /> {post.date}</span>
              <span><FiClock /> {post.readTime}</span>
            </div>
          </div>
          
          <h1 className="blog-title">{post.title}</h1>
          <p className="blog-lead">{post.excerpt}</p>
          
          <div className="blog-author-bar">
            {post.author && (
              <div className="author-info">
                <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                <div>
                  <div className="author-name">{post.author.name}</div>
                  <div className="author-role">{post.author.role}</div>
                </div>
              </div>
            )}
            <button className="btn-share">
              <FiShare2 /> Partager
            </button>
          </div>
        </header>

        {/* Visual Cover */}
        <div className="blog-cover-image reveal reveal--scale">
          <img src={post.image} alt={post.title} />
        </div>

        {/* Content Section */}
        <div className="blog-content-wrapper">
          <article 
            className="blog-rich-content reveal reveal--up"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="blog-sidebar reveal reveal--right">
            <div className="sidebar-widget">
              <h3>À propos de <span className="e-logo">e</span>-link</h3>
              <p>
                Nous sommes des architectes de la Tech. <span className="e-logo">e</span>-link accompagne les entreprises dans leur transformation digitale grâce à des solutions sur-mesure et performantes.
              </p>
              <Link to="/services" className="btn btn--primary btn--sm" style={{ marginTop: '20px' }}>
                Découvrir nos services <FiArrowRight />
              </Link>
            </div>
            
            <div className="sidebar-widget">
              <h3>Tags Populaires</h3>
              <div className="tags-cloud">
                <span className="tag-pill">Cloud Native</span>
                <span className="tag-pill">Kubernetes</span>
                <span className="tag-pill">AWS</span>
                <span className="tag-pill">Sécurité</span>
                <span className="tag-pill">DevOps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section Reused */}
      <section className="blog-newsletter reveal reveal--up" style={{ marginTop: 0 }}>
        <div className="newsletter-content">
          <h2 className="section-title" style={{ color: 'white' }}>Vous aimez <span className="gradient-text">cet article ?</span></h2>
          <p style={{ opacity: 0.7 }}>Inscrivez-vous à notre newsletter pour être notifié de nos prochaines publications techniques.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Votre adresse email" required />
            <button type="submit" className="btn btn--primary">
              S'abonner <FiArrowRight />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
