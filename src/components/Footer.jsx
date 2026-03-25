import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { FiMapPin, FiArrowRight, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiSend, FiPhone, FiMail } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'
import { getAssetPath } from '../utils/assets'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [newsSent, setNewsSent] = useState(false)
  const [newsLoading, setNewsLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!email) return
    setNewsLoading(true)
    try {
      await api.post('/newsletter/subscribe', { email })
      setNewsSent(true)
      setEmail('')
      setTimeout(() => setNewsSent(false), 5000)
    } catch (err) {
      console.error('Newsletter error:', err)
      const msg = err.response?.data?.message || 'Une erreur est survenue.'
      alert(msg)
    } finally {
      setNewsLoading(false)
    }
  }

  return (
    <footer className="footer">
      {/* Decorative Blur Elements */}
      <div className="footer__blur-1"></div>
      <div className="footer__blur-2"></div>

      <div className="container">
        {/* Pre-footer CTA */}
        <div className="footer__cta">
          <div className="footer__cta-content">
            <h2 className="footer__cta-title">
              Prêt à propulser votre <br />
              <span>vision technologique ?</span>
            </h2>
            <p className="footer__cta-text">
              Transformons vos idées en solutions numériques d'exception.
              Nos experts sont prêts à vous accompagner.
            </p>
          </div>
          <Link to="/contact" className="footer__cta-btn">
            Démarrer la discussion <FiArrowRight />
          </Link>
        </div>

        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="navbar__logo footer__logo">
              <img src={getAssetPath('/assets/images/logo.png')} className="e-logo-red" alt="Logo" />
            </Link>
            <p className="footer__desc">
              e-link est une ESN (Entreprise de Services du Numérique) basée à Abidjan,
              accompagnant votre transformation digitale avec agilité et excellence.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" aria-label="X"><FiTwitter /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
            </div>
          </div>

          <div className="footer__links-group">
            <p className="footer__group-title">Expertises</p>
            <ul>
              <li><Link to="/services">Architecture Cloud</Link></li>
              <li><Link to="/services">Cybersécurité</Link></li>
              <li><Link to="/services">Développement Agile</Link></li>
              <li><Link to="/services">Infrastructure & SI</Link></li>
            </ul>
          </div>

          <div className="footer__links-group">
            <p className="footer__group-title">Société</p>
            <ul>
              <li><Link to="/a-propos">Notre expertise</Link></li>
              <li><Link to="/realisations">Réalisations</Link></li>
              <li><Link to="/carrieres">Nous rejoindre</Link></li>
              <li><Link to="/formations">Elite Training</Link></li>
              <li><Link to="/blog">Insights Blog</Link></li>
            </ul>
          </div>

          <div className="footer__newsletter">
            <p className="footer__group-title">Newsletter</p>
            <p className="footer__newsletter-sub">Restez à la pointe de l'innovation tech.</p>
            {newsSent ? (
              <p style={{ color: 'var(--accent-red)', fontSize: '0.9rem' }}>Merci de votre inscription !</p>
            ) : (
              <div className="footer__email-input">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={newsLoading}
                />
                <button aria-label="S'abonner" onClick={handleSubscribe} disabled={newsLoading}>
                  {newsLoading ? '...' : <FiSend />}
                </button>
              </div>
            )}
            <div className="footer__contact-quick">
              <a href="tel:+2250708526666" className="footer__contact-link"><FiPhone /> +225 07 08 52 66 66</a>
              <a href="mailto:contact@e-link.ci" className="footer__contact-link"><FiMail /> contact@e-link.ci</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-info">
            <p>&copy; 2026 e-link SARL. Tous droits réservés.</p>
            <p className="footer__location-link">
              <FiMapPin /> Abidjan Cocody, Côte d'Ivoire
            </p>
          </div>
          <div className="footer__bottom-credit">
            <span>Site réalisé par</span>
            <strong>e-link</strong>
          </div>
          <div className="footer__bottom-legal">
            <a href="#">Mentions Légales</a>
            <a href="#">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
