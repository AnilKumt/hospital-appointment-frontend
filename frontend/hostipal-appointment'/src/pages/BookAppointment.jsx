import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BookAppointment() {
  const navigate = useNavigate()
  const [recommendedDoctors, setRecommendedDoctors] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const appointmentType = watch('appointmentType')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // API call to get recommended doctors
      const response = await fetch('/api/appointments/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      setRecommendedDoctors(result.doctors || [])
      
      // Mock data for development
      if (!result.doctors) {
        setRecommendedDoctors([
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: 'General Medicine',
            experience: '10 years',
            rating: 4.8,
            available: true,
            specialization: 'General Medicine',
          },
          {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'Internal Medicine',
            experience: '15 years',
            rating: 4.9,
            available: true,
            specialization: 'Internal Medicine',
          },
        ])
      }
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectDoctor = (doctor) => {
    navigate(`/booking/${doctor.id}`, {
      state: { doctor, formData: watch() },
    })
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#201D1D' }}>
            Book Your Appointment
          </h1>
          <p className="text-lg" style={{ color: '#201D1D', opacity: 0.7 }}>
            Fill in your details and we'll recommend the best doctor for you
          </p>
        </div>

        {!recommendedDoctors ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12" style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.name ? '#ef4444' : 'rgba(32, 29, 29, 0.2)',
                      backgroundColor: '#F4F4F4',
                      color: '#201D1D',
                    }}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.email ? '#ef4444' : 'rgba(32, 29, 29, 0.2)',
                      backgroundColor: '#F4F4F4',
                      color: '#201D1D',
                    }}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                  style={{
                    borderColor: errors.phone ? '#ef4444' : 'rgba(32, 29, 29, 0.2)',
                    backgroundColor: '#F4F4F4',
                    color: '#201D1D',
                  }}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                  Symptoms / Reason for Visit *
                </label>
                <textarea
                  {...register('symptoms', { required: 'Symptoms are required' })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 resize-none"
                  style={{
                    borderColor: errors.symptoms ? '#ef4444' : 'rgba(32, 29, 29, 0.2)',
                    backgroundColor: '#F4F4F4',
                    color: '#201D1D',
                  }}
                  placeholder="Describe your symptoms or reason for the appointment..."
                />
                {errors.symptoms && (
                  <p className="mt-1 text-sm text-red-500">{errors.symptoms.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                  Appointment Type *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      appointmentType === 'online'
                        ? 'border-[#6840FF]'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: appointmentType === 'online' ? 'rgba(104, 64, 255, 0.1)' : '#F4F4F4',
                    }}
                  >
                    <input
                      type="radio"
                      value="online"
                      {...register('appointmentType', { required: 'Please select appointment type' })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">💻</div>
                      <span className="font-medium" style={{ color: '#201D1D' }}>Online</span>
                    </div>
                  </label>

                  <label
                    className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      appointmentType === 'offline'
                        ? 'border-[#6840FF]'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: appointmentType === 'offline' ? 'rgba(104, 64, 255, 0.1)' : '#F4F4F4',
                    }}
                  >
                    <input
                      type="radio"
                      value="offline"
                      {...register('appointmentType', { required: 'Please select appointment type' })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">🏥</div>
                      <span className="font-medium" style={{ color: '#201D1D' }}>In-Person</span>
                    </div>
                  </label>
                </div>
                {errors.appointmentType && (
                  <p className="mt-1 text-sm text-red-500">{errors.appointmentType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  {...register('preferredDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                  style={{
                    borderColor: 'rgba(32, 29, 29, 0.2)',
                    backgroundColor: '#F4F4F4',
                    color: '#201D1D',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#6840FF' }}
              >
                {loading ? 'Finding Doctors...' : 'Find Recommended Doctors'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8" style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#201D1D' }}>
                Recommended Doctors
              </h2>
              <div className="space-y-4">
                {recommendedDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="p-6 rounded-xl border-2 transition-all hover:shadow-lg"
                    style={{
                      borderColor: 'rgba(32, 29, 29, 0.1)',
                      backgroundColor: '#F4F4F4',
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: '#201D1D' }}>
                          {doctor.name}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: '#201D1D', opacity: 0.7 }}>
                          {doctor.specialty} • {doctor.experience}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium" style={{ color: '#201D1D' }}>
                            {doctor.rating}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectDoctor(doctor)}
                        className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                        style={{ backgroundColor: '#6840FF' }}
                      >
                        Select Doctor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookAppointment

