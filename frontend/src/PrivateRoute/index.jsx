import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthService from '../services/auth.service';

//Redirects to /login if user is not signed in
function PrivateRoute({ children }) {
    const {getUser} = AuthService;

    return (
        getUser() ? children : <Navigate to="/login"/>
    )
}

export default PrivateRoute;