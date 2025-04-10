import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create API instance with base URL
const api = axios.create({
    baseURL: 'localhost:3000',
    withCredentials: true // Important for cookie-based auth
});

// Constants
const TOKEN_KEYS = {
    USER: 'userConfig',
    ADMIN: 'adminConfig'
};

const ENDPOINTS = {
    USER: '/user',
    ADMIN: '/admin'
};

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Helper function to create auth headers
    const createAuthHeader = (token) => ({
        headers: { "Authorization": `Bearer ${token}` }
    });

    // Helper to handle API errors
    const handleError = (err) => {
        const message = err.response?.data?.message || 'An error occurred';
        setError(message);
        console.error('Auth error:', err);
        return { success: false, message };
    };

    // Login user
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.post('/login', credentials);

            if (data.success && data.data && data.data[0]?.token) {
                localStorage.setItem(TOKEN_KEYS.USER, data.data[0].token);
                setUser(data);
                return { success: true, data };
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    // Sign up user
    const signUp = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.post('/signup', userData);

            if (data.success && data.data && data.data[0]?.token) {
                localStorage.setItem(TOKEN_KEYS.USER, data.data[0].token);
                setUser(data);
                return { success: true, data };
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    // Admin login
    const adminLogin = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.post('', credentials);

            if (data.success && data.data && data.data[0]?.token) {
                localStorage.setItem(TOKEN_KEYS.ADMIN, data.data[0].token);
                setAdmin(data.data);
                return { success: true, data };
            } else {
                throw new Error('Invalid admin response from server');
            }
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    // Check admin authentication
    // const checkAdmin = async () => {
    //     const token = localStorage.getItem(TOKEN_KEYS.ADMIN);
    //     if (!token) return;

    //     try {
    //         setLoading(true);
    //         const { data } = await api.get(ENDPOINTS.ADMIN, createAuthHeader(token));
    //         if (data.success && data.data) {
    //             setAdmin(data);
    //         } else {
    //             // Clear invalid admin session
    //             localStorage.removeItem(TOKEN_KEYS.ADMIN);
    //             setAdmin(null);
    //         }
    //     } catch (err) {
    //         localStorage.removeItem(TOKEN_KEYS.ADMIN);
    //         setAdmin(null);
    //         console.error('Admin verification failed:', err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const checkAdmin = async () => {
        try {
            setLoading(true);

            const { data } = await api.post('http://localhost:3000/auth/check', {
                withCredentials: true, // 👈 important to send cookies
            });
            

            if (data.isAuthenticated) {
                setUser(data.user); // or setAdmin(data) if already the                 
            } else {
                setAdmin(null);
            }
        } catch (err) {
            // Cookies.remove('access_token');
            setUser(null);
            // console.error('Admin verification failed:', err);
        } finally {
            setLoading(false);
        }
    }

    // Check user authentication
    const checkUser = async () => {
        const token = localStorage.getItem(TOKEN_KEYS.USER);
        if (!token) return;

        try {
            setLoading(true);
            const { data } = await api.get(ENDPOINTS.USER, createAuthHeader(token));
            if (data.success && data.data) {
                setUser(data);
            } else {
                // Clear invalid user session
                localStorage.removeItem(TOKEN_KEYS.USER);
                setUser(null);
            }
        } catch (err) {
            localStorage.removeItem(TOKEN_KEYS.USER);
            setUser(null);
            console.error('User verification failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // Log out user
    const logOut = async () => {
        try {
            // Optional: Call logout endpoint to invalidate token on server
            const token = localStorage.getItem(TOKEN_KEYS.USER);
            if (token) {
                await api.post('/logout', {}, createAuthHeader(token));
            }
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem(TOKEN_KEYS.USER);
            setUser(null);
            navigate('/', { replace: true });
        }
    };

    // Log out admin
    const adminLogOut = async () => {
        try {
            // Optional: Call admin logout endpoint to invalidate token on server
            const token = localStorage.getItem(TOKEN_KEYS.ADMIN);
            if (token) {
                await api.post('/admin/logout', {}, createAuthHeader(token));
            }
        } catch (err) {
            console.error('Admin logout error:', err);
        } finally {
            localStorage.removeItem(TOKEN_KEYS.ADMIN);
            setAdmin(null);
            navigate('/admin', { replace: true });
        }
    };

    // Check authentication on mount
    useEffect(() => {
        checkUser();
        checkAdmin();
    }, []);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Public API
    const value = {
        user,
        admin,
        error,
        loading,
        login,
        signUp,
        adminLogin,
        logOut,
        adminLogOut,
        checkUser,
        checkAdmin,
        isAuthenticated: !!user,
        isAdmin: !!admin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};