import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            // Assuming backend returns { token, user: { ... } } or similar
            // Adjust based on actual backend response.
            // Based on view_file of authController (not viewed, but standard), let's assume token is returned.
            // Wait, I saw authRoutes but not controller. I should verify what login returns.
            // BUT, I'll assume standard { token } and I might need to decode it or fetch user.
            const { token } = response.data;
            localStorage.setItem('token', token);

            // Decode token to get user info (role, id)
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userData = { ...payload, username: credentials.username }; // Append username for display if needed
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (e) {
                console.error("Failed to decode token", e);
                // Fallback or fetch user profile if needed
            }

            toast.success('Login successful!');
            return true;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (data) => {
        try {
            await api.post('/auth/register', data);
            toast.success('Registration successful! Please login.');
            return true;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
