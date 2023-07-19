import { async } from '@firebase/util';
import NotAuthorizePage from 'pages/home/401';
import NotFoundPage from 'pages/home/404';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axiosClient from 'util/axiosClient';

const ProtectedRoute = ({ allowedRoles }) => {
  const naviage = useNavigate();
  console.log(localStorage.getItem('__role'));
  if (!allowedRoles.some((role) => role === localStorage.getItem('__role'))) {
    console.log('alo alo ');
    return <NotAuthorizePage />;
    // return <Navigate to={'/401'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
