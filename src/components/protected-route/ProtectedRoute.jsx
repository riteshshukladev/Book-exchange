// src/components/protected-route/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useProtectedRoute } from '@/store/protectedRouteStore';

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
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        navigate('/', { replace: true });
      }
    };

    verifyAuth();
  }, [checkAuth]); // Remove checkAuth and navigate from dependencies

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700">Verifying authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Only redirect if explicitly not authenticated
  if (isAuthed === false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;