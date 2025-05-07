import React from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-brand">Network Manager</div>
            {isAuthenticated() ? (
                <div className="navbar-items">
                    <Link to="/" className="nav-link">Home</Link>
                    {user?.roles?.includes('ADMIN') && (
                        <Link to="/admin" className="nav-link">Admin Panel</Link>
                    )}
                    <span className="welcome-message">Welcome, {user?.username}</span>
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
            ) : (
                <div className="navbar-items">
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;