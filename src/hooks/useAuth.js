import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/authService';
import { useState,useEffect } from 'react';
const useAuth = () => {

    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuth = () => {
          if (isAuthenticated()) {
            setEmail(getCurrentUser());
          } else {
            setEmail(null);
          }
          setLoading(false);
        };
    
        checkAuth();
    }, []);
    

    const login = (setUserEmail) => {
      setEmail(setUserEmail);
        navigate('/home');
      };
    
      const logout = () => {
        setEmail(null);
        navigate('/');
    };
    
    return { email, loading, login, logout };
};


export default useAuth;