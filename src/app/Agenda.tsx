// import backgroundPattern from "/assets/154465906a86e9abb2111c1fddf397d04d59de3e.png"
import { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Coffee, Menu, UtensilsCrossed, CalendarDays, MapPin } from 'lucide-react';
import Registration from "./Registration";
import { useNavigate } from 'react-router';

interface AgendaProps {
  onNavigate: (page: 'home' | 'team' | 'agenda') => void;
}

const agendaItems = [
  {
    id: 1,
    time: "9:30 AM - 9:45 AM",
    title: "OPENING ADDRESS",
    speaker: "Sanjay Enishetty",
    role: "Founder, ScaleMe Network",
    desc: "Setting the context , Why ScaleME for SMEs?",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/728220c1771570996973sanjay_ennisetty.png",
    type: "session"
  },
  {
    id: 2,
    time: "9:45 AM - 10:15 AM",
    title: "Accelerating growth through market capitalisation",
    speaker: "Prof. Rajendra Srivastava",
    role: "Executive Director, ISB-CBI",
    desc: "Why hard work alone won't scale your business",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/917539c1770390993505Group_1597884391.png",
    type: "session"
  },
  {
    id: 3,
    time: "10:15 AM - 10:45 AM",
    title: "The Founder's Journey",
    speaker: "Dr. Raj P Narayanam",
    role: "Founder - Zaggle",
    desc: "An Idea to IPO",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/454996c1770391101406Rajd.png",
    type: "session"
  },
  {
    id: 4,
    time: "10:45 AM - 11:15 AM",
    title: "SCALING A CONSUMER BRAND",
    speaker: "CK Kumaravel",
    role: "Co-Founder - Naturals Salon",
    desc: "From one salon to 900+ what it really takes",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/339928c1770390597748Group_1597884390.png",
    type: "session"
  },
  {
    id: 5,
    time: "11:15 AM - 11:30 AM",
    title: "TEA BREAK",
    type: "break",
    breakIcon: "coffee"
  },
  {
    id: 6,
    time: "11:30 AM - 12:00 PM",
    title: "India’s MSME growth story",
    speaker: "Uttam Tibrewal",
    role: "Executive Director & Dy CEO",
    desc: "The AU SFB Story & Your Path to Scale",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/472068c1770391304610Group_159788w4387.png",
    type: "session"
  },
  {
    id: 7,
    time: "12:00 PM - 12:30 PM",
    title: "THE PUBLIC MARKET PATHWAY",
    speaker: "Parvathi Moorthy",
    role: "NSE Emerge",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/168128c1770391318882Group_15978a84445.png",
    desc: "Is your business ready for an SME IPO?",
    type: "session"
  },
  // {
  //   id: 8,
  //   time: "12:30 PM - 1:00 PM",
  //   title: "Panel Q&A with All Speakers",
  //   speaker: "Murali Bukkapatnam - Moderator",
  //  // role: "NSE Emerge",
  //   image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/384217c1770392081508Group_1597884445.png",
  //   desc: "The unfiltered truth bring your toughest questions",
  //   type: "session"
  // },
  {
    id: 8,
    time: "12:30 PM - 1:00 PM",
    title: "Panel Q&A with All Speakers",
    speaker: "Sanjay Enishetty",
    role: "Founder, ScaleMe Network",
    desc: "The unfiltered truth bring your toughest questions",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/728220c1771570996973sanjay_ennisetty.png",
    type: "session"
  },
  {
    id: 9,
    time: "1:00 PM - 1:15 PM",
    title: "Closing Remarks",
    speaker: "Anvesh T",
    role: "Associate Director, ISB-CBI",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/549907c1770392068830Group_1597884446.png",
    desc: "Key take aways and whats next with ScaleME X ISB CBI",
    type: "session"
  },
  {
    id: 10,
    time: "1:15 PM Onwards",
    title: "Networking Lunch",
    type: "break",
    breakIcon: "lunch"
  },
];

