import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-brand">AI Job Copilot</div>

          <div className="nav-links">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how-it-works" className="nav-link">
              How It Works
            </a>
          </div>

          <div className="nav-toggle">
            <button className="nav-toggle-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar