// import ctaBackground from 'figma:asset/272a0699ca5ee87c379e3f95ae28d648197968eb.png';

import { useNavigate } from "react-router";

export const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section 
      className="relative w-full py-24 md:py-32 lg:py-40 px-4 md:px-8 overflow-hidden"
      style={{
        backgroundImage: `url("https://d2z9497xp8xb12.cloudfront.net/prod-images/991303c1770400376733Group_1597884421.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-[#1a1f3a]/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-tight mb-6"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          Ready To Unlock The<br />Next Phase?
        </h2>

        {/* Description */}
        <p 
          className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          250 Operators, Founders and CXOs. Curated applications. If you're running a ₹25 Cr – ₹100 Cr business and serious about scale, this is your room.
        </p>

        {/* CTA Button */}
        <button 
        onClick={() => navigate('/registration')}
          className="bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold text-lg md:text-xl uppercase px-10 md:px-14 py-4 md:py-5 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Get Invite
        </button>
      </div>
    </section>
  );
};
