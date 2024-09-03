import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { checkInitialToken } from '@/services/authService';

const GlobalAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { logout, checkAuth } = useAuth();

  useEffect(() => {
    const isValid = checkInitialToken();
    if (!isValid) {
      logout();
      navigate('/');
    } else {
      checkAuth();
    }
  }, [navigate, logout, checkAuth]);

  return <>{children}</>;
};

export default GlobalAuthProvider;