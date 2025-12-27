import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoutes = () => {
  const user = useSelector((store) => store.user.data);

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/signin"} replace  />
  );
};

export default ProtectedRoutes;
