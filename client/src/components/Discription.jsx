import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Discription = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    >
      {/* Title and subtitle with fade-in animation */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className='text-3xl sm:text-4xl font-semibold mb-2'
      >
        Create AI Images
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className='text-gray-500 mb-8'
      >
        Transform thoughts into stunning visuals
      </motion.p>

      {/* Main content with image and text */}
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        {/* Animated image with hover effect */}
        <motion.img
          src={assets.sample_img_3}
          alt="butterfly"
          className='w-80 xl:w-96 rounded-lg'
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-medium mx-w-lg mb-4'>
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className='text-gray-600 mb-4'>
            Easily bring your ideas to life with our free AI image generator. 
            Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.
            Imagine it, describe it, and watch it come to life instantly.
          </p>
          <p className='text-gray-600'>
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. 
            From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly.
            Powered by advanced AI technology, the creative possibilities are limitless!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Discription