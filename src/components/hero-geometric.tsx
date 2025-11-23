"use client";

import { motion } from "framer-motion";

export function HeroGeometric() {
  return (
    <div className="relative h-64 w-64 md:h-96 md:w-96 flex items-center justify-center">
      {/* Gradient background blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />

      {/* Rotating outer ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-full w-full rounded-full border-2 border-dashed border-blue-500/20"
      />

      {/* Counter-rotating middle ring */}
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[85%] w-[85%] rounded-full border-2 border-purple-500/30"
      />

      {/* Inner pulsing ring */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[70%] w-[70%] rounded-full border-2 border-pink-500/40"
      />

      {/* Center grid */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 grid grid-cols-2 gap-4 p-4"
      >
        {[
          { delay: 0.2, gradient: "from-blue-500 to-blue-600" },
          { delay: 0.3, gradient: "from-purple-500 to-purple-600" },
          { delay: 0.4, gradient: "from-pink-500 to-pink-600" },
          { delay: 0.5, gradient: "from-indigo-500 to-indigo-600" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: item.delay }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-2xl backdrop-blur-sm flex items-center justify-center cursor-pointer`}
          >
            <motion.div
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
              className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white/20 backdrop-blur-sm"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
