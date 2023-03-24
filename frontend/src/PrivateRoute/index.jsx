import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//Redirects to /login if user is not signed in
function PrivateRoute({ children }) {
    const {user, login, logout} = useAuth();
    return (
        user ? children : <Navigate to="/login"/>
    )
}

export default PrivateRoute;