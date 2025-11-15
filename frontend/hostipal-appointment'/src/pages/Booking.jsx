import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

function Booking() {
  const { doctorId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { doctor, formData } = location.state || {}
  
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [queuePosition, setQueuePosition] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mock time slots - replace with API call
  const timeSlots = [
    { id: 1, time: '09:00 AM', date: '2024-01-15', available: true },
    { id: 2, time: '10:00 AM', date: '2024-01-15', available: true },
    { id: 3, time: '11:00 AM', date: '2024-01-15', available: false },
    { id: 4, time: '02:00 PM', date: '2024-01-15', available: true },
    { id: 5, time: '03:00 PM', date: '2024-01-15', available: true },
    { id: 6, time: '04:00 PM', date: '2024-01-15', available: true },
  ]

  useEffect(() => {
    if (selectedSlot) {
      // Calculate estimated queue position
      const estimatedPosition = Math.floor(Math.random() * 10) + 2
      setQueuePosition(estimatedPosition)
    }
  }, [selectedSlot])

  const handleBooking = async () => {
    if (!selectedSlot) return
    
    setLoading(true)
    try {
      // API call to book appointment
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   body: JSON.stringify({ doctorId, slot: selectedSlot, formData })
      // })
      // Mock success
      setTimeout(() => {
        navigate('/appointments', { state: { bookingSuccess: true } })
      }, 1000)
    } catch (error) {
      console.error('Booking error:', error)
      setLoading(false)
    }
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="text-center">
          <p className="text-lg font-medium mb-4" style={{ color: '#201D1D', opacity: 0.7 }}>
            Doctor information not found.
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className="px-6 py-3 rounded-xl font-semibold text-white"
            style={{ backgroundColor: '#6840FF' }}
          >
            Go back to doctors list
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12" style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}>
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#201D1D' }}>
              Confirm Appointment
            </h1>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: '#201D1D' }}>{doctor.name}</h2>
                <p className="text-sm" style={{ color: '#201D1D', opacity: 0.7 }}>{doctor.specialty}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#201D1D' }}>Select Time Slot</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedSlot(slot)}
                  disabled={!slot.available}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedSlot?.id === slot.id
                      ? 'border-[#6840FF]'
                      : slot.available
                      ? 'border-gray-300 hover:border-[#6840FF]'
                      : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                  }`}
                  style={{
                    backgroundColor: selectedSlot?.id === slot.id ? 'rgba(104, 64, 255, 0.1)' : '#F4F4F4',
                  }}
                >
                  <div className="text-sm font-semibold" style={{ color: '#201D1D' }}>{slot.time}</div>
                  <div className="text-xs mt-1" style={{ color: '#201D1D', opacity: 0.6 }}>{slot.date}</div>
                  {!slot.available && (
                    <div className="text-xs mt-1 text-red-500">Unavailable</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {selectedSlot && (
            <div className="mb-6 p-6 rounded-xl" style={{ backgroundColor: '#F4F4F4', border: '2px solid #6840FF' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1" style={{ color: '#201D1D' }}>Selected Slot</p>
                  <p className="text-sm" style={{ color: '#201D1D', opacity: 0.7 }}>
                    {selectedSlot.date} at {selectedSlot.time}
                  </p>
                </div>
                {queuePosition && (
                  <div className="text-right">
                    <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#201D1D', opacity: 0.6 }}>
                      Queue Position
                    </p>
                    <p className="text-3xl font-bold" style={{ color: '#6840FF' }}>#{queuePosition}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl font-semibold transition-all border-2"
              style={{
                borderColor: '#201D1D',
                color: '#201D1D',
                backgroundColor: 'transparent',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              disabled={!selectedSlot || loading}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#6840FF' }}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
