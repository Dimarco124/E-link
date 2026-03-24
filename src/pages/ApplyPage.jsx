import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'
import { FiUploadCloud, FiCheckCircle, FiSend, FiArrowLeft } from 'react-icons/fi'
import './CareersPage.css'

export default function ApplyPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '', cv: null })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      api.get(`/jobs/${id}`)
        .then(res => {
          setJob(res.data.data)
          setForm(prev => ({ ...prev, position: res.data.data.title }))
        })
        .catch(err => console.error('Failed to load job:', err))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('job_offer_id', id || '')
    formData.append('position_sought', form.position)
    formData.append('message', form.message)
    if (form.cv) {
      formData.append('cv', form.cv)
    }

    try {
      await api.post('/apply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSent(true)
    } catch (err) {
      console.error('Erreur lors de la candidature', err)
      setError('Une erreur est survenue lors de l\'envoi de votre candidature.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="apply-page" style={{paddingTop: '140px', background: 'var(--bg)', minHeight: '90vh', paddingBottom: '80px'}}>
      <div className="container">
        <header className="apply-header" style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <Link to={id ? `/carrieres/${id}` : "/carrieres"} className="btn-back" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--charcoal-muted)' }}>
            <FiArrowLeft /> {id ? "Retour à l'offre" : "Retour aux carrières"}
          </Link>
          <h1 className="section-title">
            {id ? "Postuler pour le poste" : "Candidature Spontanée"}
          </h1>
          {id && job && <p style={{ fontSize: '1.5rem', color: 'var(--coral)', fontWeight: 'bold' }}>{job.title}</p>}
        </header>

        <div className="careers-form-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {sent ? (
            <div className="form-success-state" style={{ textAlign: 'center', padding: '40px' }}>
              <FiCheckCircle className="success-icon" style={{ fontSize: '4rem', color: '#10b981', marginBottom: '20px' }} />
              <h3>Candidature envoyée !</h3>
              <p>Merci pour votre intérêt. Notre équipe RH étudiera votre profil avec la plus grande attention.</p>
              <Link to="/carrieres" className="btn btn--primary" style={{ marginTop: '30px' }}>Fermer</Link>
            </div>
          ) : (
            <form className="premium-form" onSubmit={handleSubmit}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: Marc Koffi"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="marc@email.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div className="form-group">
                  <label>Téléphone *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+225 00 00 00 00 00"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Poste souhaité {id ? "(Automatique)" : "*"}</label>
                  <input 
                    type="text" 
                    required={!id}
                    readOnly={!!id}
                    placeholder="Ex: Cloud Architect / DevSecOps"
                    value={form.position}
                    onChange={e => setForm({...form, position: e.target.value})}
                    style={id ? { background: '#f5f5f5' } : {}}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Message / Motivation</label>
                <textarea 
                  rows="4" 
                  placeholder="Dites-nous pourquoi vous voulez nous rejoindre..."
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="file-upload">
                  <FiUploadCloud /> <span>{form.cv ? form.cv.name : "Joindre votre CV (PDF) *"}</span>
                  <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    accept=".pdf" 
                    required
                    onChange={e => setForm({...form, cv: e.target.files[0]})}
                  />
                </label>
              </div>

              {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
              
              <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '30px', padding: '16px' }} disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'} <FiSend />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
