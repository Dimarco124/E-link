import { Link } from 'react-router-dom'
import { FiMapPin, FiArrowRight, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiSend, FiPhone, FiMail } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
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
              Prêt à propulser votre <br/>
              <span>vision technologique ?</span>
            </h2>
            <p className="footer__cta-text">
              Transformons vos idées en solutions numériques d'exception. 
              Nos experts sont prêts à vous accompagner.
            </p>
          </div>
          <a href="#contact" className="footer__cta-btn">
            Démarrer la discussion <FiArrowRight />
          </a>
        </div>

        <div className="footer__top">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="navbar__logo footer__logo">
            <img src='./public/assets/images/logo.png' className="e-logo-red"/>
            <span className="navbar__logo-link">e-link</span>
            <span className="navbar__logo-dot"></span>
          </Link>
          <p className="footer__desc">
            e-link est une ESM (Entreprise de Services du Numérique) basée à Abidjan, 
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
              <li><a href="#services">Conseil en SI</a></li>
              <li><a href="#services">Développement</a></li>
              <li><a href="#services">Cybersécurité</a></li>
              <li><a href="#services">Cloud & Data</a></li>
            </ul>
          </div>

          <div className="footer__links-group">
            <p className="footer__group-title">Société</p>
            <ul>
              <li><a href="#about">À propos</a></li>
              <li><a href="#expertise">Nos valeurs</a></li>
              <li><Link to="/carrieres">Carrières</Link></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#services">Nos formations</a></li>
            </ul>
          </div>

          <div className="footer__newsletter">
            <p className="footer__group-title">Newsletter</p>
            <p className="footer__newsletter-sub">Restez à la pointe de l'innovation tech.</p>
            <div className="footer__email-input">
              <input type="email" placeholder="votre@email.com" />
              <button aria-label="S'abonner">
                <FiSend />
              </button>
            </div>
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
            <strong>Valdes Di Marco</strong>
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
