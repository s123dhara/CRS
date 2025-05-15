import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BACKEND_API from '../services/api';


// Authentication states
const AUTH_STATES = {
    LOGGED_OUT: 'LOGGED_OUT',          // Not logged in at all
    PARTIAL_AUTH: 'PARTIAL_AUTH',      // Email/password verified but 2FA pending
    FULLY_AUTHENTICATED: 'FULLY_AUTHENTICATED' // Completely authenticated
};
// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(AUTH_STATES.LOGGED_OUT);
    const [tempUser, setTempUser] = useState(null);

    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [twofaAuth, setTwofaAuth] = useState(false);    




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
            // setLoading(true); // ✅ Start spinner
            const response = await BACKEND_API.login(credentials);

            if (response.status && response.data.two_fa_auth_enabled) {
                setAuthState(AUTH_STATES.PARTIAL_AUTH);
                setTempUser(response.data.user);

                return { status: true, requiresTwoFactor: true };
            }

            if (response.status) {
                setLoading(true);
                setAccessToken(response.data.token);
                setLoggedUser(response.data.user);
                return { status: response.status, data: response.data };
            } else {
                setAccessToken(null);
                setLoggedUser(null);
                return { status: response.status, data: response.data };
            }
        } catch (e) {
            console.log("Login Error:", e);
            return false;
        } finally {
            // setLoading(false); // ✅ Always stop spinner
        }
    };

    const adminlogin = async (credentials) => {
        try {
            // setLoading(true); // ✅ Start spinner
            const response = await BACKEND_API.adminLogin(credentials);

            if (response.status && response.data.two_fa_auth_enabled) {
                setAuthState(AUTH_STATES.PARTIAL_AUTH);
                setTempUser(response.data.user);

                return { status: true, requiresTwoFactor: true };
            }

            if (response.status) {
                setLoading(true);
                setAccessToken(response.data.token);
                setLoggedUser(response.data.user);
                return { status: response.status, data: response.data };
            } else {
                setAccessToken(null);
                setLoggedUser(null);
                return { status: response.status, data: response.data };
            }
        } catch (e) {
            console.log("Login Error:", e);
            return false;
        } finally {
            // setLoading(false); // ✅ Always stop spinner
        }
    };

    const recruiterlogin = async (credentials) => {
        try {
            // setLoading(true); // ✅ Start spinner
            const response = await BACKEND_API.recruiterlogin(credentials);

            if (response.status && response.data.two_fa_auth_enabled) {
                setAuthState(AUTH_STATES.PARTIAL_AUTH);
                setTempUser(response.data.user);

                return { status: true, requiresTwoFactor: true };
            }

            if (response.status) {
                setLoading(true);
                setAccessToken(response.data.token);
                setLoggedUser(response.data.user);
                return { status: response.status, data: response.data };
            } else {
                setAccessToken(null);
                setLoggedUser(null);
                return { status: response.status, data: response.data };
            }
        } catch (e) {
            console.log("Login Error:", e);
            return false;
        } finally {
            // setLoading(false); // ✅ Always stop spinner
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
                setLoggedUser(data);
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

    const enable2faAuth = async (MultifactorAuth, password) => {
        const result = await BACKEND_API.enable2faAuth(MultifactorAuth, password);
        if (result.status) {
            console.log(result.data);
        }

        return result.data;
    }

    const disable2faAuth = async (MultifactorAuth, password) => {
        const result = await BACKEND_API.disable2faAuth(MultifactorAuth, password);
        if (result.status) {

        }
        return result.data;
    }

    const verifyAdminLoggedIn = async (accessToken) => {
        try {
            const result = await BACKEND_API.verifyAdminLoggedIn(accessToken);

            if (result?.status && result.data?.isAuthenticated) {                
                setAuthState(AUTH_STATES.FULLY_AUTHENTICATED);                
                setAccessToken(result.data.token);
                setLoggedUser(result.data.user);
            } else {
                setAccessToken(null);
                setLoggedUser(null);
            }
        } catch (err) {
            setAccessToken(null);
            setLoggedUser(null);
        } finally {
            setLoading(false);
        }        
    }

    const verify2fa = async (code, method) => {
        try {

            const response = await BACKEND_API.verify2fa(code, method, tempUser);
            if (response.status) {
                setLoading(true);
                setAccessToken(response.data.token);
                setLoggedUser(response.data.user);
                return { status: response.status, data: response.data };
            } else {
                setAccessToken(null);
                setLoggedUser(null);
                return { status: response.status, data: response.data };
            }

        } catch (error) {

        }
    }

    const init2fa = async (method) => {
        try {
            const result = await BACKEND_API.init2fa(method, tempUser);
            if (result.status) {
                return { status: true };
            } else {
                return { status: false };
            }
        } catch (error) {

        }
    }

    // Log out user
    const logOut = async () => {
        try {
            // await axios.post(`http://localhost:8000/auth/admin/logout`, {}, { withCredentials: true });
            const result = await BACKEND_API.adminLogout();                
            if(result.status) {
                setAuthState(AUTH_STATES.LOGGED_OUT);
                let role = loggedUser.role;
                setLoggedUser(null);
                setLoading(true);

                return {status : true, message : result.message, role };
            }
            // window.location.href = "/login"; // Redirect to login
        } catch (error) {
            console.error("Logout failed:", error);
        }finally {
            setTimeout(() => {
                setAccessToken(null);
                setLoading(false);            
            }, 800);
        }
    };

    const updateAccessToken = (token) => {
        console.log('Setting the token  = ', token)
        setAccessToken(token);
    }


    const getAccessTokenFromContext = () => {
        console.log('Get Access token = ', accessToken)
        return accessToken;
    }

    useEffect(() => {
        if (accessToken) {
            console.log('Access token updated:', accessToken);
            verifyAdminLoggedIn(accessToken);
        } else {
            verifyAdminLoggedIn();
        }
    }, [accessToken]);

    // Check authentication on mount
    useEffect(() => {
        // verifyAdminLoggedIn();
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
        loggedUser,
        admin,
        error,
        loading,
        login,
        adminlogin,
        signUp,
        logOut,    
        verifyAdminLoggedIn,
        isAuthenticated: !!accessToken,
        isAdmin: !!admin,
        isLoggedIn: authState == AUTH_STATES.FULLY_AUTHENTICATED,
        accessToken,
        updateAccessToken,
        getAccessTokenFromContext,
        enable2faAuth,
        disable2faAuth,
        verify2fa,
        init2fa,
        tempUser,
        isPartiallyAuthenticated: authState == AUTH_STATES.PARTIAL_AUTH,        
        recruiterlogin
    };

    console.log(value);
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