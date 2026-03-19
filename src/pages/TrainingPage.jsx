import { Link } from 'react-router-dom'
import { FiCpu, FiShield, FiCheckCircle, FiArrowRight, FiPlayCircle, FiGlobe, FiServer, FiDatabase } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
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

        {/* 1. IA Track */}
        <section className="section track-detail">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--left">
              <span className="track-badge">Cursus Avancé</span>
              <h2 className="section-title">Intelligence <span className="gradient-text">Artificielle (IA)</span></h2>
              <p className="description-text">
                La donnée est le nouvel or noir, mais elle n'a de valeur que si elle est raffinée en intelligence exploitable. Notre formation vous apprend à transformer vos données en performance compétitive.
              </p>
              
              <ul className="curriculum-list">
                <li><FiCheckCircle /> <div><strong>Data Strategy & IA</strong> Stratégie de données et impact business.</div></li>
                <li><FiCheckCircle /> <div><strong>Machine Learning Opérationnel</strong> Mise en production de modèles scalables.</div></li>
                <li><FiCheckCircle /> <div><strong>IA Générative</strong> Intégration des LLMs dans les processus métier.</div></li>
              </ul>

              <div className="track-info">
                <span className="track-label">Public cible :</span>
                <p>Ingénieurs Data, CTOs, Responsables Innovation.</p>
              </div>

              <Link to="/contact" className="btn btn--primary">S'inscrire à la session <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--right">
               <video 
                src={getAssetPath("/assets/videos/training-ia.mp4")} 
                autoPlay loop muted playsInline
                poster={getAssetPath("/assets/images/blog-ia.jpg")}
              />
            </div>
          </div>
        </section>

        {/* 2. Web & Mobile Track */}
        <section className="section track-detail track-detail--alt">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--right">
              <span className="track-badge">Développement Moderne</span>
              <h2 className="section-title">Web & <span className="gradient-text">Mobile Apps</span></h2>
              <p className="description-text">
                Créez des expériences numériques fluides et performantes. Nous vous formons aux technologies les plus plébiscitées du marché pour un impact utilisateur immédiat.
              </p>
              
              <ul className="curriculum-list">
                <li><FiCheckCircle /> <div><strong>Écosystème React</strong> Maîtrise de React, Next.js et la gestion d'état complexe.</div></li>
                <li><FiCheckCircle /> <div><strong>Multiplateforme Flutter</strong> Développement d'apps natives iOS & Android avec un seul code.</div></li>
                <li><FiCheckCircle /> <div><strong>Architecture API-First</strong> Concevoir des services robustes et connectés.</div></li>
              </ul>

              <div className="track-info">
                <span className="track-label">Public cible :</span>
                <p>Développeurs Fullstack, Lead Devs, Product Owners.</p>
              </div>

              <Link to="/contact" className="btn btn--primary">Voir le programme <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--left">
               <img src={getAssetPath("/assets/images/services-dev.jpg")} alt="Développement e-link" />
            </div>
          </div>
        </section>

        {/* 3. Cybersecurity Track */}
        <section className="section track-detail">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--left">
              <span className="track-badge">Certification SecOps</span>
              <h2 className="section-title">Ingénierie de la <span className="gradient-text">Cybersécurité</span></h2>
              <p className="description-text">
                La sécurité n'est pas une option. Notre cursus vous forme à bâtir des systèmes résilients et à anticiper les cyber-attaques sophistiquées.
              </p>
              
              <ul className="curriculum-list">
                <li><FiCheckCircle /> <div><strong>Gouvernance & Risques</strong> Identification et mitigation des menaces (ISO 27001).</div></li>
                <li><FiCheckCircle /> <div><strong>Sécurité Cloud</strong> Protection des architectures cloud et gestion des IAM.</div></li>
                <li><FiCheckCircle /> <div><strong>Pentesting Éthique</strong> Techniques d'audit et de test d'intrusion.</div></li>
              </ul>

              <div className="track-info">
                <span className="track-label">Public cible :</span>
                <p>Admins Systèmes, Développeurs, RSSI.</p>
              </div>

              <Link to="/contact" className="btn btn--primary">Réserver mon créneau <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--right">
               <img src={getAssetPath("/assets/images/services-security.jpg")} alt="Cybersécurité e-link" />
            </div>
          </div>
        </section>

        {/* 4. Networking Track */}
        <section className="section track-detail track-detail--alt">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--right">
              <span className="track-badge">Infrastructure</span>
              <h2 className="section-title">Réseaux <span className="gradient-text">Informatiques</span></h2>
              <p className="description-text">
                Le socle de toute entreprise numérique. Apprenez à concevoir et administrer des réseaux performants, sécurisés et hautement disponibles.
              </p>
              
              <ul className="curriculum-list">
                <li><FiCheckCircle /> <div><strong>Architecture Réseau</strong> Routage, switching et protocoles TCP/IP avancés.</div></li>
                <li><FiCheckCircle /> <div><strong>Sécurité Périmétrique</strong> Mise en œuvre de Firewalls et VPNs sécurisés.</div></li>
                <li><FiCheckCircle /> <div><strong>Convergence IP</strong> Voix sur IP et services réseaux d'entreprise.</div></li>
              </ul>

              <div className="track-info">
                <span className="track-label">Public cible :</span>
                <p>Techniciens Réseaux, Ingénieurs Système, IT Managers.</p>
              </div>

              <Link to="/contact" className="btn btn--primary">Détails de la formation <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--left">
               <img src={getAssetPath("/assets/images/about-innovation.jpg")} alt="Réseaux e-link" />
            </div>
          </div>
        </section>

        {/* 5. Database Track */}
        <section className="section track-detail">
          <div className="track-grid reveal reveal--up">
            <div className="track-content reveal reveal--left">
              <span className="track-badge">Data Management</span>
              <h2 className="section-title">Gestion de <span className="gradient-text">Bases de Données</span></h2>
              <p className="description-text">
                Gérez vos actifs les plus précieux avec efficacité. De la conception à l'optimisation, maîtrisez les moteurs de stockage les plus puissants.
              </p>
              
              <ul className="curriculum-list">
                <li><FiCheckCircle /> <div><strong>SQL & Relationnel</strong> Modélisation et requêtage complexe avec PostgreSQL/MySQL.</div></li>
                <li><FiCheckCircle /> <div><strong>Écosystème NoSQL</strong> Haute performance avec MongoDB et Redis.</div></li>
                <li><FiCheckCircle /> <div><strong>Performance & Backup</strong> Optimisation des index et stratégies de réplication.</div></li>
              </ul>

              <div className="track-info">
                <span className="track-label">Public cible :</span>
                <p>DBAs, Développeurs, Architectes de données.</p>
              </div>

              <Link to="/contact" className="btn btn--primary">S'inscrire maintenant <FiArrowRight /></Link>
            </div>
            <div className="track-visual reveal reveal--right">
               <img src={getAssetPath("/assets/images/blog-ia.jpg")} alt="Bases de données e-link" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section training-cta reveal reveal--scale">
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
