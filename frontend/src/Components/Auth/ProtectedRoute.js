import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

// Updated for React Router v6
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    // If still loading auth state, show nothing (can add a spinner here later)
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    
    // If authenticated, render the protected component or outlet
    return children ? children : <Outlet />;
};

export default ProtectedRoute; 