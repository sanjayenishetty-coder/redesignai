// import backgroundPattern from "figma:asset/154465906a86e9abb2111c1fddf397d04d59de3e.png";
// import stairsImage from "figma:asset/b0e052aeacd9e4d9627f35120f79f0815377128f.png";
// import profRajendraImage from "figma:asset/34e0109e40c51a1472a6c20ccd69b6d9b02318af.png";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { SpeakersAccordion } from "./components/SpeakersAccordion";
import { AgendaSection } from "./components/AgendaSection";
import { IsThisForYouSection } from "./components/IsThisForYouSection";
import { CTASection } from "./components/CTASection";
import { NewsletterSection } from "./components/NewsletterSection";
import { Footer } from "./components/Footer";
import Team from "./Team";
import Agenda from "./Agenda";
import Registration from "./Registration";
import ThankYou from "./ThankYou";
import { useState, useEffect, useRef } from 'react';
import { Target, Users, Landmark, TrendingUp, Menu, MapPin, Calendar, CalendarDays } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);
//   const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'agenda' | 'registration' | 'thank-you'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visionariesRef = useRef<HTMLHeadingElement>(null);
  const isBelow475 = window.innerWidth < 475;
  const isBelow410 = window.innerWidth < 410;

  // Scroll to top when page changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

  // Handle Scroll Event
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

  // Handle Visionaries Section Visibility with Fill Animation
  useEffect(() => {
    const handleScroll = () => {
      if (!visionariesRef.current) return;

      const element = visionariesRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // START filling when the top of the text enters the bottom of the screen
      // FINISH filling when the text is about 1/3 up the screen
      const startPoint = windowHeight * 0.9; // Triggers when element is near bottom
      const endPoint = windowHeight * 0.4;   // Finishes when element is higher up

      let progress = (startPoint - rect.top) / (startPoint - endPoint);

      // Clamp value between 0 and 100
      progress = Math.min(Math.max(progress, 0), 1) * 100;

      setFillPercentage(progress);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-screen bg-[#007787] flex flex-col"
        style={{
          backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Header - Clean white bar */}
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
                <a
                  href="#about"
                  className={`text-[20px] md:text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap
                  ${isScrolled ? 'text-[#007787] hover:text-[#1DB2AB]' : 'text-white hover:text-[#92dad7]'}
                `}
                >
                  About
                </a>
                <button
                  onClick={() => navigate('/team')}
                  className={`text-[20px] md:text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap
                  ${isScrolled ? 'text-[#007787] hover:text-[#1DB2AB]' : 'text-white hover:text-[#92dad7]'}
                `}
                >
                  Team
                </button>
                <button
                  onClick={() => navigate('/redesign-ai')}
                  className="redesign-ai-btn text-[20px] md:text-[14px] cursor-pointer whitespace-nowrap"
                >
                  Redesign AI
                </button>
                {/* <a
                //   href="#agenda"
                onClick={() => {navigate('/agenda')}}
                  className={`text-[20px] md:text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap
                  ${isScrolled ? 'text-[#007787] hover:text-[#1DB2AB]' : 'text-white hover:text-[#92dad7]'}
                `}
                >
                  Agenda
                </a> */}
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
              <a
                href="#about"
                className="text-sm font-semibold text-[#007787] hover:text-[#1DB2AB] transition-colors"
              >
                About
              </a>
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
              <button
                onClick={() => navigate('/redesign-ai')}
                className="redesign-ai-btn text-sm cursor-pointer"
              >
                Redesign AI
              </button>
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
              <a 
                href="#about" 
                className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <button
                onClick={() => {
                  navigate('/team');
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50 text-left"
              >
                Team
              </button>
              <a
                href="#agenda"
                className="px-6 py-3 text-sm font-semibold text-[#007787] hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agenda
              </a>
              <button
                onClick={() => {
                  navigate('/redesign-ai');
                  setMobileMenuOpen(false);
                }}
                className="redesign-ai-btn mx-6 my-2 text-sm text-left"
              >
                Redesign AI
              </button>
            </nav>
          </div>
        )}

        {/* Stock Chart Image - Background layer */}
        <div className="absolute inset-0 z-0 flex items-center justify-end overflow-hidden hidden lg:block"
        style={{ left: "12rem", top: '3rem' }}>
          <ImageWithFallback 
            src="https://d2z9497xp8xb12.cloudfront.net/prod-images/978405c1770371801720Stock_Herosection.png"
            alt="Stock Chart" 
            className="h-full w-auto object-contain opacity-40 md:opacity-100"
            style={{ marginLeft: "12rem", marginTop: "10rem", height: "93vh"}}
          />
        </div>

        {/* Arrow - Desktop Only */}
        <div className="absolute left-0 bottom-0 hidden lg:block z-0">
          <ImageWithFallback 
            src="https://d2z9497xp8xb12.cloudfront.net/prod-images/397170c1770371965125Arrow_Herosection.png"
            alt="Arrow" 
            className="w-auto h-auto max-h-[60vh]"
          />
        </div>

        <div className="inset-0 z-0 flex items-center justify-end overflow-hidden lg:hidden"
          style={{  }}>
          <ImageWithFallback
            src="assets/herosection_mobile.png"
            alt="Stock Chart"
            className="h-full w-auto object-contain opacity-40 md:opacity-100"
            style={{ marginTop: "6rem"}}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col pb-8 px-5 pt-0 md:pt-32 md:pb-16 md:px-12 lg:px-16 max-w-7xl mx-auto w-full"
          style={{
            paddingTop: window.innerWidth < 768 ? '0rem' : '9rem',
            gap: '0rem',
          }}>
          <div className="">
            {/* Main Headline */}
            <h1 
              className="uppercase leading-[1] md:leading-[0.95] text-white mb-6 md:mb-6 max-w-4xl" 
              style={{ fontFamily: 'Bebas Neue, sans-serif', 
                fontSize: window.innerWidth > 475 ? "80px" : "40px",
                fontWeight: "500" }}
            >
              Your ₹25 Cr – ₹100 Cr Playbook 
              {window.innerWidth > 475 && <br />}
               Won't Get You to ₹500 Cr. {window.innerWidth > 475 && <br />}
              <span className="text-[#92DAD7]">
                This Summit Will.</span>
            </h1>

            {/* Subtext */}
            <p 
              className="text-[15px] md:text-lg lg:text-xl text-white leading-relaxed max-w-lg mb-2 md:mb-2" 
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              You've worked hard to get here. But the next phase needs different thinking, on strategy, capital, and growth. This is where you learn it.
            </p>

            {/* <div className={`flex items-center font-semibold ${window.innerWidth > 475 ? 'gap-3' : 'justify-between'}`}>
              <div className="flex gap-2 items-center text-[50px] md:text-lg text-[#f07954] lg:text-xl leading-relaxed mb-8"
                style={{ fontFamily: 'Montserrat, sans-serif', 
                fontSize: window.innerWidth > 400 ? '22px' : "19px"
                 }}>
                <CalendarDays className="w-4 h-4 font-bold" strokeWidth={2.75} /> Febuary 21, 2026,
              </div>

              <div className="flex gap-1 items-center text-[50px] md:text-lg text-[#f07954] lg:text-xl leading-relaxed mb-8"
                style={{ fontFamily: 'Montserrat, sans-serif', 
                  fontSize: window.innerWidth > 400 ? '22px' : "19px"
                 }}>
                <MapPin className="w-4 h-4 font-bold" strokeWidth={2.75} /> Hyderabad
              </div>
            </div> */}
          </div>

          {/* Partner Logos Section - At Bottom */}
          <div className="flex flex-row gap-6 md:flex-row md:gap-8 mt-3">
            {/* ISB Logo */}
            <div>
              <p className="text-[10px] md:text-xs text-white/70 mb-3 uppercase mt-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                In collaboration with
              </p>
              <ImageWithFallback 
                src="assets/isb-logo.png"
                alt="ISB Logo" 
                className="h-10 w-auto"
              />
            </div>

            {/* NSE Logo */}
            <div>
              <p className="text-[10px] md:text-xs text-white/70 mb-2 uppercase mt-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SME Exchange Partner
              </p>
              <ImageWithFallback 
                src="https://d2z9497xp8xb12.cloudfront.net/prod-images/324985c1770374538687NSE_lll 1.png"
                alt="NSE Logo" 
                className="h-12 md:h-14 w-auto"
              />
            </div>
          </div>
          <div className="text-center cursor-pointer">
            {/* <button
              onClick={() => navigate('/registration')}
              className="bg-[#F15A2B] hover:bg-[#d94f24] cursor-pointer mt-5 text-white font-bold text-md md:text-xl uppercase px-10 md:px-10 py-4 md:py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Invite
            </button> */}
          </div>
        </div>
      </section>

      {/* Growth Section */}
      <section id="about" className="relative w-full bg-[#F5F5F5] py-12 md:py-20  overflow-hidden md:pt-12" 
         style={{
          backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            
            {/* Left Content */}
            <div className="space-y-5">
              {/* Main Headline */}
              <h2 
                className="text-[72px] sm:text-[34] md:text-[52] lg:text-[72] font-medium uppercase leading-[0.90] text-[#1a1a1a]" 
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                You've Built<br />Something Real.
              </h2>
              
              {/* Subheading */}
              <p 
                className="text-[20px] sm:text-[18px] md:text-[20px] font-medium uppercase text-[#F15A2B] leading-[0.90]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                But Growth Has Stalled.
              </p>

              {/* Body Content */}
              <div className="space-y-5 text-[#2a2a2a]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p className="mt-10 text-base md:text-[18px] leading-relaxed">
                  You didn't build a ₹25 Cr to ₹100 Cr company by accident. You've put in the years. You've figured out the product, the team, the customers. But somewhere along the way, growth stopped feeling inevitable.
                </p>

                <p className="text-base md:text-[18px] leading-relaxed">
                  <span className="relative inline-block">
                    <span className="relative z-10">The same hustle that got you here isn't getting you there.</span>
                    {/* <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1DB2AB] opacity-30 -z-0"></span> */}
                  </span>
                  <br />
                  You're working harder than ever, but <span className="relative inline-block">
                    <span className="relative z-10">the needle isn't moving the way it used to.</span>
                    {/* <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1DB2AB] opacity-30 -z-0"></span> */}
                  </span>
                </p>

                <p className="text-base md:text-[18px] font-semibold leading-relaxed">
                  Here's what we've learned talking to hundreds of SME operators:
                </p>

                <p className="text-base md:text-[18px] leading-relaxed">
                  The gap between ₹25 Cr and ₹500 Cr isn't about working harder. It's about unlocking four things most founders never figure out on their own.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src='/assets/b0e052aeacd9e4d9627f35120f79f0815377128f.png' 
                alt="Growth Stairs Illustration" 
                className="w-full max-w-md lg:max-w-lg h-auto"
              />
            </div>

          </div>
        </div>
      </section>


           {/* The Four Unlocks Section */}
      <section className="relative w-full bg-[#007787] py-16 md:py-24 lg:py-28 overflow-hidden"
        style={{
          backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'none'
        }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            {/* Main Heading */}
            <h2 
              className="md:text-[48px] font-medium uppercase leading-none text-white mb-1"
              style={{ fontFamily: 'Bebas Neue, sans-serif',  color: '#F28F71' }}
            >
              Scaleme Summit’26
            </h2>
            <h2 
              className="text-[64px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-medium uppercase leading-none text-white mb-6"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              The Four Unlocks
            </h2>
            
            {/* Subtext */}
            <p 
              className="text-[24px] md:text-lg uppercase text-white/90 max-w-lg mx-auto"
              style={{ fontFamily: 'Montserrat, fontweigt-medium, sans-serif' }}
            >
              What separates operators who break through from those who plateau
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
            
            {/* Card 1 - Strategic Clarity */}
            <div className="relative bg-[#F1FAF5] rounded-3xl p-6 pt-16 text-center shadow-lg">
              {/* Icon Circle - Positioned to overlap top edge */}
              <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/481844c1770382681864Group_1597884441.png"
                  alt="strategy"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1DB2AB] rounded-full flex items-center justify-center"
                  style={{top: window.innerWidth < 475 ? '-1rem' : undefined}}
                />
              
              {/* Title */}
              <h3 
                className="text-[40px] font-medium text-[#000024] mb-4 uppercase"
                style={{ fontFamily: 'Bebas Neue, sans-serif',  }}
              >
                Strategic Clarity
              </h3>
              
              {/* Description */}
              <p 
                className="text-sm text-[#000024] leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Knowing whether your current playbook can actually 10x your business, or if you're optimising a dead end.
              </p>
            </div>

            {/* Card 2 - Founder Evolution */}
            <div className="relative bg-[#F1FAF5] rounded-3xl p-6 pt-16 text-center shadow-lg">
              {/* Icon Circle */}
              <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/859071c1770382838459Group_1597884442.png"
                  alt="Founder Evolution"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1DB2AB] rounded-full flex items-center justify-center"
                  style={{top: window.innerWidth < 475 ? '-1rem' : undefined}}
                />
              
              {/* Title */}
              <h3 
                className="text-[40px] font-medium text-[#000024] mb-4 uppercase"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                Founder Evolution
              </h3>
              
              {/* Description */}
              <p 
                className="text-sm text-[#000024] leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                The personal shifts, in delegation, hiring, and identity, that let you go from operator to leader.
              </p>
            </div>

            {/* Card 3 - Capital Architecture */}
            <div className="relative bg-[#F1FAF5] rounded-3xl p-6 pt-16 text-center shadow-lg">
              {/* Icon Circle */}
             <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/653053c1770382870741Group_1597884443.png"
                  alt="Capital Architecture"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1DB2AB] rounded-full flex items-center justify-center"
                  style={{top: window.innerWidth < 475 ? '-1rem' : undefined}}
                />
              
              {/* Title */}
              <h3 
                className="text-[40px] font-medium text-[#000024] mb-4 uppercase"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                Capital Architecture
              </h3>
              
              {/* Description */}
              <p 
                className="text-sm text-[#000024] leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Understanding how to structure debt, equity, and working capital so money fuels your growth instead of choking it.
              </p>
            </div>

            {/* Card 4 - Public Market Pathway */}
            <div className="relative bg-[#F1FAF5] rounded-3xl p-6 pt-16 text-center shadow-lg">
              {/* Icon Circle */}
             <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/424673c1770382900808Group_1597884444.png"
                  alt="Public Market Pathway"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1DB2AB] rounded-full flex items-center justify-center"
                  style={{top: window.innerWidth < 475 ? '-1rem' : undefined}}
                />
              
              {/* Title */}
              <h3 
                className="text-[40px] font-medium text-[#000024] mb-4 uppercase"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                Public Market Pathway
              </h3>
              
              {/* Description */}
              <p 
                className="text-sm text-[#000024] leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Knowing if listing is right for you, and what it takes to get there before you need to.
              </p>
            </div>

          </div>
        </div>
      </section>
  
      {/* Five leaders four hours no fluff */}
      <section className="relative w-full bg-[#F5F5F5] py-12 md:py-20 lg:py-24 overflow-hidden" 
         style={{
         // backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'none'
        }}>
        <div className="max-w-7xl mx-auto px-2 md:px-2 lg:px-2">
          
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end mb-12 md:mb-16 flex flex-col justify-end h-full">
            {/* Heading */}
            <h2 
              //ref={visionariesRef}
              className="text-[76px] sm:text-[56px] md:text-[64px] lg:text-[80px] font-medium uppercase leading-[0.90]"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
             FIVE LEADERS. <br/> 
              FOUR HOURS.<br/>
              <span style={{color:'#F15A2B'}}>NO FLUFF.</span>
            </h2>
          
            {/* Subtext */}
            <p 
              className="text-base md:text-[20px] text-[#2a2a2a] leading-relaxed md:pt-4 uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Every speaker has crossed the bridge you're trying to cross and they're not here to inspire you. <span className = "font-medium"> They're here to show you how.</span>
            </p>
          </div>

          {/* Cards Grid */}
          <SpeakersAccordion />
        </div>
      </section>

 {/* Built by Operators - Testimonial Section */}
      <section 
        className="relative w-full bg-[#F5F5F5] py-12 md:py-20 lg:py-24 overflow-hidden"
        style={{
          backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Section Title */}
          <h2 
            className="text-[48px] sm:text-[56px] text-left md:text-[64px] lg:text-[80px] font-medium uppercase leading-[0.95] text-center text-[#007787] mb-12 md:mb-16"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Built by Operators. Backed by Institutions.<br />
            Trusted by India Growth Leaders
          </h2>

         {/* CARD CONTAINER */}
<div className="max-w-6xl mx-auto bg-[#92DAD7] rounded-[40px] flex flex-col md:flex-row items-stretch overflow-hidden shadow-xl relative">
  
  {/* --- LEFT: IMAGE SECTION --- */}
  <div className="w-full md:w-[35%] h-[400px] md:h-auto relative">
    <img 
      src="assets/sanjay_ennisetty.png"
      alt="Sanjay Enishetty"
      // UPDATED CLASSES:
      // 1. Removed 'md:absolute', 'md:-translate-y-12', 'md:scale-125' (which pushed it out)
      // 2. Added 'h-full w-full' to force it to fill the left box
      // 3. Kept 'object-cover object-bottom' so it aligns correctly at the bottom
      className="w-full h-full object-cover object-bottom"
    />
  </div>

            {/* --- RIGHT: CONTENT SECTION --- */}
            <div className="w-full md:w-[65%] p-6 md:p-12 lg:p-16 flex flex-col justify-center">
              
              {/* 1. White Quote Box */}
              <div
                className="bg-white rounded-3xl p-18 md:p-10 shadow-sm relative mb-12 md:px-12"
                style={{
                  position: isBelow475 ? 'absolute' : undefined,
                  width: isBelow475 ? '100%' : undefined,
                  left: isBelow475 ? '0' : undefined,

                  padding: isBelow410
                    ? '42px 2rem 1.2rem'
                    : isBelow475
                      ? '44px 2rem'
                      : undefined,

                  bottom: isBelow410
                    ? '15.25rem'
                    : isBelow475
                      ? '13rem'
                      : undefined,

                  gap: '0rem',
                }}
              >

                
                  <div className="absolute top-0 left-2 text-[#FF5722] text-7xl md:text-8xl font-serif leading-none opacity-90 select-none pointer-events-none transform translate-y-4">
                  "
                </div>
                <p 
                  className="text-lg md:text-xl lg:text-2xl font-medium text-[#1a1a1a] leading-relaxed relative z-10" 
                 
                  
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  
                >
                  I've lived the ₹50-100+ Crore struggle. ScaleMe exists because I wish this forum existed when I was an operator
                </p>
                
                {/* The Orange Quote Mark Icon */}
                <div className="absolute bottom-0 right-4 text-[#FF5722] text-7xl md:text-8xl font-serif leading-none opacity-90 select-none pointer-events-none transform translate-y-4">
                  "
                </div>
              </div>

              {/* 2. Founder Details */}
              <div className="space-y-4 pl-2">
                <div>
                  <h3 
                    className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#004D40] mb-2" 
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Founded By: <br/> <span className="text-[#e23600]">Sanjay Enishetty</span>
                  </h3>
                  <p 
                    className="text-sm md:text-base font-medium text-[#00695C] mt-1"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Former-CEO, Naturals (India's Largest Retail Salon Chain)
                  </p>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 mt-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {[
                    "Navigated SME growth challenges firsthand",
                    "Ecosystem Builder & Founder Advocate",
                    "20 years in Startups & SME Ecosystem"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#004D40] font-medium text-sm md:text-base">
                      {/* Custom Teal Dot Icon */}
                      <div className="w-3 h-3 rounded-full bg-[#00897B] flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>
      

      {/* Divider */}
      <div className="w-full bg-[#F5F5F5]" style={{
          backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <hr className="border-0 h-[2px] bg-[#007787]" />
        </div>
      </div>

      {/* Backed by Visionaries Section */}
      <section className="relative w-full bg-[#F5F5F5] py-12 md:py-20 lg:py-24 overflow-hidden" 
         style={{
          backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end mb-12 md:mb-16">
            {/* Heading */}
            <h2 
              ref={visionariesRef}
              className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-medium uppercase leading-[0.90]"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              <span className="relative block">
                {/* 1. The "Ghost" Text (Background - Light Gray) */}
                <span className="text-[#C4C4C4] block">
                  Backed by visionaries<br />& Institutions
                </span>

                {/* 2. The "Fill" Text (Foreground - Teal Color) */}
                <span 
                  className="absolute top-0 left-0 text-[#007787] block pointer-events-none"
                  style={{ 
                    clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                  }}
                >
                  Backed by visionaries<br />& Institutions
                </span>
              </span>
            </h2>
            
            {/* Subtext */}
            <p 
              className="text-base md:text-[17px] text-[#2a2a2a] leading-relaxed md:pt-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Curated guidance from operators who have built & scaled large institutions and shaped India's entrepreneurial ecosystem.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 - Prof Rajendra Srivastava */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Image Section with Pattern Background */}
              <div className="relative h-100 bg-[#1DB2AB] overflow-hidden"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                }}>
                <img 
                  src='assets/34e0109e40c51a1472a6c20ccd69b6d9b02318af.png'
                  alt="Prof. Rajendra Srivastava"
                  className="w-full h-full object-fill"
                />
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <h3 
                  className="text-lg font-bold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  PROF. RAJENDRA<br />SRIVASTAVA
                </h3>
                <p 
                  className="text-sm font-regular text-[#1DB2AB] mb-3"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Executive Director - ISB-CBI
                </p>
                <p 
                  className="mt-8 text-sm text-[#2a2a2a] leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  A thought leader in Business Innovation and Organisational Transformation with over 25,000 Google Citations, making me the most cited marketing scholar based in India.
                </p>
              </div>
            </div>

            {/* Card 2 - Raj Narayanam */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-100 bg-[#1DB2AB] overflow-hidden"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                }}>
                <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/866321c1770381154110Raj.png"
                  alt="Raj Narayanam"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-6">
                <h3 
                  className="text-lg font-bold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Dr. RAJ P<br />NARAYANAM
                </h3>
                <p 
                  className="text-sm font-regular text-[#1DB2AB] mb-3"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Founder - Zaggle
                </p>
                <p 
                  className="mt-8 text-sm text-[#2a2a2a] leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Built and scaled Zaggle (IPO 2023) and eYantra. Invested in 47+ startups with focus on scalable, tech-driven businesses.
                </p>
              </div>
            </div>

            {/* Card 3 - Murali Bukkapatnam */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-100 bg-[#1DB2AB] overflow-hidden"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                }}>
                <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/563887c1770381239792Murali.png"
                  alt="Murali Bukkapatnam"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-6">
                <h3 
                  className="text-lg font-bold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  MURALI<br />BUKKAPATNAM
                </h3>
                <p 
                  className="text-sm font-regular text-[#1DB2AB] mb-3"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Former- Chairman, TiE Global
                </p>
                <p 
                  className="mt-8 text-sm text-[#2a2a2a] leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Worked closely with global chapters to scale TiE's impact and support founders at every stage of their journey.
                </p>
              </div>
            </div>

            {/* Card 4 - Mahankali Srinivas Rao */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-100 bg-[#1DB2AB] overflow-hidden"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                }}>
                <img 
                  src="https://d2z9497xp8xb12.cloudfront.net/prod-images/649443c1770381257784MSR.png"
                  alt="Mahankali Srinivas Rao"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-6">
                <h3 
                  className="text-lg font-bold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  MAHANKALI<br />SRINIVAS RAO
                </h3>
                <p 
                  className="text-sm font-regular text-[#1DB2AB] mb-3"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Former CEO , T-HUB
                </p>
                <p 
                  className="mt-8 text-sm text-[#2a2a2a] leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  An entrepreneur, and ecosystem builder. Former CEO of G.A.M.E and T-Hub. Currently, Adjunct Professor at IIM Raipur and ASCI.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Summit Date and Location Section */}
      <section className="relative w-full bg-gradient-to-br from-[#007787] to-[#1DB2AB] py-16 md:py-20 overflow-hidden"
      style={{display: 'none'}}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(/asset/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

          {/* Main Heading */}
          <h2
            className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-medium uppercase leading-none text-center text-white mb-12 md:mb-16"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Summit Date
          </h2>

          {/* Date and Location Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">

            {/* Date Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Calendar Icon */}
                <div className="w-20 h-20 bg-[#F15A2B] rounded-full flex items-center justify-center mb-2">
                  <Calendar className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                {/* Label */}
                <p
                  className="text-sm font-semibold uppercase tracking-wider text-[#007787]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Event Date
                </p>

                {/* Date */}
                <h3
                  className="text-[40px] md:text-[48px] font-medium uppercase leading-none text-[#1a1a1a]"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Febuary 21, 2026
                </h3>

                {/* Time */}
                <p
                  className="text-lg md:text-xl font-medium text-[#2a2a2a]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  9:00 AM - 1:00 PM IST
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Map Pin Icon */}
                <div className="w-20 h-20 bg-[#1DB2AB] rounded-full flex items-center justify-center mb-2">
                  <MapPin className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                {/* Label */}
                <p
                  className="text-sm font-semibold uppercase tracking-wider text-[#007787]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Venue
                </p>

                {/* Location */}
                <h3
                  className="text-[28px] md:text-[32px] font-medium uppercase leading-tight text-[#1a1a1a]"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  ISB Hyderabad
                </h3>
                {/* Address */}
                <p
                  className="text-base md:text-lg font-medium text-[#2a2a2a] leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Indian School of Business<br />
                  Gachibowli, Hyderabad
                </p>
              </div>
            </div>
          </div>

          <div className="text-center cursor-pointer">
            <button
              onClick={() => navigate('/registration')}
              className="bg-[#F15A2B] hover:bg-[#d94f24] cursor-pointer mt-5 text-white font-bold text-lg md:text-xl uppercase px-10 md:px-10 py-4 md:py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Invite
            </button>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <AgendaSection />

      {/* Is This For You Section */}
      <IsThisForYouSection />
           
      {/* CTA Section */}
      <CTASection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer Section */}
      <Footer />
    </div>

  );
}