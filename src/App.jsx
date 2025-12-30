import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import ProtectedRoutes from "./Components/ProtectedRRoutes";
import Checkout from "./Components/Checkout";




const App = () => {
//   useEffect(() => {
//   if (localStorage.getItem("theme") === "dark") {
//     document.documentElement.classList.add("dark");
//   }
// }, []);




  return (
    <>
      <Toaster />

      <Routes>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />


        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Home />} />
        <Route path="/checkout" element={<Checkout/>} />

        </Route>
      </Routes>
    </>
  );
};

export default App;
