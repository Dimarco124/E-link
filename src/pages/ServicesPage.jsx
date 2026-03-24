import { useState, useEffect } from 'react'
import api from '../utils/api'
import Services from '../sections/Services'
import Methodology from '../components/Methodology'
import ExpertiseHighlights from '../components/ExpertiseHighlights'
import RecruitmentCTA from '../sections/RecruitmentCTA'
import './ServicesPage.css'

export default function ServicesPage() {
  const [servicesData, setServicesData] = useState(null)
  
  useEffect(() => {
    api.get('/services')
      .then(res => {
        setServicesData(res.data.data)
      })
      .catch(err => {
        console.error('Failed to load services data:', err)
      })
  }, [])

  return (
    <div className="services-page">
      <div className="container">
        <header className="services-hero reveal reveal--up">
          <div className="services-hero__content reveal reveal--up delay-200">
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Nos Expertise</p>
            <h1 className="section-title" style={{ color: 'white', marginBottom: '24px' }}>
              Solutions <span className="gradient-text">Architecturales</span>
            </h1>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto' }}>
              De la stratégie SI à la cybersécurité avancée, nous construisons les fondations technologiques de votre succès digital.
            </p>
          </div>
        </header>
        <Services hideContainer={true} data={servicesData} />
        <Methodology />
        <ExpertiseHighlights />
      </div>
      <RecruitmentCTA />
    </div>
  )
}