export default function Agenda() {

  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'agenda' | 'registration' | 'thank-you'>('home');
  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle Scroll Event for Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // // If we're on the registration page, render the Registration component
  // if (currentPage === 'registration') {
  //   return <Registration onNavigate={setCurrentPage} />;
  // }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F5F5F5]">
      {/* Header - Conditional Design Based on Scroll */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out hidden md:block
          ${isScrolled
            ? 'top-0 left-0 right-0 w-full'
            : 'top-4 left-4 right-4 md:top-6 md:left-12 md:right-12'
          }
        `}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300
            ${isScrolled
              ? 'bg-white text-[#007787] py-3 px-6 md:py-4 md:px-12 shadow-md rounded-none border-b border-gray-100'
              : 'bg-[#499CA6] text-white py-2 px-3 md:py-6 md:px-12 rounded-xl md:rounded-2xl border-2 border-white'
            }
          `}
        >
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="w-[100px] h-[20px] md:w-[195px] md:h-[38px] flex-shrink-0"
          >
            <img
              src={isScrolled
                ? "https://d2z9497xp8xb12.cloudfront.net/prod-images/789549c1770378555007logo_scrolled.png"
                : "https://d2z9497xp8xb12.cloudfront.net/prod-images/267598c1770378542334logo_notscrolled.png"
              }
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </button>

          {/* Navigation & Button */}
          <div className="flex items-center gap-4 md:gap-12">
            <nav className="flex items-center gap-3 md:gap-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const aboutSection = document.getElementById('about');
                    aboutSection?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className={`text-[20px] md:text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap
                  ${isScrolled ? 'text-[#007787] hover:text-[#1DB2AB]' : 'text-white hover:text-[#92dad7]'}
                `}
              >
                About
              </button>
              <button
                onClick={() => {navigate('/team');window.scrollTo({ top: 0, behavior: 'smooth' })}}
                className={`text-[20px] md:text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap
                  ${isScrolled ? 'text-[#007787] hover:text-[#1DB2AB]' : 'text-white hover:text-[#92dad7]'}
                `}
              >
                Team
              </button>
              {/* <button
                onClick={() => {
                  navigate('/agenda');
                  setTimeout(() => {
                    const agendaSection = document.getElementById('agenda');
                    agendaSection?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className={`text-[20px] md:text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap
                  ${isScrolled ? 'text-[#007787] hover:text-[#1DB2AB]' : 'text-white hover:text-[#92dad7]'}
                `}
              >
                Agenda
              </button> */}
            </nav>

            {/* Apply Now Button */}
            {/* <button
              onClick={() => navigate('/registration')}
              className="px-4 md:px-8 py-2 md:py-3 bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold rounded-lg uppercase transition-colors text-xs md:text-sm whitespace-nowrap"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Invite
            </button> */}
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm block md:hidden">
        <div className="flex items-center justify-between py-4 px-4 md:py-4 md:px-12">
          {/* Mobile: Hamburger Menu */}
          <button
            className="md:hidden w-6 h-6 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-[#007787]" />
          </button>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <a href="/" className="flex-shrink-0 md:mr-auto">
            <img
              src="https://d2z9497xp8xb12.cloudfront.net/prod-images/789549c1770378555007logo_scrolled.png"
              alt="Logo"
              className="h-8 md:h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-8 mr-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <button
              // href="#about"
              onClick={() => setCurrentPage('home')}
              className="text-sm font-semibold text-[#007787] hover:text-[#1DB2AB] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => setCurrentPage('team')}
              className="text-sm font-semibold text-[#007787] hover:text-[#1DB2AB] transition-colors"
            >
              Team
            </button>
            <a
              href="#agenda"
              className="text-sm font-semibold text-[#007787] hover:text-[#1DB2AB] transition-colors"
            >
              Agenda
            </a>
          </nav>

          {/* Apply Now Button */}
          {/* <button
            onClick={() => navigate('/registration')}
            className="px-4 md:px-8 py-2 md:py-3 bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold rounded-lg uppercase transition-colors text-xs md:text-sm whitespace-nowrap"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Get Invite
          </button> */}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-[64px] left-0 right-0 bg-white shadow-lg z-40 md:hidden">
          <nav className="flex flex-col py-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/');
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50 text-left"
            >
              About
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/team');
                setTimeout(() => {
                  document.getElementById('team')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }, 100);
              }}
              className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50 text-left"
            >
              Team
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/agenda');
                setTimeout(() => {
                  document.getElementById('agenda')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }, 100);
              }}
              className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50 text-left"
            >
              Agenda
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[90vh] bg-[#1DB2AB] flex items-center justify-center py-20 md:py-32"
        style={{
          backgroundImage: `url("https://d2z9497xp8xb12.cloudfront.net/prod-images/206796c1770402371875Frame_1.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center text-[#1a1a1a] px-10 max-w-5xl mx-auto mt-10">
          <h1 
            className="text-[64px] sm:text-[72px] md:text-[96px] lg:text-[120px] font-black uppercase leading-[0.95] mb-8"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.02em' }}
          >
             Summit<br />
            
            <span style={{color:'#F15A2B'}}>Agenda.</span>
          </h1>
          <p 
            className="text-[24px] md:text-[20px] lg:text-[24px] leading-relaxed max-w-3xl mx-auto font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            A complete breakdown of sessions, speakers, and timings.
          </p>
          <div className="text-center">
            {/* <button
              onClick={() => navigate('/registration')}
              className="bg-[#F15A2B] hover:bg-[#d94f24] mt-5 text-white font-bold text-lg md:text-xl uppercase px-10 md:px-10 py-4 md:py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Invite
            </button> */}
          </div>
          {/* <div className="flex m-auto gap-3 items-center font-semibold text-center w-100 mt-8">
              <div className="flex gap-2 items-center text-[50px] md:text-lg text-white lg:text-xl leading-relaxed mb-8"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: "22px" }}>
                <CalendarDays className="w-4 h-4 font-bold" strokeWidth={2.75} /> Febuary 21, 2026,
              </div>

              <div className="flex gap-1 items-center text-[50px] md:text-lg text-white lg:text-xl leading-relaxed mb-8"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: "22px" }}>
                <MapPin className="w-4 h-4 font-bold" strokeWidth={2.75} /> Hyderabad
              </div>
            </div> */}
        </div>
      </section>

      {/* Agenda Section */}
      <section 
        className="relative w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32"
        style={{
          // backgroundImage: `url(../assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundImage: `url(/assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          {/* TIMELINE CONTAINER */}
          <div className="max-w-5xl mx-auto relative">
            
            {/* The Vertical Line (Left Side) */}
            <div className="absolute left-[8px] md:left-[140px] top-4 bottom-4 w-[2px] bg-teal-200/50 hidden md:block"></div>

            <div className="space-y-8 relative">
              {agendaItems.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch"
                >
                  
                  {/* --- TIME & MARKER COLUMN --- */}
                  <div className="w-full md:w-[140px] flex md:flex-col items-center md:items-end justify-start relative flex-shrink-0 pt-2 md:pt-6">
                    
                    {/* Time Label */}
                    <span className={`text-xs md:text-sm font-bold tracking-wide mb-2 md:mb-0 md:mr-6 transition-colors duration-300
                      ${hoveredId === item.id ? 'text-[#006064]' : 'text-gray-400'}
                    `} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {item.time}
                    </span>

                    {/* Timeline Circle Marker */}
                    <div className={`
                      hidden md:block absolute right-[-5px] top-[28px] w-3 h-3 rounded-full border-2 z-10 transition-all duration-300
                      ${hoveredId === item.id 
                        ? 'bg-[#FF5722] border-[#FF5722] scale-125 shadow-[0_0_0_4px_rgba(255,87,34,0.2)]'
                        : 'bg-white border-[#006064]'
                      }
                    `}></div>
                  </div>

                  {/* --- CARD COLUMN --- */}
                  <div className="flex-1">
                    
                    {item.type === 'break' ? (
                      // === TYPE: BREAK CARD ===
                      <div 
                        className="w-full h-[120px] rounded-2xl relative overflow-hidden flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                        style={{
                          backgroundImage: `url(https://d2z9497xp8xb12.cloudfront.net/prod-images/358822c1770390744450Group_1597884406.png)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        
                        {/* Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-[#4DB6AC]/80"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-[#004D40]">
                          {item.breakIcon === 'lunch' ? (
                            <UtensilsCrossed size={36} strokeWidth={2.5} className="mb-2 opacity-90" />
                          ) : (
                            <Coffee size={36} strokeWidth={2.5} className="mb-2 opacity-90" />
                          )}
                          <span className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                            {item.title}
                          </span>
                        </div>
                      </div>

                    ) : (
                      // === TYPE: SPEAKER SESSION CARD ===
                      <div className={`
                        w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 cursor-pointer shadow-sm transition-all duration-300 border
                        ${hoveredId === item.id 
                          ? 'bg-[#006064] border-[#006064] -translate-y-1 shadow-xl'
                          : 'bg-white border-gray-100 hover:border-teal-100'
                        }
                      `}>
                        
                        {/* Left Section - Title and Speaker Details */}
                        <div className="flex-1 text-center md:text-left">
                          <h3 
                            className={`text-2xl md:text-3xl font-bold uppercase leading-none mb-4 transition-colors duration-300
                              ${hoveredId === item.id ? 'text-white' : 'text-[#006064]'}
                            `}
                            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                          >
                            {item.title}
                          </h3>

                          {/* Speaker Details */}
                          <div>
                            <p className={`font-bold text-base transition-colors duration-300 ${hoveredId === item.id ? 'text-[#4DB6AC]' : 'text-[#006064]'}`}
                              style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {item.speaker}
                            </p>
                            <p className={`text-xs uppercase tracking-wide transition-colors duration-300 ${hoveredId === item.id ? 'text-teal-100' : 'text-gray-400'}`}
                              style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {item.role}
                            </p>
                          </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className={`hidden md:block w-px h-24 transition-colors duration-300 ${hoveredId === item.id ? 'bg-white/20' : 'bg-gray-200'}`}></div>

                        {/* Center Section - Speaker Image */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.speaker}
                            className={`w-full h-full rounded-full object-cover border-4 transition-all duration-300 bg-[#1ab2aa]
                              ${hoveredId === item.id ? 'border-white/20' : 'border-teal-50'}
                            `}
                          />
                        </div>
                            
                        {/* Right Section - Description */}
                        <div className="flex-1 text-center md:text-left">
                          <p className={`text-sm leading-relaxed transition-colors duration-300 ${hoveredId === item.id ? 'text-teal-50' : 'text-gray-500'}`}
                            style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {item.desc}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
