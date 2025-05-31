import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../context/AppCintext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_4)
  const [isImageLoaded, setIsImageLoaded] = useState(true)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (input) {
      const resultImage = await generateImage(input) // ✅ fixed name
      console.log("Generated Image:", resultImage)
      if (resultImage) {
        setImage(resultImage)
        setIsImageLoaded(true)
      } else {
        setIsImageLoaded(false)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <div className='relative'>
          {/* Animated image */}
          <motion.img
            src={image}
            alt="Generated content"
            className='max-w-sm rounded shadow-lg'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />

          {/* Animated loading bar */}
          <AnimatePresence>
            {loading && (
              <motion.span
                key="loading-bar"
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Animated loading text */}
        <AnimatePresence>
          {loading && (
            <motion.p
              key="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='mt-2 text-blue-600 font-medium'
            >
              Loading...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Input and Generate button, shown when image is not loaded */}
      {!isImageLoaded && (
        <motion.div
          className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
            onChange={e => setInput(e.target.value)}
            value={input}
          />
          <motion.button
            type="submit"
            className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 relative overflow-hidden'
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1e293b",
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Generate</span>
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-0"
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>
      )}

      {/* Generate Another & Download buttons, shown when image is loaded */}
      {isImageLoaded && (
        <motion.div
          className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.p
            onClick={() => { setIsImageLoaded(false) }}
            className='cursor-pointer bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-100 transition-all'
            whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
            whileTap={{ scale: 0.97 }}
          >
            Generate Another
          </motion.p>
          <motion.a
            href={image}
            download
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer font-medium hover:bg-zinc-800 transition-all'
            whileHover={{ scale: 1.05, backgroundColor: "#334155" }}
            whileTap={{ scale: 0.97 }}
          >
            Download
          </motion.a>
        </motion.div>
      )}
    </motion.form>
  )
}

export default Result
