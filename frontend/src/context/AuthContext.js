import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    // Настройка axios глобально
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/api/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Full error:', error);
                    if (error.response?.status === 401) {
                        logout();
                    }
                }
            };
            fetchUser();
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const isAuthenticated = () => {
        return !!token;
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated,
            hasRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);