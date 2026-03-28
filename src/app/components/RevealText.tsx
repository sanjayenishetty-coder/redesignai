import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {typeof children === "string" ? (
        <span className="inline-block">
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + index * 0.05,
                ease: [0.21, 1.02, 0.73, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
