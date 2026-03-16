import { useState, useMemo } from 'react'
import { FiSearch, FiArrowRight, FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './BlogPage.css'

const allPosts = [
  {
    id: 1,
    title: "L'avenir du Cloud Native en Afrique de l'Ouest",
    excerpt: "Découvrez comment les architectures distribuées révolutionnent la scalabilité des entreprises ivoiriennes dans un marché en pleine mutation.",
    image: '/assets/images/blog-cloud.jpg',
    category: 'Cloud',
    date: '12 Mars 2026',
    readTime: '5 min',
    featured: true
  },
  {
    id: 2,
    title: "Cybersécurité : Les 5 menaces à surveiller en 2026",
    excerpt: "Anticipez les risques liés à l'IA générative et protégez vos actifs numériques avec nos stratégies de défense multicouches.",
    image: '/assets/images/services-security.jpg',
    category: 'Sécurité',
    date: '08 Mars 2026',
    readTime: '8 min'
  },
  {
    id: 3,
    title: "IA Générative : Transformer la productivité métier",
    excerpt: "Au-delà du buzz, comment intégrer concrètement l'IA dans vos processus opérationnels pour gagner en efficacité réelle.",
    image: '/assets/images/blog-ia.jpg',
    category: 'IA',
    date: '01 Mars 2026',
    readTime: '6 min'
  },
  {
    id: 4,
    title: "Architecture Microservices : Guide de survie",
    excerpt: "Pourquoi et comment passer d'un monolithe à une architecture distribuée sans perdre le contrôle de votre SI.",
    image: '/assets/images/blog-data.jpg',
    category: 'Ingénierie',
    date: '25 Février 2026',
    readTime: '10 min'
  },
  {
    id: 5,
    title: "Le DevOps en 2026 : Vers l'automatisation totale",
    excerpt: "Les nouveaux outils et paradigmes qui redéfinissent la collaboration entre développeurs et opérationnels.",
    image: '/assets/images/blog-devops.jpg',
    category: 'Cloud',
    date: '20 Février 2026',
    readTime: '7 min'
  },
  {
    id: 6,
    title: "Data Governance : Le pilier de l'IA",
    excerpt: "Pourquoi une stratégie de données solide est indispensable avant tout projet d'intelligence artificielle.",
    image: '/assets/images/blog-analysis.jpg',
    category: 'IA',
    date: '15 Février 2026',
    readTime: '9 min'
  },
  {
    id: 7,
    title: "Blockchain et Supply Chain en Côte d'Ivoire",
    excerpt: "Cas d'usage concrets de la traçabilité décentralisée pour l'exportation des matières premières.",
    image: '/assets/images/blog-blockchain.jpg',
    category: 'Innovation',
    date: '10 Février 2026',
    readTime: '6 min'
  },
  {
    id: 8,
    title: "Le futur du télétravail technique",
    excerpt: "Comment maintenir une culture d'ingénierie forte dans des équipes distribuées géographiquement.",
    image: '/assets/images/blog-future.jpg',
    category: 'Management',
    date: '05 Février 2026',
    readTime: '5 min'
  }
]

const CATEGORIES = ['Tous', 'Cloud', 'IA', 'Sécurité', 'Ingénierie', 'Innovation', 'Management']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filtering logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = activeCategory === 'Tous' || post.category === activeCategory
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const featuredPost = allPosts.find(p => p.featured)

  return (
    <div className="blog-page">
      <div className="container">
        {/* Blog Hero */}
        <header className="blog-hero reveal reveal--up">
          <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Innovation & Insights</p>
          <h1 className="section-title" style={{ color: 'white'}}>Notre <span className="gradient-text">Blog</span></h1>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Découvrez nos analyses, tutoriels et retours d'expérience sur les technologies qui façonnent l'avenir.
          </p>

          <div className="blog-hero__controls">
            <div className="blog-hero__search">
              <FiSearch />
              <input 
                type="text" 
                placeholder="Rechercher un article..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <div className="blog-hero__filters">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-pill ${activeCategory === cat ? 'filter-pill--active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat)
                    setCurrentPage(1)
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Post (only on page 1 of 'Tous') */}
        {currentPage === 1 && activeCategory === 'Tous' && !searchQuery && featuredPost && (
          <section className="blog-featured reveal reveal--scale">
            <Link to={`/blog/${featuredPost.id}`} className="featured-card">
              <div className="featured-card__image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
              <div className="featured-card__content">
                <span className="featured-card__badge">À la une</span>
                <h2 className="featured-card__title">{featuredPost.title}</h2>
                <p className="blog-card__excerpt">{featuredPost.excerpt}</p>
                <div className="blog-card__meta">
                  <span><FiCalendar /> {featuredPost.date}</span>
                  <span><FiClock /> {featuredPost.readTime}</span>
                </div>
                <span className="btn btn--primary btn--sm" style={{ marginTop: '24px', width: 'fit-content' }}>
                  Lire l'article <FiArrowRight />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Article Grid */}
        <div className="blog-grid">
          {currentPosts.map((post, i) => (
            <article key={post.id} className={`blog-card reveal reveal--up delay-${((i % 3) + 1) * 100}`}>
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} />
                <div className="blog-card__category">{post.category}</div>
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

        {/* No Results */}
        {currentPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', opacity: 0.5 }}>
            <p>Aucun article ne correspond à votre recherche.</p>
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

        {/* Newsletter Section */}
        <section className="blog-newsletter reveal reveal--up">
          <div className="newsletter-content">
            <h2 className="section-title" style={{ color: 'white' }}>Restez à la pointe de <span className="gradient-text">l'innovation</span></h2>
            <p style={{ opacity: 0.7 }}>Inscrivez-vous à notre newsletter pour recevoir nos analyses tech directement dans votre boîte mail.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Votre adresse email" required />
              <button type="submit" className="btn btn--primary">
                S'abonner <FiArrowRight />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
