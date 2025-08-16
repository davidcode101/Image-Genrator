import React, { useContext } from 'react'; // Import React and useContext hook
import Home from './Pages/Home'; // Home page component
import Result from './Pages/Result'; // Result page component
import BuyCreadits from './Pages/BuyCreadits'; // Buy credits page component
import { Routes, Route } from 'react-router-dom'; // Routing components from react-router-dom
import Navbar from './Components/Navbar'; // Navbar component
import Footer from './Components/Footer'; // Footer component
import Login from './Components/Login'; // Login modal component
import Signup from './Components/Signup'; // Signup page component
import AppContextProvider, { AppContext } from './Context/AppContext'; // Context provider and context
import { ToastContainer } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

// Main content of the app that uses the context
const AppContent = () => {
  const { showLogin } = useContext(AppContext); // Access showLogin from context to conditionally show login modal

  return (
    // Container div with responsive padding and gradient background
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen  bg-gradient-to-b  from-teal-50 to-orange-50'>
      {/* Toast notifications container */}
      <ToastContainer position='bottom-right' />

      {/* Navbar displayed on all pages */}
      <Navbar />

      {/* Conditionally render login modal */}
      {showLogin && <Login />}

      {/* Routing between pages */}
      <Routes>
        <Route path='/' element={<Home />} /> {/* Home page route */}
        <Route path='/result' element={<Result />} /> {/* Result page route */}
        <Route path='/buy' element={<BuyCreadits />} /> {/* Buy credits page route */}
        <Route path='/signup' element={<Signup />} /> {/* Signup page route */}
      </Routes>

      {/* Footer displayed on all pages */}
      <Footer />
    </div>
  );
}

// App component that wraps the entire app in context provider
const App = () => (
  <AppContextProvider>
    <AppContent />
  </AppContextProvider>
);

export default App; // Export the App component
