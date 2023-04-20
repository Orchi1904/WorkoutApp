import React from 'react'
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

//Redirects to /login if user is not signed in
function PrivateRoute({ children }) {
    const { getUser } = AuthService;

    return (
        getUser() ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute;