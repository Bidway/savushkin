import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="unauthorized-container">
            <h1>403 - Access Denied</h1>
            <p>
                Sorry, {user?.username}, you don't have permission to access this page.
            </p>
            <div className="unauthorized-actions">
                <button onClick={() => navigate(-1)}>Go Back</button>
                <button onClick={() => navigate('/')}>Go to Home</button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;