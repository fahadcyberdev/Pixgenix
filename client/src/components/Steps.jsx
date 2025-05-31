import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    // Animated container for the steps section
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32"
    >
      {/* Section Title */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h1>
      <p className="text-lg text-gray-500 mb-8">Transform Words Into Stunning Images</p>

      {/* Steps List */}
      <div className="space-y-4 w-full max-w-3xl text-sm ">
        {stepsData.map((item, index) => (
          // Each step card with icon, title, and description
          <motion.div
            key={index}
            // Animation for each step card
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
              backgroundColor: "rgba(255,255,255,0.35)",
              transition: { duration: 0.2 }
            }}
            className="flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer transition-all duration-300 rounded-lg"
          >
            {/* Step Icon with hover animation */}
            <motion.img
              src={item.icon}
              width={40}
              alt={`Step ${index + 1}`}
              className="w-16 h-16 mb-4"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />
            {/* Step Title */}
            <h2 className="text-xl font-medium">{item.title}</h2>
            {/* Step Description */}
            <p className="text-gray-500">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps