import axios from "axios";
import { useAuth } from "../context/AuthContext";

// const { getAccessTokenFromContext } = useAuth();

// Create API instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important for cookie-based auth    
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

const adminLogin = async (credentials) => {
    try {
        const result = await api.post('/auth/admin/login', credentials);
        return { status: true, data: result.data };
    } catch (e) {
        if (e.response && e.response.data) {
            return { status: false, data: e.response.data };
        }
        return { status: false, data: { message: "Something went wrong. Please try again." } };
    }
};

const adminLogout = async () => {
    try {
        const { data } = await api.post('/auth/admin/logout');
        if (data.status) {
            return { status: true, message: data.message };
        } else {
            return { status: false, message: "Something went wrong" };
        }
    } catch (error) {
        return { status: false, message: "Something went wrong" };
    }
}


const verifyAdminLoggedIn = async (accessToken) => {
    // accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3NDQ1NzI3MTYsImV4cCI6MTc0NDU3MzYxNn0.oZMQ9b2Kv7ZnViGXVywajygDDLp8WD4SR9QaNS6GhMI`;
    try {
        const { data } = await api.post('/auth/check', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return { status: true, data };
    } catch (error) {
        console.log("Error ", error)
    }
}

const enable2faAuth = async (multifactorAuth, password) => {
    const { data } = await api.post('/auth/admin/enable-2fa', { multifactorAuth, password });
    return { status: true, data };
}

const disable2faAuth = async (multifactorAuth, password) => {
    const { data } = await api.post('/auth/admin/disable-2fa', { multifactorAuth, password });
    return { status: true, data };
}


const verify2fa = async (code, method, tempUser) => {
    try {
        const { data } = await api.post('/auth/admin/verify-auth-token', { code, method, user: tempUser });
        if (data.status) {
            return { status: true, data };
        } else {
            return { status: false, data };
        }

    } catch (error) {
        return { status: false }
    }
}

const init2fa = async (method, user) => {
    try {
        const { data } = await api.post('/auth/admin/init-2fa', { method, user });
        console.log(data);
        if (data.status) {
            return { status: true, data };
        } else {
            return { status: false, data };
        }
    } catch (error) {

    }
}

const BACKEND_API = { adminLogin, adminLogout, verifyAdminLoggedIn, enable2faAuth, disable2faAuth, verify2fa, init2fa };

export default BACKEND_API;
