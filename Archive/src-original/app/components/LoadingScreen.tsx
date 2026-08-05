import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#007787] to-[#1DB2AB] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="text-white text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              LOGO
            </motion.div>

            {/* Animated Loading Bars */}
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 bg-white/80 rounded-full"
                  initial={{ height: 20 }}
                  animate={{
                    height: [20, 60, 20],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <motion.p
              className="text-white/90 mt-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Loading Experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
