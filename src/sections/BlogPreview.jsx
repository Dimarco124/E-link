import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi'
import './BlogPreview.css'

const posts = [
  {
    id: 1,
    title: "L'avenir du Cloud Native en Afrique de l'Ouest",
    excerpt: "Découvrez comment les architectures distribuées révolutionnent la scalabilité des entreprises ivoiriennes...",
    image: '/assets/images/blog-cloud.jpg',
    date: '12 Mars 2026',
    readTime: '5 min'
  },
  {
    id: 2,
    title: "Cybersécurité : Les 5 menaces à surveiller en 2026",
    excerpt: "Anticipez les risques liés à l'IA et protégez vos actifs numériques avec nos stratégies de défense avancées...",
    image: '/assets/images/services-security.jpg',
    date: '08 Mars 2026',
    readTime: '8 min'
  },
  {
    id: 3,
    title: "IA Générative : Transformer la productivité métier",
    excerpt: "Au-delà du buzz, comment intégrer concrètement l'IA dans vos processus opérationnels quotidiens...",
    image: '/assets/images/blog-ia.jpg',
    date: '01 Mars 2026',
    readTime: '6 min'
  }
]

export default function BlogPreview() {
  return (
    <section className="blog-preview">
      <div className="container">
        <div className="blog-preview__header">
          <div className="blog-preview__header-text">
            <p className="section-eyebrow">Innovation & Insights</p>
            <h2 className="section-title">Dernières du <span className="gradient-text">blog</span></h2>
          </div>
          <Link to="/blog" className="btn btn--outline btn--sm">
            Voir tous les articles <FiArrowRight />
          </Link>
        </div>

        <div className="blog-preview__grid">
          {posts.map((post, i) => (
            <article key={post.id} className={`blog-card reveal reveal--up delay-${(i + 1) * 100}`}>
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} />
                <div className="blog-card__category">Engineering</div>
              </div>
              <div className="blog-card__content">
                <div className="blog-card__meta">
                  <span><FiCalendar /> {post.date}</span>
                  <span><FiClock /> {post.readTime}</span>
                </div>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-card__link">
                  Lire la suite <FiArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
