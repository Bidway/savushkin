import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Базовая конфигурация axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

// Функция для настройки интерцепторов
export const configureAxiosInterceptors = () => {
    // Request interceptor
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Response interceptor
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                const { logout } = useAuth();
                logout();
            }
            return Promise.reject(error);
        }
    );
};

// Экспортируем настроенный экземпляр axios
export const api = axios;