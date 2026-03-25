import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiUsers } from 'react-icons/fi'
import RecruitmentCTA from '../sections/RecruitmentCTA'
import { getAssetPath } from '../utils/assets'
import './AboutPage.css'
import api from '../utils/api'
import Stats from '../sections/Stats'

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState([])
  const [homepageData, setHomepageData] = useState(null)
  const [values, setValues] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingValues, setLoadingValues] = useState(true)
  const [loadingTeam, setLoadingTeam] = useState(true)

  useEffect(() => {
    // Load homepage data (stats and values)
    api.get('/homepage')
      .then(res => {
        setHomepageData(res.data.data)
        setValues(res.data.data?.values || [])
        setLoadingValues(false)
      })
      .catch(err => {
        console.error('Failed to load values:', err)
        setLoadingValues(false)
      })

    // Load team members
    api.get('/team')
      .then(res => {
        setTeamMembers(res.data.data)
        setLoadingTeam(false)
      })
      .catch(err => {
        console.error('Failed to load team:', err)
        setLoadingTeam(false)
      })
  }, [])

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
                e-link est une société de conseil haut de gamme qui pilote la transformation et le développement numériques des entreprises grâce à des technologies innovantes.
              </p>
              <p className="story-text">
                Spécialisée dans les technologies, nous offrons des résultats durables dans les domaines du cloud, des données, de la cybersécurité et de l’intelligence artificielle aux industries et aux institutions publiques de la zone ouest-africaine.
              </p>
              <p className="story-text">
                Chez e-link, l’esprit d’entreprise technologique est au cœur de nos valeurs et nourrit notre culture d’apprentissage continu. C’est dans cet esprit que nous attirons et formons les meilleurs professionnels, créant ainsi un vivier de talents exceptionnel parmi nos 8 spécialistes.
              </p>
              <p className="story-text">
                Les partenariats solides ont toujours été au centre de notre ADN, ce qui explique notre étroite collaboration avec des géants de la tech reconnus et des startups innovantes. Cet écosystème nous permet de proposer des solutions durables qui aident nos clients à devenir des leaders dans leurs secteurs.
              </p>
              {/* Dynamic Stats Section */}
              <Stats data={homepageData?.stats} showChart={false} />
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
            {loadingValues ? (
              <div className="content-loader">
                <div className="loader-spinner"></div>
                <p>Chargement des valeurs...</p>
              </div>
            ) : (values.length > 0 ? values : [
              { title: 'Excellence Technique', desc: "Nous ne faisons aucun compromis sur la qualité du code, l'architecture et la sécurité. Chaque livraison doit répondre aux plus hauts standards industriels." },
              { title: 'Agilité Radicale', desc: "Dans un monde technologique évoluant à une vitesse vertigineuse, nous restons souples et réactifs pour adapter nos solutions aux pivots de nos clients." },
              { title: 'Transparence', desc: "Pas de jargon inutile ou de boîtes noires. Nos clients sont impliqués à chaque étape et ont une visibilité totale sur l'avancement et l'état de l'infrastructure." },
              { title: 'Impact Durable', desc: "Nous concevons des architectures pérennes et frugales en ressources (Green IT) capables d'encaisser la croissance sans exploser les coûts d'exploitation." }
            ]).map((val, i) => (
              <div key={val.title || i} className={`value-card reveal reveal--up delay-${(i + 1) * 100}`}>
                <div className="value-icon"><FiCheckCircle /></div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
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
            {loadingTeam ? (
              <div className="content-loader">
                <div className="loader-spinner"></div>
                <p>Chargement de l'équipe...</p>
              </div>
            ) : teamMembers.map((member, index) => (
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
