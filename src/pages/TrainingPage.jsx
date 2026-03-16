import { Link } from 'react-router-dom'
import { FiCpu, FiShield, FiCheckCircle, FiArrowRight, FiPlayCircle } from 'react-icons/fi'
import './TrainingPage.css'

export default function TrainingPage() {
  return (
    <div className="training-page">
      <div className="container">
        {/* Hero Section */}
        <header className="training-hero reveal reveal--up">
          <div className="training-hero__content reveal reveal--up delay-200">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Excellence & Transmission</p>
            <h1 className="section-title" style={{ color: 'white', marginBottom: '24px' }}>
              Maîtrisez les <span className="gradient-text">Technologies critiques</span>
            </h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto' }}>
              Nos experts partagent leur savoir-faire terrain à travers des cursus intensifs conçus pour répondre aux exigences réelles des infrastructures modernes.
            </p>
          </div>
        </header>

        {/* IA Track Detail */}
        <section className="track-detail">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--left">
              <span className="track-badge">Cursus Avancé</span>
              <h2 className="section-title">Intelligence <span className="gradient-text">Artificielle (IA)</span></h2>
              <p className="description-text">
                La donnée est le nouvel or noir, mais elle n'a de valeur que si elle est raffinée en intelligence exploitable. Notre formation vous apprend à transformer vos données en performance compétitive.
              </p>
              
              <ul className="curriculum-list">
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Data Strategy & IA</strong>
                    Comprendre l'impact de l'IA sur les modèles d'affaires et définir une stratégie de données robuste.
                  </div>
                </li>
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Machine Learning Opérationnel</strong>
                    De la théorie à la mise en production de modèles prédictifs fiables et scalables.
                  </div>
                </li>
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>IA Générative en Entreprise</strong>
                    Intégrer les LLMs (Large Language Models) pour automatiser et optimiser les processus métier.
                  </div>
                </li>
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Éthique & Gouvernance</strong>
                    Garantir une utilisation responsable et conforme des données au sein de votre organisation.
                  </div>
                </li>
              </ul>

              <div className="track-info p-20 bg-white border border-light rounded-12 mb-30">
                <span className="track-label">Public cible :</span>
                <p className="mb-0 text-sm">Ingénieurs Data, CTOs, Responsables Innovation et Analystes métier.</p>
              </div>

              <Link to="/contact" className="btn btn--primary">S'inscrire à la session <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--right">
               <video 
                src="/assets/videos/training-ia.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                poster="/assets/images/blog-ia.jpg"
              />
            </div>
          </div>
        </section>

        {/* Cybersecurity Track Detail */}
        <section className="track-detail track-detail--alt">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--right">
              <span className="track-badge">Certification SecOps</span>
              <h2 className="section-title">Ingénierie de la <span className="gradient-text">Cybersécurité</span></h2>
              <p className="description-text">
                Dans un monde hyper-connecté, la sécurité n'est pas une option. Notre cursus vous forme à bâtir des systèmes résilients face aux menaces les plus sophistiquées.
              </p>
              
              <ul className="curriculum-list">
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Gouvernance & Gestion des Risques</strong>
                    Apprendre à identifier, évaluer et mitiger les risques cyber conformément aux standards ISO.
                  </div>
                </li>
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Sécurité Cloud & Infrastructures</strong>
                    Protection des architectures cloud-natives, gestion des identités et accès (IAM).
                  </div>
                </li>
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Audit & Pentesting</strong>
                    Techniques d'intrusion éthique pour tester la robustesse de vos défenses.
                  </div>
                </li>
                <li>
                  <FiCheckCircle />
                  <div>
                    <strong>Managed Security (SOC)</strong>
                    Mise en place et pilotage d'un centre d'opérations de sécurité pour une surveillance 24/7.
                  </div>
                </li>
              </ul>

              <div className="track-info p-20 bg-white border border-light rounded-12 mb-30">
                <span className="track-label">Public cible :</span>
                <p className="mb-0 text-sm">Administrateurs systèmes, Développeurs, Responsables Sécurité (RSSI).</p>
              </div>

              <Link to="/contact" className="btn btn--primary">Voir le programme <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--left">
               <img src="/assets/images/services-security.jpg" alt="Cybersécurité e-link" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <FiPlayCircle style={{ fontSize: '64px', color: 'white', opacity: 0.8 }} />
               </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="training-cta reveal reveal--scale">
          <div className="cta-box">
            <h2 className="section-title" style={{ color: 'white' }}>
              Propulsez votre <span className="gradient-text">Carrière technique</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              Nos sessions sont limitées en nombre de participants pour garantir un accompagnement personnalisé et de qualité.
            </p>
            <div className="flex justify-center gap-20">
              <Link to="/contact" className="btn btn--primary">
                Demander un devis personnalisé <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
