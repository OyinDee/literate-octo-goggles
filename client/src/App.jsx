import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Home from './pages/Home'
import Login from './pages/Login'
import VerificationStart from './pages/VerificationStart'
import VideoVerification from './pages/VideoVerification'
import Success from './pages/Success'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerificationStart />} />
          <Route path="/record" element={<VideoVerification />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
