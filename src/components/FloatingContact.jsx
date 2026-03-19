import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMessageCircle, FiX, FiMail, FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getAssetPath } from '../utils/assets';
import './FloatingContact.css';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => setIsOpen(!isOpen);

  // WhatsApp Link using standard structure
  const waLabel = "Bonjour e-link, je souhaite avoir plus d'informations sur vos services.";
  const waUrl = `https://wa.me/2250708526666?text=${encodeURIComponent(waLabel)}`;

  return createPortal(
    <div className="fab-container" ref={containerRef}>
      {/* The Bubble Window */}
      <div className={`fab-bubble ${isOpen ? 'fab-bubble--open' : ''}`}>
        <div className="fab-bubble__header">
          <div className="fab-bubble__logo">
             <img src={getAssetPath('/assets/images/logo.png')} className="e-logo-red"/>
          </div>
          <button className="fab-bubble__close" onClick={() => setIsOpen(false)} aria-label="Fermer">
            <FiX />
          </button>
        </div>
        
        <div className="fab-bubble__body">
          <p className="fab-bubble__tagline">
            L'avenir de la digitalisation commence ici
          </p>

          <div className="fab-bubble__links">
            <a href={waUrl} target="_blank" rel="noreferrer" className="fab-link fab-link--whatsapp">
              <div className="fab-link__icon"><FaWhatsapp /></div>
              <div className="fab-link__text">
                <span>Discuter sur WhatsApp</span>
                <strong>+225 07 08 52 66 66</strong>
              </div>
            </a>
            
            <a href="tel:+2250708526666" className="fab-link">
              <div className="fab-link__icon"><FiPhoneCall /></div>
              <div className="fab-link__text">
                <span>Nous appeler</span>
                <strong>+225 07 08 52 66 66</strong>
              </div>
            </a>

            <a href="mailto:contact@e-link.ci" className="fab-link">
              <div className="fab-link__icon"><FiMail /></div>
              <div className="fab-link__text">
                <span>Nous écrire</span>
                <strong>contact@e-link.ci</strong>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* The Trigger Button */}
      <button 
        className={`fab-button ${isOpen ? 'fab-button--active' : ''}`}
        onClick={toggleOpen}
        aria-label="Nous contacter"
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>,
    document.body
  );
}
