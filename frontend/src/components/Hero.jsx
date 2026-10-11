import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Land Your Dream Job with AI</h1>
          <p className="hero-subtitle">
            Analyze your resume against any job description and discover exactly how to improve your chances.
          </p>
        </div>

        <div className="hero-buttons">
          <button className="hero-cta">Analyze My Resume</button>
          <a href="#how-it-works" className="hero-secondary-link">
            See how it works →
          </a>
        </div>

        <div className="hero-trust">
          <span className="trust-item">AI-powered resume analysis</span>
          <span className="trust-separator">•</span>
          <span className="trust-item">Job matching</span>
          <span className="trust-separator">•</span>
          <span className="trust-item">Personalized insights</span>
        </div>

        <div className="hero-visual">
          <div className="visual-container">
            <div className="visual-element visual-circle-1"></div>
            <div className="visual-element visual-circle-2"></div>
            <div className="visual-element visual-circle-3"></div>
            <div className="visual-element visual-square"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero