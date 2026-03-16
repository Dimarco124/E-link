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
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <Expertise />
      <BlogPreview />
      <Testimonials />
      <RecruitmentCTA />
      <Contact />
    </>
  )
}

