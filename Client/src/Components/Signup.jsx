import React, { useState } from 'react'; // Import React and useState hook

const Signup = () => {
  // State to store all form input values
  const [formData, setFormData] = useState({
    username: '', // Username input
    email: '',    // Email input
    password: '', // Password input
    confirm: '',  // Confirm password input
  });

  // Update formData state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSignup = (e) => {
    e.preventDefault(); // Prevent page reload
    if (formData.password !== formData.confirm) { // Check if passwords match
      alert('Passwords do not match'); // Alert if they don't match
      return; // Stop execution
    }
    console.log('Signing up with:', formData); // Log form data
    // Add your signup logic here (API call etc.)
  };

  return (
    // Fullscreen container with gradient background
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-4">
      
      {/* Signup form container */}
      <form 
        onSubmit={handleSignup} // Call handleSignup on submit
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        {/* Form title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        {/* Username input field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            name="username" // Input name matches state key
            value={formData.username} // Bind to state
            onChange={handleChange} // Update state on change
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Email input field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Password input field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Confirm password input field */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input 
            type="password" 
            name="confirm" 
            value={formData.confirm} 
            onChange={handleChange} 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        {/* Link to login page */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account? <a href="/login" className="text-indigo-600 font-medium">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup; // Export Signup component
