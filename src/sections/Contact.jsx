import { useState } from 'react'
import { FiMapPin, FiMail, FiClock, FiCheck, FiArrowRight } from 'react-icons/fi'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', company: '', message: '' })
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__inner">
          {/* Left */}
          <div className="contact__info reveal reveal--left">
            <p className="section-eyebrow">Nous contacter</p>
            <h2 className="contact__title">
              Parlons de votre
              <span className="gradient-text"> projet</span>
            </h2>
            <p className="contact__desc">
              Que vous souhaitiez digitaliser vos opérations, sécuriser vos systèmes 
              ou former vos équipes, nous sommes là pour construire avec vous.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <FiMapPin />
                </div>
                <div>
                  <p className="contact__detail-label">Adresse</p>
                  <p className="contact__detail-val">Abidjan Cocody, Côte d'Ivoire</p>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <FiMail />
                </div>
                <div>
                  <p className="contact__detail-label">Email</p>
                  <p className="contact__detail-val">contact@e-link.ci</p>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <FiClock />
                </div>
                <div>
                  <p className="contact__detail-label">Disponibilité</p>
                  <p className="contact__detail-val">Support 24h/24, 7j/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrap reveal reveal--right">
            {sent ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <FiCheck />
                </div>
                <h3>Message envoyé !</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="form-field">
                    <label>Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jean Kouassi"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jean@entreprise.ci"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Entreprise</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Votre société"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label>Votre message</label>
                  <textarea
                    name="message"
                    placeholder="Décrivez votre projet ou votre besoin..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="contact__submit">
                  Envoyer le message
                  <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
