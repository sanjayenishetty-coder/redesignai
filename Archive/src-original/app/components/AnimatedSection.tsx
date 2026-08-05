import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionVariants[direction],
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : directionVariants[direction].y || 0,
        x: isInView ? 0 : directionVariants[direction].x || 0,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 1.02, 0.73, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
