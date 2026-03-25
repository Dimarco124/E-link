import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './BlogPreview.css'

export default function BlogPreview({ data: dynamicData }) {
  // If no dynamic data is provided, we don't render the section or show a loader
  if (!dynamicData || dynamicData.length === 0) {
    return null;
  }

  const postsToUse = dynamicData.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category || 'Engineering',
    excerpt: post.excerpt || (post.content ? post.content.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...' : ''),
    image: post.image ? (post.image.startsWith('http') ? post.image : getAssetPath(post.image)) : getAssetPath('/assets/images/blog-cloud.jpg'),
    date: new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    readTime: post.read_time ? `${post.read_time} min` : '5 min'
  }));

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
          {postsToUse.map((post, i) => (
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
                <Link to={`/blog/${post.slug || post.id}`} className="blog-card__link">
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
