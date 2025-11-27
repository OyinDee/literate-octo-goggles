import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-container">
        {/* X Logo */}
        <svg viewBox="0 0 24 24" className="x-logo" aria-hidden="true">
          <g>
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>

        <h1 className="home-title">Happening now</h1>
        
        <div className="home-buttons">
          <button className="btn btn-white">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <g><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></g>
            </svg>
            Sign up with Google
          </button>
          
          <button className="btn btn-white">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <g><path fill="currentColor" d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z"></path></g>
            </svg>
            Sign up with Apple
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="btn btn-primary">Create account</button>

          <p className="terms">
            By signing up, you agree to the <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a>.
          </p>
        </div>

        <div className="signin-section">
          <p className="signin-text">Already have an account?</p>
          <button className="btn btn-outline">Sign in</button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/verify')}
          >
            <svg viewBox="0 0 24 24" className="btn-icon" aria-hidden="true">
              <g>
                <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
            Help Friend Unlock Account
          </button>
        </div>

        <footer className="home-footer">
          <a href="#">About</a>
          <a href="#">Download the X app</a>
          <a href="#">Help Center</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          <a href="#">Ads info</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Brand Resources</a>
          <a href="#">Advertising</a>
          <a href="#">Marketing</a>
          <a href="#">X for Business</a>
          <a href="#">Developers</a>
          <a href="#">Directory</a>
          <a href="#">Settings</a>
          <span>© 2025 X Corp.</span>
        </footer>
      </div>
    </div>
  )
}

export default Home
