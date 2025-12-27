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
    username: "",
    password: ""
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Login to continue
        </p>

        <div className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg
                     font-semibold tracking-wide
                     hover:bg-blue-700 active:scale-95
                     transition-all duration-200 shadow-md"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?
          <span
            className="text-blue-600 cursor-pointer ml-1 font-semibold"
            onClick={() => nav("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
