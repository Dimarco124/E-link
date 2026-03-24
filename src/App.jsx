import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingContact from './components/FloatingContact'

// Pages
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import TrainingPage from './pages/TrainingPage'
import BlogPage from './pages/BlogPage'
import BlogDetailsPage from './pages/BlogDetailsPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import JobDetailsPage from './pages/JobDetailsPage'
import ApplyPage from './pages/ApplyPage'
import useScrollReveal from './hooks/useScrollReveal'
import SplashScreen from './components/SplashScreen'

import './App.css'

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  useScrollReveal(location.pathname);
  
  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <ScrollToTop />
      
      {!showSplash && (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/realisations" element={<ProjectsPage />} />
              <Route path="/realisations/:id" element={<ProjectDetailsPage />} />
              <Route path="/formations" element={<TrainingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/carrieres" element={<CareersPage />} />
              <Route path="/carrieres/:id" element={<JobDetailsPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/apply/:id" element={<ApplyPage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
        </>
      )}
    </>
  )
}

