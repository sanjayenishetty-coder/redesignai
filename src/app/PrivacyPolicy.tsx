import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F5]"
    style={{paddingTop: '5rem',
          backgroundImage: `url(/assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'}}>
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

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <h1
          className="text-[48px] md:text-[64px] font-bold uppercase mb-6 text-[#1a1a1a]"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Privacy Policy
        </h1>

        <div
          className="space-y-8 text-[#2a2a2a] leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <p>
            ScaleME we respect your privacy and is committed to
            protecting the personal information you share with us through the
            ScaleME Summit website and related platforms. This Privacy Policy
            explains how we collect, use, store, and protect your information.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email address, phone number</li>
            <li>Company name, designation, and business details</li>
            <li>Revenue range and sector (for eligibility and curation)</li>
            <li>Event preferences and communication choices</li>
            <li>Any information you voluntarily provide in forms</li>
          </ul>
          <p>
            We may also collect basic website analytics such as IP address,
            browser type, and page visits for improving user experience.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process summit registrations and RSVPs</li>
            <li>Curate eligible participants and confirm attendance</li>
            <li>Share event updates, agenda, and logistics</li>
            <li>
              Send relevant ScaleME programs and opportunities (you can opt out
              anytime)
            </li>
            <li>Improve our website and event experience</li>
          </ul>
          <p>We do not sell or rent your personal data to third parties.</p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            3. Sharing of Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Event partners and speakers (when relevant for coordination)</li>
            <li>
              Service providers supporting event operations (email tools, CRM,
              analytics)
            </li>
          </ul>
          <p>
            All partners are required to maintain confidentiality and data
            protection standards.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">4. Data Security</h2>
          <p>
            We take reasonable technical and organisational measures to safeguard
            your information against unauthorized access, loss, or misuse.
            However, no online system is 100% secure.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">5. Your Choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your stored data</li>
            <li>Ask for corrections or deletion</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>
          <p>
            Email us at:{" "}
            <a
              href="mailto:sme@scaleme.in"
              className="text-[#1DB2AB] font-semibold"
            >
              sme@scaleme.in
            </a>
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">6. Cookies</h2>
          <p>
            Our website may use cookies to enhance browsing experience and track
            basic usage metrics. You may disable cookies in your browser
            settings.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            7. Third-Party Links
          </h2>
          <p>
            Our website may contain links to partner or external sites. We are
            not responsible for their privacy practices.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            8. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. The latest version
            will always be available on this page.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">9. Contact Us</h2>
          <p>
            ScaleME Summit
            <br />
            Email:{" "}
            <a
              href="mailto:sme@scaleme.in"
              className="text-[#1DB2AB] font-semibold"
            >
              sme@scaleme.in
            </a>
            <br />
            Website:{" "}
            <a
              href="https://scaleme.in"
              className="text-[#1DB2AB] font-semibold"
            >
              scaleme.in
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
