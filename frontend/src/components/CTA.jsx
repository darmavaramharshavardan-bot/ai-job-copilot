import React from 'react'
import './CTA.css'

function CTA() {
  return (
    <section className="cta">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Find Your Best Job Match?</h2>
        <p className="cta-subtitle">Analyze your resume against any job description and discover how to stand out.</p>
        <a href="#home" className="cta-button">Analyze My Resume</a>
      </div>
    </section>
  )
}

export default CTA