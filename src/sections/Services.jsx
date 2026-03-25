import { useState } from 'react'
import { FiCompass, FiSettings, FiShield, FiCloud, FiBookOpen, FiMonitor, FiCheck, FiArrowRight, FiCode, FiActivity } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './Services.css'

const fallbackServices = [
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
      'Masterclass IA & Data Science',
      'Développement Web & Mobile Apps',
      'Réseaux & Sécurité Informatique',
      'Bases de Données & BI'
    ],
    desc: 'Accélérez la montée en compétences de vos talents sur les technologies les plus critiques du marché.',
    longDesc: 'Nos cursus intensifs sont conçus par des architectes chevronnés pour transmettre un savoir-faire immédiatement applicable en environnement de production.'
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
  {
    id: '07',
    icon: <FiSettings />,
    title: 'Technologies de pointe',
    image: getAssetPath('/assets/images/services-innovation.jpg'),
    short: 'Innovation & Rupture Technologique',
    color: '#002fff',
    items: [
      'Edge Computing & Low Latency',
      'Architectures Serverless avancées',
      'Web3 & Smart Contracts',
      'Green IT & Optimisation énergétique'
    ],
    desc: 'Propulsez votre entreprise vers le futur avec les outils de demain, dès aujourd\'hui.',
    longDesc: 'Nous ne nous contentons pas de suivre les tendances ; nous les anticipons. L\'adoption de technologies de pointe n\'est pas un luxe, c\'est une nécessité pour rester compétitif dans un écosystème globalisé. Nous vous accompagnons dans l\'intégration de solutions émergentes qui redéfinissent les standards de performance et de durabilité.'
  },
  {
    id: '08',
    icon: <FiCompass />,
    title: 'Audit & Stratégie',
    image: getAssetPath('/assets/images/services-audit.jpg'),
    short: 'Diagnostic & Vision Long Terme',
    color: '#00fbff',
    items: [
      'Audit SI & Sécurité complet',
      'Élaboration de Schémas Directeurs',
      'Accompagnement à la Transformation',
      'Expertise Conseil en Innovation'
    ],
    desc: 'Une vision claire pour des décisions technologiques éclairées et rentables.',
    longDesc: 'Chaque transformation réussie commence par une analyse lucide de l\'existant. Nous plongeons au cœur de votre infrastructure et de votre culture tech pour identifier les leviers de croissance et les zones de risque, vous fournissant une feuille de route stratégique personnalisée.'
  },
]

const getIconByName = (name) => {
  switch (name) {
    case 'FiCompass': return <FiCompass />;
    case 'FiSettings': return <FiSettings />;
    case 'FiShield': return <FiShield />;
    case 'FiCloud': return <FiCloud />;
    case 'FiBookOpen': return <FiBookOpen />;
    case 'FiMonitor': return <FiMonitor />;
    case 'FiCode': return <FiCode />;
    case 'FiActivity': return <FiActivity />;
    default: return <FiSettings />;
  }
}

export default function Services({ hideContainer = false, data: dynamicData }) {
  const [active, setActive] = useState(0)

  const servicesList = dynamicData?.length > 0
    ? dynamicData.map((s, index) => {
      // Ensure items is always an array of strings
      let items = []
      const rawItems = s.items || s.service_items || []
      if (Array.isArray(rawItems)) {
        items = rawItems.map(i => typeof i === 'string' ? i : (i.content || i.title || ''))
      }

      return {
        id: `0${s.order_index || s.id || index + 1}`.slice(-2),
        icon: getIconByName(s.icon || s.icon_name),
        title: s.title,
        image: s.image ? (s.image.startsWith('http') ? s.image : getAssetPath(s.image)) : getAssetPath('/assets/images/services-dev.jpg'),
        short: s.short_desc || s.excerpt || s.short_description || '',
        color: s.color || '#ef3723',
        items: items,
        desc: s.desc || s.excerpt || s.short_description || '',
        longDesc: s.long_desc || s.description || ''
      }
    })
    : fallbackServices.map(s => ({ ...s, longDesc: s.longDesc || s.desc }))

  const currentService = servicesList[active] || servicesList[0]

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
          cloud et la formation, e-link couvre l'intégralité de votre transformation digitale.
        </p>
      </div>

      <div className="services__layout">
        {/* Cards grid */}
        <div className="services__grid">
          {servicesList.map((s, i) => (
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
            <img src={currentService.image} alt="" />
            <div className="services__detail-overlay"></div>
          </div>
          <div className="services__detail-inner" key={active}>
            <div className="services__detail-icon" style={{ '--service-color': currentService.color }}>
              {currentService.icon}
            </div>
            <p className="services__detail-num">{currentService.id}</p>
            <h3 className="services__detail-title">{currentService.title}</h3>
            <p className="services__detail-desc">{currentService.desc}</p>
            <div className="services__detail-long" dangerouslySetInnerHTML={{ __html: currentService.longDesc }}>
            </div>
            <ul className="services__detail-list">
              {currentService.items.map((item, idx) => (
                <li key={idx}>
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

