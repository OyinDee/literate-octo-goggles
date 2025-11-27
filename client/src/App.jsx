import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VerificationStart from './pages/VerificationStart'
import VideoVerification from './pages/VideoVerification'
import Success from './pages/Success'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerificationStart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/record" element={<VideoVerification />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App
