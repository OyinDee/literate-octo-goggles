import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../utils/translations'
import './Success.css'

function Success() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key)

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

        <h1 className="success-title">{t('verificationSubmitted')}</h1>
        
        <p className="success-description">
          {t('successMessage')}
        </p>

        <div className="success-info">
          <div className="info-row">
            <span className="info-label">{t('status')}</span>
            <span className="info-value pending">{t('pending')}</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('submittedTime')}</span>
            <span className="info-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('referenceId')}</span>
            <span className="info-value">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </div>

        <div className="success-steps">
          <h3>{t('nextSteps')}</h3>
          <ol>
            <li>{t('step1')}</li>
            <li>{t('step2')}</li>
            <li>{t('step3')}</li>
            <li>{t('step4')}</li>
            <li>{t('step5')}</li>
          </ol>
        </div>

        <button className="btn-done" onClick={() => navigate('/')}>
          {t('backToHome')}
        </button>

        <p className="support-text">
          {t('needSupport')} <a href="#">{t('viewHelpCenter')}</a> {language === 'ja' ? 'をご覧いただくか、' : 'or '}<a href="#">{t('contactSupport')}</a> {language === 'ja' ? 'ください' : ''}
        </p>
      </div>
    </div>
  )
}

export default Success
