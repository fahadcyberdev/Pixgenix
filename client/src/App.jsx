import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppCintext'


  import { ToastContainer } from 'react-toastify';
  

// Make sure this path is correct

const App = () => {
  const {showLogin} = React.useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28  min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer
        position="bottom-right"/>
      <NavBar />
      {showLogin && <Login />}
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/result' element={<Result />} />
      <Route path='/buy' element={<BuyCredit />} />  
    </Routes>
    <Footer/>


    </div>

    
   
    
  )
}

export default App