import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Discription from '../components/Discription'
import Testimonial from '../context/Testimonial'
import Generatebtn from '../components/Generatebtn'

const Home = () => {
  return (
    <div>
        <Header />
        <Steps/>
        <Discription />
        <Testimonial  />
        <Generatebtn />
    </div>
  )
}

export default Home