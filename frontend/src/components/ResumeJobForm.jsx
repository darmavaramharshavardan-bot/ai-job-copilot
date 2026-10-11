import React, { useState } from 'react';
import './ResumeJobForm.css';

function ResumeJobForm() {
  const [formData, setFormData] = useState({
    resume: null,
    jobTitle: '',
    companyName: '',
    jobDescription: ''
  });

  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic file type validation
      if (file.type !== 'application/pdf' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF, JPG, or PNG file'
        }));
        return;
      }

      // Basic file size validation (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));

      if (errors.resume) {
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessData(null);
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('job_title', formData.jobTitle);
      formDataToSend.append('company_name', formData.companyName);
      formDataToSend.append('job_description', formData.jobDescription);

      try {
        const response = await fetch('http://localhost:8000/analyze-resume', {
          method: 'POST',
          body: formDataToSend
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const message = errorData.detail || `HTTP error! status: ${response.status}`;
          setErrors({ submit: message });
        } else {
          const result = await response.json();
          setSuccessData(result.data);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: error.message || 'An error occurred' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="resume-job-form" id="resume-job-form">
      <div className="form-container">
        <div className="form-header">
          <h2>Analyze Your Resume</h2>
          <p>Upload your resume and provide job details for AI-powered analysis</p>
        </div>

        <form onSubmit={handleSubmit} className="job-form" noValidate>
          <div className="form-group">
            <label htmlFor="resume" className="form-label">
              Resume PDF Upload *
            </label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                className={`file-input ${errors.resume ? 'error' : ''}`}
              />
              <div className="file-upload-content">
                <span className="upload-icon">📄</span>
                <span className="upload-text">
                  {formData.resume ? formData.resume.name : 'Choose file or drag and drop'}
                </span>
                <span className="upload-hint">PDF, JPG, or PNG (Max 5MB)</span>
              </div>
            </div>
            {errors.resume && <span className="error-message">{errors.resume}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle" className="form-label">
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer, Product Manager"
              className={`form-input ${errors.jobTitle ? 'error' : ''}`}
            />
            {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="companyName" className="form-label">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g., TechCorp, Innovation Labs"
              className={`form-input ${errors.companyName ? 'error' : ''}`}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription" className="form-label">
              Job Description *
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Paste the job description here..."
              rows="4"
              className={`form-textarea ${errors.jobDescription ? 'error' : ''}`}
            />
            {errors.jobDescription && <span className="error-message">{errors.jobDescription}</span>}
          </div>

          <button type="submit" className="analyze-button" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze My Resume'}
          </button>
          {errors.submit && <span className="error-message">{errors.submit}</span>}
          {successData && (
            <div className="career-match-overview" id="career-report">
              <div className="cmo-header">
                <h3>Career Intelligence Report</h3>
                <button className="cmo-btn" onClick={() => window.print()} type="button">Print / Save PDF</button>
              </div>

              <div className="cmo-summary">
                <div
                  className="cmo-score-ring"
                  style={{ '--score': (successData.analysis?.match_score ?? 0) }}
                  aria-label={`Match score ${successData.analysis?.match_score ?? '--'} out of 100`}
                >
                  <div className="cmo-score-inner">{successData.analysis?.match_score ?? '--'}</div>
                </div>
                <div className="cmo-chart-bar">
                  <div className="cmo-label">AI-Estimated Match Score — <strong>{successData.analysis?.match_score ?? '--'} / 100</strong></div>
                  <div className="cmo-chart-track"><div className="cmo-chart-fill" style={{ width: `${Math.min(100, Math.max(0, successData.analysis?.match_score ?? 0))}%` }} /></div>
                </div>
              </div>

              <div className="cmo-meta">
                <span><strong>Resume</strong> {successData.resume.filename} ({successData.resume.pages} pg)</span>
                <span><strong>Job</strong> {successData.job.title} · {successData.job.company}</span>
              </div>

              {successData.analysis && (
                <>
                  <div className="cmo-grid">
                    <div className="cmo-card">
                      <h4>Matching Skills</h4>
                      <ul>{successData.analysis.matching_skills?.length ? successData.analysis.matching_skills.map((s,i)=><li key={i}>{s}</li>) : <li>—</li>}</ul>
                    </div>
                    <div className="cmo-card">
                      <h4>Missing Skills</h4>
                      <ul>{successData.analysis.missing_skills?.length ? successData.analysis.missing_skills.map((s,i)=><li key={i}>{s}</li>) : <li>—</li>}</ul>
                    </div>
                  </div>

                  <div className="cmo-grid">
                    <div className="cmo-card">
                      <h4>Strengths</h4>
                      <ul>{successData.analysis.strengths?.length ? successData.analysis.strengths.map((s,i)=><li key={i}>{s}</li>) : <li>—</li>}</ul>
                    </div>
                    <div className="cmo-card">
                      <h4>Weaknesses</h4>
                      <ul>{successData.analysis.weaknesses?.length ? successData.analysis.weaknesses.map((s,i)=><li key={i}>{s}</li>) : <li>—</li>}</ul>
                    </div>
                  </div>

                  <div className="cmo-checklist">
                    <h4>Interactive Action Checklist</h4>
                    <label className="cmo-check"><input type="checkbox" /> Learn {successData.analysis.skills_to_learn?.[0]?.title || 'recommended skills'}</label>
                    <label className="cmo-check"><input type="checkbox" /> Build {successData.analysis.projects_to_build?.[0]?.title || 'recommended project'}</label>
                    <label className="cmo-check"><input type="checkbox" /> Update resume with matching skills</label>
                  </div>

                  {/* Detailed Skills to Learn Section */}
                  {successData.analysis && successData.analysis.skills_to_learn?.length > 0 && (
                    <div className="cmo-section">
                      <h4>Skills to Learn (Detailed Guidance)</h4>
                      {successData.analysis.skills_to_learn.map((skill, idx) => (
                        <div key={idx} className="skill-detail-card">
                          <div className="skill-header">
                            <span className="skill-priority">Priority {skill.priority}: </span>
                            <span className="skill-title"><strong>{skill.title}</strong></span>
                          </div>
                          <div className="skill-content">
                            <p><strong>Why it matters:</strong> {skill.reason}</p>
                            {skill.topics_to_learn && skill.topics_to_learn.length > 0 && (
                              <div>
                                <strong>Specific topics to learn:</strong>
                                <ul>
                                  {skill.topics_to_learn.map((topic, topicIdx) => (
                                    <li key={topicIdx}>{topic.topic}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {skill.practical_exercises && skill.practical_exercises.length > 0 && (
                              <div>
                                <strong>Practical exercises:</strong>
                                <ul>
                                  {skill.practical_exercises.map((exercise, exerciseIdx) => (
                                    <li key={exerciseIdx}>{exercise.exercise}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {skill.completion_outcome && (
                              <p><strong>Measurable completion outcome:</strong> {skill.completion_outcome.outcome}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Role- and Company-Specific Projects Section */}
                  {successData.analysis && successData.analysis.projects_to_build?.length > 0 && (
                    <div className="cmo-section">
                      <h4>Role- and Company-Specific Projects</h4>
                      {successData.analysis.projects_to_build.map((project, idx) => (
                        <div key={idx} className="project-detail-card">
                          <div className="project-header">
                            <span className="project-priority">Priority {project.priority}: </span>
                            <span className="project-title"><strong>{project.title}</strong></span>
                          </div>
                          <div className="project-content">
                            <p><strong>Problem it solves:</strong> {project.problem}</p>
                            {project.key_features && project.key_features.length > 0 && (
                              <div>
                                <strong>Key features:</strong>
                                <ul>
                                  {project.key_features.map((feature, featureIdx) => (
                                    <li key={featureIdx}>{feature.feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {project.tech_stack && (
                              <p><strong>Recommended tech stack:</strong> {project.tech_stack.stack}</p>
                            )}
                            {project.skills_demonstrated && project.skills_demonstrated.length > 0 && (
                              <div>
                                <strong>Skills it demonstrates:</strong>
                                <ul>
                                  {project.skills_demonstrated.map((skill, skillIdx) => (
                                    <li key={skillIdx}>{skill.skill}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {project.relevance_to_role && (
                              <p><strong>Why it's relevant to this role:</strong> {project.relevance_to_role.relevance}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default ResumeJobForm;