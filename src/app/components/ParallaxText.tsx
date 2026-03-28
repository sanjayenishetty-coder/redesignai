import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

interface ParallaxTextProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxText({ children, speed = 0.5, className = "" }: ParallaxTextProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
