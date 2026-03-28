import { useState } from 'react';
// import profRajendraImage from "figma:asset/34e0109e40c51a1472a6c20ccd69b6d9b02318af.png";

const speakers = [
 {
  id: 1,
  name: "Prof. Rajendra Srivastava",
  role: "Executive Director ISB-CBI",
  topic: "Accelerating Growth",
  // Use backticks ` ` to allow multi-line text
  desc: `Most SMEs hit a ceiling not because they lack effort, but because they are scaling the wrong thing.

Prof. Rajendra has spent decades studying what separates companies that break through from those that stay stuck.`,
  image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/796112c1770385567943Group_1597884372.png",
},
  {
    id: 2,
    name: "Dr. Raj P Narayanam",
    role: "Founder - Zaggle",
    topic: "An Idea to IPO",
     desc: `From bootstrapped beginnings to a publicly listed fintech,Raj built Zaggle into one of India's leading spend management platforms.

He'll share the pivotal moments, the bets that paid off, and the lessons he wishes someone had told him earlier.`,
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/345303c1770386491733Group_1597884375.png",
  },
  {
    id: 3,
    name: "CK Kumaravel",
    role: "Co-Founder - Naturals Salon",
    topic: "Scaling a Consumer Brand",
    desc: `CKK built one of India's largest salon chains from scratch, across two decades, multiple economic cycles, and relentless competition.

He'll share how he navigated expansion, talent, and staying relevant and the mistakes that nearly derailed it all.`,
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/269669c1770385552129Group_1597884374.png",
  },
  {
    id: 4,
    name: "Uttam Tibrewal",
    role: "Executive Director & Dy CEO",
    topic: "The AU SFB Story & Your Path to Scale",
    desc: `India’s MSME growth story`,
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/438691c1770385589860Uttam_Tibrewal 3.png",
  },
  {
    id: 5,
    name: "Parvathi Moorthy",
    role: "AVP Head - SME Listing",
    topic: "Public Market Pathway",
    desc: `Most SME founders think IPO is for "later." But the companies that prepare early are the ones that get there.

Parvathi will demystify the SME listing process what it takes, what changes, and why it might be closer than you think.`,
    image: "https://d2z9497xp8xb12.cloudfront.net/prod-images/538750c1770386586904Group_1597884373.png",
  },
];

export const SpeakersAccordion = () => {
  const [activeId, setActiveId] = useState<number | null>(null); // // CHANGED: Initial state to 'null' so they start closed (optional, can keep 3 if you prefer)

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 md:gap-2 md:h-[600px]" onMouseLeave={() => setActiveId(null)}>
    
      {speakers.map((speaker, index) => {
        // Mobile: first card active by default, Desktop: only active on hover
        const isActiveMobile = activeId === speaker.id || (activeId === null && index === 0);
        const isActiveDesktop = activeId === speaker.id;
        
        return (
          <div
            key={speaker.id}
            onMouseEnter={() => setActiveId(speaker.id)}
            onClick={() => setActiveId(activeId === speaker.id ? speaker.id : speaker.id)}
            className={`
              relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-in-out
              ${isActiveDesktop ? 'md:flex-[1.4]' : 'md:flex-[1]'}
              h-[580px] md:h-full w-full
            `}
          >
            {/* Background Image - Full on mobile, responsive on desktop */}
            <img 
              src={speaker.image} 
              alt={speaker.name}
              className={`
                absolute inset-0 w-full h-full transition-all duration-700
                object-contain object-bottom
                md:object-cover ${isActiveDesktop ? '' : 'object-fit'}
              `}
              // style={isActiveDesktop ? {} : { objectFit: 'cover' }, window.innde}
            />

            {/* TOP LEFT CARD (Teal) - Name & Role */}
            <div 
              className={`
                absolute top-0 left-0 bg-[#1DB2AB] p-4 md:p-6 shadow-xl rounded-lg rounded-tl-xl
                transform transition-all duration-500 delay-100 ease-out
                max-w-[240px] md:max-w-[280px]
                ${isActiveMobile ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                md:opacity-0 md:-translate-y-4 md:pointer-events-none
                ${isActiveDesktop ? 'md:opacity-100 md:translate-y-0 md:pointer-events-auto' : ''}
              `}
            >
              <h3 
                className="text-xl md:text-2xl lg:text-3xl text-white font-bold uppercase leading-none mb-1 md:mb-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {speaker.name}
              </h3>
              <p className="text-white/90 text-[10px] md:text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {speaker.role}
              </p>
            </div>

            {/* BOTTOM CARD (Orange) - Topic & Desc */}
            <div 
              className={`
                absolute bottom-0 left-0 right-0 bg-[#F15A2B] p-5 md:p-6 shadow-xl rounded-lg rounded-bl-xl rounded-br-xl
                transform transition-all duration-500 delay-200 ease-out
                md:right-0 md:left-auto md:max-w-[320px] w-[320px]
                ${isActiveMobile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                md:opacity-0 md:translate-y-4 md:pointer-events-none
                ${isActiveDesktop ? 'md:opacity-100 md:translate-y-0 md:pointer-events-auto' : ''}
              `}
            >
              <div className="text-white">
                <h4 className="text-[10px] md:text-xs font-bold opacity-90 uppercase mb-1 md:mb-2 tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Expertise
                </h4>
                <p className="text-lg md:text-xl font-bold leading-tight mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {speaker.topic}
                </p>
                <p className="text-xs md:text-sm opacity-90 leading-relaxed font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {speaker.desc}
                </p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};