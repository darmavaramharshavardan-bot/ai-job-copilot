import React from 'react'
import './Features.css'

function Features() {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Everything You Need to Land the Job</h2>
          <p className="features-description">
            Powerful AI tools to transform your job search and help you succeed.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3 className="feature-title">Resume Analysis</h3>
            <p className="feature-description">
              Analyze your resume against job requirements and get detailed improvement suggestions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Job Matching</h3>
            <p className="feature-description">
              AI-powered matching finds jobs that perfectly align with your skills and experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">AI Recommendations</h3>
            <p className="feature-description">
              Get personalized career advice and skill development recommendations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">ATS Optimization</h3>
            <p className="feature-description">
              Ensure your resume passes through Applicant Tracking Systems with our optimization tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features