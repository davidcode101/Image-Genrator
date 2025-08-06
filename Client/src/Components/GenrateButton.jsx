import React from 'react'
import { assets } from '../assets/assets/assets'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenrateButton = () => {
  const {user,setShowLogin}=useContext(AppContext);
  const navigate=useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }
  return (
    <div className='pb-16 text-center'>
        <h1 className='text-3xl md:text-3xl:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic Try now</h1>
        <button onClick={onClickHandler} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto  hover:scale-105 transition-all duration-500' >Genrate images<img src={assets.star_group} className='h-6' alt="" /></button>
    </div>
  )
}

export default GenrateButton