import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MyAppointments() {
  const location = useLocation()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [rescheduleRequest, setRescheduleRequest] = useState(null)

  useEffect(() => {
    // Mock data - replace with API call
    const mockAppointments = [
      {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'General Medicine',
        date: '2024-01-15',
        time: '10:00 AM',
        status: 'upcoming',
        queuePosition: 3,
        severity: 'Moderate',
        severityScore: 7,
        isEmergency: false,
        appointmentType: 'online',
        roomId: 'room-123',
      },
      {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'Internal Medicine',
        date: '2024-01-20',
        time: '02:00 PM',
        status: 'upcoming',
        queuePosition: 1,
        severity: 'High',
        severityScore: 8,
        isEmergency: true,
        appointmentType: 'online',
        roomId: 'room-456',
      },
      {
        id: 3,
        doctorName: 'Dr. Emily Rodriguez',
        specialty: 'Cardiology',
        date: '2024-01-10',
        time: '11:00 AM',
        status: 'completed',
        queuePosition: null,
        severity: null,
        severityScore: null,
        isEmergency: false,
        appointmentType: 'offline',
      },
    ]
    setAppointments(mockAppointments)
  }, [])

  const handleCancel = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    
    setLoading(true)
    try {
      // API call to cancel
      // await fetch(`/api/appointments/${appointmentId}`, { method: 'DELETE' })
      setAppointments(appointments.filter(apt => apt.id !== appointmentId))
    } catch (error) {
      console.error('Cancel error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReschedule = async (appointment) => {
    setRescheduleRequest({ appointmentId: appointment.id, status: 'pending' })
    // API call to request reschedule
    // await fetch(`/api/appointments/${appointment.id}/reschedule`, { method: 'POST' })
  }

  const getSeverityColor = (severity) => {
    if (!severity) return { bg: '#201D1D', text: 'white' }
    if (severity === 'Low') return { bg: '#A1FF62', text: '#201D1D' }
    if (severity === 'Moderate') return { bg: '#FCC70B', text: '#201D1D' }
    if (severity === 'High') return { bg: '#FF6B35', text: 'white' }
    return { bg: '#EF4444', text: 'white' }
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#201D1D' }}>
            My Appointments
          </h1>
          <p className="text-lg" style={{ color: '#201D1D', opacity: 0.7 }}>
            Manage your scheduled appointments
          </p>
        </div>

        {location.state?.bookingSuccess && (
          <div className="mb-6 p-4 rounded-xl font-medium" style={{ backgroundColor: '#A1FF62', color: '#201D1D' }}>
            Appointment booked successfully!
          </div>
        )}

        <div className="space-y-6">
          {appointments.map(appointment => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all hover:shadow-xl"
              style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1" style={{ color: '#201D1D' }}>
                        {appointment.doctorName}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: '#201D1D', opacity: 0.7 }}>
                        {appointment.specialty}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {appointment.isEmergency && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#EF4444' }}>
                          Emergency
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'upcoming' ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: appointment.status === 'upcoming' ? '#6840FF' : '#F4F4F4',
                        color: appointment.status === 'upcoming' ? 'white' : '#201D1D',
                      }}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#201D1D', opacity: 0.6 }}>
                        Date
                      </p>
                      <p className="font-semibold" style={{ color: '#201D1D' }}>{appointment.date}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#201D1D', opacity: 0.6 }}>
                        Time
                      </p>
                      <p className="font-semibold" style={{ color: '#201D1D' }}>{appointment.time}</p>
                    </div>
                    {appointment.queuePosition && (
                      <div>
                        <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#201D1D', opacity: 0.6 }}>
                          Queue
                        </p>
                        <p className="font-bold text-xl" style={{ color: '#6840FF' }}>#{appointment.queuePosition}</p>
                      </div>
                    )}
                    {appointment.severity && (
                      <div>
                        <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#201D1D', opacity: 0.6 }}>
                          Severity
                        </p>
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: getSeverityColor(appointment.severity).bg, color: getSeverityColor(appointment.severity).text }}
                        >
                          {appointment.severity}
                        </span>
                      </div>
                    )}
                  </div>

                  {appointment.appointmentType === 'online' && appointment.status === 'upcoming' && (
                    <div className="mt-4">
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#201D1D', opacity: 0.6 }}>
                        Type: Online Consultation
                      </span>
                    </div>
                  )}
                </div>

                {appointment.status === 'upcoming' && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    {appointment.appointmentType === 'online' && appointment.queuePosition === 1 && (
                      <button
                        onClick={() => navigate(`/telemedicine/${appointment.roomId}`)}
                        className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                        style={{ backgroundColor: '#6840FF' }}
                      >
                        Join Meeting
                      </button>
                    )}
                    <button
                      onClick={() => handleReschedule(appointment)}
                      className="px-6 py-3 rounded-xl font-semibold transition-all border-2"
                      style={{
                        borderColor: '#201D1D',
                        color: '#201D1D',
                        backgroundColor: 'transparent',
                      }}
                    >
                      Request Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      disabled={loading}
                      className="px-6 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50"
                      style={{ backgroundColor: '#EF4444' }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {rescheduleRequest?.appointmentId === appointment.id && (
                <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: '#F4F4F4' }}>
                  <p className="text-sm font-medium" style={{ color: '#201D1D' }}>
                    Reschedule request submitted. Doctor will review and confirm.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg" style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}>
            <p className="text-lg font-medium mb-4" style={{ color: '#201D1D', opacity: 0.7 }}>
              No appointments found.
            </p>
            <button
              onClick={() => navigate('/book-appointment')}
              className="px-6 py-3 rounded-xl font-semibold text-white"
              style={{ backgroundColor: '#6840FF' }}
            >
              Book an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
