import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/authService';
import { useState,useEffect } from 'react';
const useAuth = () => {

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuth = () => {
          if (isAuthenticated()) {
            setToken(getCurrentUser());
          } else {
            setToken(null);
          }
          setLoading(false);
        };
    
        checkAuth();
    }, []);
    

    const login = (setUserToken) => {
      setToken(setUserToken);
        navigate('/add-book');
      };
    
      const logout = () => {
        setToken(null);
        navigate('/');
    };
    
    return { token, loading, login, logout };
};


export default useAuth;