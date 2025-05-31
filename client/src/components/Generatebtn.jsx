import React , {useContext} from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppCintext'
import { useNavigate } from 'react-router-dom'

const Generatebtn = () => {


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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className='pb-16 text-center'
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'
      >
        See the magic. Try now
      </motion.h1>
     <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={onclickHandler}
        className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black/100 text-white/50 m-auto transition-all duration-500 relative overflow-hidden group'

      >
        Generate Images
        <img src={assets.star_group} alt="sparkle" className='h-5 sm:h-6' />
      </motion.button>
    </motion.div>
  )
}

export default Generatebtn