// import React, { useContext } from 'react';
// import { assets, plans } from '../assets/assets/assets';
// import { AppContext } from '../Context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';



// const BuyCredits = () => {
//   const {user,backendUrl,loadCreditsData,token,setShowLogin}=useContext(AppContext);
//   const navigate=useNavigate()
//   const initPay=async (order) => {
//     const options={
//       key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount:order.amount,
//       currency:order.currency,
//       name:'Credits Payment',
//       description:'Credits Payment',
//       order_id: order.id,
//       receipt: order.receipt,
//       handler:async (response) => {
//         console.log(response);
        
//       }

//     }
 
//     const rzp = new window.Razorpay(options)
//     rzp.open()

//   }  
//   const paymentRazorpay=async (planId) => {
//       try {
//         if(!user){
//           setShowLogin(true)
//         }
//      const {data} =  await axios.post(backendUrl+'/api/user/pay-razor',{planId},{headers:{token}})
//      if (data.success) {
//       initPay(data.order)
//      }

//       } catch (error) {
//         toast.error(error.message)
//       }
//     }
  
    
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f1f5f9] px-6 py-16">
//       <button className="mb-6 px-6 py-2 border border-gray-400 rounded-full text-sm text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
//         Our Plans
//       </button>

//       <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
//         Buy Credits
//       </h1>
//       <p className="text-gray-500 text-center max-w-lg mb-14">
//         Choose a plan that fits your needs and unlock the full power of InkWave.
//       </p>

//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
//         {plans.map((item, index) => (
//           <div
//             key={index}
//             className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
//           >
//             <div className="flex justify-center mb-6">
//               <img
//                 src={assets.credit_star}
//                 alt="credits"
//                 className="w-14 h-14 group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.id}</h2>
//             <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="text-indigo-600 font-bold text-3xl">${item.price}</span> / {item.credits} credits
//             </p>
//             <button onClick={()=>paymentRazorpay(item.id)} className="mt-6 w-full py-2 rounded-xl bg-gray-600 text-white font-semibold hover:bg-indigo-700 transition duration-300">
//               {user ?  'Purchase':'Get Started'}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BuyCredits;

import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets/assets';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredits = () => {
  const { user, backendurl, loadCredits, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        
   try {
    const{data}=await axios.post(backendurl+'/api/user/verify',response,{headers:{token}})
  if (data.success) {
    loadCredits();
    navigate('/')
    toast.success('creadit added')
  } 
  
  
  
  } catch (error) {
    toast.error(error.message)
   } }
  }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      const { data } = await axios.post(
        backendurl + '/api/user/pay-razor',
        { planId },
        { headers: { token } }
      );
      if (data.success && data.order) {
        initPay(data.order);
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f1f5f9] px-6 py-16">
      <button className="mb-6 px-6 py-2 border border-gray-400 rounded-full text-sm text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
        Our Plans
      </button>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
        Buy Credits
      </h1>
      <p className="text-gray-500 text-center max-w-lg mb-14">
        Choose a plan that fits your needs and unlock the full power of InkWave.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {plans.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <div className="flex justify-center mb-6">
              <img
                src={assets.credit_star}
                alt="credits"
                className="w-14 h-14 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.id}</h2>
            <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="text-indigo-600 font-bold text-3xl">${item.price}</span> / {item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="mt-6 w-full py-2 rounded-xl bg-gray-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits;
