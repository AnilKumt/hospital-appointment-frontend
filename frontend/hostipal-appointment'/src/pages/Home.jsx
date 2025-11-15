import { Link } from 'react-router-dom'
import clinicImage from '../assets/clinic-scheduling-app.webp'

function Home() {
  return (
    <section className="min-h-[calc(100vh-64px)] w-full px-5 lg:px-10 xl:px-20 py-10 lg:py-16 flex items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-0 max-w-[1440px] items-center">
        <div className="flex flex-col w-full lg:w-[48%] gap-8 items-center lg:items-start justify-center text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[56px] xl:leading-[1.2] font-semibold">
            The fastest growing doctor Appointment booking software
          </h1>
          <div className="flex items-center flex-col sm:flex-row gap-4 relative w-fit">
            <Link 
              to="/book-appointment"
              className="p-6 flex items-center text-base sm:text-lg h-10 gap-8 rounded-full transition duration-300 text-white"
              style={{ backgroundColor: '#34C759' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2eb04a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#34C759'}
            >
              Book Appointment
              <span className="bg-white w-6 h-6 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-full h-full" style={{ color: '#34C759' }}>
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
            <Link 
              to="/doctors"
              className="p-6 flex items-center text-base sm:text-lg gap-4 h-10 rounded-full transition duration-300"
              style={{ backgroundColor: '#F4F4F4', color: '#201D1D' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8E8E8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4F4F4'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar1 w-5 h-5">
                <path d="M11 14h1v4"></path>
                <path d="M16 2v4"></path>
                <path d="M3 10h18"></path>
                <path d="M8 2v4"></path>
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              </svg>
              View Doctors
              <span className="border-2 w-6 h-6 p-[2px] rounded-full" style={{ borderColor: '#201D1D' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-full h-full" style={{ color: '#201D1D' }}>
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
            <svg className="hidden sm:block absolute top-5 -left-3 -translate-x-full" width="31" height="73" viewBox="0 0 31 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.6" d="M26.8617 72.824C27.3641 73.0535 27.9573 72.8324 28.1868 72.33C28.4164 71.8277 28.1952 71.2344 27.6929 71.0049L26.8617 72.824ZM30.5068 8.01979C30.8521 7.58872 30.7826 6.95939 30.3515 6.61413L23.3269 0.987821C22.8959 0.642563 22.2665 0.712117 21.9213 1.14318C21.576 1.57424 21.6456 2.20358 22.0766 2.54883L28.3207 7.55L23.3195 13.7941C22.9743 14.2251 23.0438 14.8545 23.4749 15.1997C23.9059 15.545 24.5353 15.4754 24.8805 15.0444L30.5068 8.01979ZM27.6929 71.0049C8.11754 62.061 1.12806 47.1832 2.6987 34.2669C4.27494 21.3045 14.4764 10.0863 29.8362 8.38859L29.6165 6.40069C13.3267 8.20115 2.40069 20.1492 0.713325 34.0254C-0.97964 47.9477 6.63114 63.5807 26.8617 72.824L27.6929 71.0049Z" fill="black"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-4 relative">
            <p className="font-medium text-black/60 text-xs md:text-base xl:text-lg flex gap-4">
              <span className="flex items-center gap-2">
                <svg className="w-3 h-3 sm:w-5 sm:h-5" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.000359869 10.8404C-0.0486437 4.86195 4.91344 -0.0517737 10.9275 0.000411873C16.7997 0.0519611 21.7153 4.89186 21.6593 10.9562C21.6052 16.843 16.7602 21.653 10.8473 21.6676C4.82053 21.6829 -0.0435524 16.7444 0.000359869 10.8404Z" fill="#A6D62E"></path>
                  <path d="M14.076 12.2433C13.5268 12.8479 12.9018 13.3729 12.3138 13.9374C11.4966 14.7221 10.6515 15.4782 9.83307 16.2616C9.65679 16.4303 9.56833 16.4131 9.40286 16.2565C8.02631 14.9544 6.64021 13.6625 5.25729 12.3668C4.80925 11.9468 4.3644 11.5235 3.9151 11.1048C3.784 10.9826 3.76236 10.8941 3.91574 10.7535C4.64888 10.0802 5.37311 9.39602 6.09226 8.70743C6.24818 8.55787 6.32455 8.65969 6.42764 8.75707C7.13724 9.4253 7.84811 10.0916 8.56025 10.7573C8.82309 11.003 9.11011 11.2263 9.34877 11.493C9.54223 11.7094 9.67206 11.7017 9.87126 11.5102C10.6044 10.8057 11.3496 10.1139 12.0917 9.41766C13.4511 8.14229 14.813 6.87011 16.1673 5.58965C16.3397 5.42673 16.4511 5.40573 16.6357 5.58265C17.3153 6.23434 18.0128 6.86756 18.7008 7.5097C18.8243 7.62489 18.9484 7.72354 18.7454 7.91C17.645 8.91935 16.5574 9.94206 15.4659 10.9603C15.296 11.108 15.1185 11.2461 14.96 11.4064C14.9212 11.4516 14.8823 11.4968 14.8442 11.542C14.8034 11.5999 14.7264 11.5267 14.6647 11.6285C14.5183 11.871 14.2708 12.0352 14.0747 12.242L14.076 12.2433Z" fill="#FEFEFE"></path>
                </svg>
                Go live in two minutes
              </span>
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg className="fill-current text-[#FCC70B]" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L15.1035 7.72839L23.4127 8.2918L17.0216 13.6316L19.0534 21.7082L12 17.28L4.94658 21.7082L6.97842 13.6316L0.587322 8.2918L8.89649 7.72839L12 0Z"></path>
                </svg>
                <svg className="fill-current text-[#FCC70B]" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L15.1035 7.72839L23.4127 8.2918L17.0216 13.6316L19.0534 21.7082L12 17.28L4.94658 21.7082L6.97842 13.6316L0.587322 8.2918L8.89649 7.72839L12 0Z"></path>
                </svg>
                <svg className="fill-current text-[#FCC70B]" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L15.1035 7.72839L23.4127 8.2918L17.0216 13.6316L19.0534 21.7082L12 17.28L4.94658 21.7082L6.97842 13.6316L0.587322 8.2918L8.89649 7.72839L12 0Z"></path>
                </svg>
                <svg className="fill-current text-[#FCC70B]" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L15.1035 7.72839L23.4127 8.2918L17.0216 13.6316L19.0534 21.7082L12 17.28L4.94658 21.7082L6.97842 13.6316L0.587322 8.2918L8.89649 7.72839L12 0Z"></path>
                </svg>
                <svg className="fill-current text-[#FCC70B]" width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4127 0L14.5162 7.72839L22.8254 8.2918L16.4343 13.6316L14 15.5L11.4127 17.28L4.35925 21.7082L6.3911 13.6316L0 8.2918L8.30917 7.72839L11.4127 0Z"></path>
                </svg>
              </div>
              <span className="text-sm text-black font-medium">Rated 4.9 out of 5</span>
            </div>
          </div>
        </div>
        <div className="lg:flex-1 z-10 w-full min-w-0 h-auto">
          <div className="w-full">
            <img 
              alt="Appointment Hero Banner" 
              width="884" 
              height="650" 
              decoding="async" 
              className="rounded-2xl scale-115 2xl:scale-125 sm:rounded-3xl lg:rounded-r-none object-cover object-left w-full h-full" 
              src={clinicImage}
              style={{ color: 'transparent' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

