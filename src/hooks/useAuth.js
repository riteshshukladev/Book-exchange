import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/authService';
import { useState,useEffect } from 'react';
const useAuth = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuth = () => {
          if (isAuthenticated()) {
            setUser(getCurrentUser());
          } else {
            setUser(null);
          }
          setLoading(false);
        };
    
        checkAuth();
    }, []);
    

    const login = (userData) => {
        setUser(userData);
        navigate('/home');
      };
    
      const logout = () => {
        setUser(null);
        navigate('/');
    };
    
    return { user, loading, login, logout };
};


export default useAuth;