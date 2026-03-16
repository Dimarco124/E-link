import { useState } from 'react'
import { FiUploadCloud, FiCheckCircle, FiSend, FiBriefcase, FiAward, FiTarget, FiCoffee } from 'react-icons/fi'
import './CareersPage.css'

export default function CareersPage() {
  const [form, setForm] = useState({ name: '', email: '', position: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    setForm({ name: '', email: '', position: '', message: '' })
  }

  const perks = [
    { icon: <FiAward />, title: "Excellence", desc: "Travaillez sur des projets critiques avec les meilleures technos." },
    { icon: <FiTarget />, title: "Impact", desc: "Contribuez directement à la souveraineté numérique locale." },
    { icon: <FiCoffee />, title: "Culture", desc: "Un environnement agile, transparent et bienveillant." },
    { icon: <FiBriefcase />, title: "Évolution", desc: "Plan de carrière personnalisé et certifications offertes." }
  ]

  return (
    <div className="careers-page">
      <div className="container">
        <header className="careers-hero reveal reveal--up">
          <div className="careers-hero__content reveal reveal--up delay-200">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Rejoignez l'Exploration</p>
            <h1 className="section-title" style={{ color: 'white', marginBottom: '24px' }}>
              Bâtissons Ensemble <span className="gradient-text">le Futur</span>
            </h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Nous recherchons des esprits brillants et passionnés pour relever les défis technologiques les plus complexes de notre région.
            </p>
          </div>
        </header>

        <section className="careers-perks section">
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <div key={i} className={`perk-card reveal reveal--up delay-${(i + 1) * 100}`}>
                <div className="perk-icon">{perk.icon}</div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="careers-form-section section">
          <div className="careers-grid">
            <div className="careers-info reveal reveal--left">
              <h2 className="section-title">Candidature <span className="gradient-text">Spontanée</span></h2>
              <p className="careers-info-text">
                Aucun poste ouvert ne correspond à votre profil ? Pas d'inquiétude. 
                Nous sommes toujours à la recherche de talents exceptionnels. 
                Envoyez-nous votre profil, nous l'étudierons avec attention.
              </p>
              <div className="careers-requirements">
                <h3>Ce que nous recherchons :</h3>
                <ul>
                  <li><FiCheckCircle /> Maîtrise des environnements Cloud (AWS/GCP/Azure)</li>
                  <li><FiCheckCircle /> Expertise en développement (Go, Rust, Node.js, React)</li>
                  <li><FiCheckCircle /> Fortes compétences en Cybersécurité</li>
                  <li><FiCheckCircle /> Mindset Agile et soif d'apprendre</li>
                </ul>
              </div>
            </div>

            <div className="careers-form-wrapper reveal reveal--right">
              {sent ? (
                <div className="form-success-state">
                  <FiCheckCircle className="success-icon" />
                  <h3>Candidature reçue !</h3>
                  <p>Notre équipe RH étudiera votre profil et vous recontactera très prochainement.</p>
                </div>
              ) : (
                <form className="premium-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nom complet *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Marc Koffi"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="marc@email.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Poste souhaité *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Cloud Architect / DevSecOps"
                      value={form.position}
                      onChange={e => setForm({...form, position: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Message / Motivation</label>
                    <textarea 
                      rows="4" 
                      placeholder="Dites-nous pourquoi vous voulez nous rejoindre..."
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="file-upload">
                      <FiUploadCloud /> <span>Joindre votre CV (PDF)</span>
                      <input type="file" style={{ display: 'none' }} accept=".pdf" />
                    </label>
                  </div>
                  <button type="submit" className="btn btn--primary w-full" style={{ width: '100%', justifyContent: 'center' }}>
                    Envoyer ma candidature <FiSend />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
