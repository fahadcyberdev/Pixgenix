import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 80 } },
  whileHover: {
    scale: 1.04,
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.12)",
    backgroundColor: "rgba(255,255,255,0.40)",
    transition: { duration: 0.2 }
  }
}

const Testimonial = () => {
  return (
    // Main container for testimonials section
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 py-2'
    >
      {/* Section Title */}
      <h1 className='text-3xl sm:text-4xl font-semibold'>Customer testimonials</h1>
      <p className='text-gray-500 mb-8'>What Our Users Are Saying</p>

      {/* Testimonials List */}
      <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonial, index) => (
          // Animated testimonial card
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="whileHover"
            viewport={{ once: true }}
            className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer transition-all'
          >
            {/* Card Content */}
            <div className='flex flex-col items-center'>
              {/* User Image */}
              <motion.img
                src={testimonial.image}
                alt="profile"
                className='rounded-full w-14 mb-2'
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)' }}
              />
              {/* User Name */}
              <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
              {/* User Role */}
              <p className='text-gray-500 mb-4'>{testimonial.role}</p>
              {/* Star Ratings with animation */}
              <div className='flex mb-4'>
                {Array(testimonial.stars).fill().map((item, idx) => (
                  <motion.img
                    key={idx}
                    src={assets.rating_star}
                    alt="star"
                    className='w-4 h-4'
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.15 }}
                  />
                ))}
              </div>
              {/* Testimonial Text */}
              <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonial