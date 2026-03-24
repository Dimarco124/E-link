import { useState, useEffect } from 'react'
import api from '../utils/api'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Stats from '../sections/Stats'
import Services from '../sections/Services'
import BlogPreview from '../sections/BlogPreview'
import Testimonials from '../sections/Testimonials'
import Expertise from '../sections/Expertise'
import RecruitmentCTA from '../sections/RecruitmentCTA'
import Contact from '../sections/Contact'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/homepage')
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        console.error('Failed to load homepage data:', err)
      })
  }, [])

  return (
    <>
      <Hero data={data?.hero} />
      <About />
      <Stats data={data?.stats} />
      <Services data={data?.services} />
      <Expertise data={data?.values} />
      <BlogPreview data={data?.blog} />
      <Testimonials />
      <RecruitmentCTA />
      <Contact />
    </>
  )
}
