import React from "react";
import { useContext } from "react";
import { UserContextAPI } from "../context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  let { userProfile } = useContext(UserContextAPI);
  if (userProfile) {
    return props.children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedRoutes;
