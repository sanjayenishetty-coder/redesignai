import { motion } from "motion/react";
import { ReactNode } from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

export function BenefitCard({ title, description, icon, delay = 0 }: BenefitCardProps) {
  return (
    <motion.div
      className="relative bg-white/80 backdrop-blur-sm rounded-[15px] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1DB2AB]/10 to-[#007787]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10">
        {icon && (
          <motion.div
            className="mb-4 text-[#1DB2AB]"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
        )}

        <motion.h3
          className="text-xl font-bold text-[#000024] mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-[#424263] text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {description}
        </motion.p>

        {/* Animated bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1DB2AB] to-[#007787]"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}
