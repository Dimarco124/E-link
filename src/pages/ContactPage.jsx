import { useState } from 'react'
import { FiMapPin, FiMail, FiPhone, FiCheckCircle, FiArrowRight, FiInfo, FiMessageSquare } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './ContactPage.css'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    setForm({ name: '', email: '', company: '', subject: '', message: '' })
  }

  const faqs = [
    {
      q: "Dans quels pays intervenez-vous ?",
      a: "Bien que notre siège soit situé à Abidjan (Côte d'Ivoire), nos équipes d'architectes et d'ingénieurs accompagnent des clients sur toute la région Ouest-Africaine (Sénégal, Mali, Burkina Faso) ainsi qu'à distance pour des clients internationaux."
    },
    {
      q: "Proposez-vous des audits de sécurité ?",
      a: "Absolument. Nos experts certifiés réalisent des pentests complets (boîte noire, boîte grise), des revues de code source et des audits d'architecture cloud pour identifier et corriger vos vulnérabilités."
    },
    {
      q: "Quelles technologies maîtrisez-vous ?",
      a: "Nous sommes des spécialistes des environnements Cloud Native. Nous maîtrisons Kubernetes, Docker, Terraform, CI/CD avancés, ainsi que les déploiements sur AWS, Google Cloud, Azure et des infrastructures On-Premise."
    },
    {
      q: "Comment se déroule un premier contact ?",
      a: "Le premier rendez-vous est une session d'exploration gratuite de 45 minutes. L'objectif est de comprendre vos enjeux métiers, d'évaluer la faisabilité technique de vos ambitions et de définir si notre expertise correspond à vos besoins."
    }
  ]

  return (
    <div className="contact-page">
      <div className="container">
        {/* Hero Section */}
        <header 
          className="contact-hero reveal reveal--up"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getAssetPath('/assets/images/hero-contact.jpg')})` 
          }}
        >
          <div className="contact-hero__content reveal reveal--up delay-100">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact</p>
            <h1 className="section-title" style={{ marginBottom: '24px', color: 'white' }}>
              Discutons de vos <span className="gradient-text">Ambitions</span>
            </h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Nos experts sont prêts à vous accompagner dans vos défis les plus complexes. Que ce soit pour concevoir une architecture distribuée, sécuriser vos données ou former vos équipes, parlons-en.
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <section className="contact-main">
          <div className="contact-grid">
            
            {/* Left: Contact Info */}
            <div className="contact-info-panel reveal reveal--left">
              <h2 className="info-title">Coordonnées</h2>
              <p className="info-desc">
                Vous préférez un contact direct ? N'hésitez pas à nous appeler ou à nous rendre visite (sur rendez-vous uniquement).
              </p>

              <div className="info-blocks">
                <div className="info-block">
                  <div className="info-icon"><FiMapPin /></div>
                  <div className="info-content">
                    <h3>Siège Social</h3>
                    <p>Cocody, Abidjan<br />Côte d'Ivoire</p>
                  </div>
                </div>
                
                <div className="info-block">
                  <div className="info-icon"><FiMail /></div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>
                      <a href="mailto:contact@e-link.ci">contact@e-link.ci</a><br />
                    </p>
                  </div>
                </div>

                <div className="info-block">
                  <div className="info-icon"><FiPhone /></div>
                  <div className="info-content">
                    <h3>Téléphone</h3>
                    <p>
                      <a href="tel:+2250000000000">+225 07 08 52 66 66</a><br />
                      <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)' }}>Lundi - Vendredi, 9h à 18h (GMT)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social or extra info box */}
              <div className="info-alert">
                <FiInfo className="info-alert-icon" />
                <p>Support technique d'urgence 24/7 disponible exclusivement pour les clients sous contrat d'infogérance.</p>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="contact-form-panel reveal reveal--right">
              {sent ? (
                <div className="form-success-state">
                  <FiCheckCircle className="success-icon" />
                  <h3>Message envoyé avec succès !</h3>
                  <p>Un membre de notre équipe reviendra vers vous sous 24h ouvrées.</p>
                  <button onClick={() => setSent(false)} className="btn btn--ghost" style={{ marginTop: '24px' }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h2>Envoyez-nous un message</h2>
                    <p>Tous les champs marqués d'un * sont requis.</p>
                  </div>
                  <form className="premium-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nom complet *</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Ex: Jean Kouassi"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email *</label>
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

                    <div className="form-row">
                      <div className="form-group">
                        <label>Entreprise</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Nom de votre société"
                          value={form.company}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Sujet *</label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>Sélectionnez un sujet</option>
                          <option value="cloud">Cloud & DevOps</option>
                          <option value="security">Cybersécurité & Audit</option>
                          <option value="dev">Développement Logiciel</option>
                          <option value="training">Formation</option>
                          <option value="other">Autre demande</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Votre message *</label>
                      <textarea
                        name="message"
                        placeholder="Décrivez-nous votre projet, vos enjeux ou le problème que vous cherchez à résoudre..."
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-submit-wrapper">
                      <button type="submit" className="btn btn--primary">
                        Envoyer ma demande <FiArrowRight />
                      </button>
                      <span className="secure-badge">
                        <FiCheckCircle /> Vos données sont sécurisées
                      </span>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section reveal reveal--up">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <p className="section-eyebrow">Foire Aux Questions</p>
            <h2 className="section-title">Encore des questions ?</h2>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-card reveal reveal--up delay-${(index + 1) * 100}`}>
                <div className="faq-icon"><FiMessageSquare /></div>
                <div>
                  <h3 className="faq-question">{faq.q}</h3>
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}