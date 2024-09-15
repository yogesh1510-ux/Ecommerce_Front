import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Redirect, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin,isAuthenticated,loading,user,renderElement }) => {
  
  if(loading===false){
    if(!isAuthenticated){
      return <Navigate to="/login" />
    }

    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }

    return renderElement
    
    //return <Navigate to="/login"  />
  }

  // if(loading===false){
  //   return rest
  // }
  
};

export default ProtectedRoute;
