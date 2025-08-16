// Import React, useState & useEffect for state and lifecycle management
// useContext to access global app context
import React, { useState, useEffect, useContext } from 'react';

// Import assets (icons/images)
import { assets } from '../assets/assets/assets';

// Import AppContext to access global state like user, token, backend URL, etc.
import { AppContext } from '../Context/AppContext';

// Axios for HTTP requests
import axios from 'axios';

// React-toastify for showing notifications
import { toast } from 'react-toastify';

// Functional React component Login
const Login = () => {

  // State to toggle between 'Login' and 'Sign Up'
  const [state, setState] = useState('Login');

  // Access global functions and variables from AppContext
  const { setShowLogin, backendurl, setToken, setUser } = useContext(AppContext);

  // Local state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      if (state === 'Login') {
        // Login API call
        const { data } = await axios.post(backendurl + '/api/user/login', { email, password });

        if (data.success) {
          // Set user and token in context & local storage
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false); // Close modal
        } else {
          toast.error(data.message); // Show error toast
        }

      } else {
        // Registration API call
        const { data } = await axios.post(backendurl + '/api/user/register', { name, email, password });

        if (data.success) {
          // Set user and token in context & local storage
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false); // Close modal
        } else {
          toast.error(data.message); // Show error toast
        }
      }
    } catch (error) {
      // Handle any network or server errors
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset'); // Restore scroll when component unmounts
  }, []);

  // JSX returned by the component
  return (
    // Overlay background with blur effect
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

      {/* Form container */}
      <form onSubmit={onSubmitHandler} className="relative bg-white p-8 rounded-2xl shadow-lg w-96 space-y-6 animate-fade-in">

        {/* Close icon */}
        <img 
          onClick={() => setShowLogin(false)} // Close modal on click
          src={assets.cross_icon}
          alt="close"
          className="absolute top-4 right-4 cursor-pointer w-4 h-4"
        />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">{state}</h1>
        <p className="text-sm text-center text-gray-500">Welcome back! Please sign in to continue.</p>

        {/* Full Name input only shows on Sign Up */}
        {state !== 'Login' && (
          <div className="flex items-center border border-gray-300 px-4 py-3 rounded-md hover:border-gray-500">
            <img src={assets.profile_icon} alt="user" className="w-5 h-5 mr-3 opacity-60" />
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm placeholder-gray-400"
              required
            />
          </div>
        )}

        {/* Email input */}
        <div className="flex items-center border border-gray-300 px-4 py-3 rounded-md hover:border-gray-500">
          <img src={assets.email_icon} alt="email" className="w-5 h-5 mr-3 opacity-60" />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full outline-none text-sm placeholder-gray-400"
            required
          />
        </div>

        {/* Password input */}
        <div className="flex items-center border border-gray-300 px-4 py-3 rounded-md hover:border-gray-500">
          <img src={assets.lock_icon} alt="password" className="w-5 h-5 mr-3 opacity-60" />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full outline-none text-sm placeholder-gray-400"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-2 rounded-md"
        >
          {state === 'Login' ? 'login' : 'create account'}
        </button>

        {/* Toggle between Login & Sign Up */}
        <p className="text-xs text-center text-gray-400">
          {state === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Terms & Privacy */}
        <p className="text-xs text-center text-gray-400">
          By signing up, you agree to our{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span>{' '}
          and{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>.
        </p>

      </form>
    </div>
  );
};

// Export Login component
export default Login;
