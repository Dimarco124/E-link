import { FiStar } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import { getAssetPath } from '../utils/assets'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: "Amadou Diallo",
    role: "Directeur des Systèmes d'Information, Banque Panafricaine",
    avatar: getAssetPath("/assets/images/avatar-1.jpg"),
    content: <>e-link a transformé notre infrastructure SI en un temps record. Leur expertise en architecture Cloud Native est tout simplement inégalée en Côte d'Ivoire.</>,
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Diabaté',
    role: 'Directrice IT, GreenBank',
    avatar: getAssetPath('/assets/images/avatar-2.jpg'),
    content: "Un partenaire de confiance qui comprend les enjeux de sécurité bancaire moderne. Leur approche de la cybersécurité est à la fois rigoureuse et innovante.",
    rating: 5
  },
  {
    id: 3,
    name: "Kareem Traoré",
    role: "Lead Developer, Start-up FinTech",
    avatar: getAssetPath("/assets/images/avatar-1.jpg"),
    content: <>La formation de nos équipes par e-link a été un tournant majeur. Ils ne se contentent pas de livrer du code, ils transmettent un vrai savoir-faire.</>,
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Témoignages</p>
          <h2 className="section-title">Ce que disent nos <span className="gradient-text">partenaires</span></h2>
          <p className="section-sub">La confiance de nos clients est notre plus grande réussite et le moteur de notre innovation quotidienne.</p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-card reveal reveal--up delay-${(i + 1) * 100}`}>
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
          ))}
        </div>
      </div>
    </section>
  )
}
