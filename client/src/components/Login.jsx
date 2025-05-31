import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppCintext'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => { 
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message || 'Login failed. Please try again.')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message || 'Registration failed. Please try again.')
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed. Please try again.')
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Animation variants for modal and form
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }

  const formVariants = {
    initial: { opacity: 0, scale: 0.92, y: 60 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
    exit: { opacity: 0, scale: 0.92, y: 60, transition: { duration: 0.2 } }
  }

  // Extra animation for input fields
  const inputVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } }
  }

  // Animation for the blue highlight bar under the title
  const barVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1, transition: { duration: 0.5, delay: 0.2, type: "spring" } }
  }

  return (
    <AnimatePresence>
      <motion.div
        className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.form onSubmit={onSubmitHandler}
          className='relative bg-white p-10 rounded-xl text-slate-500 w-[350px] shadow-2xl'
          variants={formVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Animated Title */}
          <motion.h1
            className='text-center text-2xl text-neutral-700 font-medium mb-1'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {state}
          </motion.h1>
          {/* Animated blue bar under title */}
          <motion.div
            className="mx-auto mb-4 mt-1 h-1 w-16 rounded-full bg-blue-500 origin-left"
            variants={barVariants}
            initial="initial"
            animate="animate"
          />
          <motion.p
            className='text-sm text-center mb-6'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Welcome back! Please sign in to continue
          </motion.p>

          {/* Name field for Sign Up */}
          <AnimatePresence>
            {state !== 'Login' && (
              <motion.div
                className='border px-4 py-2 flex items-center gap-3 rounded-md mb-4'
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.img
                  src={assets.profile_icon}
                  alt="user"
                  className='w-5 h-5'
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <input type="text" onChange={ e => setName(e.target.value) } value={name} placeholder='Full Name' required className='outline-none text-sm w-full bg-transparent' />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email field */}
          <motion.div
            className='border px-4 py-2 flex items-center gap-3 rounded-md mb-4'
            variants={inputVariants}
            initial="initial"
            animate="animate"
          >
            <motion.img
              src={assets.email_icon}
              alt="email"
              className='w-5 h-5'
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <input type="email" placeholder='Email id' required onChange={ e => setEmail(e.target.value) } value={email} className='outline-none text-sm w-full bg-transparent' />
          </motion.div>

          {/* Password field */}
          <motion.div
            className='border px-4 py-2 flex items-center gap-3 rounded-md'
            variants={inputVariants}
            initial="initial"
            animate="animate"
          >
            <motion.img
              src={assets.lock_icon}
              alt="password"
              className='w-5 h-5'
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <input type="password" placeholder='Password' required onChange={ e => setPassword(e.target.value) } value={password} className='outline-none text-sm w-full bg-transparent' />
          </motion.div>

          {/* Forget password */}
          <motion.p
            className='text-sm text-blue-600 my-4 cursor-pointer'
            whileHover={{ textDecoration: 'underline', scale: 1.06, color: "#2563eb" }}
            transition={{ duration: 0.2 }}
          >
            Forget password?
          </motion.p>

          {/* Submit button with animation */}
          <motion.button
            type="submit"
            className='bg-blue-600 w-full cursor-pointer text-white py-2 rounded-full font-semibold mt-2 mb-2 shadow hover:bg-blue-700 transition-all relative overflow-hidden'
            whileHover={{
              scale: 1.06,
              backgroundColor: "#2563eb",
              boxShadow: "0 8px 32px 0 rgba(37,99,235,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <motion.span
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {state === 'Login' ? 'Login' : 'Create Account'}
            </motion.span>
            {/* Animated background overlay on hover */}
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 hover:opacity-60 transition-opacity duration-300 z-0"
              aria-hidden="true"
            />
          </motion.button>

          {/* Switch between Login and Sign Up */}
          {state === 'Login' ? (
            <motion.p
              className='text-sm text-center mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Don't have an account?{' '}
              <motion.span
                className='text-blue-600 cursor-pointer font-semibold'
                whileHover={{ textDecoration: 'underline', color: "#2563eb", scale: 1.06 }}
                transition={{ duration: 0.2 }}
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </motion.span>
            </motion.p>
          ) : (
            <motion.p
              className='text-sm text-center mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Already have an account?{' '}
              <motion.span
                className='text-blue-600 cursor-pointer font-semibold'
                whileHover={{ textDecoration: 'underline', color: "#2563eb", scale: 1.06 }}
                transition={{ duration: 0.2 }}
                onClick={() => setState('Login')}
              >
                Login
              </motion.span>
            </motion.p>
          )}

          {/* Close icon with hover animation */}
          <motion.img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross"
            className='absolute top-5 right-5 cursor-pointer'
            whileHover={{ rotate: 90, scale: 1.1, filter: 'brightness(1.2)' }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        </motion.form>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login