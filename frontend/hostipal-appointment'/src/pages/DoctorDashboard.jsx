import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function DoctorDashboard() {
  const navigate = useNavigate()
  const [emergencyQueue, setEmergencyQueue] = useState([])
  const [normalQueue, setNormalQueue] = useState([])
  const [nextPatient, setNextPatient] = useState(null)

  useEffect(() => {
    // Mock data - replace with API calls
    const mockEmergencyQueue = [
      {
        id: 1,
        patientName: 'John Doe',
        severity: 'High',
        severityScore: 8,
        symptoms: 'Chest pain, shortness of breath',
        appointmentTime: '10:00 AM',
        queuePosition: 1,
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        severity: 'Critical',
        severityScore: 9,
        symptoms: 'Severe headache, vision changes',
        appointmentTime: '10:15 AM',
        queuePosition: 2,
      },
    ]

    const mockNormalQueue = [
      {
        id: 3,
        patientName: 'Bob Johnson',
        severity: 'Moderate',
        severityScore: 6,
        symptoms: 'Fever, cough',
        appointmentTime: '11:00 AM',
        queuePosition: 1,
      },
      {
        id: 4,
        patientName: 'Alice Williams',
        severity: 'Low',
        severityScore: 4,
        symptoms: 'Rash, itching',
        appointmentTime: '11:30 AM',
        queuePosition: 2,
      },
      {
        id: 5,
        patientName: 'Charlie Brown',
        severity: 'Moderate',
        severityScore: 5,
        symptoms: 'Joint pain, stiffness',
        appointmentTime: '02:00 PM',
        queuePosition: 3,
      },
    ]

    setEmergencyQueue(mockEmergencyQueue)
    setNormalQueue(mockNormalQueue)
    setNextPatient(mockEmergencyQueue[0] || mockNormalQueue[0])
  }, [])

  const handleStartCall = (patient) => {
    // Navigate to telemedicine room
    navigate(`/telemedicine/${patient.id}`)
  }

  const handleMoveToNext = (patientId, queueType) => {
    if (queueType === 'emergency') {
      setEmergencyQueue(prev => prev.filter(p => p.id !== patientId))
    } else {
      setNormalQueue(prev => prev.filter(p => p.id !== patientId))
    }
    
    // Update next patient
    const next = queueType === 'emergency' 
      ? emergencyQueue.find(p => p.id !== patientId) || normalQueue[0]
      : normalQueue.find(p => p.id !== patientId) || emergencyQueue[0]
    setNextPatient(next)
  }

  const getSeverityColor = (severity) => {
    if (severity === 'Low') return 'bg-green-500'
    if (severity === 'Moderate') return 'bg-yellow-500'
    if (severity === 'High') return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>

        {/* Next Patient Card */}
        {nextPatient && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-[#34C759]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Next Patient</h2>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">{nextPatient.patientName}</p>
                  <p className="text-gray-600">{nextPatient.symptoms}</p>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getSeverityColor(nextPatient.severity)}`}
                    >
                      {nextPatient.severity} ({nextPatient.severityScore}/10)
                    </span>
                    <span className="text-sm text-gray-600">
                      Appointment: {nextPatient.appointmentTime}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleStartCall(nextPatient)}
                className="bg-[#34C759] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
              >
                Start Call
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Queue */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Emergency Queue</h2>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {emergencyQueue.length} patients
              </span>
            </div>
            <div className="space-y-3">
              {emergencyQueue.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No emergency patients</p>
              ) : (
                emergencyQueue.map((patient, index) => (
                  <div
                    key={patient.id}
                    className="border border-red-200 rounded-lg p-4 bg-red-50 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{patient.patientName}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getSeverityColor(patient.severity)}`}
                          >
                            {patient.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{patient.symptoms}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Position: #{patient.queuePosition}</span>
                          <span>{patient.appointmentTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleStartCall(patient)}
                        className="flex-1 bg-[#34C759] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
                      >
                        Start Call
                      </button>
                      <button
                        onClick={() => handleMoveToNext(patient.id, 'emergency')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Normal Queue */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Normal Queue</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {normalQueue.length} patients
              </span>
            </div>
            <div className="space-y-3">
              {normalQueue.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No patients in queue</p>
              ) : (
                normalQueue.map((patient) => (
                  <div
                    key={patient.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{patient.patientName}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getSeverityColor(patient.severity)}`}
                          >
                            {patient.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{patient.symptoms}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Position: #{patient.queuePosition}</span>
                          <span>{patient.appointmentTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleStartCall(patient)}
                        className="flex-1 bg-[#34C759] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
                      >
                        Start Call
                      </button>
                      <button
                        onClick={() => handleMoveToNext(patient.id, 'normal')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard

