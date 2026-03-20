import { Link } from 'react-router-dom'
import { FiUsers, FiArrowRight } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './RecruitmentCTA.css'

export default function RecruitmentCTA() {
  return (
    <section className="recruitment-cta">
      <div className="container">
        <div className="recruitment-cta__inner reveal reveal--up">
          <div className="recruitment-cta__content">
            <div className="recruitment-cta__icon">
              <FiUsers />
            </div>
            <div className="recruitment-cta__text">
              <h2 className="recruitment-cta__title">
                Rejoignez l'élite de la <span className="gradient-text">Tech</span>
              </h2>
              <p className="recruitment-cta__desc">
                Vous êtes passionné par le Cloud, la Cybersécurité ou l'IA ? 
                Venez construire l'avenir numérique de l'Afrique avec nous.
              </p>
            </div>
          </div>
          <div className="recruitment-cta__actions">
            <Link to="/carrieres" className="btn btn--primary recruitment-cta__btn">
              Postuler <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
