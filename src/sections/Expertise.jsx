import { FiZap, FiUsers, FiGlobe, FiArrowRight, FiCpu, FiCloud, FiShield, FiCode, FiActivity } from 'react-icons/fi'
import './Expertise.css'

const ticker = [
  'Cloud Native', 'Cybersécurité', 'Transformation Digitale',
  'IA & Data', 'Architecture SI', 'DevOps',
  'Cloud Managed', 'Formation Tech', 'Logiciels Sur-Mesure',
]

const fallbackValues = [
  {
    num: '01',
    icon: <FiCpu />,
    title: 'Innovation First',
    desc: 'Nous repoussons les frontières de l\'ingénierie informatique pour vous offrir des solutions à la pointe.',
  },
  {
    num: '02',
    icon: <FiUsers />,
    title: 'Partenariat Durable',
    desc: 'Notre mission va au-delà d\'un simple contrat. Nous bâtissons des relations à long terme basées sur la confiance.',
  },
  {
    num: '03',
    icon: <FiZap />,
    title: 'Excellence Opérationnelle',
    desc: 'Chaque système que nous livrons est conçu pour être robuste, scalable, et évolutif dès le premier jour.',
  },
  {
    num: '04',
    icon: <FiGlobe />,
    title: 'Ancrage Local, Vision Globale',
    desc: 'Société ivoirienne fière, nous appliquons des standards internationaux pour servir l\'Afrique et le monde.',
  },
]

const getIconByName = (name) => {
  switch (name) {
    case 'FiCpu': return <FiCpu />;
    case 'FiUsers': return <FiUsers />;
    case 'FiZap': return <FiZap />;
    case 'FiGlobe': return <FiGlobe />;
    case 'FiCloud': return <FiCloud />;
    case 'FiShield': return <FiShield />;
    case 'FiCode': return <FiCode />;
    case 'FiActivity': return <FiActivity />;
    default: return <FiCpu />;
  }
}

export default function Expertise({ data }) {
  const valuesToUse = data?.length > 0
    ? data.map(v => ({
        num: v.num,
        icon: getIconByName(v.icon_name),
        title: v.title,
        desc: v.desc
      }))
    : fallbackValues

  return (
    <section className="expertise" id="expertise">
      {/* Ticker Section */}
      <div className="container ticker-container">
        <div className="ticker">
          <div className="ticker__track">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="ticker__item">
                {t} <span className="ticker__sep">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section-header reveal reveal--up">
          <p className="section-eyebrow">Notre ADN</p>
          <h2 className="section-title">
            Nos valeurs
            <span className="gradient-text"> fondatrices</span>
          </h2>
        </div>

        <div className="expertise__grid">
          {valuesToUse.map((v, i) => (
            <div className={`value-card reveal reveal--up delay-${(i + 1) * 100}`} key={v.num || i}>
              <div className="value-card__header">
                <span className="value-card__num">{v.num}</span>
                <span className="value-card__icon">{v.icon}</span>
              </div>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="cta-banner reveal reveal--scale">
          <div className="cta-banner__orb"></div>
          <div className="cta-banner__content">
            <h3>Prêt à transformer votre digital ?</h3>
            <p>Discutons de votre projet. Notre équipe est disponible pour vous accompagner.</p>
          </div>
          <a href="#contact" className="cta-banner__btn">
            Prendre rendez-vous
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
