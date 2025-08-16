// Import React and useContext hook
import React, { useContext } from 'react';

// Import assets (images/icons)
import { assets } from '../assets/assets/assets.js';

// Import Link (for navigation) and useNavigate (programmatic navigation) from react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// Import AppContext to access user info, login modal, logout, and credit info
import { AppContext } from '../Context/AppContext.jsx';

// Functional component Navbar
const Navbar = () => {

  // Destructure user info, setShowLogin, logout function, and credit from AppContext
  const { user, setShowLogin, logout, credit } = useContext(AppContext);

  // Initialize navigate function for routing
  const navigate = useNavigate();

  // JSX returned by Navbar
  return (
    // Main container with flex layout, space between, and vertical padding
    <div className='flex justify-between items-center py-4'>

       {/* Logo linking to home */}
       <Link to={'/'}>
         <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
       </Link>

       {/* Right side of navbar */}
       <div>
         <div>
           { user ? 
             // If user is logged in
             <div className='flex items-center gap-2 sm:gap-3'>

               {/* Credits button */}
               <button 
                 onClick={() => navigate('/buy')} 
                 className='flex items-center gap-2 sm:gap-3 bg-blue-200 px-4 sm:px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300'
               >
                 <img className='w-5' src={assets.credit_star} alt="" />
                 <p className='text-xs sm:text-sm font-medium text-gray-500'>
                   Credits left: {credit}
                 </p>
               </button>

               {/* Greeting with user name */}
               <p className='text-gray-600 max-sm:hidden pl-4'>HI, {user.name}</p>

               {/* Profile icon with dropdown */}
               <div className='relative group'>
                 <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />

                 {/* Dropdown menu appears on hover */}
                 <div className='absolute hidden group-hover:block bg-white shadow-lg rounded-lg p-4 top-12 right-0 w-48'>
                   <ul className='list-none flex flex-col gap-2 text-sm'>
                     <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>logout</li>
                   </ul>
                 </div>
               </div>
             </div>
             :
             // If user is not logged in
             <div className='flex items-center gap-2 sm:gap-5'>
               <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
               <button 
                 onClick={() => setShowLogin(true)}  
                 className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'
               >
                 Login
               </button>
             </div>
           }
         </div>
         <div>
           {/* Empty div – can be used for future additions */}
         </div>
       </div>
    </div>
  );
};

// Export Navbar component
export default Navbar;
