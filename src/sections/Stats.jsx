import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FiTrendingUp, FiUsers, FiCheckCircle, FiStar } from 'react-icons/fi'
import './Stats.css'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Fév', value: 600 },
  { name: 'Mar', value: 500 },
  { name: 'Avr', value: 800 },
  { name: 'Mai', value: 700 },
  { name: 'Juin', value: 1100 },
  { name: 'Juil', value: 1300 },
]

const stats = [
  { id: 1, label: 'Projets Livrés', value: 150, suffix: '+', icon: <FiCheckCircle />, color: 'var(--coral)' },
  { id: 2, label: 'Clients Heureux', value: 98, suffix: '%', icon: <FiUsers />, color: 'var(--peach)' },
  { id: 3, label: 'Support Actif', value: 24, suffix: '/7', icon: <FiStar />, color: 'var(--coral)' },
  { id: 4, label: 'Croissance Tech', value: 85, suffix: '%', icon: <FiTrendingUp />, color: 'var(--peach)' },
]

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const duration = 2000
    const frameRate = 1000 / 60
    const totalFrames = duration / frameRate

    let currentFrame = 0
    const timer = setInterval(() => {
      currentFrame++
      const progress = currentFrame / totalFrames
      
      setCounts(stats.map(s => Math.floor(s.value * progress)))

      if (currentFrame >= totalFrames) {
        clearInterval(timer)
        setCounts(stats.map(s => s.value))
      }
    }, frameRate)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          <div className="stats__content reveal reveal--up">
            <p className="section-eyebrow">Performance & Croissance</p>
            <h2 className="section-title">Notre impact en <span className="gradient-text">chiffres</span></h2>
            <p className="section-sub">
              Nous mesurons notre succès par la réussite de nos partenaires et la robustesse des solutions que nous déployons.
            </p>

            <div className="stats__counters">
              {stats.map((s, i) => (
                <div key={s.id} className={`stat-card reveal reveal--up delay-${(i + 1) * 100}`} style={{ '--accent': s.color }}>
                  <div className="stat-card__icon">{s.icon}</div>
                  <div className="stat-card__info">
                    <h3 className="stat-card__value">
                      {counts[i]}{s.suffix}
                    </h3>
                    <p className="stat-card__label">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats__visual reveal reveal--right">
            <div className="stats__chart-container">
              <div className="stats__chart-header">
                <h3>Croissance Technologique</h3>
                <p>Évolution des déploiements cloud native</p>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--coral)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--coral)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ background: '#1a1e26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--coral)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
