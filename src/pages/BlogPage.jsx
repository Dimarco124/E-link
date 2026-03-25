import { useState, useMemo, useEffect } from 'react'
import { FiArrowRight, FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/assets'
import './BlogPage.css'
import api from '../utils/api'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const postsPerPage = 3 // Ajusté à 3 pour vérification facile (vous avez ~8 articles)

  const dynamicCategories = useMemo(() => {
    const cats = new Set(['Tous'])
    allPosts.forEach(p => {
      if (p.category) {
        const formattedCat = p.category.trim().charAt(0).toUpperCase() + p.category.trim().slice(1).toLowerCase()
        cats.add(formattedCat)
      }
    })
    return Array.from(cats)
  }, [allPosts])

  const [newsEmail, setNewsEmail] = useState('')
  const [newsSent, setNewsSent] = useState(false)
  const [newsLoading, setNewsLoading] = useState(false)

  const handleNewsSubmit = async (e) => {
    e.preventDefault()
    setNewsLoading(true)
    try {
      await api.post('/newsletter/subscribe', { email: newsEmail })
      setNewsSent(true)
      setNewsEmail('')
      setTimeout(() => setNewsSent(false), 5000)
    } catch (err) {
      console.error('Newsletter error:', err)
      const msg = err.response?.data?.message || 'Une erreur est survenue.'
      alert(msg)
    } finally {
      setNewsLoading(false)
    }
  }

  useEffect(() => {
    api.get('/blog')
      .then(res => {
        const formatted = res.data.data.map(p => ({
          ...p,
          image: p.image ? (p.image.startsWith('http') ? p.image : getAssetPath(p.image)) : getAssetPath('/assets/images/blog-cloud.jpg'),
          date: new Date(p.published_at || p.created_at).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          readTime: p.read_time || '5 min',
          featured: p.is_featured,
          // Normaliser la catégorie pour le filtrage
          category: p.category ? p.category.trim().charAt(0).toUpperCase() + p.category.trim().slice(1).toLowerCase() : ''
        }))
        setAllPosts(formatted)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load blog posts:', err)
        setLoading(false)
      })
  }, [])

  // Filtering logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      return activeCategory === 'Tous' || post.category === activeCategory
    })
  }, [activeCategory, allPosts])

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
          <h1 className="section-title" style={{ color: 'white' }}>Notre <span className="gradient-text">Blog</span></h1>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Découvrez nos analyses, tutoriels et retours d'expérience sur les technologies qui façonnent l'avenir.
          </p>

          <div className="blog-hero__controls">
            <div className="blog-hero__filters">
              <div className="blog-hero__filters-track">
                {dynamicCategories.map(cat => (
                  <button
                    key={cat}
                    className={`blog-filter-pill ${activeCategory === cat ? 'blog-filter-pill--active' : ''}`}
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
          </div>
        </header>

        {/* Featured Post (only on page 1 of 'Tous') */}
        {!loading && currentPage === 1 && activeCategory === 'Tous' && featuredPost && (
          <section className="blog-featured reveal reveal--scale">
            <Link to={`/blog/${featuredPost.slug}`} className="featured-card">
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
        {loading ? (
          <div className="content-loader">
            <div className="loader-spinner"></div>
            <p>Chargement des articles...</p>
          </div>
        ) : (
          <>
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
                    <Link to={`/blog/${post.slug}`} className="blog-card__link">
                      Lire la suite <FiArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* No Results */}
            {currentPosts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', opacity: 0.5 }}>
                <p>Aucun article disponible dans cette catégorie pour le moment.</p>
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

        {/* Newsletter Section */}
        <section className="blog-newsletter reveal reveal--up">
          <div className="newsletter-content">
            <h2 className="section-title" style={{ color: 'white' }}>Restez à la pointe de <span className="gradient-text">l'innovation</span></h2>
            <p style={{ opacity: 0.7 }}>Inscrivez-vous à notre newsletter pour recevoir nos analyses tech directement dans votre boîte mail.</p>
            {newsSent ? (
              <p style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>Merci de votre inscription !</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsSubmit}>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  value={newsEmail}
                  onChange={e => setNewsEmail(e.target.value)}
                  disabled={newsLoading}
                />
                <button type="submit" className="btn btn--primary" disabled={newsLoading}>
                  {newsLoading ? 'Envoi...' : 'S\'abonner'} <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
