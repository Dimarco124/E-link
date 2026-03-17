import { FiCpu, FiShield, FiGlobe, FiUsers } from 'react-icons/fi'
import './ExpertiseHighlights.css'

const highlights = [
  {
    icon: <FiCpu />,
    title: "Elite Tech Talent",
    desc: "Nos ingénieurs sont sélectionnés parmi les meilleurs et certifiés sur les technologies les plus exigeantes du marché (AWS, Kubernetes, OSCP)."
  },
  {
    icon: <FiShield />,
    title: "Security Native",
    desc: "La cybersécurité n'est pas une option, c'est l'ADN de chaque solution que nous déployons. Protection maximale dès la première ligne de code."
  },
  {
    icon: <FiGlobe />,
    title: "Vision Globale, Action Locale",
    desc: "Nous combinons des standards d'ingénierie internationaux avec une connaissance profonde des enjeux et réalités du marché ouest-africain."
  },
  {
    icon: <FiUsers />,
    title: "Partenariat Stratégique",
    desc: "Nous ne sommes pas de simples prestataires. Nous devenons l'extension de votre équipe tech pour co-construire votre succès sur le long terme."
  }
]

export default function ExpertiseHighlights() {
  return (
    <section className="expertise-highlights">
      <div className="container">
        <div className="highlights-wrapper">
          <div className="highlights-header reveal reveal--up">
            <h2 className="section-title">Pourquoi choisir <span className="gradient-text">e-link</span> ?</h2>
            <p className="section-sub">
              L'excellence n'est pas un acte, c'est une habitude. Voici ce qui fait de nous le partenaire idéal pour vos projets critiques.
            </p>
          </div>

          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <div key={index} className={`highlight-item reveal reveal--up delay-${(index + 1) * 100}`}>
                <div className="highlight-icon">
                  {item.icon}
                </div>
                <div className="highlight-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
