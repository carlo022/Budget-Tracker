import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // Pull your authentication state from Redux
  const { user, isLoading } = useSelector((state) => state.auth);

  // Optional: If your auth state is still loading the token from localStorage,
  // show a clean loading spinner instead of accidentally redirecting them.
  if (isLoading) {
    return <div className="text-center py-20 font-bold text-slate-600">Checking authorization...</div>;
  }

  // If logged in, render child routes (via Outlet). If not, redirect to Login.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;