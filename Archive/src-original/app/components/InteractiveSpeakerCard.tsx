import { motion } from "motion/react";
import { useState } from "react";

interface SpeakerCardProps {
  name: string;
  title: string;
  description: string;
  image: string;
  delay?: number;
  index: number;
}

export function InteractiveSpeakerCard({
  name,
  title,
  description,
  image,
  delay = 0,
  index,
}: SpeakerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-[#1DB2AB]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#007787] to-[#1DB2AB] rounded-[20px] p-6 flex flex-col justify-center items-center text-white shadow-xl backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="font-bold text-xl mb-2 text-center">{name}</h3>
          <p className="text-sm opacity-90 mb-4 text-center">{title}</p>
          <p className="text-xs text-center leading-relaxed">{description}</p>
          <motion.button
            className="mt-6 bg-white text-[#007787] px-6 py-2 rounded-full font-semibold text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
