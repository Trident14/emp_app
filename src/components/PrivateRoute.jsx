import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';  // Import useCookies

const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(['access_token']);  // Read the cookies

  // If there's no JWT token in cookies, redirect to NotAuthorized page
  if (!cookies['access_token']) {
    return <Navigate to="/not-authorized" />;
  }

  return children;  // If JWT token exists, render children (protected content)
};

export default PrivateRoute;
