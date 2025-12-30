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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-teal-500 to-green-400">
    
    <div className="relative w-full max-w-lg bg-white p-10 shadow-2xl">

      {/* Title */}
      <h1 className="text-center text-2xl font-semibold text-blue-600 tracking-wide mb-10">
        • Create an account •
      </h1>

      {/* Inputs */}
      <div className="space-y-7">

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="* First Name"
          className="w-full border-b-2 border-teal-400 py-2 outline-none text-gray-700 placeholder-gray-500"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="* Last Name"
          className="w-full border-b-2 border-teal-400 py-2 outline-none text-gray-700 placeholder-gray-500"
        />

        <input
          name="userName"
          value={form.userName}
          onChange={handleChange}
          placeholder="* Username"
          className="w-full border-b-2 border-teal-400 py-2 outline-none text-gray-700 placeholder-gray-500"
        />

       <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full border-b-2 border-teal-400 py-2 bg-transparent
             outline-none text-gray-700"
>
  <option value="" disabled>
    Select Role
  </option>
  <option value="buyer">Buyer</option>
  <option value="seller">Seller</option>
</select>


        {/* Password */}
        <div className="relative">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="* Password"
            className="w-full border-b-2 border-teal-400 py-2 outline-none text-gray-700 placeholder-gray-500 pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 cursor-pointer text-blue-600"
          >
            <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
          </span>
        </div>

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="* Phone"
          className="w-full border-b-2 border-teal-400 py-2 outline-none text-gray-700 placeholder-gray-500"
        />

      </div>

      {/* Terms */}
      <div className="flex items-start gap-3 text-xs text-gray-500 mt-8">
        <input type="checkbox" className="mt-1 accent-teal-500" />
        <p>
         Only for new user
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-10 py-4 text-white font-semibold tracking-widest
                   bg-gradient-to-r from-blue-600 to-teal-400
                   hover:opacity-90 transition"
      >
        CREATE ACCOUNT
      </button>

      {/* Login */}
      <p className="text-center text-sm mt-6 text-gray-600">
        Already have an account?
        <span
          onClick={() => nav("/SignIn")}
          className="text-blue-600 ml-1 cursor-pointer font-medium"
        >
          Sign in
        </span>
      </p>

    </div>
  </div>
);

};

export default SignUp;
