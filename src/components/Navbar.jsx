import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { 
  FiHome, FiUser, FiCpu, FiStar, FiMail, FiArrowRight, 
  FiPhone, FiInstagram, FiLinkedin, FiTwitter, FiYoutube,
  FiLayout, FiBookOpen, FiEdit3, FiUsers
} from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'
import './Navbar.css'

const links = [
  { label: 'Accueil', path: '/', icon: <FiHome /> },
  { label: 'À propos', path: '/a-propos', icon: <FiUser /> },
  { label: 'Services', path: '/services', icon: <FiCpu /> },
  { label: 'Réalisations', path: '/realisations', icon: <FiLayout /> },
  { label: 'Formations', path: '/formations', icon: <FiBookOpen /> },
  { label: 'Blog', path: '/blog', icon: <FiEdit3 /> },
  { label: 'Carrières', path: '/carrieres', icon: <FiUsers /> },
  { label: 'Contact', path: '/contact', icon: <FiMail /> },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__top">
        <div className="container navbar__top-inner">
          <div className="navbar__top-contact">
            <a href="tel:+2250708526666" className="navbar__top-item">
              <FiPhone /> <span>+225 07 08 52 66 66</span>
            </a>
            <a href="mailto:contact@e-link.ci" className="navbar__top-item">
              <FiMail /> contact@e-link.ci
            </a>
          </div>
          <div className="navbar__top-socials">
            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href="#" aria-label="X"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="YouTube"><FiYoutube /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>
      </div>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="e-logo-red">e</span>
          <span className="navbar__logo-link">-link</span>
          <span className="navbar__logo-dot"></span>
        </Link>

        <div className={`navbar__menu-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map((l, i) => (
            <li key={l.label} style={{ '--i': i }}>
              <NavLink 
                to={l.path} 
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="navbar__link-icon">{l.icon}</span>
                <span className="navbar__link-text">{l.label}</span>
              </NavLink>
            </li>
          ))}
          
          <li className="mobile-only" style={{ '--i': links.length }}>
            <div className="navbar__mobile-info">
              <div className="navbar__mobile-contact">
                <a href="tel:+2250708526666" className="navbar__mobile-item">
                  <FiPhone /> <span>+225 07 08 52 66 66</span>
                </a>
                <a href="mailto:contact@e-link.ci" className="navbar__mobile-item">
                  <FiMail /> <span>contact@e-link.ci</span>
                </a>
              </div>
              
              <div className="navbar__mobile-socials">
                <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
                <a href="#" aria-label="X"><FiTwitter /></a>
                <a href="#" aria-label="Instagram"><FiInstagram /></a>
                <a href="#" aria-label="YouTube"><FiYoutube /></a>
                <a href="#" aria-label="TikTok"><FaTiktok /></a>
              </div>

              <NavLink to="/contact" className="navbar__cta-mobile" onClick={() => setMenuOpen(false)}>
                Démarrer un projet <FiArrowRight />
              </NavLink>
            </div>
          </li>
        </ul>

        <div className="navbar__actions">
          <Link to="/contact" className="navbar__cta">
            <span>Démarrer un projet</span>
            <FiArrowRight />
          </Link>

          <button 
            className={`navbar__burger ${menuOpen ? 'navbar__burger--active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="burger-box">
              <span className="burger-line line-1"></span>
              <span className="burger-line line-2"></span>
              <span className="burger-line line-3"></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

