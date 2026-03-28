// import backgroundPattern from "figma:asset/154465906a86e9abb2111c1fddf397d04d59de3e.png";
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


export default function ThankYou() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'agenda' | 'registration' | 'thank-you'>('home');
  const [isScrolled, setIsScrolled] = useState(false);

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
  return (
    <div
      className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#1DB2AB] rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className="text-[48px] md:text-[64px] uppercase leading-[0.95] text-[#007787] mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Thank You!
          </h1>

          {/* Subheading */}
          <h2
            className="text-xl md:text-2xl font-semibold text-[#2a2a2a] mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Your Registration Has Been Submitted
          </h2>

          {/* Description */}
          <p
            className="text-base md:text-lg text-[#6B7280] leading-relaxed mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            We've received your application for ScaleME Summit '26. Our team will review your registration and get back to you shortly with the next steps.
          </p>

          {/* Info Box */}
          <div className="bg-[#F1FAF5] border border-[#1DB2AB]/30 rounded-xl p-6 mb-8">
            <p
              className="text-sm md:text-base text-[#2a2a2a] leading-relaxed"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <span className="font-semibold">What's Next?</span><br />
              Our team will verify your details and send you a confirmation email within 2-3 business days. Please check your inbox (and spam folder) for updates.
            </p>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full md:w-auto px-8 py-4 bg-[#F15A2B] text-white rounded-lg hover:bg-[#d94f24] transition-colors font-bold uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
