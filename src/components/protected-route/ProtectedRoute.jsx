import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const ProtectedRoute = ({children}) => {

    const { token, loading } = useAuth();

    if (loading) {
        return (
            <h1>Loading</h1>
        );
    }

    if (!token) {
        return <Navigate to='/' replace/>
    }


    return children;
}


export default ProtectedRoute;