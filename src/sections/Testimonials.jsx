import { useState, useEffect, useCallback } from 'react'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import { getAssetPath } from '../utils/assets'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: "Amadou Diallo",
    role: "Directeur des Systèmes d'Information, Banque Panafricaine",
    avatar: getAssetPath("/assets/images/homme1.jpg"),
    content: "e-link a transformé notre infrastructure SI en un temps record. Leur expertise en architecture Cloud Native est tout simplement inégalée en Côte d'Ivoire.",
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Diabaté',
    role: 'Directrice IT, GreenBank',
    avatar: getAssetPath('/assets/images/femme2.jpg'),
    content: "Un partenaire de confiance qui comprend les enjeux de sécurité bancaire moderne. Leur approche de la cybersécurité est à la fois rigoureuse et innovante.",
    rating: 5
  },
  {
    id: 3,
    name: "Assétou Koné",
    role: "Fondatrice, TechAfrique",
    avatar: getAssetPath("/assets/images/avatar-3.jpg"),
    content: "L'accompagnement d'e-link a été crucial pour le lancement de notre plateforme. Une équipe réactive, compétente et passionnée par l'innovation.",
    rating: 5
  },
  {
    id: 4,
    name: "Kareem Traoré",
    role: "Lead Developer, Start-up FinTech",
    avatar: getAssetPath("/assets/images/femme1.jpg"),
    content: "La formation de nos équipes par e-link a été un tournant majeur. Ils ne se contentent pas de livrer du code, ils transmettent un vrai savoir-faire.",
    rating: 5
  },
  {
    id: 5,
    name: "Jean-Luc Koffi",
    role: "CTO, Innov'CI",
    avatar: getAssetPath("/assets/images/avatar-2.jpg"),
    content: "Leur maîtrise des microservices nous a permis de scaler notre application nationale sans aucune interruption de service. Exceptionnel.",
    rating: 5
  },
  {
    id: 6,
    name: "Marie-Evelyne Yao",
    role: "Directrice Opérations, AgriTech",
    avatar: getAssetPath("/assets/images/femme3.jpg"),
    content: "E-link n'est pas qu'un prestataire, c'est un partenaire stratégique. Leur vision 360° du digital nous aide à anticiper les besoins de demain.",
    rating: 5
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header reveal reveal--up">
          <p className="section-eyebrow">Témoignages</p>
          <h2 className="section-title">Ce que disent nos <span className="gradient-text">partenaires</span></h2>
          <p className="section-sub">La confiance de nos clients est notre plus grande réussite et le moteur de notre innovation quotidienne.</p>
        </div>

        <div className="testimonials__carousel reveal reveal--up delay-200">
          <div 
            className="testimonials__viewport"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div 
                key={t.id} 
                className={`testimonial-slide ${i === activeIndex ? 'is-active' : ''}`}
              >
                <div className="testimonial-card">
                  <div className="testimonial-card__quote">
                    <FaQuoteRight />
                  </div>
                  
                  <div className="testimonial-card__stars">
                    {[...Array(t.rating)].map((_, i) => <FiStar key={i} className="star-fill" />)}
                  </div>

                  <p className="testimonial-card__content">"{t.content}"</p>

                  <div className="testimonial-card__author">
                    <img src={t.avatar} alt={t.name} className="testimonial-card__avatar" />
                    <div className="testimonial-card__info">
                      <h4 className="testimonial-card__name">{t.name}</h4>
                      <p className="testimonial-card__role">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__controls">
            <button className="testimonials__btn testimonials__btn--prev" onClick={prevSlide} aria-label="Précédent">
              <FiChevronLeft />
            </button>
            
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  className={`testimonials__dot ${i === activeIndex ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Aller au témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button className="testimonials__btn testimonials__btn--next" onClick={nextSlide} aria-label="Suivant">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
