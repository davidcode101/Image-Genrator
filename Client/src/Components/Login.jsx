import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets/assets';
import { AppContext } from '../Context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  // Change initial state to 'Login' (uppercase L)
  const [state, setState] = useState('Login');
  const {setShowLogin,backendurl,setToken,setUser} = useContext(AppContext);

  const [name,setName]=useState('');
   const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const onSubmitHandler=async(e)=>{
      e.preventDefault();
      try {
         if(state==='Login'){
     const {data}=  await axios.post(backendurl+'/api/user/login',{email,password})
           if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token',data.token)
                setShowLogin(false)
           }else{
             toast.error(data.message)
           }
         }else{
          const {data}=  await axios.post(backendurl+'/api/user/register',{name,email,password})
           if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token',data.token)
                setShowLogin(false)
           }else{
             toast.error(data.message)
           }
         }
      }catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred')
      }
    }

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-8 rounded-2xl shadow-lg w-96 space-y-6 animate-fade-in">
        {/* Close Icon inside form */}
        <img onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-4 right-4 cursor-pointer w-4 h-4"
        />

        <h1 className="text-3xl font-bold text-center text-gray-800">{state}</h1>
        <p className="text-sm text-center text-gray-500">Welcome back! Please sign in to continue.</p>

        {/* Full Name */}
        {state !== 'Login' && (
          <div className="flex items-center border border-gray-300 px-4 py-3 rounded-md hover:border-gray-500">
            <img src={assets.profile_icon} alt="user" className="w-5 h-5 mr-3 opacity-60" />
            <input
            onChange={e=> setName(e.target.value)}
            value={name}
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm placeholder-gray-400"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center border border-gray-300 px-4 py-3 rounded-md hover:border-gray-500">
          <img src={assets.email_icon} alt="email" className="w-5 h-5 mr-3 opacity-60" />
          <input
          onChange={e=> setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full outline-none text-sm placeholder-gray-400"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-300 px-4 py-3 rounded-md hover:border-gray-500">
          <img src={assets.lock_icon} alt="password" className="w-5 h-5 mr-3 opacity-60" />
          <input
          onChange={e=> setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full outline-none text-sm placeholder-gray-400"
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right -mt-4">
          <span className="text-xs text-blue-600 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-2 rounded-md"
        >
          {state === 'Login' ? 'login' : 'create account'}
        </button>

        {/* Toggle Between Login & Sign Up */}
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

export default Login;
