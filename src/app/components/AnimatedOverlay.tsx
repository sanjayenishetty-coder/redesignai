import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { MagneticButton } from "./MagneticButton";

export function AnimatedOverlay() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const chartOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const chartY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-10">
      {/* Animated Chart Bars Overlay - positioned over the chart area */}
      <motion.div
        className="absolute left-[551px] top-[187px] w-[945px] h-[800px] pointer-events-auto"
        style={{ opacity: chartOpacity, y: chartY }}
      >
        {/* Animated vertical bars */}
        {[
          { x: 0, height: 154 },
          { x: 39, height: 185 },
          { x: 78, height: 130 },
          { x: 120, height: 202 },
          { x: 359, height: 186 },
          { x: 515, height: 270 },
          { x: 555, height: 133 },
          { x: 667, height: 176 },
          { x: 721, height: 182 },
          { x: 768, height: 147 },
        ].map((bar, index) => (
          <motion.div
            key={index}
            className="absolute bottom-0 w-[25px] bg-[#92dad7]/50 mix-blend-hard-light cursor-pointer hover:bg-[#1DB2AB]/70 transition-colors"
            style={{ left: `${bar.x}px`, height: `${bar.height}px` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1 + 2.5,
              ease: "easeOut",
            }}
            whileHover={{ 
              scaleY: 1.1, 
              transition: { duration: 0.2 },
              boxShadow: "0 0 20px rgba(29, 178, 171, 0.5)"
            }}
          />
        ))}
      </motion.div>

      {/* Floating CTA Button Overlay - Hero Section */}
      <AnimatedSection className="absolute left-[calc(50%-350px)] top-[750px] pointer-events-auto" delay={3}>
        <MagneticButton className="bg-[#1DB2AB] text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-shadow hover:bg-[#178E89]">
          Start Your Journey
        </MagneticButton>
      </AnimatedSection>

      {/* Interactive Speaker Cards Overlay - positioned over speaker section */}
      <div className="absolute left-0 top-[2450px] w-full pointer-events-auto">
        <div className="max-w-[1200px] mx-auto flex justify-center gap-6">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="w-[266px] h-[480px] rounded-[20px] cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(0,119,135,0.1) 100%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Pulsing Indicators for Key Sections */}
      <AnimatedSection className="absolute left-[calc(50%-250px)] top-[4200px]" delay={0.3}>
        <motion.div
          className="w-3 h-3 bg-[#1DB2AB] rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </AnimatedSection>

      {/* Benefit Cards Hover Effects - positioned over benefit cards */}
      <div className="absolute left-[136px] top-[5340px] w-[1168px] h-[623px] pointer-events-auto">
        <div className="grid grid-cols-3 gap-6 h-full p-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              className="rounded-[15px] cursor-pointer bg-transparent hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(29, 178, 171, 0.3)",
                transition: { duration: 0.3 },
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Stats Counter Overlay */}
      <AnimatedSection className="absolute left-[calc(50%-200px)] top-[1800px]" delay={0.5}>
        <div className="flex gap-12 pointer-events-none">
          {[
            { value: "500+", label: "Companies" },
            { value: "₹50Cr+", label: "Average Revenue" },
            { value: "10x", label: "Growth Potential" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <motion.div
                className="text-4xl font-bold text-[#1DB2AB]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-[#007787] mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Pricing Cards Interactive Overlay */}
      <div className="absolute left-[calc(50%-500px)] top-[7500px] w-[1000px] pointer-events-auto">
        <div className="grid grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-[400px] rounded-[20px] bg-transparent cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                scale: 1.08,
                y: -15,
                boxShadow: "0 20px 40px rgba(0, 119, 135, 0.3)",
                transition: { duration: 0.3 },
              }}
              style={{
                border: index === 1 ? "3px solid #1DB2AB" : "1px solid transparent",
              }}
            >
              {index === 1 && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1DB2AB] text-white px-4 py-1 rounded-full text-sm font-semibold"
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  POPULAR
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Newsletter Overlay */}
      <AnimatedSection className="absolute left-[calc(50%-250px)] top-[9800px] pointer-events-auto" delay={0.3}>
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-[20px] p-6 shadow-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-[#92dad7] bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#1DB2AB]"
            />
            <motion.button
              className="bg-[#1DB2AB] text-white px-8 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05, backgroundColor: "#178E89" }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Parallax Decorative Elements */}
      <motion.div
        className="absolute right-0 top-[3000px] w-[200px] h-[200px] rounded-full bg-[#1DB2AB]/10 blur-3xl pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0.3, 0.5], [0, 100]),
        }}
      />
      <motion.div
        className="absolute left-0 top-[6000px] w-[300px] h-[300px] rounded-full bg-[#007787]/10 blur-3xl pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0.6, 0.8], [0, -150]),
        }}
      />
    </div>
  );
}
