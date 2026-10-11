import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ResumeJobForm from './components/ResumeJobForm.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import CTA from './components/CTA.jsx'

function App() {
  return (
    <div style={{ backgroundColor: '#FDFBF2', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <ResumeJobForm />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  )
}

export default App