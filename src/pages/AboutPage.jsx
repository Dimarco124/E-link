import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiUsers } from 'react-icons/fi'
import RecruitmentCTA from '../sections/RecruitmentCTA'
import { getAssetPath } from '../utils/assets'
import './AboutPage.css'

const teamMembers = [
  {
    name: "N'GUESSAN JEROME",
    role: "Fondateur & CEO",
    bio: <>Responsable des systèmes d'information dans une grande société en Côte d'Ivoire et au Maroc, Jerome N'guessan a fondé e-link avec la vision de démocratiser les architectures cloud-natives en Afrique de l'Ouest.</>,
    image: getAssetPath("/assets/images/monsieur.png")
  },
  {
    name: "Fatoumata Diabaté",
    role: "Directrice Cybersécurité",
    bio: "Experte reconnue en sécurité offensive (OSCP), Fatoumata dirige le pôle SecOps pour garantir que chaque ligne de code produite est robuste face aux menaces.",
    image: getAssetPath("/assets/images/team-cyber.jpg")
  },
  {
    name: "Jean-Marc Sery",
    role: "Lead Architect Cloud",
    bio: "Spécialiste certifié AWS/GCP, Jean-Marc orchestre les migrations complexes et s'assure que les infrastructures de nos clients scalent sans compromis.",
    image: getAssetPath("/assets/images/team-cloud.jpg")
  },
  {
    name: "KOUASSI VALDES MOAYE",
    role: "Développeur web & mobile",
    bio: "Développeur web et mobile, Valdes accompagne les entreprises et particuliers dans la création de solutions digitales modernes, performantes et adaptées à leurs besoins.",
    image: getAssetPath("/assets/images/valdes.jpeg")
  }
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <header 
          className="about-hero reveal reveal--up"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getAssetPath('/assets/images/about-innovation.jpg')})` 
          }}
        >
          <div className="about-hero__content reveal reveal--up delay-200">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Notre Vocation</p>
            <h1 className="section-title" style={{ color: 'white', marginBottom: '24px' }}>Nous sommes les <span className="gradient-text">Architectes</span> de votre avenir numérique.</h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto' }}>
              Chez e-link, nous ne nous contentons pas d'écrire du code. Nous forgeons l'infrastructure sur laquelle reposent les entreprises innovantes de demain.
            </p>
          </div>
        </header>

        {/* Our Story */}
        <section className="section about-story">
          <div className="story-grid reveal reveal--up">
            <div className="story-content reveal reveal--left">
              <h2 className="section-title">Notre <span className="gradient-text">Histoire</span></h2>
              <p className="story-text">
                Fondée en 2026 avec la conviction que la technologie doit être un levier de croissance stratégique et non un centre de coût, e-link est née pour combler le vide entre les besoins métier complexes et l'ingénierie logicielle de pointe.
              </p>
              <p className="story-text">
                Nous avons commencé comme une petite équipe d'experts DevOps passionnés par l'automatisation. Nous sommes le partenaire de confiance des grandes institutions financières, des ministères et des start-ups en hyper-croissance pour la modernisation de leur Système d'Information.
              </p>
              <div className="story-stats">
                <div className="story-stat-item">
                  <span className="stat-number">+150</span>
                  <span className="stat-label">Projets d'envergure livrés</span>
                </div>
                <div className="story-stat-item">
                  <span className="stat-number">98.9%</span>
                  <span className="stat-label">Uptime sur nos plateformes</span>
                </div>
              </div>
            </div>
            <div className="story-visual reveal reveal--right">
              <div className="story-box">
                <img src={getAssetPath("/assets/images/elink.jpg")} alt="Consultation technologique" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section about-values">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <p className="section-eyebrow">Ce qui nous guide</p>
            <h2 className="section-title">Nos Valeurs <span className="gradient-text">Fondamentales</span></h2>
          </div>
          
          <div className="values-grid">
            {['Excellence Technique', 'Agilité Radicale', 'Transparence', 'Impact Durable'].map((val, i) => (
              <div key={val} className={`value-card reveal reveal--up delay-${(i + 1) * 100}`}>
                <div className="value-icon"><FiCheckCircle /></div>
                <h3>{val}</h3>
                <p>{
                  val === 'Excellence Technique' ? "Nous ne faisons aucun compromis sur la qualité du code, l'architecture et la sécurité. Chaque livraison doit répondre aux plus hauts standards industriels." :
                  val === 'Agilité Radicale' ? "Dans un monde technologique évoluant à une vitesse vertigineuse, nous restons souples et réactifs pour adapter nos solutions aux pivots de nos clients." :
                  val === 'Transparence' ? "Pas de jargon inutile ou de boîtes noires. Nos clients sont impliqués à chaque étape et ont une visibilité totale sur l'avancement et l'état de l'infrastructure." :
                  "Nous concevons des architectures pérennes et frugales en ressources (Green IT) capables d'encaisser la croissance sans exploser les coûts d'exploitation."
                }</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="section about-team">
          <div className="text-center" style={{ marginBottom: '80px' }}>
            <p className="section-eyebrow">Les talents derrière le code</p>
            <h2 className="section-title">Notre <span className="gradient-text">Leadership</span></h2>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className={`team-card reveal reveal--up delay-${(index + 1) * 100}`}>
                <div className="team-card__image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-card__overlay">
                    <span className="team-role">{member.role}</span>
                  </div>
                </div>
                <div className="team-card__content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section about-cta reveal reveal--up">
          <div className="cta-content">
            <h2 className="section-title" style={{ color: 'white' }}>Prêt à transformer <span className="gradient-text">votre vision en réalité ?</span></h2>
            <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 30px', color: 'white' }}>
              Rencontrez nos experts pour un premier diagnostic sans engagement de votre infrastructure ou de votre projet applicatif.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Prendre rendez-vous <FiArrowRight />
            </Link>
          </div>
        </section>
      </div>
      <RecruitmentCTA />
    </div>
  )
}
