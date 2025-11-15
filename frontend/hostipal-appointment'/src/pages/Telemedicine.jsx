import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Telemedicine() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  
  const [isConnected, setIsConnected] = useState(false)
  const [localStream, setLocalStream] = useState(null)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    initializeMedia()
    connectToSignaling()

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    let interval = null
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected])

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      
      setLocalStream(stream)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing media devices:', error)
      alert('Unable to access camera/microphone. Please check permissions.')
    }
  }

  const connectToSignaling = () => {
    // Mock signaling connection
    console.log('Connecting to signaling server for room:', roomId)
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true)
    }, 1000)
  }

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled
        setIsVideoEnabled(!isVideoEnabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled
        setIsAudioEnabled(!isAudioEnabled)
      }
    }
  }

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
    }
    navigate('/appointments')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#201D1D' }}>
      <div className="w-full max-w-7xl">
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#201D1D' }}>
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div>
              <h1 className="text-xl font-bold text-white">Video Consultation</h1>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Room ID: {roomId}</p>
            </div>
            <div className="flex items-center gap-4">
              {isConnected && (
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Call Duration
                  </p>
                  <p className="text-lg font-bold text-white">{formatTime(callDuration)}</p>
                </div>
              )}
              <span
                className={`px-4 py-2 rounded-full text-xs font-semibold ${
                  isConnected ? 'text-white' : 'text-white'
                }`}
                style={{
                  backgroundColor: isConnected ? '#A1FF62' : '#FCC70B',
                  color: '#201D1D',
                }}
              >
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative" style={{ aspectRatio: '16/9', backgroundColor: '#0a0a0a' }}>
            {/* Remote Video (Main) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            >
              {!isConnected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#201D1D' }}>
                      <svg
                        className="w-16 h-16"
                        style={{ color: '#6840FF' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-white mb-2">Waiting for doctor to join...</p>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Please wait while we connect you
                    </p>
                  </div>
                </div>
              )}
            </video>

            {/* Local Video (Picture-in-Picture) */}
            <div className="absolute bottom-6 right-6 w-64 h-48 rounded-xl overflow-hidden border-4 shadow-2xl" style={{ borderColor: '#6840FF' }}>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-6" style={{ backgroundColor: '#201D1D' }}>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleAudio}
                className={`p-4 rounded-full transition-all ${
                  isAudioEnabled
                    ? 'text-white'
                    : 'text-white'
                }`}
                style={{
                  backgroundColor: isAudioEnabled ? '#6840FF' : '#EF4444',
                }}
                title={isAudioEnabled ? 'Mute' : 'Unmute'}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isAudioEnabled ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  )}
                </svg>
              </button>

              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition-all ${
                  isVideoEnabled
                    ? 'text-white'
                    : 'text-white'
                }`}
                style={{
                  backgroundColor: isVideoEnabled ? '#6840FF' : '#EF4444',
                }}
                title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isVideoEnabled ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  )}
                </svg>
              </button>

              <button
                onClick={endCall}
                className="p-4 rounded-full text-white transition-all"
                style={{ backgroundColor: '#EF4444' }}
                title="End call"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Telemedicine
