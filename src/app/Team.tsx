// import backgroundPattern from "figma:asset/154465906a86e9abb2111c1fddf397d04d59de3e.png";
// import profRajendraImage from "figma:asset/34e0109e40c51a1472a6c20ccd69b6d9b02318af.png";
// import heroBackground from "figma:asset/e344e9cba4388c5abadaffaf97c520c79753a04c.png";
// import teamImage from "figma:asset/55e59a0653fe044411452a417babe837b05abb71.png";
import { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import Registration from './Registration';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Team() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'agenda' | 'registration' | 'thank-you'>('home');
  // Scroll to top when page changes
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  // Handle Scroll Event for Header
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
  // If we're on the registration page, render the Registration component
  // if (currentPage === 'registration') {
  //   return <Registration onNavigate={setCurrentPage} />;
  // }

  const teamMembers = [
    {
       name: "Anvesh T",
      role: "Associate Director ISB-CBI",
      image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/974480c1770404131251anvesh_t.png",
     // description: "Built and scaled Zaggle (IPO 2023) and eYantra. Invested in 47+ startups with focus on scalable, tech-driven businesses."
    },
    {
      name: "Anirudh Pandey",
      role: "Research Manager",
      image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/290736c1770403821625Group_1597884447.png",
     // description: "Built and scaled Zaggle (IPO 2023) and eYantra. Invested in 47+ startups with focus on scalable, tech-driven businesses."
    },
    {
      name: "Jaya Parimi",
      role: "Ex-GCC Leader",
      image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/984042c1770403835513Group_1597884448.png",
      //description: "Worked closely with global chapters to scale TiE's impact and support founders at every stage of their journey."
    },
    {
      name: "Naren Datta Raparthi",
      role: "Founder - Xello",
      image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/945493c1770404042346Frame_3.png",
      //description: "An entrepreneur, and ecosystem builder. Former CEO of G.A.M.E and T-Hub. Currently, Adjunct Professor at IIM Raipur and ASCI."
    },
     {
      name: "Ahad Bushra Amtul",
      role: "Founders Office and Community Lead",
      image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/746505c1770403860311Group_1597884450.png",
     // description: "An entrepreneur, and ecosystem builder. Former CEO of G.A.M.E and T-Hub. Currently, Adjunct Professor at IIM Raipur and ASCI."
    },
     {
      name: "Chethan Pasupuleti",
      role: "AI Tech Advisor",
      image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/324317c1770403979470Frame_4.png",
     // description: "An entrepreneur, and ecosystem builder. Former CEO of G.A.M.E and T-Hub. Currently, Adjunct Professor at IIM Raipur and ASCI."
    }
  ];

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
                // onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}
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
            <button
              onClick={() => navigate('/registration')}
              className="px-4 md:px-8 py-2 md:py-3 bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold rounded-lg uppercase transition-colors text-xs md:text-sm whitespace-nowrap"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Invite
            </button>
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
              onClick={() => navigate('/')}
              className="text-sm font-semibold text-[#007787] hover:text-[#1DB2AB] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate('/team')}
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
          <button
            onClick={() => navigate('/registration')}
            className="px-4 md:px-8 py-2 md:py-3 bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold rounded-lg uppercase transition-colors text-xs md:text-sm whitespace-nowrap"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
           Get Invite
          </button>
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
                navigate('/team');
                setMobileMenuOpen(false);
              }}
              className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50 text-left"
            >
              Team
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/');
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
        <div className="text-center text-[#1a1a1a] px-6 max-w-5xl mx-auto">
          <p 
            className="text-sm md:text-base font-medium uppercase mb-4 tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Meet The Team
          </p>
          <h1 
            className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-black uppercase leading-[0.95] mb-8"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.02em' }}
          >
            The Minds Behind<br />ScaleMe Summit
          </h1>
          <p 
            className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            A diverse team of entrepreneurs, academics, and industry leaders united by a singular mission: accelerating India's SME growth story.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="relative w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32"
        style={{
          backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        
        >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Section Intro - Hidden, just showing the image */}
          <div className="text-center mb-0">
            {/* Team Grid Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => {
                // Alternate between solid teal and diagonal arrow pattern
                const hasPattern = index % 2 === 1;
                
                return (
                  <div 
                    key={index}
                    className="bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image Section with Alternating Backgrounds */}
                    <div 
                      className="relative w-full aspect-[3/4] overflow-hidden"
                     
                    >
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                       // style={{ mixBlendMode: 'luminosity' }}
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 bg-[#F5F5F5]">
                      <h3 
                        className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3 leading-tight uppercase"
                        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                      >
                        {member.name}
                      </h3>
                      <p 
                        className="text-base text-[#1DB2AB] font-semibold "
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-[#F5F5F5] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h3 
            className="text-[40px] md:text-[56px] font-bold uppercase text-[#1a1a1a] mb-12"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Our Partners
          </h3>
          
          {/* Partner Logos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[10px] md:gap-[50px] items-center justify-items-center">
            <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
              <img 
                src="https://d2z9497xp8xb12.cloudfront.net/prod-images/139962c1770404478921Group.png"
                alt="Partner Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center ">
              <img 
                src="https://d2z9497xp8xb12.cloudfront.net/prod-images/333253c1770404555933Group_1171275221.png"
                alt="Partner Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center ">
              <img 
                src="https://d2z9497xp8xb12.cloudfront.net/prod-images/278148c1770404577594image_1923.png"
                alt="Partner Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center ">
              <img 
                src="assets/arawinz_soft.png"
                alt="Partner Logo"
                className="w-full h-full object-contain"
              />
            </div>
        
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}