import { FiAward, FiUsers, FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './About.css'

const innovationImg = getAssetPath('/assets/images/about-innovation.jpg')
const madeInCiImg = getAssetPath('/assets/images/about-team.jpg')

const pillars = [
  { icon: <FiAward />, text: 'Récompensé' },
  { icon: <FiUsers />, text: 'Personnel qualifié' },
  { icon: <FiClock />, text: 'Support 24h/24' },
  { icon: <FiDollarSign />, text: 'Prix équitables' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner container">
        <div className="about__images reveal reveal--left">
          <div className="about__img-wrap about__img-wrap--1">
            <img src={innovationImg} alt="Notre Excellence" className="about__img" />
            <div className="about__img-overlay">
              <span className="about__img-label">Notre Excellence</span>
            </div>
          </div>
          <div className="about__img-wrap about__img-wrap--2">
            <img src={madeInCiImg} alt="Notre Capital Humain" className="about__img" />
            <div className="about__img-overlay">
              <span className="about__img-label">Notre Capital Humain</span>
            </div>
            <div className="about__img-tag">
              <div className="about__img-tag-icon">
                <FiAward />
              </div>
              <div>
                <p className="bold">Studio de confiance</p>
                <p>Depuis 2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about__text reveal reveal--right">
          <p className="about__eyebrow">Notre Histoire</p>
          <h2 className="about__title">
            Plus qu'une société,<br/>
            un <span className="gradient-text">partenaire tech</span>
          </h2>
          <p className="about__desc">
            Fondée avec la conviction que la technologie doit être un moteur de croissance,
            e-link est une société de droit ivoirien à responsabilité limitée (S.A.R.L)
            dédiée à l'excellence en ingénierie informatique.
          </p>

          <p className="about__body">
            Créée en janvier 2026, dont le siège social est à <strong>Abidjan Cocody</strong>.
            Depuis notre création, nous nous sommes engagés à repousser les frontières
            de l'innovation dans le domaine de l'ingénierie informatique.
          </p>

          <p className="about__body">
            Nous sommes une équipe d'ingénieurs passionnés, de 
            professionnels qualifiés dédiés à la <strong>création et au développement 
            de logiciels</strong> qui simplifient et optimisent vos opérations.
          </p>

          <div className="about__pillars">
            {pillars.map((p, i) => (
              <div className={`about__pillar reveal reveal--up delay-${(i + 1) * 100}`} key={p.text}>
                <span className="about__pillar-icon">{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <div className="about__actions">
            <a href="#contact" className="btn btn--primary">
              Travailler avec nous
              <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
