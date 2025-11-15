import { Link, useLocation } from 'react-router-dom'
import SideNav from './SideNav'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      <SideNav />
      
      {/* Top Bar with Logo and Book Button */}
      <div className="fixed top-0 left-0 right-0 z-100" style={{ backgroundColor: 'transparent' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center" aria-label="go to homepage">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#A1FF62' }}>
                10MG
              </span>
            </Link>
            
            <Link
              to="/book-appointment"
              className="px-6 py-3 rounded-full font-semibold text-white transition-all"
              style={{ backgroundColor: '#6840FF' }}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <main style={{ paddingTop: '80px' }}>{children}</main>
    </div>
  )
}

export default Layout
