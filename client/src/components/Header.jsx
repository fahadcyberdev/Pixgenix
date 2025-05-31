import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppCintext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  // Prevent open redirect and XSS by validating navigation destinations
  const safeNavigate = (path) => {
    // Only allow navigation to known internal routes
    const allowedRoutes = ['/result']
    if (allowedRoutes.includes(path)) {
      navigate(path)
    }
  }

  const onclickHandler = () => {
    if (user) {
      safeNavigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col justify-center items-center text-center my-20 px-4'
    >
      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.10 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-stone-600 inline-flex items-center gap-2 bg-white px-5 py-1.5 rounded-full border border-gray-300 shadow-sm text-sm font-medium'
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" className='w-4 h-4' />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className='text-4xl sm:text-6xl lg:text-7xl max-w-3xl mx-auto mt-10 font-bold leading-tight relative'
      >
        Turn text to{' '}
        <motion.span
          className='text-blue-600 relative inline-block'
          initial={{ backgroundPositionX: 0 }}
          animate={{ backgroundPositionX: 100 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, ease: "linear" }}
          style={{
            background: 'linear-gradient(90deg, #2563eb 30%, #60a5fa 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          image
        </motion.span>
        , in seconds.
        {/* Animated underline */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] h-1 w-24 rounded-full bg-blue-500 opacity-70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.1, type: "spring" }}
        />
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-gray-600 max-w-xl text-base sm:text-lg mt-6'
      >
        Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={onclickHandler}
        className='mt-8 bg-black text-white px-6 sm:px-10 py-3 rounded-full flex items-center cursor-pointer gap-2 hover:opacity-90 transition'
      >
        Generate Images
        <img src={assets.star_group} alt="sparkle" className='h-5 sm:h-6' />
      </motion.button>

      {/* Image gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-wrap justify-center gap-4 mt-16'
      >
        {Array(6).fill('').map((_, index) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            key={index}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt='sample'
            className='w-20 sm:w-24 md:w-28 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
          />
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='mt-4 text-sm text-neutral-500'
      >
        Generated images from Pixgenix
      </motion.p>
    </motion.div>
  )
}

export default Header