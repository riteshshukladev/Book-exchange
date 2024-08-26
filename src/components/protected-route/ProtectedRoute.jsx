import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const ProtectedRoute = ({children}) => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <h1>Loading</h1>
        );
    }

    if (!user) {
        return <Navigate to='/' replace/>
    }


    return children;
}


export default ProtectedRoute;