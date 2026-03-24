import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'
import { FiArrowLeft, FiMapPin, FiBriefcase, FiSend } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import './CareersPage.css' // Reusing styles

export default function JobDetailsPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => {
        setJob(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load job details:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="container" style={{paddingTop: '140px'}}>Chargement...</div>
  if (!job) return <div className="container" style={{paddingTop: '140px'}}>Offre non trouvée.</div>

  return (
    <div className="job-details-page" style={{paddingTop: '140px', background: 'var(--bg)', minHeight: '80vh'}}>
      <div className="container">
        <Link to="/carrieres" className="btn-back" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', color: 'var(--charcoal-muted)' }}>
          <FiArrowLeft /> Retour aux carrières
        </Link>

        <div className="job-details__card" style={{ background: 'white', border: '1px solid var(--border)', padding: '50px', marginBottom: '60px' }}>
          <header className="job-details__header" style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '30px' }}>
            <h1 className="job-details__title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{job.title}</h1>
            <div className="job-details__meta" style={{ display: 'flex', gap: '24px', color: 'var(--charcoal-light)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> {job.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiBriefcase /> {job.department}</span>
            </div>
          </header>

          <div className="job-details__body">
            <section className="job-section" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Description du poste</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: job.description }}></div>
            </section>

            {job.requirements && (
              <section className="job-section" style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Prérequis & Compétences</h2>
                <div className="rich-text" dangerouslySetInnerHTML={{ __html: job.requirements }}></div>
              </section>
            )}

            <div className="job-details__footer" style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
              <Link to={`/apply/${job.id}`} className="btn btn--primary" style={{ padding: '16px 40px' }}>
                Postuler pour ce poste <FiSend />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
