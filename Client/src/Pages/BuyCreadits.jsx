import React, { useContext } from 'react'; // Import React and useContext hook
import { assets, plans } from '../assets/assets/assets'; // Import assets and plans data
import { AppContext } from '../Context/AppContext'; // Import global app context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { toast } from 'react-toastify'; // Import toast for notifications
import axios from 'axios'; // Import axios for HTTP requests

const BuyCredits = () => {
  // Destructure needed values from AppContext
  const { user, backendurl, loadCredits, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate(); // Initialize navigate

  // Initialize Razorpay payment with order details
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key from env
      amount: order.amount, // Payment amount
      currency: order.currency, // Currency
      name: 'Credits Payment', // Payment title
      description: 'Credits Payment', // Payment description
      order_id: order.id, // Razorpay order id
      receipt: order.receipt, // Receipt id
      handler: async (response) => { // Callback after payment
        try {
          const { data } = await axios.post(
            backendurl + '/api/user/verify', // Verify payment endpoint
            response, // Send Razorpay response
            { headers: { token } } // Authorization header
          );
          if (data.success) {
            loadCredits(); // Reload credits
            navigate('/'); // Redirect to homepage
            toast.success('creadit added'); // Show success message
          }
        } catch (error) {
          toast.error(error.message); // Show error if verification fails
        }
      }
    }

    const rzp = new window.Razorpay(options); // Create Razorpay instance
    rzp.open(); // Open Razorpay modal
  };

  // Initiate payment process for a specific plan
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true); // Show login modal if user is not logged in
        return;
      }
      const { data } = await axios.post(
        backendurl + '/api/user/pay-razor', // Payment creation endpoint
        { planId }, // Send plan id
        { headers: { token } } // Authorization header
      );
      if (data.success && data.order) {
        initPay(data.order); // Start Razorpay payment if order received
      } else {
        toast.error("Failed to initiate payment"); // Show error if order creation fails
      }
    } catch (error) {
      toast.error(error.message); // Show error if request fails
    }
  };

  return (
    // Main container
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f1f5f9] px-6 py-16">

      {/* Button for Plans info */}
      <button className="mb-6 px-6 py-2 border border-gray-400 rounded-full text-sm text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
        Our Plans
      </button>

      {/* Section heading */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
        Buy Credits
      </h1>

      {/* Section description */}
      <p className="text-gray-500 text-center max-w-lg mb-14">
        Choose a plan that fits your needs and unlock the full power of InkWave.
      </p>

      {/* Grid container for all plans */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">

        {/* Map through plans array */}
        {plans.map((item, index) => (
          <div
            key={index} // Unique key
            className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            {/* Plan icon */}
            <div className="flex justify-center mb-6">
              <img
                src={assets.credit_star}
                alt="credits"
                className="w-14 h-14 group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Plan title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.id}</h2>

            {/* Plan description */}
            <p className="text-sm text-gray-500 mb-4">{item.desc}</p>

            {/* Plan price and credits */}
            <p className="text-lg font-semibold text-gray-700">
              <span className="text-indigo-600 font-bold text-3xl">${item.price}</span> / {item.credits} credits
            </p>

            {/* Purchase button */}
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="mt-6 w-full py-2 rounded-xl bg-gray-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
            >
              {user ? 'Purchase' : 'Get Started'} {/* Button text changes based on login */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits; // Export component
