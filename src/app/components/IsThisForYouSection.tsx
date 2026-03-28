import { Check, X } from 'lucide-react';
// import backgroundPattern from "figma:asset/154465906a86e9abb2111c1fddf397d04d59de3e.png";

export const IsThisForYouSection = () => {
  const forYouItems = [
    "You're a Founder, CEO, or CXO of a company between ₹25 Cr and ₹100 Cr revenue",
    "You've built something real, but growth has slowed or plateaued",
    "You're serious about scaling, not just networking",
    "You want honest conversations, not polished keynotes",
    "You're ready to rethink your strategy, capital, and leadership approach"
  ];

  const notForYouItems = [
    "You're looking for a typical conference with exhibitors and swag bags",
    "You're at the idea stage or pre-revenue",
    "You want motivation, not actionable frameworks",
    "You're not willing to invest a morning in your own growth"
  ];

  return (
    <section className="w-full bg-[#ffffff] py-16 md:py-20 lg:py-24 px-4 md:px-8"    
      style={{
          backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      <div className="max-w-6xl mx-auto"
        >
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-[#007787] mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Is This For You?
          </h2>
          <p 
            className="text-base md:text-lg text-gray-700 font-medium tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            THIS SUMMIT IS DESIGNED FOR A SPECIFIC KIND OF OPERATOR.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left Card - This is for you if */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 
              className="text-3xl md:text-4xl font-bold uppercase text-[#007787] mb-6"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              This Is For You If:
            </h3>
            
            <ul className="space-y-4">
              {forYouItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check 
                    className="w-5 h-5 text-[#007787] flex-shrink-0 mt-0.5" 
                    strokeWidth={2.5}
                  />
                  <span 
                    className="text-sm md:text-base text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card - This is NOT for you if */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 
              className="text-3xl md:text-4xl font-bold uppercase text-[#007787] mb-6"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              This Is Not For You If:
            </h3>
            
            <ul className="space-y-4">
              {notForYouItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X 
                    className="w-5 h-5 text-[#007787] flex-shrink-0 mt-0.5" 
                    strokeWidth={2.5}
                  />
                  <span 
                    className="text-sm md:text-base text-gray-700 leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
