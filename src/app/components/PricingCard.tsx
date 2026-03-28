import { motion } from "motion/react";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  delay?: number;
  buttonText?: string;
}

export function PricingCard({
  title,
  price,
  features,
  highlighted = false,
  delay = 0,
  buttonText = "Choose Plan",
}: PricingCardProps) {
  return (
    <motion.div
      className={`relative bg-white rounded-[20px] p-8 shadow-lg overflow-hidden ${
        highlighted ? "border-4 border-[#1DB2AB]" : "border border-gray-200"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{
        y: -15,
        scale: highlighted ? 1.05 : 1.03,
        boxShadow: "0 20px 40px rgba(0, 119, 135, 0.3)",
        transition: { duration: 0.3 },
      }}
    >
      {highlighted && (
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#1DB2AB] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
          animate={{
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          MOST POPULAR
        </motion.div>
      )}

      {/* Animated background gradient for highlighted card */}
      {highlighted && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#1DB2AB]/5 to-[#007787]/5"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="relative z-10">
        <motion.h3
          className="text-2xl font-bold text-[#000024] mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.1 }}
        >
          {title}
        </motion.h3>

        <motion.div
          className="mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, type: "spring" }}
        >
          <span className="text-5xl font-bold text-[#1DB2AB]">{price}</span>
        </motion.div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + index * 0.1 }}
            >
              <motion.div
                className="flex-shrink-0 w-6 h-6 bg-[#1DB2AB] rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-[#424263] text-sm leading-relaxed">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className={`w-full py-4 rounded-full font-bold text-lg transition-colors ${
            highlighted
              ? "bg-[#1DB2AB] text-white hover:bg-[#178E89]"
              : "bg-gray-100 text-[#007787] hover:bg-[#1DB2AB] hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText}
        </motion.button>
      </div>

      {/* Decorative corner element */}
      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#1DB2AB]/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
