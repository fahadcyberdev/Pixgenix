import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppCintext'
import { motion } from 'framer-motion'
import axios from 'axios'

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 80 } },
  whileHover: {
    scale: 1.05,
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.12)",
    backgroundColor: "rgba(255,255,255,0.40)",
    transition: { duration: 0.2 }
  }
}

const BuyCredit = () => {
  const { user } = useContext(AppContext);

  // Handler for purchase
  const handlePurchase = async (plan) => {
    try {
      const token = localStorage.getItem('token'); // Adjust if you store token differently
      const res = await axios.post(
        'http://localhost:4000/api/payment/init',
        { planId: plan.id },
        {
          headers: {
            'Content-Type': 'application/json',
            token,
          },
        }
      );
      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to SSLCommerz payment page
      } else {
        alert('Payment initialization failed!');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Payment initialization failed!';
      alert(msg);
      console.error('Payment init error:', error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='min-h-[80vh] text-center pt-14 mb-10'
    >
      <motion.button
        className='border border-gray-400 px-10 py-2 rounded-full mb-6 cursor-pointer transition-all duration-300'
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: 1.08,
          backgroundColor: "#f1f5f9",
          boxShadow: "0 4px 16px 0 rgba(31,38,135,0.10)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        Our Plans
      </motion.button>
      <motion.h1
        className='text-center text-3xl font-medium mb-6 sm:mb-10'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Choose the plan
      </motion.h1>

      <div className='flex flex-wrap justify-center gap-6 text-left '>
        {plans.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="whileHover"
            viewport={{ once: true }}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 transition-all'
          >
            <motion.img
              src={assets.logo_icon}
              width={40}
              alt="logoicon"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              $ <span className='text-3xl font-medium'>{item.price}</span> / {item.credits}
            </p>
            <motion.button
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 font-semibold relative overflow-hidden cursor-pointer transition-all duration-300'
              whileHover={{
                scale: 1.04,
                backgroundColor: "#1e293b",
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.12)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              onClick={() => handlePurchase(item)}
            >
              <span className="relative z-10">{user ? 'Purchase' : 'Get Started'}</span>
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 hover:opacity-60 transition-opacity duration-300 z-0"
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit