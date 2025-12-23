import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Join us and start your journey
        </p>

        <div className="space-y-5">

          {/* First & Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition"
          />

          {/* Role */}
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition"
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          {/* Mobile Number */}
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition"
          />

        </div>

        <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg
                           font-semibold tracking-wide
                           hover:bg-blue-700 active:scale-95
                           transition-all duration-200 shadow-md">
          Register
        </button>

      </div>
    </div>
  );
};

export default SignUp;
