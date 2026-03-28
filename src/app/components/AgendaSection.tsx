import { useState } from 'react';
import { Coffee, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router';
// import teaBreakBg from "figma:asset/0f492e9e6d17a0e352d63e3254097ec3ff08bd94.png";

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
    speaker: "Dr. P Raj Narayanan",
    role: "Founder - Zaggle",
    desc: "Decisions that made the difference on the path to ₹500 Cr",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/454996c1770391101406Rajd.png",
    type: "session"
  },
  
  {
    id: 4,
    time: "10:15 AM - 11:00 AM",
    title: "SCALING A CONSUMER BRAND",
    speaker: "CK Kumaravel",
    role: "Co-Founder - Naturals Salon",
    desc: "From one salon to 900+ what it really takes",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/339928c1770390597748Group_1597884390.png",
    type: "session"
  },
  {
    id: 5,
    time: "11:00 AM - 11:30 AM",
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
  //   time: "12:30 PM - 1:15 PM",
  //   title: "Panel Q&A with All Speakers",
  //   speaker: "Murali Bukkapatnam - Moderator",
  //   //role: "NSE Emerge",
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
    time: "1:25 PM - 1:30 PM",
    title: "Closing Remarks",
    speaker: "Anvesh T",
    role: "Associate Director, ISB-CBI",
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/549907c1770392068830Group_1597884446.png",
    desc: "Key takeaways and what's next with ScaleMe",
    type: "session"
  },
 {
    id: 10,
    time: "1:00 PM Onwards",
    title: "Networking Lunch",
    type: "break",
    breakIcon: "lunch"
  },
];

interface AgendaSectionProps {
  onNavigate?: (page: 'home' | 'team' | 'agenda') => void;
}

export const AgendaSection = ({ onNavigate }: AgendaSectionProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Show only items up to and including Tea Break (first 5 items)
  const previewItems = agendaItems.slice(0, 5);

  return (
    <section id="agenda" className="w-full bg-[#f5f5f5] py-16 md:py-20 lg:py-24 px-4 md:px-12 font-sans"
    style={{display: 'none'}}>
      
      {/* SECTION TITLE */}
      <div className="max-w-5xl mx-auto mb-12 md:mb-16 text-center">
        <h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-[#006064]"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          Summit Agenda
        </h2>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="max-w-5xl mx-auto relative">
        
        {/* The Vertical Line (Left Side) */}
        <div className="absolute left-[8px] md:left-[140px] top-4 bottom-4 w-[2px] bg-teal-200/50 hidden md:block"></div>

        <div className="space-y-8 relative">
          {previewItems.map((item) => (
            <div 
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch"
            >
              
              {/* --- TIME & MARKER COLUMN --- */}
              <div className="w-full md:w-[140px] flex md:flex-col items-center md:items-end justify-center md:justify-start relative flex-shrink-0 pt-2 md:pt-6">
                
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

                    {/* Vertical Divider */}
                    {/* <div className={`hidden md:block w-px h-24 transition-colors duration-300 ${hoveredId === item.id ? 'bg-white/20' : 'bg-gray-200'}`}></div> */}
                        
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

      {/* View More Button */}
      {/* {onNavigate && ( */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <button
            onClick={() => navigate('/agenda')}
            className="px-10 py-4 bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold rounded-lg uppercase transition-colors text-lg shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            View More
          </button>
        </div>
      {/* )} */}
    </section>
  );
};