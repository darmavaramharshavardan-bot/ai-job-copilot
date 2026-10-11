import React from 'react'
import './HowItWorks.css'

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-container">
        <div className="how-header">
          <h2 className="how-title">How It Works</h2>
          <p className="how-subtitle">Three simple steps to land your dream job.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3 className="step-heading">Upload Your Resume</h3>
            <p className="step-text">Share your resume with our AI. We analyze your experience, skills, and accomplishments in seconds.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3 className="step-heading">Add the Job Description</h3>
            <p className="step-text">Paste the job posting or description you want to match against. Our system reads every requirement.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3 className="step-heading">Get Your AI Match Analysis</h3>
            <p className="step-text">Receive personalized insights, gap analysis, and recommendations to improve your chances.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks