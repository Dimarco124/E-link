import { useState } from 'react'
import { FiCompass, FiSettings, FiShield, FiCloud, FiBookOpen, FiMonitor, FiCheck, FiArrowRight } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './Services.css'

const services = [
  {
    id: '01',
    icon: <FiCompass />,
    title: 'Conseil en SI',
    image: getAssetPath('/assets/images/services-conseil.jpg'),
    short: 'Ingénierie des Systèmes d\'Information',
    color: '#002fff',
    items: [
      'Audits flash & schémas directeurs',
      'Urbanisation des SI complexes',
      'Assistance à Maîtrise d\'Ouvrage (AMOA)',
      'Gouvernance & gestion du changement'
    ],
    desc: 'Nous alignons votre infrastructure technologique sur vos ambitions stratégiques pour créer un avantage compétitif durable.',
    longDesc: 'Notre approche du conseil dépasse la simple recommandation technique. Nous analysons vos flux métiers pour concevoir des architectures qui non seulement répondent aux besoins actuels, mais anticipent les défis de demain.'
  },
  {
    id: '02',
    icon: <FiSettings />,
    title: 'Développement',
    image: getAssetPath('/assets/images/services-dev.jpg'),
    short: 'Solutions Logicielles Critiques',
    color: '#00fbff',
    items: [
      'Applications Web & SaaS innovantes',
      'Plateformes Mobiles natives',
      'API Management & Microservices',
      'Modernisation de legacy systems'
    ],
    desc: 'Nous construisons des solutions logicielles robustes, scalables et centrées sur l\'utilisateur final.',
    longDesc: 'Nous utilisons les standards les plus élevés du développement moderne (Clean Architecture, TDD) pour garantir que votre logiciel reste maintenable et performant, même sous forte charge.'
  },
  {
    id: '03',
    icon: <FiShield />,
    title: 'Cybersécurité',
    image: getAssetPath('/assets/images/services-security.jpg'),
    short: 'Résilience & Protection Avancée',
    color: '#f31505',
    items: [
      'Tests d\'intrusion (Pentesting)',
      'Compliance (ISO 27001, RGPD)',
      'Sécurisation des environnements Cloud',
      'SOC & Réponse aux incidents'
    ],
    desc: 'Bâtissez une forteresse numérique autour de vos actifs les plus précieux.',
    longDesc: 'Dans un paysage de menaces en constante évolution, nous adoptons une approche "Security by Design". Nous intégrons la sécurité dès les premières étapes de vos projets pour une résilience totale.'
  },
  {
    id: '04',
    icon: <FiCloud />,
    title: 'Cloud & Data',
    image: getAssetPath('/assets/images/services-cloud.jpg'),
    short: 'Infrastructure & Intelligence',
    color: '#002fff',
    items: [
      'Migration Cloud (AWS, Azure, GCP)',
      'Infrastructures Kubernetes & DevOps',
      'Data Engineering & ETL',
      'IA Décisionnelle & Big Data'
    ],
    desc: 'Exploitez le plein potentiel de vos données dans un environnement sécurisé et scalable.',
    longDesc: 'Le Cloud n\'est pas une destination, c\'est un moteur. Nous optimisons vos coûts d\'infrastructure et transformons vos données brutes en insights stratégiques actionnables.'
  },
  {
    id: '05',
    icon: <FiBookOpen />,
    title: 'Formation',
    image: getAssetPath('/assets/images/services-training.jpg'),
    short: 'Culture de l\'Excellence Tech',
    color: '#00fbff',
    items: [
      'Masterclass IA & Machine Learning',
      'Bootcamps Cybersécurité',
      'Acculturation DevOps & Cloud',
      'Leadership Technologique'
    ],
    desc: 'Accélérez la montée en compétences de vos talents sur les technologies de pointe.',
    longDesc: 'Nos formations sont dispensées par des experts qui pratiquent quotidiennement ce qu\'ils enseignent. Un apprentissage concret, orienté résultats et cas réels.'
  },
  {
    id: '06',
    icon: <FiMonitor />,
    title: 'Infogérance',
    image: getAssetPath('/assets/images/services-hardware.jpg'),
    short: 'Disponibilité & Proactivité',
    color: '#f31505',
    items: [
      'Maintien en Condition Opérationnelle',
      'Support 24/7 & Incident Management',
      'Monitoring & Performance Tracking',
      'Gestion de parc informatique'
    ],
    desc: 'Assurez la pérennité et la performance continue de vos outils de travail.',
    longDesc: 'Libérez-vous des contraintes techniques courantes. Nos équipes veillent sur votre SI en permanence pour garantir un taux de disponibilité maximal et une sérénité totale.'
  },
]

export default function Services({ hideContainer = false }) {
  const [active, setActive] = useState(0)

  const content = (
    <>
      <div className="section-header reveal reveal--up">
        <p className="section-eyebrow">Nos axes d'intervention</p>
        <h2 className="section-title">
          Ce que nous
          <span className="gradient-text"> construisons</span>
        </h2>
        <p className="section-sub">
          De la stratégie SI à la cybersécurité, en passant par le 
          cloud et la formation, <span className="e-logo">e</span>-link couvre l'intégralité de votre transformation digitale.
        </p>
      </div>

      <div className="services__layout">
        {/* Cards grid */}
        <div className="services__grid">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`service-card reveal reveal--up delay-${(i + 1) * 100} ${active === i ? 'service-card--active' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--service-color': s.color }}
            >
              <div className="service-card__bg">
                <img src={s.image} alt={s.title} />
                <div className="service-card__overlay"></div>
              </div>
              
              <div className="service-card__content">
                <div className="service-card__num">{s.id}</div>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__short">{s.short}</p>
              </div>
              
              <div className="service-card__arrow">
                <FiArrowRight />
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="services__detail reveal reveal--right">
          <div className="services__detail-bg">
             <img src={services[active].image} alt="" />
             <div className="services__detail-overlay"></div>
          </div>
          <div className="services__detail-inner" key={active}>
            <div className="services__detail-icon" style={{ '--service-color': services[active].color }}>
              {services[active].icon}
            </div>
            <p className="services__detail-num">{services[active].id}</p>
            <h3 className="services__detail-title">{services[active].title}</h3>
            <p className="services__detail-desc">{services[active].desc}</p>
            <div className="services__detail-long">
              <p>{services[active].longDesc}</p>
            </div>
            <ul className="services__detail-list">
              {services[active].items.map(item => (
                <li key={item}>
                  <span className="check">
                    <FiCheck />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn--primary services__detail-cta">
              Nous consulter
              <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <section className="services" id="services">
      {hideContainer ? content : <div className="container">{content}</div>}
    </section>
  )
}

