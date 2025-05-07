import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { isAuthenticated, hasRole, isLoading } = useAuth(); // Добавьте isLoading

    if (isLoading) {
        return <div>Loading...</div>; // Или спиннер
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (roles.length = 0 && !roles.some(role => hasRole(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;