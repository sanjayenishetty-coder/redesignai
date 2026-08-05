import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky header after scrolling past the hero section
      setIsScrolled(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-[#007787] shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-[1440px] mx-auto px-16 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-white font-bold text-[28px] tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-normal">S</span>
            <span className="text-[#92dad7]">{"{"}</span>
            <span className="font-normal">cale</span>
            <span className="text-[#92dad7]">{"}"}</span>
            <span className="font-bold">ME</span>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center gap-12">
            {["About", "Team", "Agenda"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white text-[20px] font-bold font-['Montserrat'] hover:text-[#92dad7] transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
      </div>

      {/* Border line at bottom */}
      <div className="h-[1px] bg-white/20" />
    </motion.header>
  );
}
