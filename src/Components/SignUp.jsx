import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import validator from "validator";
const SignUp = () => {
  const nav=useNavigate()
 
  const [showPassword, setShowPassword] = useState(false)
const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  role: "",
  mobile: ""
});
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value
  }));
};


const handleSubmit = () => {
 // First Name
if (!form.firstName || form.firstName.length < 2 || form.firstName.length > 8) {
  toast.error("Firstname must be 2–8 characters");
  return;
}

// Last Name
if (!form.lastName || form.lastName.length < 3 || form.lastName.length > 10) {
  toast.error("Lastname must be 3–10 characters");
  return;
}

// Username
if (!form.userName || form.userName.length < 3 || form.userName.length > 10) {
  toast.error("Username must be 3–10 characters");
  return;
}


  if (!validator.isStrongPassword(form.password)) {
    toast.error("Please enter a strong password");
    return;
  }

  if (!validator.isMobilePhone(form.mobile, "en-IN")) {
    toast.error("Please enter a valid Indian mobile number");
    return;
  }

  const userRole = ["buyer", "seller"].includes(form.role)
    ? form.role
    : "buyer";

  axios.post(import.meta.env.VITE_DOMAIN + "/signup", {
    firstName: form.firstName,
    lastName: form.lastName,
    userName: form.userName,
    password: form.password,
    role: userRole,
    mobile: form.mobile
  })
  .then(() => {
    toast.success("User Registered");
  })
  .catch((e) => {
    console.error(e);
    toast.error("Something went wrong");
  });
};

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
  name="firstName"
  value={form.firstName}
  onChange={handleChange}
  type="text"
  placeholder="First Name"


              className="w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
            <input
            name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>

          {/* Username */}
          <input
          name="userName"
            value={form.userName}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition"
          />

          {/* Password */}
          <div className="relative mb-4">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-[#F7F9F9] border border-gray-300 focus:border-blue-500 outline-none transition pr-12"
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
          </span>
        </div>

          {/* Role */}
          <select
          name="role"
            value={form.role}
            onChange={handleChange}
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
        
  name="mobile"
  value={form.mobile}
  onChange={handleChange}
  type="tel"
  placeholder="Mobile Number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       outline-none transition"
          />

        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg
                           font-semibold tracking-wide
                           hover:bg-blue-700 active:scale-95
                           transition-all duration-200 shadow-md">
          Register
        </button>
       
       <p className="text-center mt-4 text-sm">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer ml-1 font-semibold"
            onClick={() => nav("/SignIn")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
