import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiArrowRight } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './BlogDetailsPage.css'
import api from '../utils/api'

export default function BlogDetailsPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const [newsEmail, setNewsEmail] = useState('')
  const [newsSent, setNewsSent] = useState(false)
  const [newsLoading, setNewsLoading] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Lien de l\'article copié !')
    }
  }

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
      alert('Une erreur est survenue.')
    } finally {
      setNewsLoading(false)
    }
  }

  useEffect(() => {
    api.get(`/blog/${id}`)
      .then(res => {
        const p = res.data.data
        if (p) {
          const author = p.author_details || {}
          setPost({
            ...p,
            image: p.image ? (p.image.startsWith('http') ? p.image : getAssetPath(p.image)) : getAssetPath('/assets/images/blog-cloud.jpg'),
            date: new Date(p.published_at || p.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            readTime: p.read_time ? `${p.read_time} min` : '5 min',
            author: {
              name: author.name || 'e-link Team',
              role: author.role || 'Expert Digital',
              avatar: author.avatar ? (author.avatar.startsWith('http') ? author.avatar : getAssetPath(author.avatar)) : getAssetPath('/assets/images/monsieur.png')
            }
          })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load blog post:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>
  }

  if (!post) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Article non trouvé</div>
  }

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
            <button className="btn-share" onClick={handleShare}>
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
  )
}
