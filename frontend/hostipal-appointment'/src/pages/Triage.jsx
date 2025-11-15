import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Triage() {
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const [triageResult, setTriageResult] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      })
      
      const data = await response.json()
      setTriageResult(data)
    } catch (error) {
      console.error('Error calling triage API:', error)
      // Mock data for development
      setTriageResult({
        severity: 7,
        severityLabel: 'Moderate',
        recommendedDoctors: [
          { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Medicine', available: true },
          { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', available: true },
        ],
        isEmergency: false,
      })
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity) => {
    if (severity <= 3) return 'bg-green-500'
    if (severity <= 6) return 'bg-yellow-500'
    if (severity <= 8) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getSeverityLabel = (severity) => {
    if (severity <= 3) return 'Low'
    if (severity <= 6) return 'Moderate'
    if (severity <= 8) return 'High'
    return 'Critical'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Symptom Triage</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your symptoms
              </label>
              <textarea
                id="symptoms"
                rows="6"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34C759] focus:border-transparent"
                placeholder="Please describe your symptoms in detail..."
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#34C759] text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Submit Symptoms'}
            </button>
          </form>

          {triageResult && (
            <div className="mt-8 space-y-6">
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Triage Results</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Severity Level</span>
                    <span className="text-lg font-bold text-gray-900">
                      {getSeverityLabel(triageResult.severity || triageResult.severityScore)} ({triageResult.severity || triageResult.severityScore}/10)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all ${getSeverityColor(triageResult.severity || triageResult.severityScore)}`}
                      style={{ width: `${((triageResult.severity || triageResult.severityScore) / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {triageResult.recommendedDoctors && triageResult.recommendedDoctors.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Recommended Doctors</h3>
                    <div className="space-y-3">
                      {triageResult.recommendedDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                              <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            </div>
                            <button
                              onClick={() => navigate(`/booking/${doctor.id}`, { state: { doctor, isEmergency: triageResult.isEmergency } })}
                              className="bg-[#34C759] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Triage

