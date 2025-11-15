import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import BookAppointment from './pages/BookAppointment'
import Booking from './pages/Booking'
import MyAppointments from './pages/MyAppointments'
import Telemedicine from './pages/Telemedicine'
import DoctorDashboard from './pages/DoctorDashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/booking/:doctorId" element={<Booking />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/telemedicine/:roomId" element={<Telemedicine />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
