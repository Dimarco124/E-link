import { FiSearch, FiLayers, FiActivity, FiShield } from 'react-icons/fi'
import './Methodology.css'

const steps = [
  {
    icon: <FiSearch />,
    title: "Audit & Exploration",
    desc: "Nous analysons votre infrastructure existante et vos objectifs métiers pour identifier les opportunités d'optimisation.",
    color: "var(--coral)"
  },
  {
    icon: <FiLayers />,
    title: "Design Cloud Native",
    desc: "Conception d'une architecture sur mesure, résiliente et évolutive, basée sur les meilleurs standards du marché.",
    color: "var(--gold)"
  },
  {
    icon: <FiActivity />,
    title: "Déploiement Agile",
    desc: "Mise en œuvre itérative avec intégration continue pour une livraison rapide et sécurisée de vos solutions.",
    color: "var(--salmon)"
  },
  {
    icon: <FiShield />,
    title: "Gouvernance & MCO",
    desc: "Accompagnement continu, monitoring 24/7 et maintien en condition opérationnelle pour une sérénité totale.",
    color: "var(--peach)"
  }
]

export default function Methodology() {
  return (
    <section className="methodology">
      <div className="section-header reveal reveal--up">
        <p className="section-eyebrow">Notre Approche</p>
        <h2 className="section-title">Comment nous <span className="gradient-text">Propulsons</span> votre SI</h2>
      </div>

      <div className="methodology-grid">
        {steps.map((step, index) => (
          <div key={index} className={`method-step reveal reveal--up delay-${(index + 1) * 100}`}>
            <div className="method-step__line"></div>
            <div className="method-step__num">0{index + 1}</div>
            <div className="method-step__icon" style={{ borderColor: step.color }}>
              {step.icon}
            </div>
            <h3 className="method-step__title">{step.title}</h3>
            <p className="method-step__desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
