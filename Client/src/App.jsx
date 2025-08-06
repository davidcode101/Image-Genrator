import React, { useContext } from 'react'
import Home from './Pages/Home'
import Result from './Pages/Result'
import BuyCreadits from './Pages/BuyCreadits'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Signup from './Components/Signup'
import AppContextProvider, { AppContext } from './Context/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const AppContent = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen  bg-gradient-to-b  from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCreadits />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  )
}

const App = () => (
  <AppContextProvider>
    <AppContent />
  </AppContextProvider>
);

export default App;