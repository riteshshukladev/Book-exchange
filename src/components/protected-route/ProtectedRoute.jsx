// src/components/protected-route/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useProtectedRoute } from '@/store/protectedRouteStore';
import LoadingOverlay from '../layout/LoadingOverlay';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { 
    isLoading, 
    isAuthed, 
    checkAuth 
  } = useProtectedRoute();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authStatus = await checkAuth();
        
        console.log(authStatus)
        if (authStatus === false) {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        navigate('/login', { replace: true });
      }
    };

    verifyAuth();
  }, [checkAuth]); // Remove checkAuth and navigate from dependencies

  if (isLoading) {
    return (
      <LoadingOverlay />
    );
  }

  // Only redirect if explicitly not authenticated
  if (isAuthed === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;