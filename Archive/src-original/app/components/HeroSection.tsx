import { motion } from "motion/react";
import Frame2 from "../../imports/Frame2";

export function HeroSection() {
  return (
    <motion.section
      className="relative w-full h-[837px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Figma Imported Design */}
      <Frame2 />
    </motion.section>
  );
}
