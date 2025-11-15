import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [filters, setFilters] = useState({
    specialty: '',
    search: '',
    available: 'all',
    rating: 'all',
    experience: 'all',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Mock data - replace with API call
    const mockDoctors = [
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Medicine', rating: 4.8, available: true, experience: '10 years', price: '$150' },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', rating: 4.9, available: true, experience: '15 years', price: '$180' },
      { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Cardiology', rating: 4.7, available: false, experience: '8 years', price: '$200' },
      { id: 4, name: 'Dr. James Wilson', specialty: 'Pediatrics', rating: 4.9, available: true, experience: '12 years', price: '$160' },
      { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Dermatology', rating: 4.6, available: true, experience: '7 years', price: '$140' },
      { id: 6, name: 'Dr. Robert Taylor', specialty: 'Orthopedics', rating: 4.8, available: false, experience: '20 years', price: '$220' },
      { id: 7, name: 'Dr. Maria Garcia', specialty: 'Neurology', rating: 4.9, available: true, experience: '18 years', price: '$250' },
      { id: 8, name: 'Dr. David Kim', specialty: 'Psychiatry', rating: 4.7, available: true, experience: '11 years', price: '$170' },
    ]
    setDoctors(mockDoctors)
    setFilteredDoctors(mockDoctors)
  }, [])

  useEffect(() => {
    let filtered = [...doctors]

    if (filters.specialty) {
      filtered = filtered.filter(doc => doc.specialty === filters.specialty)
    }

    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.available !== 'all') {
      filtered = filtered.filter(doc => 
        filters.available === 'available' ? doc.available : !doc.available
      )
    }

    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating)
      filtered = filtered.filter(doc => doc.rating >= minRating)
    }

    if (filters.experience !== 'all') {
      const minExp = parseInt(filters.experience)
      filtered = filtered.filter(doc => {
        const expYears = parseInt(doc.experience)
        return expYears >= minExp
      })
    }

    setFilteredDoctors(filtered)
  }, [filters, doctors])

  const specialties = [...new Set(doctors.map(doc => doc.specialty))]

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#201D1D' }}>
            Find Your Doctor
          </h1>
          <p className="text-lg" style={{ color: '#201D1D', opacity: 0.7 }}>
            Browse through our expert medical professionals
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8" style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search by name or specialty..."
                className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(32, 29, 29, 0.2)',
                  backgroundColor: '#F4F4F4',
                  color: '#201D1D',
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                Specialty
              </label>
              <select
                value={filters.specialty}
                onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(32, 29, 29, 0.2)',
                  backgroundColor: '#F4F4F4',
                  color: '#201D1D',
                }}
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(32, 29, 29, 0.2)',
                  backgroundColor: '#F4F4F4',
                  color: '#201D1D',
                }}
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.7">4.7+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
                <option value="4.9">4.9+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#201D1D' }}>
                Availability
              </label>
              <select
                value={filters.available}
                onChange={(e) => setFilters({ ...filters, available: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(32, 29, 29, 0.2)',
                  backgroundColor: '#F4F4F4',
                  color: '#201D1D',
                }}
              >
                <option value="all">All</option>
                <option value="available">Available Now</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl"
              style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#201D1D' }}>
                    {doctor.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: '#201D1D', opacity: 0.7 }}>
                    {doctor.specialty}
                  </p>
                </div>
                {doctor.available && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#A1FF62', color: '#201D1D' }}>
                    Available
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-semibold" style={{ color: '#201D1D' }}>
                    {doctor.rating}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#201D1D', opacity: 0.7 }}>
                  Experience: {doctor.experience}
                </p>
                <p className="text-sm font-semibold" style={{ color: '#6840FF' }}>
                  {doctor.price} per visit
                </p>
              </div>

              <button
                onClick={() => navigate(`/booking/${doctor.id}`, { state: { doctor } })}
                disabled={!doctor.available}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                  doctor.available
                    ? 'text-white'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{
                  backgroundColor: doctor.available ? '#6840FF' : '#201D1D',
                }}
              >
                {doctor.available ? 'Book Appointment' : 'Not Available'}
              </button>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg" style={{ border: '1px solid rgba(32, 29, 29, 0.1)' }}>
            <p className="text-lg font-medium" style={{ color: '#201D1D', opacity: 0.7 }}>
              No doctors found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors
