import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Utils/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "pranjalc",
    password: "Pranjal12@"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (
      !formData.username ||
      !formData.password ||
      formData.username.length > 20
    ) {
      toast.error("Please enter a valid username & password");
      return;
    }

  axios.post(
  import.meta.env.VITE_DOMAIN + "/signin",
  {
    userName: formData.username,
    password: formData.password
  },
  { withCredentials: true }
)
.then((res) => {
  dispatch(addUser(res.data.userData));
  toast.success("Logged In Successfully");
  nav("/");
})
.catch(() => {
  toast.error("Invalid Credentials");
});

  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600">
    
    <div className="relative w-full max-w-md bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
      
      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1">
         UserName
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="w-full border-b-2 border-gray-300 py-2 text-gray-700
                     focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border-b-2 border-gray-300 py-2 text-gray-700
                     focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Remember + Forgot */}
    

       

      {/* Login Button */}
    <div className="flex flex-col items-center">
  <button
    onClick={handleSubmit}
    className="w-3/4 bg-blue-900 text-white py-3 rounded-full
               font-semibold tracking-widest
               hover:bg-blue-800 active:scale-95
               transition-all duration-200 shadow-lg"
  >
    LOGIN
  </button>

  <p className="text-center text-sm mt-6 text-gray-600">
    New User?
    <span
      onClick={() => nav("/SignUp")}
      className="text-blue-600 ml-1 cursor-pointer font-medium"
    >
      Sign up
    </span>
  </p>
</div>


    </div>
  </div>
);

};

export default SignIn;
