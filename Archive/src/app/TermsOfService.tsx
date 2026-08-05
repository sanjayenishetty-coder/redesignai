import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <div
          className="space-y-8 text-[#2a2a2a] leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <p>
            Welcome to the ScaleME Summit website, operated by ScaleME. By accessing or using this Site and registering
            for our events, you agree to these Terms of Service. If you do not
            agree, please do not use the Site or our services.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            1. Use of Website and Services
          </h2>
          <p>You agree to use the Site only for lawful purposes including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Registering or applying for ScaleME Summit events</li>
            <li>Accessing event information and updates</li>
            <li>Communicating with the ScaleME team</li>
          </ul>
          <p>
            You must not misuse the Site, attempt unauthorized access, or
            interfere with its operation.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            2. Event Registration & Participation
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submitting an application does not guarantee attendance</li>
            <li>
              Participation is subject to eligibility review and confirmation by
              ScaleME
            </li>
            <li>
              We reserve the right to accept or decline any registration without
              obligation to disclose reasons
            </li>
            <li>
              Event agenda, speakers, format, and timing may change if required
            </li>
          </ul>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            3. Payments & Refunds (if applicable)
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment terms will be clearly mentioned at registration</li>
            <li>
              Refund policies will be communicated separately for each event
            </li>
            <li>Taxes may apply as per law</li>
          </ul>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            4. Intellectual Property
          </h2>
          <p>
            All content on this Site including logos, text, graphics, videos,
            designs, event materials, and presentations are the property of
            ScaleME or its partners and may not be copied, reproduced, or
            distributed without written permission.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            5. Media & Recording Consent
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Photography, video recording, and audio capture</li>
            <li>
              Use of such material for marketing, promotional, and educational
              purposes
            </li>
          </ul>
          <p>
            If you prefer not to be recorded, you may inform the event team at
            check-in.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            6. Code of Conduct
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Behave professionally and respectfully</li>
            <li>Avoid harassment, solicitation, or disruptive behavior</li>
          </ul>
          <p>
            ScaleME reserves the right to remove any participant who violates
            this standard.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            7. Limitation of Liability
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Business decisions made based on event content</li>
            <li>Losses, damages, or indirect consequences</li>
            <li>Third-party services or partner interactions</li>
          </ul>
          <p>
            All sessions are for informational purposes only and not financial,
            legal, or investment advice.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">8. Privacy</h2>
          <p>
            Your personal information is governed by our Privacy Policy,
            available on the website.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            9. Changes to Terms
          </h2>
          <p>
            We may update these Terms of Service at any time. Continued use of
            the Site constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by the laws of India. Any disputes
            shall fall under the jurisdiction of courts in Hyderabad,
            Telangana.
          </p>

          <h2 className="text-xl font-semibold uppercase text-[#F15A2B]">11. Contact</h2>
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
